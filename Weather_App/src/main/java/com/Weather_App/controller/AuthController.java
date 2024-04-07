package com.Weather_App.controller;


import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Weather_App.config.JwtHelper;
import com.Weather_App.config.JwtRequest;
import com.Weather_App.config.JwtResponse;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;


    @Autowired
    private JwtHelper helper;

    private org.slf4j.Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/login")
     public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest jwtRequest){
	  System.out.println(jwtRequest);
    	this.doAuthenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
    	UserDetails userdetails=userDetailsService.loadUserByUsername(jwtRequest.getUsername());
    	
    	String token=this.helper.generateToken(userdetails);
    	JwtResponse response = new JwtResponse();
		response.setJwtToken(token);
		response.setUsername(userdetails.getUsername());
		System.out.println(response);
    	
    	return new ResponseEntity<JwtResponse>(response,HttpStatus.OK);
    	
    }
    private void doAuthenticate(String email, String password) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            manager.authenticate(authentication);


        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(" Invalid Username or Password  !!");
        }

    }

   
}
