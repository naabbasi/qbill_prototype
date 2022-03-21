package com.qterminals.qbill.entities.listener;

import com.qterminals.qbill.entities.Users;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.PostLoad;

@Slf4j
public class UserListener {
    @PostLoad
    public void afterLoad(Users users) {
        log.info("user {}", users.getUsername());
    }
}
