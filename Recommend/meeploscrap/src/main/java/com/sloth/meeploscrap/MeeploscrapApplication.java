package com.sloth.meeploscrap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class MeeploscrapApplication {

	public static void main(String[] args) {
		SpringApplication.run(MeeploscrapApplication.class, args);
	}

}
