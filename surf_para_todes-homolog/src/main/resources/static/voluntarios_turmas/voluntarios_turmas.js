// JavaScript file for the volunteer-classes management system
document.addEventListener('DOMContentLoaded', function() {
    console.log('Volunteer-Classes Management System loaded!');
    
    // Mock data for volunteers with their assigned classes
    const volunteers = [
        {
            id: 1,
            name: "Ricardo",
            phone: "+55 (48)99999999",
            day: "SEG",
            shift: "Manhã",
            classes: [
                { id: 101, name: "Surf Iniciante A", shift: "morning", isTeacher: true },
                { id: 102, name: "Surf Iniciante B", shift: "morning" }
            ],
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            id: 2,
            name: "Juliana",
            phone: "+55 (48)99999999",
            day: "SEX",
            shift: "Tarde",
            classes: [
                { id: 201, name: "Natação Adaptada", shift: "afternoon", isTeacher: true }
            ],
            avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            id: 3,
            name: "Camila",
            phone: "+55 (48)99999999",
            day: "SAB",
            shift: "Manhã",
            classes: [
                { id: 301, name: "Surf Avançado", shift: "morning" },
                { id: 302, name: "Bodyboard", shift: "morning", isTeacher: true },
                { id: 303, name: "Stand Up Paddle", shift: "morning" }
            ],
            avatar: "https://randomuser.me/api/portraits/women/68.jpg"
        },
        {
            id: 4,
            name: "Amanda",
            phone: "+55 (48)99999999",
            day: "QUA",
            shift: "Manhã",
            classes: [
                { id: 401, name: "Yoga na Praia", shift: "morning", isTeacher: true },
                { id: 402, name: "Alongamento", shift: "morning", isTeacher: true }
            ],
            avatar: "https://randomuser.me/api/portraits/women/65.jpg"
        },
        {
            id: 5,
            name: "Eduardo",
            phone: "+55 (48)99999999",
            day: "SAB",
            shift: "Manhã",
            classes: [
                { id: 501, name: "Surf Adaptado", shift: "morning", isTeacher: true },
                { id: 502, name: "Natação Iniciante", shift: "morning" }
            ],
            avatar: "https://randomuser.me/api/portraits/men/86.jpg"
        },
        {
            id: 6,
            name: "Guilherme",
            phone: "+55 (48)99999999",
            day: "SEG",
            shift: "Manhã",
            classes: [
                { id: 601, name: "Surf Teen", shift: "morning" },
                { id: 602, name: "Bodyboard Avançado", shift: "morning" }
            ],
            avatar: "https://randomuser.me/api/portraits/men/29.jpg"
        },
        {
            id: 7,
            name: "Silvio",
            phone: "+55 (48)99999999",
            day: "SEX",
            shift: "Tarde",
            classes: [
                { id: 701, name: "Natação Infantil", shift: "afternoon", isTeacher: true },
                { id: 702, name: "Surf Kids", shift: "afternoon" }
            ],
            avatar: "https://randomuser.me/api/portraits/men/34.jpg"
        },
        {
            id: 8,
            name: "Romulo",
            phone: "+55 (48)99999999",
            day: "SAB",
            shift: "Manhã",
            classes: [
                { id: 801, name: "Bodyboard Kids", shift: "morning", isTeacher: true }
            ],
            avatar: "https://randomuser.me/api/portraits/men/26.jpg"
        },
        {
            id: 9,
            name: "Suellen",
            phone: "+55 (48)99999999",
            day: "QUA",
            shift: "Manhã",
            classes: [
                { id: 901, name: "Surf Feminino", shift: "morning", isTeacher: true },
                { id: 902, name: "Yoga Matinal", shift: "morning" }
            ],
            avatar: "https://randomuser.me/api/portraits/women/67.jpg"
        },
        {
            id: 10,
            name: "Renan",
            phone: "+55 (48)99999999",
            day: "SAB",
            shift: "Manhã",
            classes: [
                { id: 1001, name: "Stand Up Paddle Avançado", shift: "morning", isTeacher: true },
                { id: 1002, name: "Canoagem", shift: "morning" },
                { id: 1003, name: "Surf Adaptado B", shift: "morning" }
            ],
            avatar: "https://randomuser.me/api/portraits/men/43.jpg"
        },
    ];

    // Function to render volunteers table with classes
    function renderVolunteersTable() {
        const tableBody = document.getElementById('volunteers-list');
        tableBody.innerHTML = ''; // Clear existing content
        
        volunteers.forEach(volunteer => {
            // Create table row
            const row = document.createElement('tr');
            
            // Volunteer info column
            const volunteerCell = document.createElement('td');
            volunteerCell.innerHTML = `
                <div class="volunteer-info">
                    <div class="volunteer-avatar">
                        <img src="${volunteer.avatar}" alt="${volunteer.name}">
                    </div>
                    <div class="volunteer-details">
                        <div class="volunteer-name">${volunteer.name}</div>
                        <div class="volunteer-phone">${volunteer.phone}</div>
                    </div>
                </div>
            `;
            
            // Shift info column
            const shiftCell = document.createElement('td');
            const shiftClass = getShiftClass(volunteer.day, volunteer.shift);
            shiftCell.innerHTML = `
                <div class="shift-badge ${shiftClass}">
                    ${volunteer.day} - ${volunteer.shift}
                </div>
            `;
            
            // Classes column
            const classesCell = document.createElement('td');
            const classesHtml = createClassesBadges(volunteer.classes);
            classesCell.innerHTML = `
                <div class="class-badge-container">
                    ${classesHtml}
                </div>
                <div class="total-classes">Total: ${volunteer.classes.length} turma${volunteer.classes.length > 1 ? 's' : ''}</div>
            `;
            
            // Action buttons column
            const actionsCell = document.createElement('td');
            actionsCell.innerHTML = `
                <div class="action-buttons">
                    <button class="action-btn view" data-id="${volunteer.id}">
                        <span class="material-icons">visibility</span>
                    </button>
                    <button class="action-btn edit" data-id="${volunteer.id}">
                        <span class="material-icons">edit</span>
                    </button>
                    <button class="action-btn delete" data-id="${volunteer.id}">
                        <span class="material-icons">delete</span>
                    </button>
                </div>
            `;
            
            // Append cells to row
            row.appendChild(volunteerCell);
            row.appendChild(shiftCell);
            row.appendChild(classesCell);
            row.appendChild(actionsCell);
            
            // Append row to table body
            tableBody.appendChild(row);
        });
        
        // Add event listeners to action buttons
        addActionButtonEventListeners();
    }
    
    // Helper function to create class badges HTML
    function createClassesBadges(classes) {
        let html = '';
        classes.forEach(cls => {
            const badgeClass = `class-${cls.shift}`;
            html += `
                <div class="class-badge ${badgeClass}">
                    ${cls.name}${cls.isTeacher ? '<span class="teacher-badge">Professor</span>' : ''}
                </div>
            `;
        });
        return html;
    }
    
    // Helper function to get shift class name for styling
    function getShiftClass(day, shift) {
        if (day === 'SEG') return 'shift-seg';
        if (day === 'SAB') return 'shift-sab';
        if (day === 'QUA') return 'shift-qua';
        if (shift === 'Tarde') return 'shift-tarde';
        return '';
    }
    
    // Function to add event listeners to action buttons
    function addActionButtonEventListeners() {
        // View buttons
        document.querySelectorAll('.action-btn.view').forEach(button => {
            button.addEventListener('click', function() {
                const volunteerId = this.getAttribute('data-id');
                viewVolunteer(volunteerId);
            });
        });
        
        // Edit buttons
        document.querySelectorAll('.action-btn.edit').forEach(button => {
            button.addEventListener('click', function() {
                const volunteerId = this.getAttribute('data-id');
                editVolunteer(volunteerId);
            });
        });
        
        // Delete buttons
        document.querySelectorAll('.action-btn.delete').forEach(button => {
            button.addEventListener('click', function() {
                const volunteerId = this.getAttribute('data-id');
                deleteVolunteer(volunteerId);
            });
        });
    }
    
    // Function to handle search functionality
    function setupSearch() {
        const searchInput = document.querySelector('.search-box input');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            // Filter volunteers based on search term
            const filteredVolunteers = volunteers.filter(volunteer => 
                volunteer.name.toLowerCase().includes(searchTerm) || 
                volunteer.classes.some(cls => cls.name.toLowerCase().includes(searchTerm))
            );
            
            // Re-render table with filtered volunteers (not implemented in this demo)
            // For a real app, we would update the volunteers array with filtered results
            // and call renderVolunteersTable() again
            
            console.log('Searching for:', searchTerm);
            console.log('Found:', filteredVolunteers.length, 'volunteers');
        });
    }
    
    // Function handlers for volunteer actions
    function viewVolunteer(id) {
        console.log('Viewing volunteer with ID:', id);
        const volunteer = volunteers.find(v => v.id == id);
        
        if (volunteer) {
            let classesText = volunteer.classes.map(cls => 
                `${cls.name}${cls.isTeacher ? ' (Professor)' : ''}`
            ).join('\n- ');
            
            alert(`Detalhes do Voluntário:\n\nNome: ${volunteer.name}\nTelefone: ${volunteer.phone}\n` +
                  `Dia: ${volunteer.day}\nTurno: ${volunteer.shift}\n\nTurmas:\n- ${classesText}`);
        }
    }
    
    function editVolunteer(id) {
        console.log('Editing volunteer with ID:', id);
        alert(`Editando voluntário ID: ${id} e suas turmas vinculadas`);
    }
    
    function deleteVolunteer(id) {
        console.log('Deleting volunteer with ID:', id);
        if (confirm(`Tem certeza que deseja excluir o voluntário ID: ${id} e suas vinculações com turmas?`)) {
            // In a real app, we would remove the volunteer from the database
            console.log('Volunteer deleted');
        }
    }
    
    // Function to handle add volunteer button
    function setupAddVolunteerButton() {
        const addBtn = document.querySelector('.add-btn');
        addBtn.addEventListener('click', function() {
            console.log('Add volunteer button clicked');
            alert('Cadastrar novo voluntário com vinculação de turmas');
        });
    }
    
    // Function to handle filter button
    function setupFilterButton() {
        const filterBtn = document.querySelector('.filter-btn');
        filterBtn.addEventListener('click', function() {
            console.log('Filter button clicked');
            alert('Aplicar filtros aos voluntários e turmas');
        });
    }
    
    // Function to handle sidebar navigation
    function setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                navItems.forEach(nav => nav.classList.remove('active'));
                // Add active class to clicked item
                this.classList.add('active');
                
                // In a real app, we would navigate to the corresponding page
                console.log('Navigation clicked:', this.textContent.trim());
            });
        });
    }
    
    // Function to setup pagination
    function setupPagination() {
        const prevBtn = document.querySelector('.page-prev');
        const nextBtn = document.querySelector('.page-next');
        
        prevBtn.addEventListener('click', function() {
            if (!this.disabled) {
                console.log('Previous page');
            }
        });
        
        nextBtn.addEventListener('click', function() {
            if (!this.disabled) {
                console.log('Next page');
            }
        });
    }
    
    // Initialize all functionality
    function initialize() {
        renderVolunteersTable();
        setupSearch();
        setupAddVolunteerButton();
        setupFilterButton();
        setupNavigation();
        setupPagination();
    }
    
    // Start the application
    initialize();
});