package com.Weather_App.service;

public interface WeatherService {

	String GetForecastSummaryByLocationName(String city);
	String GetHourlyForecastByLocationName(String city);
}
