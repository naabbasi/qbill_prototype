package com.qterminals.qbill.generic;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public abstract class CrudService<T, ID> {
    public CrudService() {
    }

    protected abstract JpaRepository<T, ID> getRepository();

    public Optional<T> get(ID id) {
        return this.getRepository().findById(id);
    }

    public T saveOrUpdate(T entity) {
        return this.getRepository().saveAndFlush(entity);
    }

    public List<T> saveOrUpdateAll(Iterable<T> entities) {
        return this.getRepository().saveAllAndFlush(entities);
    }

    public void delete(ID id) {
        this.getRepository().deleteById(id);
    }

    public void deleteAll() {
        this.getRepository().deleteAll();
    }

    public Page<T> list(Pageable pageable) {
        return this.getRepository().findAll(pageable);
    }

    public List<T> list() {
        return this.getRepository().findAll();
    }

    public int count() {
        return (int)this.getRepository().count();
    }
}
