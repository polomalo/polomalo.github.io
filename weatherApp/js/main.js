window.addEventListener('load', () => {
    let long, lat;
    let temperatureDesc = document.getElementsByClassName('weather__temperature--description')[0];
    let temperatureDegree = document.getElementsByClassName('weather__temperature--degree--value')[0];
    let locationTimezone = document.getElementsByClassName('weather__location--timezone--h1')[0];
    let Icon = document.getElementsByClassName('weather__location--icon')[0];
    let temperatureSection = document.getElementsByClassName('weather__temperature--degree')[0];

    const temperatureSpan = document.getElementsByClassName('weather__temperature--degree--symbol')[0];

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3a90ce0d88c9ed70698a799aa7a391b0`

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temp } = data.main;
                    const { description, icon } = data.weather[0];
                    const { country } = data.sys;
                    let celsius = Math.round(temp - 273.15);
                    let far = Math.round((celsius * 9 / 5) + 32)

                    temperatureDegree.innerHTML = celsius;
                    temperatureDesc.innerHTML = description;
                    locationTimezone.innerHTML = data.name + '/' + country;


                    Icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;

                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.innerHTML === 'C') {
                            temperatureSpan.innerHTML = 'F';
                            temperatureDegree.innerHTML = far;
                        } else {
                            temperatureSpan.innerHTML = 'C';
                            temperatureDegree.innerHTML = celsius;
                        }
                    })

                });

        });
    } else {
        h1.textContent = "it's not working because some reasons"
    }

});

