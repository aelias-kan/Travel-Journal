document.addEventListener('DOMContentLoaded', () => {
    const days = document.querySelectorAll('.day');
    const taskDetails = document.getElementById('taskDetails');
    const selectedDay = document.getElementById('selectedDay');
    const taskList = document.getElementById('taskList');
    const taskForm = document.getElementById('taskForm');
    let currentDay = '';
  
    // Show Task Form for Selected Day
    days.forEach(day => {
      day.addEventListener('click', () => {
        currentDay = day.getAttribute('data-day');
        selectedDay.textContent = `Tasks for ${currentDay}`;
        taskDetails.style.display = 'block';
        loadTasks();
      });
    });
  
    // Handle Task Form Submission
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskTitle = document.getElementById('taskTitle').value;
      const taskTime = document.getElementById('taskTime').value;
  
      if (taskTitle && taskTime) {
        const tasks = JSON.parse(localStorage.getItem(currentDay)) || [];
        tasks.push({ title: taskTitle, time: taskTime });
        localStorage.setItem(currentDay, JSON.stringify(tasks));
        taskForm.reset();
        loadTasks();
      }
    });
  
    // Load Tasks for the Selected Day
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem(currentDay)) || [];
      taskList.innerHTML = '<ul>' + tasks.map(task => `<li>${task.time} - ${task.title}</li>`).join('') + '</ul>';
    }
  });
  