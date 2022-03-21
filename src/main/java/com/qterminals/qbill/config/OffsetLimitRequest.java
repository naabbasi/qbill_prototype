package com.qterminals.qbill.config;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Optional;

public class OffsetLimitRequest implements Pageable {
    private int limit;
    private int offset;
    private Sort sort;

    public OffsetLimitRequest(int offset, int limit) {
        this.offset = offset;
        this.limit = limit;
    }

    public OffsetLimitRequest(int offset, int limit, Sort sort) {
        this.limit = limit;
        this.offset = offset;
        this.sort = sort;
    }

    @Override
    public boolean isPaged() {
        return Pageable.super.isPaged();
    }

    @Override
    public boolean isUnpaged() {
        return Pageable.super.isUnpaged();
    }

    @Override
    public int getPageNumber() {
        return 1;
    }

    @Override
    public int getPageSize() {
        return this.limit;
    }

    @Override
    public long getOffset() {
        return this.offset;
    }

    @Override
    public Pageable first() {
        return null;
    }

    @Override
    public Pageable withPage(int pageNumber) {
        return null;
    }

    @Override
    public Sort getSort() {
        return this.sort == null ? Sort.unsorted() : this.sort;
    }

    @Override
    public Sort getSortOr(Sort sort) {
        return Pageable.super.getSortOr(sort);
    }

    @Override
    public Pageable next() {

        return null;
    }

    @Override
    public Pageable previousOrFirst() {

        return null;
    }

    @Override
    public boolean hasPrevious() {

        return false;
    }

    @Override
    public Optional<Pageable> toOptional() {
        return Pageable.super.toOptional();
    }
}
