document.addEventListener('DOMContentLoaded', function() {
    console.log('Surf Para Todos - Turmas Page Loaded');
    
    // Mock data for classes
    const classes = [
        {
            id: 1,
            name: "Turma Manhã",
            day: "segunda",
            dayDisplay: "SEG",
            dayFull: "Segunda-feira",
            startTime: "08:00",
            endTime: "10:00",
            instructor: "Ricardo Almeida",
            currentStudents: 6,
            maxStudents: 8,
            location: "Praia do Campeche, Ponto 2",
            status: "ativa",
            level: "iniciante",
            notes: ""
        },
        {
            id: 2,
            name: "Turma Tarde",
            day: "segunda",
            dayDisplay: "SEG",
            dayFull: "Segunda-feira",
            startTime: "14:30",
            endTime: "16:30",
            instructor: "Marina Costa",
            currentStudents: 8,
            maxStudents: 8,
            location: "Praia do Campeche, Ponto 1",
            status: "completa",
            level: "intermediario",
            notes: ""
        },
        {
            id: 3,
            name: "Turma Especial",
            day: "quarta",
            dayDisplay: "QUA",
            dayFull: "Quarta-feira",
            startTime: "09:00",
            endTime: "11:00",
            instructor: "João Paulo",
            currentStudents: 4,
            maxStudents: 6,
            location: "Praia do Santinho, Norte",
            status: "ativa",
            level: "avancado",
            notes: "Turma para necessidades específicas"
        },
        {
            id: 4,
            name: "Turma Avançada",
            day: "sexta",
            dayDisplay: "SEX",
            dayFull: "Sexta-feira",
            startTime: "07:30",
            endTime: "10:00",
            instructor: "Não definido",
            currentStudents: 0,
            maxStudents: 10,
            location: "Praia da Joaquina",
            status: "inativa",
            level: "avancado",
            notes: "Aguardando definição de instrutor"
        },
        {
            id: 5,
            name: "Turma Iniciantes",
            day: "sabado",
            dayDisplay: "SAB",
            dayFull: "Sábado",
            startTime: "09:00",
            endTime: "11:30",
            instructor: "Carlos Mendes",
            currentStudents: 7,
            maxStudents: 10,
            location: "Praia da Barra da Lagoa",
            status: "ativa",
            level: "iniciante",
            notes: ""
        },
        {
            id: 6,
            name: "Turma Kids",
            day: "sabado",
            dayDisplay: "SAB",
            dayFull: "Sábado",
            startTime: "14:00",
            endTime: "16:00",
            instructor: "Luísa Oliveira",
            currentStudents: 5,
            maxStudents: 8,
            location: "Praia Mole, Setor Sul",
            status: "ativa",
            level: "iniciante",
            notes: "Turma especial para crianças de 8 a 12 anos"
        }
    ];

    // Mock data for students
    const students = [
        {
            id: "SP1234",
            name: "Bruno Silva Pires",
            cpf: "123.456.789-00",
            disability: "Paraplegia",
            startDate: "2023-04-15",
            status: "ativo",
            classes: [1, 5],
            photo: "https://via.placeholder.com/40/3498db/FFFFFF?text=B"
        },
        {
            id: "SP1235",
            name: "Carol Costa",
            cpf: "234.567.890-11",
            disability: "Paralisia Cerebral",
            startDate: "2023-05-20",
            status: "ativo",
            classes: [1],
            photo: "https://via.placeholder.com/40/e74c3c/FFFFFF?text=C"
        },
        {
            id: "SP1236",
            name: "Yasmin Cavalheiro Martins",
            cpf: "345.678.901-22",
            disability: "Amputação MI",
            startDate: "2023-06-10",
            status: "ativo",
            classes: [2],
            photo: "https://via.placeholder.com/40/9b59b6/FFFFFF?text=Y"
        },
        {
            id: "SP1237",
            name: "Rafael Oliveira",
            cpf: "456.789.012-33",
            disability: "Autismo",
            startDate: "2023-03-05",
            status: "ativo",
            classes: [2, 6],
            photo: "https://via.placeholder.com/40/2ecc71/FFFFFF?text=R"
        },
        {
            id: "SP1238",
            name: "Amanda Flores",
            cpf: "567.890.123-44",
            disability: "Baixa Visão",
            startDate: "2023-07-02",
            status: "ativo",
            classes: [3],
            photo: "https://via.placeholder.com/40/f1c40f/FFFFFF?text=A"
        },
        {
            id: "SP1239",
            name: "Pedro Santos",
            cpf: "678.901.234-55",
            disability: "Síndrome de Down",
            startDate: "2023-02-18",
            status: "inativo",
            classes: [],
            photo: "https://via.placeholder.com/40/34495e/FFFFFF?text=P"
        }
    ];

    // Initialize the page
    initPage();

    // Main initialization function
    function initPage() {
        renderClassesGrid();
        renderClassesList();
        setupEventListeners();
    }

    // Render classes in grid view
    function renderClassesGrid() {
        const gridView = document.getElementById('grid-view');
        gridView.innerHTML = '';

        classes.forEach(classItem => {
            const classCard = createClassCard(classItem);
            gridView.appendChild(classCard);
        });
    }

    // Create class card element for grid view
    function createClassCard(classItem) {
        const card = document.createElement('div');
        card.className = 'class-card';
        card.dataset.classId = classItem.id;

        // Determine if class is full or inactive
        const isFull = classItem.currentStudents >= classItem.maxStudents;
        const isInactive = classItem.status === 'inativa';

        card.innerHTML = `
            <div class="class-card-header">
                <div class="class-day-badge">${classItem.dayDisplay}</div>
                <div class="class-status ${classItem.status}">${getStatusDisplay(classItem.status)}</div>
            </div>
            <div class="class-card-body">
                <h3 class="class-name">${classItem.name}</h3>
                <div class="class-info">
                    <div class="class-time">
                        <i class="far fa-clock"></i> ${classItem.startTime} - ${classItem.endTime}
                    </div>
                    <div class="class-instructor">
                        <i class="fas fa-user"></i> Instrutor: ${classItem.instructor}
                    </div>
                    <div class="class-capacity">
                        <i class="fas fa-users"></i> Alunos: <span class="class-count">${classItem.currentStudents}</span>/<span class="class-total">${classItem.maxStudents}</span>
                    </div>
                    <div class="class-location">
                        <i class="fas fa-map-marker-alt"></i> ${classItem.location}
                    </div>
                </div>
            </div>
            <div class="class-card-footer">
                <button class="btn btn-secondary" data-action="view-students" ${isInactive ? 'disabled' : ''}>
                    <i class="fas fa-eye"></i> Ver Alunos
                </button>
                <button class="btn btn-primary" data-action="add-students" ${isFull || isInactive ? 'disabled' : ''}>
                    <i class="fas fa-user-plus"></i> Adicionar Aluno
                </button>
            </div>
        `;

        return card;
    }

    // Render classes in list view
    function renderClassesList() {
        const listViewBody = document.getElementById('list-view-body');
        listViewBody.innerHTML = '';

        classes.forEach(classItem => {
            const isFull = classItem.currentStudents >= classItem.maxStudents;
            const isInactive = classItem.status === 'inativa';
            
            const tr = document.createElement('tr');
            tr.dataset.classId = classItem.id;
            
            tr.innerHTML = `
                <td>${classItem.dayFull}</td>
                <td>${classItem.name}</td>
                <td>${classItem.startTime} - ${classItem.endTime}</td>
                <td>${classItem.instructor}</td>
                <td>${classItem.currentStudents}/${classItem.maxStudents}</td>
                <td>${classItem.location}</td>
                <td><span class="status-badge ${classItem.status}">${getStatusDisplay(classItem.status)}</span></td>
                <td class="actions">
                    <button class="action-btn" title="Ver Alunos" ${isInactive ? 'disabled' : ''} data-action="view">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" title="Adicionar Aluno" ${isFull || isInactive ? 'disabled' : ''} data-action="add">
                        <i class="fas fa-user-plus"></i>
                    </button>
                    <button class="action-btn" title="Editar Turma" data-action="edit">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            `;
            
            listViewBody.appendChild(tr);
        });
    }

    // Setup all event listeners
    function setupEventListeners() {
        // Toggle between grid and list views
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const view = this.dataset.view;
                toggleView(view);
                viewButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Add new class button
        const addClassBtn = document.getElementById('add-class-btn');
        addClassBtn.addEventListener('click', openAddClassModal);

        // Search functionality
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', handleSearch);

        // Filter dropdowns
        document.getElementById('filter-day').addEventListener('change', applyFilters);
        document.getElementById('filter-shift').addEventListener('change', applyFilters);
        document.getElementById('filter-status').addEventListener('change', applyFilters);

        // Class card action buttons
        document.getElementById('grid-view').addEventListener('click', handleClassCardActions);
        document.getElementById('list-view').addEventListener('click', handleListViewActions);

        // Modal close buttons
        const closeButtons = document.querySelectorAll('.close-modal');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                closeAllModals();
            });
        });

        // Modal actions
        document.getElementById('cancel-class').addEventListener('click', closeAllModals);
        document.getElementById('save-class').addEventListener('click', saveClassData);
        document.getElementById('cancel-add-student').addEventListener('click', closeAllModals);
        document.getElementById('close-view-students').addEventListener('click', closeAllModals);
        document.getElementById('search-student-btn').addEventListener('click', searchStudents);

        // Select student in modal
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('select-student') || e.target.parentElement.classList.contains('select-student')) {
                const btn = e.target.classList.contains('select-student') ? e.target : e.target.parentElement;
                const studentItems = document.querySelectorAll('.student-item');
                
                studentItems.forEach(item => {
                    item.classList.remove('selected');
                });
                
                const studentItem = btn.closest('.student-item');
                studentItem.classList.add('selected');
                
                document.getElementById('confirm-add-student').disabled = false;
            }
        });

        // Confirm add student button
        document.getElementById('confirm-add-student').addEventListener('click', function() {
            // In a real app, this would add the student to the class
            alert('Aluno adicionado à turma com sucesso!');
            closeAllModals();
        });
    }

    // Toggle between grid and list views
    function toggleView(view) {
        const gridView = document.getElementById('grid-view');
        const listView = document.getElementById('list-view');
        
        if (view === 'grid') {
            gridView.style.display = 'grid';
            listView.style.display = 'none';
        } else {
            gridView.style.display = 'none';
            listView.style.display = 'block';
        }
    }

    // Handle search input
    function handleSearch() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        
        filterClasses({
            searchTerm: searchTerm,
            day: document.getElementById('filter-day').value,
            shift: document.getElementById('filter-shift').value,
            status: document.getElementById('filter-status').value
        });
    }

    // Apply filters from dropdowns
    function applyFilters() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        
        filterClasses({
            searchTerm: searchTerm,
            day: document.getElementById('filter-day').value,
            shift: document.getElementById('filter-shift').value,
            status: document.getElementById('filter-status').value
        });
    }

    // Filter classes based on search and filter criteria
    function filterClasses(filters) {
        const filteredClasses = classes.filter(classItem => {
            // Search term filter
            const matchesSearch = filters.searchTerm === '' || 
                classItem.name.toLowerCase().includes(filters.searchTerm) ||
                classItem.instructor.toLowerCase().includes(filters.searchTerm) ||
                classItem.location.toLowerCase().includes(filters.searchTerm);
            
            // Day filter
            const matchesDay = filters.day === '' || classItem.day === filters.day;
            
            // Shift filter (morning/afternoon)
            let matchesShift = true;
            if (filters.shift === 'manha') {
                matchesShift = parseInt(classItem.startTime.split(':')[0]) < 12;
            } else if (filters.shift === 'tarde') {
                matchesShift = parseInt(classItem.startTime.split(':')[0]) >= 12;
            }
            
            // Status filter
            const matchesStatus = filters.status === '' || classItem.status === filters.status;
            
            return matchesSearch && matchesDay && matchesShift && matchesStatus;
        });
        
        updateClassesDisplay(filteredClasses);
    }

    // Update the display with filtered classes
    function updateClassesDisplay(filteredClasses) {
        // Update grid view
        const gridView = document.getElementById('grid-view');
        gridView.innerHTML = '';
        
        filteredClasses.forEach(classItem => {
            const classCard = createClassCard(classItem);
            gridView.appendChild(classCard);
        });
        
        // Update list view
        const listViewBody = document.getElementById('list-view-body');
        listViewBody.innerHTML = '';
        
        filteredClasses.forEach(classItem => {
            const isFull = classItem.currentStudents >= classItem.maxStudents;
            const isInactive = classItem.status === 'inativa';
            
            const tr = document.createElement('tr');
            tr.dataset.classId = classItem.id;
            
            tr.innerHTML = `
                <td>${classItem.dayFull}</td>
                <td>${classItem.name}</td>
                <td>${classItem.startTime} - ${classItem.endTime}</td>
                <td>${classItem.instructor}</td>
                <td>${classItem.currentStudents}/${classItem.maxStudents}</td>
                <td>${classItem.location}</td>
                <td><span class="status-badge ${classItem.status}">${getStatusDisplay(classItem.status)}</span></td>
                <td class="actions">
                    <button class="action-btn" title="Ver Alunos" ${isInactive ? 'disabled' : ''} data-action="view">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn" title="Adicionar Aluno" ${isFull || isInactive ? 'disabled' : ''} data-action="add">
                        <i class="fas fa-user-plus"></i>
                    </button>
                    <button class="action-btn" title="Editar Turma" data-action="edit">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            `;
            
            listViewBody.appendChild(tr);
        });
        
        // Show "no results" message if needed
        if (filteredClasses.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'Nenhuma turma encontrada com os filtros selecionados.';
            
            gridView.appendChild(noResults);
            
            const tr = document.createElement('tr');
            tr.innerHTML = '<td colspan="8" class="no-results">Nenhuma turma encontrada com os filtros selecionados.</td>';
            listViewBody.appendChild(tr);
        }
    }
    // Handle class card actions (view students, add students)
    function handleClassCardActions(e) {
        if (e.target.tagName === 'BUTTON' || e.target.parentElement.tagName === 'BUTTON') {
            const button = e.target.tagName === 'BUTTON' ? e.target : e.target.parentElement;
            const action = button.dataset.action;
            const classCard = button.closest('.class-card');
            const classId = classCard.dataset.classId;
            
            if (action === 'view-students') {
                openViewStudentsModal(classId);
            } else if (action === 'add-students') {
                openAddStudentModal(classId);
            }
        }
    }

    // Handle list view actions (view, add, edit)
    function handleListViewActions(e) {
        if (e.target.classList.contains('action-btn') || e.target.parentElement.classList.contains('action-btn')) {
            const button = e.target.classList.contains('action-btn') ? e.target : e.target.parentElement;
            
            // Skip if button is disabled
            if (button.hasAttribute('disabled')) {
                return;
            }
            
            const action = button.dataset.action;
            const tr = button.closest('tr');
            const classId = tr.dataset.classId;
            
            if (action === 'view') {
                openViewStudentsModal(classId);
            } else if (action === 'add') {
                openAddStudentModal(classId);
            } else if (action === 'edit') {
                openEditClassModal(classId);
            }
        }
    }

    // Open the Add/Edit Class Modal
    function openAddClassModal() {
        resetClassForm();
        document.querySelector('#class-modal .modal-header h3').textContent = 'Nova Turma';
        document.getElementById('class-modal').classList.add('show');
    }

    // Open the Edit Class Modal with class data
    function openEditClassModal(classId) {
        const classData = classes.find(c => c.id == classId);
        
        if (classData) {
            const form = document.getElementById('class-form');
            
            // Fill form with class data
            form.querySelector('#class-name').value = classData.name;
            form.querySelector('#class-day').value = classData.day;
            form.querySelector('#class-start-time').value = classData.startTime;
            form.querySelector('#class-end-time').value = classData.endTime;
            
            // Handle instructor selection
            let instructorVal = '';
            if (classData.instructor === 'Ricardo Almeida') instructorVal = 'ricardo';
            else if (classData.instructor === 'Marina Costa') instructorVal = 'marina';
            else if (classData.instructor === 'João Paulo') instructorVal = 'joao';
            else if (classData.instructor === 'Carlos Mendes') instructorVal = 'carlos';
            else if (classData.instructor === 'Luísa Oliveira') instructorVal = 'luisa';
            
            form.querySelector('#class-instructor').value = instructorVal;
            form.querySelector('#class-capacity').value = classData.maxStudents;
            form.querySelector('#class-location').value = classData.location;
            form.querySelector('#class-status').value = classData.status;
            form.querySelector('#class-level').value = classData.level;
            form.querySelector('#class-notes').value = classData.notes;
            
            // Update modal title and add class ID as data attribute
            document.querySelector('#class-modal .modal-header h3').textContent = 'Editar Turma';
            document.getElementById('class-modal').dataset.classId = classId;
            
            // Show the modal
            document.getElementById('class-modal').classList.add('show');
        }
    }

    // Open the Add Student to Class Modal
    function openAddStudentModal(classId) {
        const classData = classes.find(c => c.id == classId);
        
        if (classData) {
            // Update class info in the modal
            document.getElementById('selected-class-name').textContent = classData.name;
            document.getElementById('selected-class-day').textContent = classData.dayFull;
            document.getElementById('selected-class-time').textContent = `${classData.startTime} - ${classData.endTime}`;
            document.getElementById('selected-class-instructor').textContent = classData.instructor;
            document.getElementById('selected-class-availability').textContent = classData.maxStudents - classData.currentStudents;
            
            // Clear previous search results
            document.querySelector('.student-list').innerHTML = '';
            
            // Clear search input
            document.getElementById('student-search-input').value = '';
            
            // Disable confirm button until a student is selected
            document.getElementById('confirm-add-student').disabled = true;
            
            // Store class ID in modal data attribute
            document.getElementById('add-student-modal').dataset.classId = classId;
            
            // Show the modal
            document.getElementById('add-student-modal').classList.add('show');
        }
    }

    // Open the View Class Students Modal
    function openViewStudentsModal(classId) {
        const classData = classes.find(c => c.id == classId);
        
        if (classData) {
            // Update class info in the modal
            document.getElementById('view-class-name').textContent = classData.name;
            document.getElementById('view-class-day').textContent = classData.dayFull;
            document.getElementById('view-class-time').textContent = `${classData.startTime} - ${classData.endTime}`;
            document.getElementById('view-class-instructor').textContent = classData.instructor;
            document.getElementById('view-class-location').textContent = classData.location;
            
            // Get students in this class
            const classStudents = students.filter(student => student.classes.includes(parseInt(classId)));
            
            // Populate student table
            const tableBody = document.getElementById('student-table-body');
            tableBody.innerHTML = '';
            
            if (classStudents.length > 0) {
                classStudents.forEach(student => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>
                            <div class="student-info-row">
                                <img src="${student.photo}" alt="${student.name}">
                                <span>${student.name}</span>
                            </div>
                        </td>
                        <td>${student.id}</td>
                        <td>${student.disability}</td>
                        <td>${formatDate(student.startDate)}</td>
                        <td><span class="status-badge ${student.status === 'ativo' ? 'active' : 'inactive'}">${student.status === 'ativo' ? 'Ativo' : 'Inativo'}</span></td>
                        <td>
                            <button class="action-btn" title="Ver Perfil">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="action-btn" title="Remover da Turma">
                                <i class="fas fa-times"></i>
                            </button>
                        </td>
                    `;
                    tableBody.appendChild(tr);
                });
            } else {
                const tr = document.createElement('tr');
                tr.innerHTML = '<td colspan="6" class="no-results">Nenhum aluno matriculado nesta turma.</td>';
                tableBody.appendChild(tr);
            }
            
            // Show the modal
            document.getElementById('view-students-modal').classList.add('show');
        }
    }

    // Close all modals
    function closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.remove('show');
        });
    }

    // Reset class form
    function resetClassForm() {
        const form = document.getElementById('class-form');
        form.reset();
        delete document.getElementById('class-modal').dataset.classId;
    }

    // Save class data (add new or update existing)
    function saveClassData() {
        const form = document.getElementById('class-form');
        const modal = document.getElementById('class-modal');
        
        // Basic form validation
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // Get instructor full name from value
        const instructorValue = form.querySelector('#class-instructor').value;
        let instructorName = '';
        
        switch(instructorValue) {
            case 'ricardo':
                instructorName = 'Ricardo Almeida';
                break;
            case 'marina':
                instructorName = 'Marina Costa';
                break;
            case 'joao':
                instructorName = 'João Paulo';
                break;
            case 'carlos':
                instructorName = 'Carlos Mendes';
                break;
            case 'luisa':
                instructorName = 'Luísa Oliveira';
                break;
            default:
                instructorName = 'Não definido';
        }
        
        // Collect form data
        const classData = {
            name: form.querySelector('#class-name').value,
            day: form.querySelector('#class-day').value,
            startTime: form.querySelector('#class-start-time').value,
            endTime: form.querySelector('#class-end-time').value,
            instructor: instructorName,
            maxStudents: parseInt(form.querySelector('#class-capacity').value),
            location: form.querySelector('#class-location').value,
            status: form.querySelector('#class-status').value,
            level: form.querySelector('#class-level').value,
            notes: form.querySelector('#class-notes').value
        };
        
        // Add additional data
        if (classData.day === 'segunda') {
            classData.dayDisplay = 'SEG';
            classData.dayFull = 'Segunda-feira';
        } else if (classData.day === 'terca') {
            classData.dayDisplay = 'TER';
            classData.dayFull = 'Terça-feira';
        } else if (classData.day === 'quarta') {
            classData.dayDisplay = 'QUA';
            classData.dayFull = 'Quarta-feira';
        } else if (classData.day === 'quinta') {
            classData.dayDisplay = 'QUI';
            classData.dayFull = 'Quinta-feira';
        } else if (classData.day === 'sexta') {
            classData.dayDisplay = 'SEX';
            classData.dayFull = 'Sexta-feira';
        } else if (classData.day === 'sabado') {
            classData.dayDisplay = 'SAB';
            classData.dayFull = 'Sábado';
        } else if (classData.day === 'domingo') {
            classData.dayDisplay = 'DOM';
            classData.dayFull = 'Domingo';
        }
        
        // Check if editing or creating new
        if (modal.dataset.classId) {
            // Update existing class
            const classId = parseInt(modal.dataset.classId);
            const classIndex = classes.findIndex(c => c.id === classId);
            
            if (classIndex !== -1) {
                // Keep students count
                classData.currentStudents = classes[classIndex].currentStudents;
                classData.id = classId;
                
                classes[classIndex] = classData;
                console.log('Class updated:', classData);
                
                alert('Turma atualizada com sucesso!');
            }
        } else {
            // Create new class
            classData.id = classes.length + 1;
            classData.currentStudents = 0;
            
            classes.push(classData);
            console.log('New class created:', classData);
            
            alert('Nova turma criada com sucesso!');
        }
        
        // Update displays
        renderClassesGrid();
        renderClassesList();
        
        // Close modal
        closeAllModals();
    }

    // Search for students to add to class
    function searchStudents() {
        const searchTerm = document.getElementById('student-search-input').value.toLowerCase();
        
        if (searchTerm.length < 2) {
            alert('Por favor, digite pelo menos 2 caracteres para buscar.');
            return;
        }
        
        // Filter students based on search
        const filteredStudents = students.filter(student => 
            student.name.toLowerCase().includes(searchTerm) ||
            student.id.toLowerCase().includes(searchTerm) ||
            student.cpf.toLowerCase().includes(searchTerm)
        );
        
        const studentList = document.querySelector('.student-list');
        studentList.innerHTML = '';
        
        if (filteredStudents.length > 0) {
            filteredStudents.forEach(student => {
                // Check if student is already in this class
                const classId = parseInt(document.getElementById('add-student-modal').dataset.classId);
                const alreadyInClass = student.classes.includes(classId);
                
                const studentItem = document.createElement('div');
                studentItem.className = 'student-item';
                studentItem.dataset.studentId = student.id;
                
                studentItem.innerHTML = `
                    <div class="student-info">
                        <img src="${student.photo}" alt="${student.name}">
                        <div class="student-details">
                            <h5>${student.name}</h5>
                            <p>ID: ${student.id} | CPF: ${student.cpf}</p>
                        </div>
                    </div>
                    <div class="student-actions">
                        ${alreadyInClass ? 
                            '<span class="already-enrolled">Já matriculado</span>' : 
                            '<button class="btn btn-primary btn-sm select-student">Selecionar</button>'
                        }
                    </div>
                `;
                
                studentList.appendChild(studentItem);
            });
        } else {
            studentList.innerHTML = '<div class="no-results">Nenhum aluno encontrado com os critérios de busca.</div>';
        }
    }

    // Helper Functions
    
    // Get status display text
    function getStatusDisplay(status) {
        switch(status) {
            case 'ativa':
                return 'Ativa';
            case 'completa':
                return 'Completa';
            case 'inativa':
                return 'Inativa';
            default:
                return status;
        }
    }
    
    // Format date for display
    function formatDate(dateString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', options);
    }

    // Populate grid view with initial data
    renderClassesGrid();
});
