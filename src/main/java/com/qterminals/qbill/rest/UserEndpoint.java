package com.qterminals.qbill.rest;

import com.qterminals.qbill.config.JWTConfig;
import com.qterminals.qbill.config.OffsetLimitRequest;
import com.qterminals.qbill.dto.PageableInfo;
import com.qterminals.qbill.entities.Users;
import com.qterminals.qbill.entities.constant.UserStatus;
import com.qterminals.qbill.generic.CrudEndpoint;
import com.qterminals.qbill.generic.CrudService;
import com.qterminals.qbill.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContext;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserEndpoint extends CrudEndpoint<Users, Long> {
    private final UserService userService;
    private final JWTConfig jwtConfig;

    public UserEndpoint(@Autowired UserService userService, @Autowired JWTConfig jwtConfig) {
        this.userService = userService;
        this.jwtConfig = jwtConfig;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<Users> login(@Valid @RequestBody Users users) {
        var userExists = this.userService.login(users.getUsername(), users.getPassword(), UserStatus.ACTIVE);

        if (userExists == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        userExists.setToken(this.jwtConfig.generateToken(List.of("ADMIN", "USER")));

        var LOCALE = userExists.getLocale().split("_");

        //LocaleContextHolder.setLocale(new Locale(LOCALE[0], LOCALE[1]));
        LocaleContextHolder.setLocaleContext(() -> new Locale(LOCALE[0], LOCALE[1]));
        userExists.setLocale(LOCALE[0]);

        //ReactiveSecurityContextHolder
        return ResponseEntity.ok(userExists);
    }

    @Override
    @PostMapping
    public ResponseEntity<Users> save(@Valid @RequestBody Users user) {
        this.getService().saveOrUpdate(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @Override
    @GetMapping(path = "/pageable")
    public ResponseEntity<List<?>> list(PageableInfo pageableInfo) {
        Pageable pageable = new OffsetLimitRequest(pageableInfo.getPage(), pageableInfo.getSize());
        List<Users> users = this.userService.list(pageable).getContent();

        if (users.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity
                .ok()
                .body(users);
    }

    @Override
    @GetMapping(path = "/{id}")
    public Optional<Users> get(@PathVariable Long id) {
        return this.userService.get(id);
    }

    @Override
    protected CrudService<Users, Long> getService() {
        return userService;
    }
}
