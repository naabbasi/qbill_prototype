package com.qterminals;

import com.qterminals.qbill.generator.FakeDataGenerator;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;

import java.util.Base64;

@SpringBootApplication(scanBasePackages = {"com.qterminals.qbill"})
public class QTerminalsBillsApplication {

	private final Environment environment;

	public QTerminalsBillsApplication(Environment environment) {
		this.environment = environment;
	}

	@Bean
	public CommandLineRunner runner(FakeDataGenerator fakeDataGenerator) {
		return args -> {
			String profile = this.environment.getActiveProfiles()[0];
			if ("dev".equalsIgnoreCase(profile)) {
				/*fakeDataGenerator.generateUsers();
				fakeDataGenerator.generateDummyBills();*/
			}
		};
	}

	public static void main(String[] args) {
		SpringApplication.run(QTerminalsBillsApplication.class, args);
	}

	private static void encodePassword() {
		String password = "";
		System.out.println(Base64.getEncoder().encodeToString(password.getBytes()));
	}
}
