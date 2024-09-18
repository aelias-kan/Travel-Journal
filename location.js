document.addEventListener('DOMContentLoaded', () => {
  const adhanCheckbox = document.getElementById('adhan-reminder');
  const adhanTimesContainer = document.getElementById('adhan-times');

  adhanCheckbox.addEventListener('change', async () => {
    if (adhanCheckbox.checked) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Fetch the address from OpenCage API
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=c3dc086c1f8d467cba537a56abd11d40`);
            const data = await response.json();
            const address = data.results[0].formatted;

            // Fetch Adhan timings from an API (replace with your chosen API)
            const adhanResponse = await fetch(`https://adhan.iran.do/api/v1/timings?latitude=${latitude}&longitude=${longitude}`);
            const adhanData = await adhanResponse.json();
            const timings = adhanData.data.timings;

            // Update the UI with Adhan timings
            adhanTimesContainer.innerHTML = `
              <p>Address: ${address}</p>
              <p>Fajr: ${timings.Fajr}</p>
              <p>Dhuhr: ${timings.Dhuhr}</p>
              <p>Asr: ${timings.Asr}</p>
              <p>Maghrib: ${timings.Maghrib}</p>
              <p>Isha: ${timings.Isha}</p>
            `;

          } catch (error) {
            console.error('Error fetching Adhan timings:', error);
            adhanTimesContainer.innerHTML = '<p>Error fetching Adhan timings.</p>';
          }
        }, (error) => {
          console.error('Error getting location:', error);
          adhanCheckbox.checked = false;
        });
      } else {
        alert('Geolocation is not supported by this browser.');
        adhanCheckbox.checked = false;
      }
    } else {
      adhanTimesContainer.innerHTML = '';
    }
  });
});
