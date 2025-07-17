document.addEventListener('DOMContentLoaded', function() {
    // Sample data for active volunteers
    const volunteers = [
        {
            id: 1,
            name: 'Ana Silva',
            email: 'ana.silva@email.com',
            avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
            schedules: [
                { day: 'Segunda', shift: 'Manhã' },
                { day: 'Quarta', shift: 'Tarde' }
            ],
            classes: ['Turma 1', 'Turma 3']
        },
        {
            id: 2,
            name: 'Carlos Oliveira',
            email: 'carlos.oliveira@email.com',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            schedules: [
                { day: 'Terça', shift: 'Manhã' },
                { day: 'Quinta', shift: 'Manhã' }
            ],
            classes: ['Turma 2']
        },
        {
            id: 3,
            name: 'Mariana Costa',
            email: 'mariana.costa@email.com',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            schedules: [
                { day: 'Sábado', shift: 'Manhã' }
            ],
            classes: ['Turma 4', 'Turma 5']
        },
        {
            id: 4,
            name: 'Bruno Santos',
            email: 'bruno.santos@email.com',
            avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
            schedules: [
                { day: 'Segunda', shift: 'Tarde' },
                { day: 'Sexta', shift: 'Tarde' }
            ],
            classes: ['Turma 3']
        },
        {
            id: 5,
            name: 'Patrícia Lima',
            email: 'patricia.lima@email.com',
            avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
            schedules: [
                { day: 'Quarta', shift: 'Manhã' }
            ],
            classes: ['Turma 1', 'Turma 6']
        },
        {
            id: 6,
            name: 'Ricardo Mendes',
            email: 'ricardo.mendes@email.com',
            avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
            schedules: [
                { day: 'Terça', shift: 'Tarde' },
                { day: 'Quinta', shift: 'Tarde' }
            ],
            classes: ['Turma 2', 'Turma 7']
        },
        {
            id: 7,
            name: 'Camila Rodrigues',
            email: 'camila.rodrigues@email.com',
            avatar: 'https://randomuser.me/api/portraits/women/90.jpg',
            schedules: [
                { day: 'Segunda', shift: 'Manhã' },
                { day: 'Quarta', shift: 'Manhã' },
                { day: 'Sexta', shift: 'Manhã' }
            ],
            classes: ['Turma 5']
        },
        {
            id: 8,
            name: 'Fernando Costa',
            email: 'fernando.costa@email.com',
            avatar: 'https://randomuser.me/api/portraits/men/57.jpg',
            schedules: [
                { day: 'Sábado', shift: 'Tarde' }
            ],
            classes: ['Turma 8']
        },
        {
            id: 9,
            name: 'Luciana Martins',
            email: 'luciana.martins@email.com',
            avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
            schedules: [
                { day: 'Quinta', shift: 'Manhã' },
                { day: 'Sexta', shift: 'Manhã' }
            ],
            classes: ['Turma 4', 'Turma 9']
        },
        {
            id: 10,
            name: 'Pedro Almeida',
            email: 'pedro.almeida@email.com',
            avatar: null, // No avatar, will use initials
            schedules: [
                { day: 'Segunda', shift: 'Tarde' },
                { day: 'Quarta', shift: 'Tarde' }
            ],
            classes: ['Turma 3', 'Turma 7']
        }
    ];

    // Populate table with volunteer data
    function populateVolunteersTable() {
        const tableBody = document.getElementById('volunteers-list');
        tableBody.innerHTML = '';
        
        volunteers.forEach(volunteer => {
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
            
            // Schedules column
            const schedulesCell = document.createElement('td');
            const schedulesBadges = document.createElement('div');
            schedulesBadges.className = 'schedule-badges';
            
            volunteer.schedules.forEach(schedule => {
                const badge = document.createElement('span');
                badge.className = 'schedule-badge';
                badge.textContent = `${schedule.day} | ${schedule.shift}`;
                schedulesBadges.appendChild(badge);
            });
            
            schedulesCell.appendChild(schedulesBadges);
            
            // Classes column
            const classesCell = document.createElement('td');
            const classesBadges = document.createElement('div');
            classesBadges.className = 'class-badges';
            
            volunteer.classes.forEach(className => {
                const badge = document.createElement('span');
                badge.className = 'class-badge';
                badge.textContent = className;
                classesBadges.appendChild(badge);
            });
            
            classesCell.appendChild(classesBadges);
            
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
            
            // Edit button
            const editBtn = document.createElement('button');
            editBtn.className = 'action-btn edit-btn';
            editBtn.title = 'Editar';
            editBtn.innerHTML = '<i class="material-icons">edit</i>';
            editBtn.addEventListener('click', () => editVolunteer(volunteer.id));
            
            // Deactivate button
            const deactivateBtn = document.createElement('button');
            deactivateBtn.className = 'action-btn deactivate-btn';
            deactivateBtn.title = 'Desativar';
            deactivateBtn.innerHTML = '<i class="material-icons">person_off</i>';
            deactivateBtn.addEventListener('click', () => deactivateVolunteer(volunteer.id));
            
            actionsDiv.appendChild(viewBtn);
            actionsDiv.appendChild(editBtn);
            actionsDiv.appendChild(deactivateBtn);
            actionsCell.appendChild(actionsDiv);
            
            // Append all cells to the row
            row.appendChild(infoCell);
            row.appendChild(schedulesCell);
            row.appendChild(classesCell);
            row.appendChild(actionsCell);
            
            // Append row to table body
            tableBody.appendChild(row);
        });
    }
    
    // Initialize the page
    function init() {
        populateVolunteersTable();
        setupAccordion();
        updateDateTime();
        
        // Update date and time every minute
        setInterval(updateDateTime, 60000);
        
        // Setup search functionality
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                const filteredVolunteers = volunteers.filter(volunteer => 
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
    
    // Handle edit volunteer action
    function editVolunteer(id) {
        console.log('Editing volunteer with ID:', id);
        // In a real application, this would redirect to an edit form
        window.location.href = `../cadastro_voluntario/cadastro_voluntario.html?id=${id}&edit=true`;
    }
    
    // Handle deactivate volunteer action
    function deactivateVolunteer(id) {
        console.log('Deactivating volunteer with ID:', id);
        if (confirm(`Tem certeza que deseja desativar o voluntário ${id}?`)) {
            // In a real application, this would update the status in the database
            alert(`Voluntário ID: ${id} foi desativado.`);
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