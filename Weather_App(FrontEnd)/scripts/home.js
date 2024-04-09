let token=localStorage.getItem("token");
let baseurl="https://weatherapp-production-db8f.up.railway.app";
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-id');
    const forecastTables = document.getElementById('forecast-tables');
   //appending city title and creating
  const title=document.getElementById("title");
   const acesss=document.getElementById("access");
  if(token){
    const dt=JSON.parse(atob(token.split(".")[1]));
    const exp=dt.exp*1000;
 
   
    if(Date.now()>=exp)
    { 
        localStorage.removeItem("token");
        acesss.innerText="Login";
    }
    else 
    acesss.innerText="Logout";
   
   }
   else{

       acesss.innerText="Login"
   }
   acesss.addEventListener('click',e=>{
       localStorage.removeItem("token");
   })
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const city = document.getElementById('city').value;
        const filter = document.getElementById('filter').value;
       
      //  title.innerText=city;
        
        if (filter === 'Forecast Hourly') {
            try {
           getForecastHourly(city);

            } catch (error) {
                console.error('Error fetching hourly forecast:', error);
            }
        } else if (filter === 'Forecast Summary') {
            try {
               getForecastSummary(city);
               
            } catch (error) {
                console.error('Error fetching summary forecast:', error);
            }
        }
        
    });
//fetching  forecastHourly
     function getForecastHourly(city) {
        console.log(token)
        let url=`${baseurl}/getForcast-hourly?city=${city}`;
             fetch(url,{
                 headers:{
                    "Content-Type": 'application/json',
                    'Authorization':`Bearer ${token}`
                 }
             })
                     .then(response =>{
                        if(!response.ok){
                           if(response.status==401){
                            alert("please login first");
                            window.location.href="login.html";
                           }
                           else{
                            response.json().then(errordata=>{
                                alert(errordata.message);
                            })
                        }
                    }
                        else{
                        response.json()
                     .then(data=>{
                    
                        displayHourlyForecast(data.list);
                        updatecityHeadingforHourly(city);
                     })
                        }
                     }) 
                     .catch(error=>{
                        console.error(error.message);
                  })
    
                              
                   
        
    }
    function  updatecityHeadingforSummury(city){
        title.textContent=`Weather Forcast Summary for ${city}`;
            }
            function  updatecityHeadingforHourly(city){
                title.textContent=`Weather Forcast Hourly for ${city}`;
                    }

     function getForecastSummary(city) {
        let url=`${baseurl}/getForcast-Summary?city=${city}`
        fetch(url,{
            headers:{
               "Content-Type": 'application/json',
               'Authorization':`Bearer ${token}`
            }})
                     .then(response => {
                        if(!response.ok){
			      if(response.status==401){
                            alert("please login first");
                            window.location.href="login.html";
				      }
                      else{				
                            response.json().then(errordata=>{
                                alert(errordata.message);
                            })
                        }
                    }  
                        else{
                        
                        response.json()
                     .then(data=>{
                        let res= data.forecast.items
                        displaySummaryForecast(res);
                        updatecityHeadingforSummury(city);

                     
                     })
                        }
                    })
                  .catch(error=>{
                        console.error(error.message);
                  })
    }

    function displayHourlyForecast(hourlyData) {
        const table = createHourlyTable(hourlyData);
        updateForecastTables(table);
    }

    function displaySummaryForecast(summaryData) {
        const table = createSummaryTable(summaryData);
        updateForecastTables(table);
    }

    function createHourlyTable(data) {
       console.log(data)
      
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Date/Time</th>
                <th>Description</th>
                <th>Temperature (°C)</th>
                <th>Feels Like (°C)</th>
                <th>Humidity (%)</th>
                <th>Wind Speed (km/h)</th>
                <th>Cloud Coverage (%)</th>
            </tr>
        `;

        data.forEach(hour => {
            const dateTime = new Date(hour.dt_txt);
            const row = table.insertRow();
            row.innerHTML = `
                <td>${dateTime.toLocaleString()}</td>
                <td>${hour.weather[0].description}</td>
                <td>${hour.main.temp.toFixed(1)}</td>
                <td>${hour.main.feels_like.toFixed(1)}</td>
                <td>${hour.main.humidity}</td>
                <td>${hour.wind.speed.toFixed(1)}</td>
                <td>${hour.clouds.all}</td>
            `;
        });

        return table;
    }

    function createSummaryTable(data) {
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
                <th>Date</th>
                <th>Weather State</th>
                <th>Temperature (Min/Max)</th>
                <th>Wind</th>
                <th>Precipitation (Probability/Amount)</th>
                <th>Sunrise/Sunset</th>
                <th>Moonrise/Moonset</th>
                <th>Sun Hours</th>
            </tr>
        `;

        data.forEach(day => {
            const row = table.insertRow();
            row.innerHTML = `
                <td>${day.date}</td>
                <td>${day.weather.text}</td>
                <td>${day.temperature.min}°C / ${day.temperature.max}°C</td>
                <td>${day.wind.direction} ${day.wind.text} ${day.wind.min}-${day.wind.max} km/h</td>
                <td>${day.prec.probability}% (${day.prec.sum}mm)</td>
                <td>${day.astronomy.sunrise} / ${day.astronomy.sunset}</td>
                <td>${day.astronomy.moonrise || '-'}</td>
                <td>${day.astronomy.moonset || '-'}</td>
                <td>${day.sunHours} hrs</td>
            `;
        });

        return table;
    }

    function updateForecastTables(table) {
        forecastTables.innerHTML = ''; // Clear previous table content
        forecastTables.appendChild(table); // Append new table
    }
});
