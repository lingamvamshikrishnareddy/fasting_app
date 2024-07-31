document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const journeyList = document.getElementById('journeyList');
    const progressCircle = document.getElementById('progressCircle');
    const progressText = document.getElementById('progressText');
    const targetSelect = document.getElementById('targetSelect');
    let startTime = null;
    let timerInterval = null;
    let targetHours = parseInt(targetSelect.value);
    let journey = [];
  
    targetSelect.addEventListener('change', () => {
      targetHours = parseInt(targetSelect.value);
    });
  
    startButton.addEventListener('click', () => {
      startTime = new Date();
      startButton.disabled = true;
      stopButton.disabled = false;
      updateProgress();
      timerInterval = setInterval(updateProgress, 1000);
    });
  
    stopButton.addEventListener('click', () => {
      if (startTime) {
        const endTime = new Date();
        const duration = (endTime - startTime) / 1000; // Duration in seconds
        journey.push({ startTime, endTime, duration });
        updateJourneyList();
        clearInterval(timerInterval);
        progressCircle.style.strokeDashoffset = 283;
        progressText.textContent = '0%';
        startTime = null;
        startButton.disabled = false;
        stopButton.disabled = true;
      }
    });
  
    function updateProgress() {
      const currentTime = new Date();
      const elapsed = (currentTime - startTime) / 1000; // Elapsed time in seconds
      const targetSeconds = targetHours * 3600;
      const progressPercent = Math.min((elapsed / targetSeconds) * 100, 100);
      const dashOffset = 283 - (progressPercent / 100) * 283;
      progressCircle.style.strokeDashoffset = dashOffset;
      progressText.textContent = `${Math.floor(elapsed / 3600)}h ${Math.floor((elapsed % 3600) / 60)}m`;
  
      if (progressPercent >= 100) {
        stopButton.click();
      }
    }
  
    function updateJourneyList() {
      journeyList.innerHTML = '';
      journey.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Fast #${index + 1}: Started at ${entry.startTime.toLocaleString()} - Ended at ${entry.endTime.toLocaleString()} - Duration: ${formatDuration(entry.duration)}`;
        journeyList.appendChild(listItem);
      });
    }
  
    function formatDuration(seconds) {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = Math.floor(seconds % 60);
      return `${hrs}h ${mins}m ${secs}s`;
    }
  });
  