document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.textContent = '☀️ Light Mode';
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                darkModeToggle.textContent = '☀️ Light Mode';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                darkModeToggle.textContent = '🌙 Dark Mode';
            }
        });
    }
    
    // Explore Tests Button - Smooth Scroll
    const exploreBtn = document.getElementById('exploreTestsBtn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const testsSection = document.getElementById('testsSection');
            if (testsSection) {
                testsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
    
    // Formspree Form Submission
    const form = document.getElementById('patientForm');
    const statusDiv = document.getElementById('formStatusMsg');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            statusDiv.innerHTML = '⏳ Sending registration details...';
            statusDiv.style.color = '#0f4c81';
            
            const formData = new FormData(form);
            
            try {
                const response = await fetch('https://formspree.io/f/mdajaqdv', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    statusDiv.innerHTML = '✅ Registration successful! Details sent to anasnadeem5641@gmail.com';
                    statusDiv.style.color = 'green';
                    form.reset();
                    setTimeout(() => { statusDiv.innerHTML = ''; }, 5000);
                } else {
                    statusDiv.innerHTML = '❌ Error: Submission failed. Please try again.';
                    statusDiv.style.color = '#c41e3a';
                }
            } catch (error) {
                statusDiv.innerHTML = '❌ Network error. Please check your connection.';
                statusDiv.style.color = '#c41e3a';
            }
        });
    }
    
    // Login Form Handler
    const loginForm = document.getElementById('staff