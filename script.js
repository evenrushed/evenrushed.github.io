let startTime = Date.now();
let intervalId;

const btn = document.getElementById('stopwatch-btn');

function formatTime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateButtonStyle(totalSeconds) {
    // Remove all time-based classes
    btn.classList.remove('time-0-60', 'time-60-3600', 'time-43200-86400', 'time-86400-plus');
    
    // Add appropriate class based on elapsed time
    if (totalSeconds < 60) { //under 1 minute
        btn.classList.add('time-0-60');
    } else if (totalSeconds < 3600) { // under 1 hour
        btn.classList.add('time-60-3600');
    } else if (totalSeconds < 43200 ) { // under 12 hours
        btn.classList.add('time-3600-43200');
    } else if (totalSeconds < 86400 ) { // under 24 hours
        btn.classList.add('time-43200-86400');
    } else { // 1 day
        btn.classList.add('time-86400-plus');
    }
}

function updateStopwatch() {
    const now = Date.now();
    const elapsed = Math.floor((now - startTime) / 1000);
    
    btn.textContent = formatTime(elapsed);
    updateButtonStyle(elapsed);
}

function resetStopwatch() {
    startTime = Date.now();
    updateStopwatch();
}

// Start the stopwatch
intervalId = setInterval(updateStopwatch, 1000);
updateStopwatch();

// Reset on click
btn.addEventListener('click', resetStopwatch);
