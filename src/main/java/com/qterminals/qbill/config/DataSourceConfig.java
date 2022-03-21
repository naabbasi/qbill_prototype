package com.qterminals.qbill.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;
import java.util.Base64;

@Configuration
public class DataSourceConfig {

    private Environment environment;

    @Autowired
    public DataSourceConfig(Environment environment) {
        this.environment = environment;
    }

    @Bean
    public DataSource getDataSource() {
        String profile = this.environment.getActiveProfiles()[0];
        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();

        if ("test".equalsIgnoreCase(profile)) {
            dataSourceBuilder.driverClassName("com.mysql.cj.jdbc.Driver");
        } else if ("dev".equalsIgnoreCase(profile)) {
            dataSourceBuilder.driverClassName("com.mysql.cj.jdbc.Driver");
        } else if ("prod".equalsIgnoreCase(profile)) {
            dataSourceBuilder.driverClassName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
        }

        dataSourceBuilder.url(this.environment.getProperty("spring.datasource.url"));
        dataSourceBuilder.username(this.environment.getProperty("spring.datasource.username"));
        dataSourceBuilder.password(decodePassword(this.environment.getProperty("spring.datasource.password")));
        return dataSourceBuilder.build();
    }

    private String decodePassword(String encodedString) {
        if ("".equals(encodedString)) {
            return encodedString;
        }

        byte[] decodedBytes = Base64.getDecoder().decode(encodedString);
        return new String(decodedBytes);
    }
}
