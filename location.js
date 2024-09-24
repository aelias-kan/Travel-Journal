document.addEventListener('DOMContentLoaded', () => {
  const adhanCheckbox = document.getElementById('adhan-reminder');

  adhanCheckbox.addEventListener('change', async () => {
    if (adhanCheckbox.checked) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Fetch the address from OpenCage API
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=c3dc086c1f8d467cba537a56abd11d40`);
            const data = await response.json();

            // Check for successful response
            if (response.ok && data.results && data.results.length > 0) {
              const address = data.results[0].formatted; // Use formatted address
              console.log('Address:', address); // Optional: Log the address
            } else {
              console.error('No results found or invalid API key.');
              alert('Unable to retrieve address. Please check your API key.');
              adhanCheckbox.checked = false; // Uncheck the checkbox
              return; // Exit early
            }

            // Fetch Adhan timings from an API
            const adhanResponse = await fetch(`https://adhan.iran.do/api/v1/timings?latitude=${latitude}&longitude=${longitude}`);
            if (!adhanResponse.ok) {
              throw new Error('Failed to fetch Adhan timings');
            }
            const adhanData = await adhanResponse.json();
            const timings = adhanData.data.timings;

            // Check if timings are available
            if (timings) {
              // Update the input fields with Adhan timings
              document.getElementById('fajr-time').value = timings.Fajr;
              document.getElementById('dhuhr-time').value = timings.Dhuhr;
              document.getElementById('asr-time').value = timings.Asr;
              document.getElementById('maghrib-time').value = timings.Maghrib;
              document.getElementById('isha-time').value = timings.Isha;
            } else {
              console.error('Adhan timings not available.');
              alert('Unable to retrieve Adhan timings.');
              adhanCheckbox.checked = false; // Uncheck the checkbox
            }

          } catch (error) {
            console.error('Error fetching address or Adhan timings:', error);
            alert('Error fetching address or Adhan timings.');
            adhanCheckbox.checked = false; // Uncheck the checkbox
          }
        }, (error) => {
          console.error('Error getting location:', error);
          adhanCheckbox.checked = false;
          alert('Unable to retrieve your location. Please enable location services.');
        });
      } else {
        alert('Geolocation is not supported by this browser.');
        adhanCheckbox.checked = false;
      }
    } else {
      // Clear the timings if the checkbox is unchecked
      document.getElementById('fajr-time').value = '';
      document.getElementById('dhuhr-time').value = '';
      document.getElementById('asr-time').value = '';
      document.getElementById('maghrib-time').value = '';
      document.getElementById('isha-time').value = '';
    }
  });
});
