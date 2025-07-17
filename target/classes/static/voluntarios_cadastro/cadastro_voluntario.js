document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission
    const volunteerForm = document.getElementById('volunteer-form');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const birthdate = document.getElementById('birthdate').value;
            const phone = document.getElementById('phone').value;
            const income = document.getElementById('income').value;
            const availability = document.getElementById('availability').value;
            const howKnew = document.getElementById('how_knew').value;
            
            // Validate required fields
            if (!name || !email || !phone) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Here you would typically send the data to a server
            // For now, we'll just log it to the console
            console.log({
                name,
                email,
                birthdate,
                phone,
                income,
                availability,
                howKnew
            });
            
            // Example success message
            alert('Voluntário cadastrado com sucesso!');
            
            // Optionally redirect to another page
            // window.location.href = '../voluntarios_ativos/voluntarios_ativos.html';
        });
    }
    
    // Handle accordion toggles in sidebar
    const accordionToggles = document.querySelectorAll('.accordion-toggle');
    
    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the parent accordion item
            const accordionItem = this.parentElement;
            
            // Toggle the 'open' class
            accordionItem.classList.toggle('open');
        });
    });
    
    // Format phone input with Brazilian mask
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                // Apply mask (XX) XXXXX-XXXX
                if (value.length > 2) {
                    value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
                }
                if (value.length > 10) {
                    value = value.substring(0, 10) + '-' + value.substring(10);
                }
            }
            
            e.target.value = value;
        });
    }
    
    // Initialize current date and time for header display
    updateDateTime();
    
    // Update date and time every minute
    setInterval(updateDateTime, 60000);
});

// Function to update date and time in the header
function updateDateTime() {
    const timeInfoElement = document.querySelector('.time-info');
    if (timeInfoElement) {
        const now = new Date();
        
        // Format time (HH:MM AM/PM)
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        
        // Format date (DD MMM YYYY)
        const day = now.getDate();
        const month = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(now);
        const year = now.getFullYear();
        
        timeInfoElement.textContent = `${formattedHours}:${formattedMinutes} ${ampm} ${day} ${month} ${year}`;
    }
}