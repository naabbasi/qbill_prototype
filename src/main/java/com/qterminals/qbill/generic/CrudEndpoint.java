package com.qterminals.qbill.generic;

import com.qterminals.qbill.config.OffsetLimitRequest;
import com.qterminals.qbill.dto.PageableInfo;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.WebExchangeBindException;

import javax.persistence.RollbackException;
import javax.validation.ConstraintViolationException;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public abstract class CrudEndpoint<T, ID> {

    protected abstract CrudService<T, ID> getService();

    @GetMapping(path = "/pageable")
    public ResponseEntity<List<T>> list(PageableInfo<T> pageableInfo) {
        Pageable pageable = new OffsetLimitRequest(pageableInfo.getPage(), pageableInfo.getSize());
        List<T> page = this.getService().list(pageable).getContent();

        if(page.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity
                .ok()
                //.cacheControl(CacheControl.maxAge(30, TimeUnit.DAYS))
                .body(page);
    }

    @GetMapping
    public ResponseEntity<List<T>> list() {
        List<T> all = this.getService().list();

        if(all.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity
                .ok()
                //.cacheControl(CacheControl.maxAge(30, TimeUnit.DAYS))
                .body(all);
    }

    @GetMapping(path = "/{id}")
    public Optional<T> get(@PathVariable ID id) {
        return this.getService().get(id);
    }

    @PostMapping
    public ResponseEntity<T> save(@Valid @RequestBody T entity) {
        try {
            this.getService().saveOrUpdate(entity);
        } catch (RuntimeException runtimeException) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(entity);
    }

    @PutMapping
    public ResponseEntity<T> update(@Valid @RequestBody T entity) {
        try {
            this.getService().saveOrUpdate(entity);
        } catch (RuntimeException runtimeException) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(entity);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<T> delete(@PathVariable ID id) {
        this.getService().delete(id);

        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @GetMapping(path = "/count")
    public int count() {
        return this.getService().count();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(WebExchangeBindException.class)
    public Map<String, String> handleMethodArgumentNotValid(WebExchangeBindException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));

        return errors;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({DataIntegrityViolationException.class})
    public Map<String, String> handleConstraintViolation(DataIntegrityViolationException ex) {
        Map<String, String> errors = new HashMap<>();
        if (ex.getCause() instanceof RollbackException) {
            var rollbackException = (RollbackException) ex.getCause();
            if (rollbackException.getCause() instanceof ConstraintViolationException) {
                var constraintViolationException = (ConstraintViolationException) rollbackException.getCause();

                errors.put("username", "Username should be unique");
            }

        }

        return errors;
    }
}
