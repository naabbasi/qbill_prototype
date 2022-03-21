package com.qterminals.qbill.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SuppliesWithSuppliers {
    private Long supplierId;
    private String supplierName;
    private Long supplyId;
    private LocalDateTime supplyDateTime;
    private Long supplyAmount;
    private Long supplyQuantity;
    private Long supplyPrice;

    public SuppliesWithSuppliers(Long supplyId, LocalDateTime supplyDateTime, Long supplyAmount, Long supplyQuantity, Long supplyPrice) {
        this.supplyId = supplyId;
        this.supplyDateTime = supplyDateTime;
        this.supplyAmount = supplyAmount;
        this.supplyQuantity = supplyQuantity;
        this.supplyPrice = supplyPrice;
    }

    public Long getSupplierId() {
        return supplierId;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public Long getSupplyId() {
        return supplyId;
    }

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonFormat(pattern = "dd/MM/yyyy hh:mm a")
    public LocalDateTime getSupplyDateTime() {
        return supplyDateTime;
    }

    public Long getSupplyAmount() {
        return supplyAmount;
    }

    public Long getSupplyQuantity() {
        return supplyQuantity;
    }

    public Long getSupplyPrice() {
        return supplyPrice;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SuppliesWithSuppliers)) return false;
        SuppliesWithSuppliers that = (SuppliesWithSuppliers) o;
        return getSupplierId().equals(that.getSupplierId()) && getSupplierName().equals(that.getSupplierName()) &&
                getSupplyId().equals(that.getSupplyId()) && getSupplyDateTime().equals(that.getSupplyDateTime()) &&
                getSupplyAmount().equals(that.getSupplyAmount()) && getSupplyQuantity().equals(that.getSupplyQuantity()) &&
                getSupplyPrice().equals(that.getSupplyPrice());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getSupplierId(), getSupplierName(), getSupplyId(), getSupplyDateTime(), getSupplyAmount(), getSupplyQuantity(), getSupplyPrice());
    }
}
