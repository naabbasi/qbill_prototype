package com.qterminals.qbill.service;

import com.qterminals.qbill.entities.Users;
import com.qterminals.qbill.entities.constant.UserStatus;
import com.qterminals.qbill.generic.CrudService;
import com.qterminals.qbill.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService extends CrudService<Users, Long> {
    private UserRepo userRepo;

    public UserService(@Autowired UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public Users login(String username, String password, UserStatus status) {
        return this.userRepo.login(username, password);
    }

    /*public Optional<Users> findByUserId(UUID userId) {
        return this.userRepo.findByUserId(userId);
    }*/

    public Users findByUserName(String username) {
        return this.userRepo.findByUsername(username);
    }

    @Override
    protected JpaRepository<Users, Long> getRepository() {
        return userRepo;
    }

    /*public Page<Users> usersWithAssignedRoles(Pageable pageable) {
        return this.userRepo.usersWithAssignedRoles(pageable);
    }*/
}
