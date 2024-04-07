package com.Weather_App.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Weather_App.service.WeatherService;

@RestController
@CrossOrigin("*")
public class WeatherController {

	@Autowired
	private WeatherService implService;

	@GetMapping("/getForcast-Summary")
	ResponseEntity<String> GetForecastSummaryByLocationName(@RequestParam String city) {

		return new ResponseEntity<String>(implService.GetForecastSummaryByLocationName(city), HttpStatus.ACCEPTED);

	}

	@GetMapping("/getForcast-hourly")
	ResponseEntity<String> GetHourlyForecastByLocationName(@RequestParam String city) {

		return new ResponseEntity<String>(implService.GetHourlyForecastByLocationName(city), HttpStatus.ACCEPTED);

	}
}
