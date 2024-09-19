// document.addEventListener('DOMContentLoaded', function() {
//     const reminderForm = document.getElementById('reminderForm');
//     const reminderList = document.getElementById('reminderList'); // Reminders page list
//     const dashboardReminderList = document.getElementById('dashboardReminderList'); // Dashboard list
  
//     // Load reminders from localStorage and display them
//     function loadReminders() {
//       const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
//       reminders.forEach(reminder => {
//         displayReminder(reminder, reminderList); // Add to reminders list
//         if (dashboardReminderList) {
//           displayReminder(reminder, dashboardReminderList); // Add to dashboard if available
//         }
//       });
//     }
  
//     // Save reminder to localStorage
//     function saveReminder(reminder) {
//       const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
//       reminders.push(reminder);
//       localStorage.setItem('reminders', JSON.stringify(reminders));
//     }
  
//     // Display reminder in the UI
//     function displayReminder(reminder, listElement) {
//       const reminderItem = document.createElement('li');
//       reminderItem.textContent = `${reminder.name} - ${reminder.date} at ${reminder.time}`;
//       listElement.appendChild(reminderItem);
//     }
  
//     // Handle form submission
//     reminderForm.addEventListener('submit', function(e) {
//       e.preventDefault();
  
//       // Get values from the form
//       const reminderName = document.getElementById('reminderName').value;
//       const reminderDate = document.getElementById('reminderDate').value;
//       const reminderTime = document.getElementById('reminderTime').value;
  
//       // Create a reminder object
//       const reminder = {
//         name: reminderName,
//         date: reminderDate,
//         time: reminderTime
//       };
  
//       // Save the reminder to localStorage
//       saveReminder(reminder);
  
//       // Display the reminder in the reminders list
//       displayReminder(reminder, reminderList);
  
//       // Also display it in the dashboard if it exists
//       if (dashboardReminderList) {
//         displayReminder(reminder, dashboardReminderList);
//       }
  
//       // Clear form fields after submission
//       reminderForm.reset();
//     });
  
//     // Load reminders from localStorage when the page loads
//     loadReminders();
// });
