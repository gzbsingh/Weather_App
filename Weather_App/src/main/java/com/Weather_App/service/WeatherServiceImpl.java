package com.Weather_App.service;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.Weather_App.exception.GlobalExceptionHandler;
import com.Weather_App.exception.WeatherServiceException;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class WeatherServiceImpl implements WeatherService {

	@Value("${X-RapidAPI-Key}")
	private String rapidkey;

	@Value("${X-RapidAPI-Host}")
	private String rapidhost;
	
	@Value("${open-Key}")
	private String apikey;
	
	private static final String Summary_Url = "https://forecast9.p.rapidapi.com/rapidapi/forecast/";
    private static final String  Hourly_Url="https://api.openweathermap.org/data/2.5/forecast"; 
	
    RestTemplate restTemplate=new RestTemplate();

    private static final Logger logger = LoggerFactory.getLogger(WeatherService.class);
	
	@Override
	public String GetForecastSummaryByLocationName(String city) {
		try {
		String url = Summary_Url + city + "/summary/";

		HttpHeaders headers = new HttpHeaders();//setting header
		headers.set("X-RapidAPI-Key", rapidkey);
		headers.set("X-RapidAPI-Host", rapidhost);
		   headers.set("Client-ID","client-"+UUID.randomUUID().toString().substring(0, 8));
		HttpEntity<String> entity = new HttpEntity<>(headers);

		String response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class).getBody();

		 return response;
		}catch (Exception e) {
	            logger.error("Error retrieving weather summary for {}: {}", city, e.getMessage());
	            throw new WeatherServiceException("Error retrieving weather summary for " + city+" details--"+e.getMessage());
	        }
	}

	@Override
	public String GetHourlyForecastByLocationName(String city) {
		try {
		String url = Hourly_Url+"?q="+city+"&appid="+apikey;
				//set random client id
		HttpHeaders headers = new HttpHeaders();
       headers.set("Client-ID","client-"+UUID.randomUUID().toString().substring(0, 8));

		HttpEntity<String> entity = new HttpEntity<>(headers);

		String response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class).getBody();

		return response;
		} catch (Exception e) {
            logger.error("Error retrieving hourly weather forecast for {}: {}", city, e.getMessage());
            throw new WeatherServiceException("Error retrieving hourly weather forecast for " + city+" details--"+e.getMessage());
        }
	}

}
