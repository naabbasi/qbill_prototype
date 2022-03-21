package com.qterminals.qbill.entities;

import com.qterminals.qbill.entities.constant.RoleNames;
import com.qterminals.qbill.entities.constant.UserStatus;
import com.qterminals.qbill.entities.listener.UserListener;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

/*@NamedEntityGraph(
        name = "users.withRoles",
        attributeNodes = {@NamedAttributeNode(value = "assignedRoles", subgraph = "assigned.UserRoles")},
        subgraphs = {@NamedSubgraph(name = "assigned.UserRoles", attributeNodes = @NamedAttributeNode(value = "role"))}
)*/
@EntityListeners(UserListener.class)
@Entity
@Table(name = "qbil_base_user", uniqueConstraints = @UniqueConstraint(columnNames = "buser_userid"))
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"password", "assignedRoles"})
public class Users implements Serializable { //CRUD , byId, byName

    private Long userId;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String locale = "en";
    private String token;
    private String userStatus;
    private List<RoleNames> userRoles;

    public Users(Users users) {
        this(users.getUsername(), users.getPassword());
    }

    public Users(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public Users(String username, String password, String userStatus) {
        this.username = username;
        this.password = password;
        this.userStatus = userStatus;
    }

    @Id
    @GeneratedValue
    @Column(name = "buser_gkey")
    public Long getUserId() {
        return userId;
    }

    @Column(unique = true, name = "buser_userid")
    @NotBlank(message = "{users.username.not.blank}")
    public String getUsername() {
        return username;
    }

    @Column(name = "buser_password")
    @NotBlank(message = "{users.password.not.blank}")
    public String getPassword() {
        return password;
    }

    @Column(name = "buser_first_name")
    @NotBlank(message = "{users.firstName.not.blank}")
    public String getFirstName() {
        return firstName;
    }

    @Column(name = "buser_last_name")
    @NotBlank(message = "{users.lastName.not.blank}")
    public String getLastName() {
        return lastName;
    }

    @Column(name = "buser_language")
    @NotBlank(message = "{users.locale.not.blank}")
    public String getLocale() {
        return locale;
    }

    @NotNull(message = "{users.status.not.blank}")
    @Column(name = "buser_active")
    public String getUserStatus() {
        return userStatus;
    }

    @Transient
    public String getToken() {
        return token;
    }

    @Transient
    public List<RoleNames> getUserRoles() {
        return userRoles;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Users)) return false;
        if (!super.equals(o)) return false;
        Users users = (Users) o;
        return userId.equals(users.userId) && getUsername().equals(users.getUsername()) && getPassword().equals(users.getPassword())
                && getFirstName().equals(users.getFirstName()) && getLastName().equals(users.getLastName()) && getToken().equals(users.getToken()) && getUserStatus() == users.getUserStatus();
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), userId, getUsername(), getPassword(), getFirstName(), getLastName(), getToken(), getUserStatus());
    }
}
