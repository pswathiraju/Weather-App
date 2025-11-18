async function getWeather() {
    const location = document.getElementById('locationInput').value;
    if (!location) return alert("Please enter a location");

    const url = `http://api.weatherapi.com/v1/current.json?key=76881e5994d54c40af051303251811&q=${location}&aqi=yes`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        const isNight = data.current.is_day === 0;
        document.body.classList.toggle('dark-mode', isNight);

        document.getElementById('weatherBox').innerHTML = `
            <h3>${data.location.name}, ${data.location.country}</h3>
            <p><strong>Local Time:</strong> ${data.location.localtime}</p>
            <img class="icon" src="${data.current.condition.icon}" />
            <p><strong>${data.current.temp_c}°C</strong></p>
            <p>${data.current.condition.text}</p>
        `;

    } catch (error) {
        alert("Invalid location or API error");
    }
}
