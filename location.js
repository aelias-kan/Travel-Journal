// Function to convert 24-hour format to 12-hour format
function convertTo12Hour(time) {
  const [hour, minute] = time.split(':');
  let period = 'AM';
  let hour12 = parseInt(hour, 10);

  if (hour12 >= 12) {
    period = 'PM';
    if (hour12 > 12) {
      hour12 -= 12;
    }
  } else if (hour12 === 0) {
    hour12 = 12;
  }

  return `${hour12}:${minute} ${period}`;
}

// Function to fetch Adhan timings based on user's location
async function fetchAdhanTimings() {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;

    try {
      // Fetch prayer times from Aladhan API
      const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}`);
      const data = await response.json();

      if (response.ok) {
        const timings = data.data.timings;

        // Convert timings from 24-hour to 12-hour format and update HTML fields
        document.getElementById('fajr-time').value = convertTo12Hour(timings.Fajr);
        document.getElementById('dhuhr-time').value = convertTo12Hour(timings.Dhuhr);
        document.getElementById('asr-time').value = convertTo12Hour(timings.Asr);
        document.getElementById('maghrib-time').value = convertTo12Hour(timings.Maghrib);
        document.getElementById('isha-time').value = convertTo12Hour(timings.Isha);
      } else {
        console.error('Failed to fetch prayer timings:', data);
      }
    } catch (error) {
      console.error('Error fetching prayer timings:', error);
    }
  }, (error) => {
    console.error('Error getting location:', error);
  });
}

// Call the function to fetch Adhan timings when the page loads
window.onload = fetchAdhanTimings;
