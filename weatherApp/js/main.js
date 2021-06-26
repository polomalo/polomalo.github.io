window.addEventListener('load', () => {
    let lon, lat;
    let cityName = document.getElementsByClassName('weather__mainInfo--header--name')[0];
    let locationTimezone = document.getElementsByClassName('weather__mainInfo--header--timezone')[0];
    let Icon = document.getElementsByClassName('weather__mainInfo--body--icon')[0];
    let temperatureDegree = document.getElementsByClassName('weather__mainInfo--body--temperature--degree--value')[0];
    const temperatureSpan = document.getElementsByClassName('weather__mainInfo--body--temperature--degree--symbol')[0];
    let temperatureDesc = document.getElementsByClassName('weather__mainInfo--body--description')[0];
    let temperatureSection = document.getElementsByClassName('weather__mainInfo--body--temperature--degree')[0];
    let timelineSection = document.getElementsByClassName('glide__track')[0];
    let sunsetBlock = document.getElementsByClassName('weather__mainInfo--body--sunset')[0];




    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            const newAPI = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=dd92b448afd7455a9ae32660ec02fe80`
            // const api = `https://api.tomorrow.io/v4/timelines?location=${lat},${lon}=temperature&timesteps=1h&units=metric&apikey=1IBzPP96upICMIPMVUXM01koFkXkRsdB`

            const api = `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${lat}&lon=${lon}&key=dd92b448afd7455a9ae32660ec02fe80&hours=24`

            fetch(newAPI)
                .then(response => {
                    return response.json();
                })
                .then(newData => {
                    console.log(newData.data[0]);
                    const { sunrise, sunset } = newData.data[0];
                    sunsetBlock.innerHTML = `<p>Sunrise: ${sunrise}     Sunset: ${sunset}</p>`;
                });

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(allData => {
                    console.log(allData);
                    let timelineObj = allData.data;
                    const { timezone, city_name } = allData;
                    const { temp } = timelineObj[0];
                    //const { temp, timezone } = allData.data;
                    const { description, icon } = allData.data[0].weather;
                    let temperature = Math.round(temp);
                    let far = Math.round((temp * 9 / 5) + 32)

                    cityName.innerHTML = `<h1>${city_name}</h1>`;

                    locationTimezone.innerHTML = `<h2>( ${timezone} )</h2>`;
                    temperatureDegree.innerHTML = temperature;
                    temperatureDesc.innerHTML = description;

                    Icon.innerHTML = `<img src="https://www.weatherbit.io/static/img/icons/${icon}.png">`;

                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.innerHTML == '°C') {
                            temperatureSpan.innerHTML = '&deg;F';
                            temperatureDegree.innerHTML = far;
                        } else {
                            temperatureSpan.innerHTML = '&deg;C';
                            temperatureDegree.innerHTML = temperature;
                        }
                    })



                    let timelineWord = '<ul class="glide__slides">';
                    timelineObj.forEach((element, index) => {
                        let { timestamp_local, temp } = timelineObj[index];
                        let { icon } = timelineObj[index].weather;
                        let date = new Date(timestamp_local);
                        let newTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        let roundTemperature = Math.round(temp);
                        timelineWord += `<li class="glide__slide">
                            <div>
                                <p>${newTime}</p>
                                <h2>${roundTemperature} <span>&deg;C</span></h2>
                                <img src="https://www.weatherbit.io/static/img/icons/${icon}.png">
                            </div>
                        </li>`;
                    });
                    timelineWord += '</ul>';
                    timelineSection.innerHTML = timelineWord;

                    const config = {
                        type: 'slider',
                        perView: 4,
                        bound: true,
                        perTouch: 4,
                    }

                    new Glide('.glide', config).mount()



                });

        });
    } else {
        h1.textContent = "it's not working because some reasons"
    }

});

