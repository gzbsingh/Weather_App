# Weather API 
## Introduction
This project is a weather application that utilizes a weather API to retrieve forecast data for specific cities. The application allows users to view weather forecasts either hourly or summarized for a selected city.
## Project Type
Full Stack
## Directory Structure
Backend-├─ Weather_App/
├─ frontend/ -Weather_App(FrontEnd)│ 

## Video Walkthrough of the project

Attached is a very short video walkthrough of all of the features  https://drive.google.com/file/d/1J5OjrQA0-W4AdnyL5O1RDK8wdm5tc7jC/view?usp=sharing

## Deployed Link-https://6613313126d1151ad307caaf--glittering-panda-de2e0d.netlify.app/

## Technologies Used

- *Frontend*: HTML, CSS, JavaScript
- *Backend*: Java (Spring Boot)
- *API*: OpenWeatherMap API
- *Security*: Spring Security with jwt Authentication
- *Other Tools*: fetch (for API requests), Bootstrap (for styling)
- *Api use for weather data- https://openweathermap.org/forecast5#name5  ,  https://rapidapi.com/developer/dashboard
## Features

- *Forecast Summary*: View summarized weather forecast including date, weather state, temperature, wind, precipitation, sunrise/sunset, moonrise/moonset, and sun hours.
- *Hourly Forecast*: Display hourly weather forecast with details such as date/time, description, temperature, feels like, humidity, wind speed, and cloud coverage.
- *User Authentication*: Secure login using Spring Security with username and password.

### username- admin  ,  password-admin

## ScreenShot
 ## Login
   ![login](https://github.com/gzbsingh/Weather_App/assets/39863817/78da2fe7-5244-49ea-b283-604b3560db0f)

 ## index file
   ![forcast](https://github.com/gzbsingh/Weather_App/assets/39863817/063d82bb-7a01-4e4a-9da8-58c2affed36f)

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/gzbsingh/Weather_App.git

- * Set up backend:Import the project into your IDE (e.g., IntelliJ IDEA).
- * Run the Spring Boot application to start the backend server.Set up frontend:Navigate to the frontend directory.

- * Open index.html in a web browser to access the weather application.Usage:


  - * Enter a city name and select the forecast type (Hourly or Summary).Click the "Search" button to retrieve the weather forecast.


- * Security ConfigurationThe application uses Spring Security to secure endpoints. Basic Authentication is implemented for user login.

- * API IntegrationThe application integrates with the OpenWeatherMap API to retrieve weather forecast data based on user input.

- * Future ImprovementsImplement user registration and user-specific forecasts.Enhance UI/UX with interactive charts and maps



 ## Endpoints

### 1. /getForecast-Summary

- *Method*: GET
- *Description*: Retrieves a summarized weather forecast for a specified city.
- *Parameters*:
  - city: Name of the city for which the forecast is requested.

### 2. /getForecast-Hourly

- *Method*: GET
- *Description*: Retrieves an hourly weather forecast for a specified city.
- *Parameters*:
  - city: Name of the city for which the forecast is requested.

### 3. /login

- *Method*: POST
- *Description*: Endpoint for user authentication using username and password.
- *Request Body*:
  - username: User's username(admin).
  - password: User's password(admin).
 
  ### License
   This project is licensed under the MIT License.
