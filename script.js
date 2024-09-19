// script.js

document.addEventListener('DOMContentLoaded', () => {
    const adhanReminderCheckbox = document.getElementById('adhan-reminder');
  
    adhanReminderCheckbox.addEventListener('change', function() {
      if (this.checked) {
        // Request location permission
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              // Location granted
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
              console.log(`Location: Latitude ${lat}, Longitude ${lon}`);
              // Here, you would typically call an API to get adhan timings
            },
            (error) => {
              console.error('Error getting location:', error);
              // Optionally, uncheck the checkbox if location is not granted
              adhanReminderCheckbox.checked = false;
            }
          );
        } else {
          alert('Geolocation is not supported by this browser.');
          // Optionally, uncheck the checkbox if location is not supported
          adhanReminderCheckbox.checked = false;
        }
      }
    });
  });
  

 