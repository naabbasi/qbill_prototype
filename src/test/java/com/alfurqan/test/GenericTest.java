package com.alfurqan.test;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.ActiveProfiles;

@Slf4j
@EnableAutoConfiguration
@ComponentScan(basePackages = {"com.qterminals"})
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ActiveProfiles("test")
public class GenericTest {

    @BeforeAll
    public static void beforeAll() {
        log.info("===========================================================");
        log.info("                     Invoking before");
        log.info("===========================================================");
    }

    @AfterAll
    public static void afterAll() {
        log.info("===========================================================");
        log.info("                     Invoking after");
        log.info("===========================================================");
    }
}
