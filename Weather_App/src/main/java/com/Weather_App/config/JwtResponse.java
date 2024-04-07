package com.Weather_App.config;

import lombok.Data;

@Data
public class JwtResponse {

	private String jwtToken;
	private String username;

}
