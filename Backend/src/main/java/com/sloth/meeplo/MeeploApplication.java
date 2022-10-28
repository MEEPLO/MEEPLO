package com.sloth.meeplo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableJpaAuditing
@EnableAspectJAutoProxy
public class MeeploApplication {

	public static void main(String[] args) {
		SpringApplication.run(MeeploApplication.class, args);
	}

}
