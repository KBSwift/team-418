package org.launchcode.homebase;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HomeBaseApplication {

	public static void main(String[] args) {
		SpringApplication.run(HomeBaseApplication.class, args);
	}

}
