package com.Weather_App.config;

import lombok.Data;

@Data
public class JwtRequest {

	private String username;
	private String password;
}
