package com.qterminals.qbill.generic;

import com.qterminals.qbill.entities.constant.LifeCycleState;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
@Setter
public abstract class AbstractEntity {

    private UUID genericKey;
    private LocalDateTime created;
    private String creator;
    private LocalDateTime changed;
    private String changer;
    private LifeCycleState lifeCycleState;

    @Id
    @GeneratedValue
    public UUID getGenericKey() {
        return genericKey;
    }

    /*@JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonFormat(pattern = "dd/MM/yyyy hh:mm a")*/
    @NotNull(message = "created.datetime.not.blank")
    public LocalDateTime getCreated() {
        return created;
    }

    public String getCreator() {
        return creator;
    }

    /*@JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonFormat(pattern = "dd/MM/yyyy hh:mm a")*/
    @NotNull(message = "changed.datetime.not.blank")
    public LocalDateTime getChanged() {
        return changed;

    }

    public String getChanger() {
        return changer;
    }

    @Enumerated(EnumType.STRING)
    public LifeCycleState getLifeCycleState() {
        return lifeCycleState;
    }

    @Override
    public int hashCode() {
        if (genericKey != null) {
            return genericKey.hashCode();
        }
        return super.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof AbstractEntity)) {
            return false; // null or other class
        }
        AbstractEntity other = (AbstractEntity) obj;

        if (genericKey != null) {
            return genericKey.equals(other.genericKey);
        }
        return super.equals(other);
    }
}

