document.addEventListener('DOMContentLoaded', function() {
    // Sample data for inactive volunteers
    const inactiveVolunteers = [
        {
            id: 101,
            name: 'João Pereira',
            email: 'joao.pereira@email.com',
            avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
            lastActiveDate: '2025-01-15',
            inactiveReason: 'Mudança de cidade',
        },
        {
            id: 102,
            name: 'Luiza Fernandes',
            email: 'luiza.fernandes@email.com',
            avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
            lastActiveDate: '2025-02-28',
            inactiveReason: 'Incompatibilidade de horários',
        },
        {
            id: 103,
            name: 'Marcos Andrade',
            email: 'marcos.andrade@email.com',
            avatar: null, // No avatar, will use initials
            lastActiveDate: '2025-03-10',
            inactiveReason: 'Problemas de saúde',
        },
        {
            id: 104,
            name: 'Débora Nunes',
            email: 'debora.nunes@email.com',
            avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
            lastActiveDate: '2025-04-05',
            inactiveReason: 'Motivos pessoais',
        },
        {
            id: 105,
            name: 'Gustavo Ribeiro',
            email: 'gustavo.ribeiro@email.com',
            avatar: 'https://randomuser.me/api/portraits/men/89.jpg',
            lastActiveDate: '2025-05-20',
            inactiveReason: 'Mudança de emprego',
        }
    ];

    // Populate table with inactive volunteer data
    function populateInactiveVolunteersTable() {
        const tableBody = document.getElementById('volunteers-list');
        tableBody.innerHTML = '';
        
        inactiveVolunteers.forEach(volunteer => {
            const row = document.createElement('tr');
            
            // Volunteer info column
            const infoCell = document.createElement('td');
            const infoDiv = document.createElement('div');
            infoDiv.className = 'volunteer-info';
            
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'volunteer-avatar';
            
            if (volunteer.avatar) {
                const img = document.createElement('img');
                img.src = volunteer.avatar;
                img.alt = volunteer.name;
                avatarDiv.appendChild(img);
            } else {
                // Create initials for avatar
                const initials = volunteer.name.split(' ').map(n => n[0]).join('');
                avatarDiv.textContent = initials;
            }
            
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'volunteer-details';
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'volunteer-name';
            nameSpan.textContent = volunteer.name;
            
            const emailSpan = document.createElement('span');
            emailSpan.className = 'volunteer-email';
            emailSpan.textContent = volunteer.email;
            
            detailsDiv.appendChild(nameSpan);
            detailsDiv.appendChild(emailSpan);
            
            infoDiv.appendChild(avatarDiv);
            infoDiv.appendChild(detailsDiv);
            infoCell.appendChild(infoDiv);
            
            // Last active date column
            const lastActiveCell = document.createElement('td');
            const lastActiveDiv = document.createElement('div');
            lastActiveDiv.className = 'last-active-date';
            
            const dateSpan = document.createElement('span');
            dateSpan.className = 'date';
            // Format date
            const lastActive = new Date(volunteer.lastActiveDate);
            const formattedDate = lastActive.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
            dateSpan.textContent = formattedDate;
            
            const timeAgoSpan = document.createElement('span');
            timeAgoSpan.className = 'time-ago';
            timeAgoSpan.textContent = getTimeAgo(lastActive);
            
            lastActiveDiv.appendChild(dateSpan);
            lastActiveDiv.appendChild(timeAgoSpan);
            lastActiveCell.appendChild(lastActiveDiv);
            
            // Inactive reason column
            const reasonCell = document.createElement('td');
            const reasonDiv = document.createElement('div');
            reasonDiv.className = 'reason-display';
            
            const statusIndicator = document.createElement('span');
            statusIndicator.className = 'status-indicator';
            
            const reasonSpan = document.createElement('span');
            reasonSpan.className = 'inactive-reason';
            reasonSpan.textContent = volunteer.inactiveReason;
            
            reasonDiv.appendChild(statusIndicator);
            reasonDiv.appendChild(reasonSpan);
            reasonCell.appendChild(reasonDiv);
            
            // Actions column
            const actionsCell = document.createElement('td');
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'volunteer-actions';
            
            // View button
            const viewBtn = document.createElement('button');
            viewBtn.className = 'action-btn view-btn';
            viewBtn.title = 'Visualizar';
            viewBtn.innerHTML = '<i class="material-icons">visibility</i>';
            viewBtn.addEventListener('click', () => viewVolunteer(volunteer.id));
            
            // View history button
            const historyBtn = document.createElement('button');
            historyBtn.className = 'action-btn view-history-btn';
            historyBtn.title = 'Histórico';
            historyBtn.innerHTML = '<i class="material-icons">history</i>';
            historyBtn.addEventListener('click', () => viewVolunteerHistory(volunteer.id));
            
            // Reactivate button
            const reactivateBtn = document.createElement('button');
            reactivateBtn.className = 'action-btn reactivate-btn';
            reactivateBtn.title = 'Reativar';
            reactivateBtn.innerHTML = '<i class="material-icons">person_add</i>';
            reactivateBtn.addEventListener('click', () => reactivateVolunteer(volunteer.id));
            
            actionsDiv.appendChild(viewBtn);
            actionsDiv.appendChild(historyBtn);
            actionsDiv.appendChild(reactivateBtn);
            actionsCell.appendChild(actionsDiv);
            
            // Append all cells to the row
            row.appendChild(infoCell);
            row.appendChild(lastActiveCell);
            row.appendChild(reasonCell);
            row.appendChild(actionsCell);
            
            // Append row to table body
            tableBody.appendChild(row);
        });
    }
    
    // Get relative time string (e.g. "2 months ago")
    function getTimeAgo(date) {
        const now = new Date();
        const diffInMs = now - date;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        
        if (diffInDays < 1) {
            return 'Hoje';
        } else if (diffInDays === 1) {
            return 'Ontem';
        } else if (diffInDays < 7) {
            return `${diffInDays} dias atrás`;
        } else if (diffInDays < 30) {
            const weeks = Math.floor(diffInDays / 7);
            return `${weeks} ${weeks === 1 ? 'semana' : 'semanas'} atrás`;
        } else if (diffInDays < 365) {
            const months = Math.floor(diffInDays / 30);
            return `${months} ${months === 1 ? 'mês' : 'meses'} atrás`;
        } else {
            const years = Math.floor(diffInDays / 365);
            return `${years} ${years === 1 ? 'ano' : 'anos'} atrás`;
        }
    }
    
    // Initialize the page
    function init() {
        populateInactiveVolunteersTable();
        setupAccordion();
        updateDateTime();
        
        // Update date and time every minute
        setInterval(updateDateTime, 60000);
        
        // Setup search functionality
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                const filteredVolunteers = inactiveVolunteers.filter(volunteer => 
                    volunteer.name.toLowerCase().includes(searchTerm) ||
                    volunteer.email.toLowerCase().includes(searchTerm)
                );
                // Implement search filtering
                console.log('Search term:', searchTerm, 'Filtered volunteers:', filteredVolunteers);
                // Update table with filtered results
                // This would be implemented in a real application
            });
        }
    }
    
    // Handle view volunteer action
    function viewVolunteer(id) {
        console.log('Viewing volunteer with ID:', id);
        alert(`Visualizando detalhes do voluntário ID: ${id}`);
        // In a real application, this would open a detailed view
    }
    
    // Handle view volunteer history action
    function viewVolunteerHistory(id) {
        console.log('Viewing history for volunteer with ID:', id);
        alert(`Visualizando histórico do voluntário ID: ${id}`);
        // In a real application, this would open a history view
    }
    
    // Handle reactivate volunteer action
    function reactivateVolunteer(id) {
        console.log('Reactivating volunteer with ID:', id);
        if (confirm(`Tem certeza que deseja reativar o voluntário ${id}?`)) {
            // In a real application, this would update the status in the database
            alert(`Voluntário ID: ${id} foi reativado com sucesso.`);
            // Refresh the table or remove the row
        }
    }
    
    // Handle accordion toggles in sidebar
    function setupAccordion() {
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
    }
    
    // Update date and time in header
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
    
    // Call init function
    init();
});