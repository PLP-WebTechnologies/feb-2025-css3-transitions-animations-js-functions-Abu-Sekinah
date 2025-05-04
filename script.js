// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const form = document.getElementById('preferences-form');
    const animateBtn = document.querySelector('.animate-btn');
    const resetBtn = document.querySelector('.reset-btn');
    const animatedBox = document.getElementById('animated-box');
    
    // Load saved preferences
    loadPreferences();
    
    // Save preferences
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const theme = document.getElementById('theme').value;
        const speed = document.getElementById('animation-speed').value;
        
        // Save to localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('theme', theme);
        localStorage.setItem('animationSpeed', speed);
        
        // Apply preferences
        applyPreferences(username, theme, speed);
        
        // Show confirmation with animation
        const saveBtn = document.querySelector('.save-btn');
        saveBtn.textContent = 'Saved!';
        saveBtn.style.backgroundColor = '#2E7D32';
        
        setTimeout(() => {
            saveBtn.textContent = 'Save Preferences';
            saveBtn.style.backgroundColor = '#4CAF50';
        }, 2000);
    });
    
    // Trigger animation
    animateBtn.addEventListener('click', function() {
        // Get saved speed or use default
        const speed = localStorage.getItem('animationSpeed') || 'normal';
        
        // Reset any ongoing animation
        animatedBox.style.animation = 'none';
        void animatedBox.offsetWidth; // Trigger reflow
        
        // Apply animation with correct speed class
        animatedBox.className = 'animated-box ' + speed;
        animatedBox.style.animation = 'slideAndBounce 1.5s ease-in-out forwards';
        
        // Change button state during animation
        animateBtn.disabled = true;
        setTimeout(() => {
            animateBtn.disabled = false;
        }, 1500);
    });
    
    // Reset animation
    resetBtn.addEventListener('click', function() {
        animatedBox.style.animation = 'none';
        animatedBox.style.transform = '';
        animatedBox.style.backgroundColor = '#ff5722';
    });
    
    // Function to load and apply preferences
    function loadPreferences() {
        const username = localStorage.getItem('username') || '';
        const theme = localStorage.getItem('theme') || 'light';
        const speed = localStorage.getItem('animationSpeed') || 'normal';
        
        // Set form values
        document.getElementById('username').value = username;
        document.getElementById('theme').value = theme;
        document.getElementById('animation-speed').value = speed;
        
        // Apply preferences
        applyPreferences(username, theme, speed);
    }
    
    // Function to apply preferences
    function applyPreferences(username, theme, speed) {
        // Apply theme
        document.body.className = theme;
        
        // You could use the username and speed for other purposes
        console.log(`Preferences applied: ${username}, ${theme} theme, ${speed} speed`);
    }
});
