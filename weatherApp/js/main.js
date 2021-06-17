window.addEventListener('load', () => {
    let lon, lat;
    let cityName = document.getElementsByClassName('weather__mainInfo--header--name')[0];
    let locationTimezone = document.getElementsByClassName('weather__mainInfo--header--timezone')[0];
    let Icon = document.getElementsByClassName('weather__mainInfo--icon')[0];
    let temperatureDegree = document.getElementsByClassName('weather__mainInfo--temperature--degree--value')[0];
    const temperatureSpan = document.getElementsByClassName('weather__mainInfo--temperature--degree--symbol')[0];
    let temperatureDesc = document.getElementsByClassName('weather__mainInfo--temperature--description')[0];
    let temperatureSection = document.getElementsByClassName('weather__mainInfo--temperature--degree')[0];




    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            //const newAPI = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=dd92b448afd7455a9ae32660ec02fe80&include=hourly`
            // const api = `https://api.tomorrow.io/v4/timelines?location=${lat},${lon}=temperature&timesteps=1h&units=metric&apikey=1IBzPP96upICMIPMVUXM01koFkXkRsdB`

            const test = `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${lat}&lon=${lon}&key=dd92b448afd7455a9ae32660ec02fe80&hours=24`

            fetch(test)
                .then(response => {
                    return response.json();
                })
                .then(allData => {
                    console.log(allData);
                    const { timezone, city_name } = allData;
                    const { temp } = allData.data[0];
                    //const { temp, timezone } = allData.data[0];
                    const { description, icon } = allData.data[0].weather;
                    let temperature = Math.round(temp);
                    let far = Math.round((temp * 9 / 5) + 32)

                    cityName.innerHTML = `<h1>${city_name}</h1>`;

                    locationTimezone.innerHTML = `<h2>${timezone}</h2>`;
                    temperatureDegree.innerHTML = temperature;
                    temperatureDesc.innerHTML = description;



                    Icon.innerHTML = `<img src="https://www.weatherbit.io/static/img/icons/${icon}.png">`;

                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.innerHTML === 'C') {
                            temperatureSpan.innerHTML = 'F';
                            temperatureDegree.innerHTML = far;
                        } else {
                            temperatureSpan.innerHTML = 'C';
                            temperatureDegree.innerHTML = temperature;
                        }
                    })

                });

        });
    } else {
        h1.textContent = "it's not working because some reasons"
    }

});

