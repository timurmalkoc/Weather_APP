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

        const card = document.createElement('div');
        card.className = 'card mt-3';
    
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body'
    
        // const image = document.createElement('img');
        // image.className = 'card-img-top';
        // image.src =
        // card.append(image);
    
        const title = document.createElement('h5');
        title.className = 'card-title';
        title.innerHTML = `Location :${data.name}, ${data.sys.country}`;
        cardBody.append(title);
    
        const score = document.createElement('h6');
        score.className = 'card-subtitle mb-2 text-muted';
        score.innerHTML = `Humidity: ${data.main.humidity}`;
        cardBody.append(score);
        
        const text = document.createElement('p');
        text.className = 'card-text';
        text.innerHTML = `pressure: ${data.main.pressure}`;
        cardBody.append(text);
    
        card.append(cardBody);
    
        const col = document.createElement('div');
        col.className = 'col-12 col-md-6 col-lg-3'
        col.append(card)
    
        const display = document.getElementById('WeatherInfo');
        display.append(col);
    }  
    
}