document.addEventListener('DOMContentLoaded', function() {
    // Mock PDF data for reports (in real app would be actual PDFs)
    const reportPdfs = {
        'student-demographics': {
            title: 'Demografia dos Alunos',
            url: './pdfs/student_demographics.pdf',
        },
        'disability-types': {
            title: 'Tipos de Deficiência',
            url: './pdfs/disability_types.pdf',
        },
        'class-occupancy': {
            title: 'Ocupação das Turmas',
            url: './pdfs/class_occupancy.pdf',
        },
        'volunteer-activity': {
            title: 'Atividade dos Voluntários',
            url: './pdfs/volunteer_activity.pdf',
        },
        'student-progress': {
            title: 'Progresso dos Alunos',
            url: './pdfs/student_progress.pdf',
        },
        'attendance': {
            title: 'Relatório de Presença',
            url: './pdfs/attendance.pdf',
        },
        'annual-activity': {
            title: 'Relatório Anual de Atividades',
            url: './pdfs/annual_activity.pdf',
        }
    };

    // Initialize the page
    function init() {
        setupViewButtons();
        setupDownloadButtons();
        setupModalFunctionality();
        setupAccordion();
        setupReportGenerator();
        updateDateTime();
        
        // Update date and time every minute
        setInterval(updateDateTime, 60000);
    }

    // Setup view report buttons
    function setupViewButtons() {
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const reportId = this.getAttribute('data-report');
                openReportModal(reportId);
            });
        });
    }

    // Setup download report buttons
    function setupDownloadButtons() {
        const downloadButtons = document.querySelectorAll('.download-btn');
        downloadButtons.forEach(button => {
            button.addEventListener('click', function() {
                const reportId = this.getAttribute('data-report');
                downloadReport(reportId);
            });
        });
    }

    // Open report modal
    function openReportModal(reportId) {
        const modal = document.getElementById('pdf-modal');
        const modalTitle = document.getElementById('modal-title');
        const pdfContainer = document.getElementById('pdf-container');
        const downloadBtn = document.getElementById('download-report-btn');
        
        // Get report data
        const report = reportPdfs[reportId];
        
        if (report) {
            modalTitle.textContent = report.title;
            
            // In a real app, this would embed a PDF viewer with the actual PDF
            // For this demo, we just show a placeholder
            pdfContainer.innerHTML = `
                <div style="text-align: center;">
                    <i class="fas fa-file-pdf" style="font-size: 80px; color: #e74c3c; margin-bottom: 20px;"></i>
                    <h3>Visualizando: ${report.title}</h3>
                    <p>Em uma aplicação real, o PDF seria carregado aqui.</p>
                    <p>URL do arquivo: ${report.url}</p>
                </div>
            `;
            
            // Set download button action
            downloadBtn.setAttribute('data-report', reportId);
            
            // Show modal
            modal.style.display = 'block';
        }
    }

    // Download report functionality
    function downloadReport(reportId) {
        const report = reportPdfs[reportId];
        
        if (report) {
            console.log(`Baixando relatório: ${report.title}`);
            // In a real app, this would trigger the browser's download functionality
            alert(`Download iniciado: ${report.title}\nEm uma aplicação real, o download do arquivo PDF começaria automaticamente.`);
        }
    }

    // Setup modal functionality
    function setupModalFunctionality() {
        const modal = document.getElementById('pdf-modal');
        const closeButtons = document.querySelectorAll('.close-modal, .close-btn');
        const downloadBtn = document.getElementById('download-report-btn');
        
        // Close modal when clicking on close buttons
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Handle download button in modal
        downloadBtn.addEventListener('click', function() {
            const reportId = this.getAttribute('data-report');
            downloadReport(reportId);
        });
    }

    // Setup accordion functionality for sidebar
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

    // Setup custom report generator
    function setupReportGenerator() {
        const dateRangeSelect = document.getElementById('date-range');
        const customDateRange = document.querySelector('.custom-date-range');
        const generateBtn = document.getElementById('generate-report');
        
        // Show/hide custom date inputs based on selection
        dateRangeSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                customDateRange.style.display = 'flex';
            } else {
                customDateRange.style.display = 'none';
            }
        });
        
        // Handle generate report button click
        generateBtn.addEventListener('click', function() {
            const reportType = document.getElementById('report-type').value;
            const dateRange = document.getElementById('date-range').value;
            const reportFormat = document.getElementById('report-format').value;
            
            if (!reportType) {
                alert('Por favor, selecione um tipo de relatório.');
                return;
            }
            
            if (!dateRange) {
                alert('Por favor, selecione um período.');
                return;
            }
            
            // If custom date range is selected, validate dates
            if (dateRange === 'custom') {
                const startDate = document.getElementById('start-date').value;
                const endDate = document.getElementById('end-date').value;
                
                if (!startDate || !endDate) {
                    alert('Por favor, selecione as datas inicial e final para o período personalizado.');
                    return;
                }
                
                if (new Date(startDate) > new Date(endDate)) {
                    alert('A data inicial não pode ser posterior à data final.');
                    return;
                }
            }
            
            // In a real app, this would generate the report
            alert(`Gerando relatório personalizado:\nTipo: ${reportType}\nPeríodo: ${dateRange}\nFormato: ${reportFormat.toUpperCase()}\n\nEm uma aplicação real, o relatório seria gerado e disponibilizado para download.`);
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

    // Create directory structure for PDFs if needed
    function createPdfDirectories() {
        // In a real application, this function would ensure the PDF directories exist
        console.log('PDF directories would be created here in a real application');
    }

    // Call init function to start everything
    init();
});