{
    {
        let form = document.getElementById('WeatherForm');
        async function submitHendler(e){
            e.preventDefault();
            let city = e.target.city.value;
            let zipCode = e.target.zipCode.value;
            let weather = await getWeatherInfo(city, zipCode);
            buildStands(weather);

            e.target.city = '';
            e.target.zipCode = '';
        }

        form.addEventListener('submit', submitHendler);

        async function getWeatherInfo(city, zipCode){
            if(zipCode=='')
                try{
                    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_API}&units=imperial`);
                    return res.json();
                }catch(err){
                    console.log(err);
                }
            else{
                try{
                    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${zipCode}&appid=${weather_API}&units=imperial`);
                    return res.json();
                }catch(err){
                    console.log(err);
                }
            }
        }
    }

    function buildStands(data){
        let weather_img = {
            "sunny":"https://cdn-icons-png.flaticon.com/512/831/831682.png"
        }
        const card = document.createElement('div');
        card.className = 'card mt-3 bg-primary text-white p-4 border border-0';
        card.style = 'background-image: linear-gradient(to top right, #34568B, #5780c1 , white)';
        // Location 
        const location = document.createElement('h5');
        location.innerHTML = `${data.name}, ${data.sys.country}`;
        card.append(location);
        // img temp F feels ================================
        const cardBody = document.createElement('div');
        cardBody.className = 'd-flex justify-content-start align-items-center'
        // img
        const image = document.createElement('img');
        image.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        image.width =80;
        cardBody.append(image);    
        // temp
        const temp = document.createElement('h1');
        temp.style = 'font-size: 3vw';
        temp.innerHTML = `${Math.trunc(data.main.temp)}º`;
        cardBody.append(temp);
        const type = document.createElement('h3');
        type.style = 'font-size: 2vw';
        type.className = 'mb-3';
        type.innerHTML = `F`;
        cardBody.append(type);

        card.append(cardBody);

        // feels and condition
        const con = document.createElement('div');
        con.className = "ms-5 d-flex align-items-start flex-column";

        const condition = document.createElement('h6');
        condition.innerHTML = `<b>${data.weather[0].main}</b>`;
        con.append(condition);

        const feels_like = document.createElement('p');
        feels_like.className = 'fs-6 fw-lighter';
        feels_like.innerHTML = `FEELS LIKE <b>${Math.trunc(data.main.feels_like)}º</b>`;
        con.append(feels_like);

        cardBody.append(con)
        // buttom bar ======================================
        const buttom = document.createElement('div');
        buttom.className = 'd-flex justify-content-start mt-3'
        // Humidty
        const humidity = document.createElement('p');
        humidity.className = 'fs-6 fw-lighter me-3';
        humidity.innerHTML = `HUMIDITY <br><b>${Math.trunc(data.main.humidity)}%</b>`;
        buttom.append(humidity);
        // pressure 
        const pressure = document.createElement('p');
        pressure.className = 'fs-6 fw-lighter me-3';
        pressure.innerHTML = `PRESSURE <br><b>${data.main.pressure} in</b>`;
        buttom.append(pressure);
        // wind
        const wind = document.createElement('p');
        wind.className = 'fs-6 fw-lighter me-3';
        wind.innerHTML = `WIND <br><b>${data.wind.speed} mph</b> `;

        const wind_img = document.createElement('img');
        wind_img.src = "https://cdn-icons-png.flaticon.com/512/64/64819.png";
        wind_img.width = 20;
        wind_img.style = `transform: rotate(${data.wind.deg}deg)`;
        wind.append(wind_img);
        buttom.append(wind);


        card.append(buttom);
    
        const col = document.createElement('div');
        col.className = 'col-12 col-md-8 col-lg-5'
        col.append(card)
    
        const display = document.getElementById('WeatherInfo');
        display.append(col);
    }  
    
}