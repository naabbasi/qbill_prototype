package com.qterminals.qbill.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageableInfo<T> {
    Integer page;
    Integer size;
    String sortField;
    Integer sortOrder;
    T filters;
}
