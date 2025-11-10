const input = document.querySelector('input');
const btn = document.getElementById('btn');
const icon = document.querySelector('.icon');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const weatherBox = document.querySelector('.weather-details');

// ✅ Handle button click
btn.addEventListener('click', () => {
  const city = input.value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert('Please enter a city name');
  }
});

// ✅ Async function to fetch and display weather
async function getWeather(city) {
  const apiKey = '1a3ccfe96dfa855e16c848be1475c833';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Show loading state
  weatherBox.classList.add('loading');
  icon.innerHTML = `<div class="loader"></div>`;
  temperature.textContent = '';
  description.textContent = 'Fetching weather...';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Remove loading state
    weatherBox.classList.remove('loading');

    if (response.ok) {
      // ✅ Update UI
      const { main, description: desc, icon: iconCode } = data.weather[0];
      const { temp } = data.main;

      icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${main}">`;
      temperature.textContent = `${Math.round(temp)} °C`;
      description.textContent = `${main} — ${desc}`;

      // ✅ Change background color dynamically
      document.body.className = ''; // clear old weather class
      document.body.classList.add(main.toLowerCase());
    } else {
      showError(data.message);
    }
  } catch (error) {
    console.error(error);
    showError('Unable to connect. Please try again later.');
  }
}

// ✅ Error handler
function showError(message) {
  icon.innerHTML = '';
  temperature.textContent = '';
  description.textContent = message;
  document.body.className = '';
  document.body.classList.add('error');
}
