package com.qterminals.qbill.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

enum JWTConfigEnum {
    UNKNOWN_TOKEN, NO_ROLE_ASSOCIATED, ROLES
}

@Slf4j
@Component
public class JWTConfig {
    private final YamlProperties yamlProperties;

    public JWTConfig(@Autowired YamlProperties yamlProperties) {
        this.yamlProperties = yamlProperties;
    }

    public String generateToken(List<String> assignedRoles) {
        String token = JWTConfigEnum.UNKNOWN_TOKEN.name();

        try {
            Algorithm algorithm = Algorithm.HMAC256(yamlProperties.getSecret());
            token = JWT.create()
                    .withIssuer("qbill.qterminals")
                    .withClaim(JWTConfigEnum.ROLES.name(), assignedRoles)
                    .withClaim(JWTConfigEnum.ROLES.name(), assignedRoles)
                    .sign(algorithm);
        } catch (JWTCreationException exception) {
            log.error("generateToken()", exception);
        }

        return token;
    }

    public void verifyToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(yamlProperties.getSecret());
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("auth0")
                    .build(); //Reusable verifier instance

            DecodedJWT jwt = verifier.verify(token);
            log.info("Roles: {}", jwt.getClaim(JWTConfigEnum.ROLES.name()));
            log.info("Token", jwt.getToken());
        } catch (JWTVerificationException exception) {
            log.error("verifyToken(...)", exception);
        }
    }
}
