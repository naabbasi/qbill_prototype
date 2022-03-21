package com.qterminals.qbill.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.qterminals.qbill.entities.constant.LifeCycleState;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "qbil_tax_types")
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BillTaxTypes implements Serializable {
    private Long genericKey;
    private String id;
    private String description;
    private String glCode;
    private UUID complexGenericKey = UUID.randomUUID();
    private LocalDateTime created;
    private String creator;
    private LocalDateTime changed;
    private String changer;
    private LifeCycleState lifeCycleState;

    @Id
    @GeneratedValue
    @Column(name = "gkey")
    public Long getGenericKey() {
        return genericKey;
    }

    public String getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public String getGlCode() {
        return glCode;
    }

    @Transient
    public UUID getComplexGenericKey() {
        return complexGenericKey;
    }

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonFormat(pattern = "dd/MM/yyyy hh:mm a")
    public LocalDateTime getCreated() {
        return created;
    }

    public String getCreator() {
        return creator;
    }

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonFormat(pattern = "dd/MM/yyyy hh:mm a")
    public LocalDateTime getChanged() {
        return changed;
    }

    public String getChanger() {
        return changer;
    }

    @NotNull(message = "{bill.life.cycle.state.not.null}")
    @Enumerated(EnumType.STRING)
    public LifeCycleState getLifeCycleState() {
        return lifeCycleState;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BillTaxTypes)) return false;
        if (!super.equals(o)) return false;

        BillTaxTypes that = (BillTaxTypes) o;

        return getId().equals(that.getId()) && getDescription().equals(that.getDescription()) &&
                getGlCode().equals(that.getGlCode()) && getComplexGenericKey().equals(that.getComplexGenericKey());
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), getId(), getDescription(), getGlCode(), getComplexGenericKey());
    }
}
