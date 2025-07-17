document.addEventListener('DOMContentLoaded', function() {
    // Sample data for inactive students
    const inactiveStudents = [
        {
            id: 101,
            name: 'Sabrina Castro',
            studentId: 'CAS-1234567890',
            avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
            day: 'SEG',
            shift: 'MANHÃ',
            volunteer: 'Rodrigo',
            address: 'Campeche, Florianópolis, SC',
            disability: 'Deficiência visual (baixa visão, cegueira, uso de óculo corretivo)',
            inactiveReason: 'Mudança de cidade',
            lastActiveDate: '2025-01-10'
        },
        {
            id: 102,
            name: 'Bianca Bento',
            studentId: 'BEN-1234567890',
            avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
            day: 'SEX',
            shift: 'TARDE',
            volunteer: 'Juliana',
            address: 'Palhoça, SC',
            disability: 'Deficiência física (adaptações motoras, dificuldades motora global, uso de prótese ou cadeiras de rodas)',
            inactiveReason: 'Problemas de saúde',
            lastActiveDate: '2025-02-05'
        },
        {
            id: 103,
            name: 'Renato Sardão',
            studentId: 'SAR-1234567890',
            avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
            day: 'SÁB',
            shift: 'MANHÃ',
            volunteer: 'Rodrigo',
            address: 'Rio Vermelho, Florianópolis, SC',
            disability: 'Deficiência visual (baixa visão, cegueira, uso de óculo corretivo)',
            inactiveReason: 'Incompatibilidade de horários',
            lastActiveDate: '2025-02-15'
        },
        {
            id: 104,
            name: 'Silvia Motta',
            studentId: 'MOT-1234567890',
            avatar: 'https://randomuser.me/api/portraits/women/56.jpg',
            day: 'SÁB',
            shift: 'MANHÃ',
            volunteer: 'Brenda',
            address: 'São José, SC',
            disability: 'Deficiência auditiva (Surdez parcial ou total, uso de aparelhos auditivos ou implantes cocleares)',
            inactiveReason: 'Motivos pessoais',
            lastActiveDate: '2025-03-20'
        },
        {
            id: 105,
            name: 'Milson Fonseca',
            studentId: 'FON-1234567890',
            avatar: null,
            day: 'SEG',
            shift: 'MANHÃ',
            volunteer: 'Rodrigo',
            address: 'Campeche, Florianópolis, SC',
            disability: 'Deficiência visual (baixa visão, cegueira, uso de óculo corretivo)',
            inactiveReason: 'Concluiu o programa',
            lastActiveDate: '2025-04-01'
        },
        {
            id: 106,
            name: 'Evelyn Conceição',
            studentId: 'CON-1234567890',
            avatar: 'https://randomuser.me/api/portraits/women/62.jpg',
            day: 'SEX',
            shift: 'TARDE',
            volunteer: 'Juliana',
            address: 'Palhoça, SC',
            disability: 'Deficiência física (adaptações motoras, dificuldades motora global, uso de prótese ou cadeiras de rodas)',
            inactiveReason: 'Mudança de cidade',
            lastActiveDate: '2025-04-15'
        },
        {
            id: 107,
            name: 'Roberto Almeida',
            studentId: 'ALM-1234567890',
            avatar: 'https://randomuser.me/api/portraits/men/72.jpg',
            day: 'QUI',
            shift: 'MANHÃ',
            volunteer: 'Carlos',
            address: 'Centro, Florianópolis, SC',
            disability: 'Transtorno do Espectro Autista (TEA)',
            inactiveReason: 'Retorno previsto para próximo semestre',
            lastActiveDate: '2025-05-01'
        }
    ];

    // Populate table with inactive student data
    function populateInactiveStudentsTable() {
        const tableBody = document.getElementById('students-list');
        tableBody.innerHTML = '';
        
        inactiveStudents.forEach(student => {
            const row = document.createElement('tr');
            
            // Student info column
            const infoCell = document.createElement('td');
            const infoDiv = document.createElement('div');
            infoDiv.className = 'student-info';
            
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'student-avatar';
            
            if (student.avatar) {
                const img = document.createElement('img');
                img.src = student.avatar;
                img.alt = student.name;
                avatarDiv.appendChild(img);
            } else {
                // Create initials for avatar
                const initials = student.name.split(' ').map(n => n[0]).join('');
                avatarDiv.textContent = initials;
            }
            
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'student-details';
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'student-name';
            nameSpan.textContent = student.name;
            
            const idSpan = document.createElement('span');
            idSpan.className = 'student-id';
            idSpan.textContent = student.studentId;
            
            detailsDiv.appendChild(nameSpan);
            detailsDiv.appendChild(idSpan);
            
            infoDiv.appendChild(avatarDiv);
            infoDiv.appendChild(detailsDiv);
            infoCell.appendChild(infoDiv);
            
            // Day and shift column
            const dayShiftCell = document.createElement('td');
            const dayShiftDiv = document.createElement('div');
            dayShiftDiv.className = 'day-shift';
            dayShiftDiv.textContent = `${student.day} - ${student.shift}`;
            dayShiftCell.appendChild(dayShiftDiv);
            
            // Volunteer column
            const volunteerCell = document.createElement('td');
            volunteerCell.textContent = student.volunteer;
            
            // Address column
            const addressCell = document.createElement('td');
            addressCell.textContent = student.address;
            
            // Disability column
            const disabilityCell = document.createElement('td');
            const disabilityDiv = document.createElement('div');
            disabilityDiv.className = 'disability';
            disabilityDiv.textContent = student.disability;
            
            // Add inactive reason
            const statusDiv = document.createElement('div');
            statusDiv.className = 'status-badge';
            statusDiv.textContent = 'Inativo';
            
            const reasonDiv = document.createElement('div');
            reasonDiv.className = 'inactive-reason';
            reasonDiv.textContent = `Motivo: ${student.inactiveReason}`;
            
            disabilityCell.appendChild(disabilityDiv);
            disabilityCell.appendChild(statusDiv);
            disabilityCell.appendChild(reasonDiv);
            
            // Actions column
            const actionsCell = document.createElement('td');
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'student-actions';
            
            // View button
            const viewBtn = document.createElement('button');
            viewBtn.className = 'action-btn view-btn';
            viewBtn.title = 'Visualizar';
            viewBtn.innerHTML = '<i class="fas fa-eye"></i>';
            viewBtn.addEventListener('click', () => viewStudent(student.id));
            
            // Edit button
            const editBtn = document.createElement('button');
            editBtn.className = 'action-btn edit-btn';
            editBtn.title = 'Editar';
            editBtn.innerHTML = '<i class="fas fa-edit"></i>';
            editBtn.addEventListener('click', () => editStudent(student.id));
            
            // Activate button
            const activateBtn = document.createElement('button');
            activateBtn.className = 'action-btn activate-btn';
            activateBtn.title = 'Reativar';
            activateBtn.innerHTML = '<i class="fas fa-user-check"></i>';
            activateBtn.addEventListener('click', () => activateStudent(student.id));
            
            actionsDiv.appendChild(viewBtn);
            actionsDiv.appendChild(editBtn);
            actionsDiv.appendChild(activateBtn);
            actionsCell.appendChild(actionsDiv);
            
            // Append all cells to the row
            row.appendChild(infoCell);
            row.appendChild(dayShiftCell);
            row.appendChild(volunteerCell);
            row.appendChild(addressCell);
            row.appendChild(disabilityCell);
            row.appendChild(actionsCell);
            
            // Append row to table body
            tableBody.appendChild(row);
        });
    }
    
    // Initialize the page
    function init() {
        populateInactiveStudentsTable();
        setupAccordion();
        updateDateTime();
        
        // Update date and time every minute
        setInterval(updateDateTime, 60000);
        
        // Setup search functionality
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                const filteredStudents = inactiveStudents.filter(student => 
                    student.name.toLowerCase().includes(searchTerm) ||
                    student.studentId.toLowerCase().includes(searchTerm) ||
                    student.address.toLowerCase().includes(searchTerm)
                );
                // Implement search filtering
                console.log('Search term:', searchTerm, 'Filtered students:', filteredStudents);
                // Update table with filtered results
                // This would be implemented in a real application
            });
        }
    }
    
    // Handle view student action
    function viewStudent(id) {
        console.log('Viewing student with ID:', id);
        const student = inactiveStudents.find(s => s.id === id);
        if (student) {
            alert(`Visualizando detalhes do aluno: ${student.name}\nInativo desde: ${formatDate(student.lastActiveDate)}\nMotivo: ${student.inactiveReason}`);
        }
        // In a real application, this would open a detailed view
    }
    
    // Handle edit student action
    function editStudent(id) {
        console.log('Editing student with ID:', id);
        const student = inactiveStudents.find(s => s.id === id);
        if (student) {
            alert(`Editando aluno: ${student.name}`);
        }
        // In a real application, this would open an edit form
    }
    
    // Handle activate student action
    function activateStudent(id) {
        console.log('Activating student with ID:', id);
        const student = inactiveStudents.find(s => s.id === id);
        if (student && confirm(`Tem certeza que deseja reativar o aluno ${student.name}?`)) {
            alert(`Aluno ${student.name} reativado com sucesso.`);
            // In a real application, this would update the database and refresh the list
        }
    }
    
    // Format date for display
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
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