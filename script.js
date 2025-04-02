class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 25 minutes in seconds
        this.breakTime = 5 * 60; // 5 minutes in seconds
        this.timeLeft = this.workTime;
        this.isRunning = false;
        this.isWorkTime = true;
        this.timer = null;

        // DOM elements
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');
        this.modeText = document.getElementById('mode-text');

        // Bind event listeners
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());

        // Initialize display
        this.updateDisplay();
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timer = setInterval(() => this.tick(), 1000);
            this.startButton.disabled = true;
        }
    }

    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.timer);
            this.startButton.disabled = false;
        }
    }

    reset() {
        this.pause();
        this.isWorkTime = true;
        this.timeLeft = this.workTime;
        this.updateDisplay();
        this.modeText.textContent = 'Work Time';
    }

    tick() {
        this.timeLeft--;
        this.updateDisplay();

        if (this.timeLeft === 0) {
            this.createFireworks();
            this.switchMode();
        }
    }

    createFireworks() {
        // Create multiple fireworks
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createSingleFirework();
            }, i * 50);
        }
    }

    createSingleFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';
        
        // Random angle and distance for each particle
        const angle = Math.random() * Math.PI * 2;
        const distance = 200 + Math.random() * 300; // Increased distance
        
        // Calculate target position
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        // Set custom properties for animation
        firework.style.setProperty('--tx', `${tx}px`);
        firework.style.setProperty('--ty', `${ty}px`);
        
        // Add to document
        document.body.appendChild(firework);
        
        // Remove after animation
        setTimeout(() => {
            firework.remove();
        }, 1500); // Match the CSS animation duration
    }

    switchMode() {
        this.isWorkTime = !this.isWorkTime;
        this.timeLeft = this.isWorkTime ? this.workTime : this.breakTime;
        this.modeText.textContent = this.isWorkTime ? 'Work Time' : 'Break Time';
        this.updateDisplay();
        this.playNotification();
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }

    playNotification() {
        const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
        audio.play().catch(error => console.log('Audio play failed:', error));
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 