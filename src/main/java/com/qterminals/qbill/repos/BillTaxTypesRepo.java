package com.qterminals.qbill.repos;

import com.qterminals.qbill.entities.BillTaxTypes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.UUID;

public interface BillTaxTypesRepo extends JpaRepository<BillTaxTypes, Long> {
    @Query("from BillTaxTypes bill where bill.genericKey = :genericKey")
    Optional<BillTaxTypes> findByGenericKey(Long genericKey);
}

/*public class BillTaxTypesRepo implements JpaRepository<BillTaxTypes, UUID> {
    @PersistenceContext
    EntityManager entityManager;

    public BillTaxTypesRepo(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public List<BillTaxTypes> findAll() {
        return null;
    }

    @Override
    public List<BillTaxTypes> findAll(Sort sort) {
        return null;
    }

    @Override
    public List<BillTaxTypes> findAllById(Iterable<UUID> iterable) {
        return null;
    }

    @Override
    public <S extends BillTaxTypes> List<S> saveAll(Iterable<S> iterable) {
        return null;
    }

    @Override
    public void flush() {

    }

    @Override
    public <S extends BillTaxTypes> S saveAndFlush(S s) {
        return null;
    }

    @Override
    public <S extends BillTaxTypes> List<S> saveAllAndFlush(Iterable<S> iterable) {
        return null;
    }

    @Override
    public void deleteAllInBatch(Iterable<BillTaxTypes> iterable) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<UUID> iterable) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public BillTaxTypes getOne(UUID uuid) {
        return null;
    }

    @Override
    public BillTaxTypes getById(UUID uuid) {
        return null;
    }

    @Override
    public <S extends BillTaxTypes> List<S> findAll(Example<S> example) {
        return null;
    }

    @Override
    public <S extends BillTaxTypes> List<S> findAll(Example<S> example, Sort sort) {
        return null;
    }

    @Override
    public Page<BillTaxTypes> findAll(Pageable pageable) {
        return null;
    }

    @Override
    public <S extends BillTaxTypes> S save(S s) {
        return null;
    }

    @Override
    public Optional<BillTaxTypes> findById(UUID uuid) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(UUID uuid) {
        return false;
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(UUID uuid) {

    }

    @Override
    public void delete(BillTaxTypes billTaxTypes) {

    }

    @Override
    public void deleteAllById(Iterable<? extends UUID> iterable) {

    }

    @Override
    public void deleteAll(Iterable<? extends BillTaxTypes> iterable) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public <S extends BillTaxTypes> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends BillTaxTypes> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends BillTaxTypes> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends BillTaxTypes> boolean exists(Example<S> example) {
        return false;
    }
}*/
