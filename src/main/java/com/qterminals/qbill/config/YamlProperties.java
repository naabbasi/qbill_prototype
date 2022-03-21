package com.qterminals.qbill.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties
@ConfigurationProperties("jwt")
@Setter
@Getter
public class YamlProperties {

    private String secret;

    @Override
    public String toString() {
        return "{" + this.secret + "}";
    }
}
