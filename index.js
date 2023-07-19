const cityForm = document.getElementById('form-city')
const cityInput = document.getElementById('input-city')
const listCities = document.getElementById('lista')
const buttonDelete = document.getElementById('delete-all')

const apiKey = '374fe6e5801bb6964234ba35b4fa1108'

let cityWeather = {
  name: "",
  temperature: "",
  description: "",
  wind: "",
  async getWeatherData(apiKey) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.name}&appid=${apiKey}&lang=en`);
      const data = await response.json();
      console.log(data);

      this.name = data.name
      this.temperature = Math.floor(data.main.temp - 273.15) + " °C";
      this.description = data.weather[0].description;
      this.wind = data.wind.speed;

      const ul = document.createElement('ul')

      const liName = document.createElement('li')
      const liImg = document.createElement('li')
      const liTemperature = document.createElement('li')
      const liDescription = document.createElement('li')
      const liWind = document.createElement('li')

      liName.innerText = this.name
      liName.style.listStyle = 'none'
      liName.style.fontSize = '40px'

      liTemperature.innerText = this.temperature
      liTemperature.style.listStyle = 'none'
      liTemperature.style.fontSize = '30px'

      liDescription.innerText = this.description
      liDescription.style.listStyle = 'none'
      liDescription.style.fontSize = '20px'

      liImg.style.listStyle = 'none'

      if (this.description.includes('cloud') || this.description.includes('smoke')) {
        liImg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cloud" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.657 18c-2.572 0 -4.657 -2.007 -4.657 -4.483c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.913 0 3.464 1.56 3.464 3.486c0 1.927 -1.551 3.487 -3.465 3.487h-11.878"/></svg>';
      } else if (this.description.includes('rain')) {
        liImg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cloud-rain" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7"/><path d="M11 13v2m0 3v2m4 -5v2m0 3v2"/></svg>';
      } else if (this.description === 'clear sky') {
        liImg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-sun" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"/><path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"/></svg>';
      } else if (this.description.includes('wind')) {
        liImg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-sun-wind" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14.468 10a4 4 0 1 0 -5.466 5.46" /><path d="M2 12h1" /><path d="M11 3v1" /><path d="M11 20v1" /><path d="M4.6 5.6l.7 .7" /><path d="M17.4 5.6l-.7 .7" /><path d="M5.3 17.7l-.7 .7" /><path d="M15 13h5a2 2 0 1 0 0 -4" /><path d="M12 16h5.714l.253 0a2 2 0 0 1 2.033 2a2 2 0 0 1 -2 2h-.286" /></svg>';
      } else if (this.description.includes('snow')) {
        liImg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-snowflake" width="60" height="60" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 4l2 1l2 -1" /><path d="M12 2v6.5l3 1.72" /><path d="M17.928 6.268l.134 2.232l1.866 1.232" /><path d="M20.66 7l-5.629 3.25l.01 3.458" /><path d="M19.928 14.268l-1.866 1.232l-.134 2.232" /><path d="M20.66 17l-5.629 -3.25l-2.99 1.738" /><path d="M14 20l-2 -1l-2 1" /><path d="M12 22v-6.5l-3 -1.72" /><path d="M6.072 17.732l-.134 -2.232l-1.866 -1.232" /><path d="M3.34 17l5.629 -3.25l-.01 -3.458" /><path d="M4.072 9.732l1.866 -1.232l.134 -2.232" /><path d="M3.34 7l5.629 3.25l2.99 -1.738" /></svg>';
      }

      liWind.innerText = this.wind
      liWind.style.listStyle = 'none'
      liWind.style.fontSize = '15px'

      ul.appendChild(liName)
      ul.appendChild(liImg)
      ul.appendChild(liTemperature)
      ul.appendChild(liDescription)
      ul.appendChild(liWind)
      listCities.appendChild(ul)

    } catch (error) {
      console.log("Error", error);
    }
  },

};

cityForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const cityName = cityInput.value
  cityWeather.name = cityName
  cityWeather.getWeatherData(apiKey)

  cityInput.value = ''
});

buttonDelete.addEventListener('click', () => {
  listCities.innerHTML = '';
});




