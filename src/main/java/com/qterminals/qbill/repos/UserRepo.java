package com.qterminals.qbill.repos;

import com.qterminals.qbill.entities.Users;
import com.qterminals.qbill.entities.constant.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepo extends JpaRepository<Users, Long> {
    @Query("select u from Users u where u.username = :username and u.password = :password")
    Users login(String username, String password);

    /*@EntityGraph("users.withRoles")
    @Query("select users " +
            "from Users as users " +
            "left join users.assignedRoles assignedRoles " +
            "where users.userId = :userId")
    Optional<Users> findByUserId(@Param("userId") UUID userId);*/

    Users findByUsername(String username);

    /*@EntityGraph("users.withRoles")
    @Query("select users " +
            "from Users as users " +
            "left join users.assignedRoles assignedRoles")
    Page<Users> usersWithAssignedRoles(Pageable pageable);*/
}
