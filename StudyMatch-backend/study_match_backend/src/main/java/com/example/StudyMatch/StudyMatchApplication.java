package com.example.StudyMatch;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication

public class StudyMatchApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudyMatchApplication.class, args);
	}

	/*@Bean
	public CommandLineRunner runner(RoleRepository repo) {
		return args -> {
			if (repo.findByName("USER").isEmpty()) {
				repo.save(
						Role.builder()
								.name("USER").build()
				);
			}
		};
	}*/

}
