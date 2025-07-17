document.addEventListener("DOMContentLoaded", function () {
  console.log("Surf Para Todos - Dashboard loaded!");

  // Initialize attendance chart
  const ctx = document.getElementById("attendanceChart").getContext("2d");

  // Chart data
  const labels = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"];
  const studentData = [30, 25, 35, 30, 22, 25];
  const volunteerData = [18, 15, 20, 18, 12, 15];

  // Create gradient for student line
  const studentGradient = ctx.createLinearGradient(0, 0, 0, 200);
  studentGradient.addColorStop(0, "rgba(16, 185, 129, 0.5)");
  studentGradient.addColorStop(1, "rgba(16, 185, 129, 0)");

  // Create gradient for volunteer line
  const volunteerGradient = ctx.createLinearGradient(0, 0, 0, 200);
  volunteerGradient.addColorStop(0, "rgba(99, 102, 241, 0.5)");
  volunteerGradient.addColorStop(1, "rgba(99, 102, 241, 0)");

  // Chart configuration
  const attendanceChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Alunos",
          data: studentData,
          borderColor: "#10b981",
          backgroundColor: studentGradient,
          tension: 0.4,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#10b981",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
        },
        {
          label: "Voluntários",
          data: volunteerData,
          borderColor: "#6366f1",
          backgroundColor: volunteerGradient,
          tension: 0.4,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#6366f1",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: "index",
          intersect: false,
          backgroundColor: "#ffffff",
          titleColor: "#333333",
          bodyColor: "#666666",
          borderColor: "#e0e0e0",
          borderWidth: 1,
          titleFont: {
            size: 13,
            weight: "bold",
          },
          bodyFont: {
            size: 12,
          },
          padding: 10,
          displayColors: true,
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              label += context.parsed.y;
              return label;
            },
          },
        },
      },
      scales: {
        x: {
          display: false,
          grid: {
            display: false,
          },
        },
        y: {
          display: false,
          min: 0,
          grid: {
            display: false,
          },
        },
      },
      elements: {
        line: {
          borderWidth: 2,
        },
      },
    },
  });

  // Report navigation buttons
  const reportNavBtns = document.querySelectorAll(".report-nav-btn");
  reportNavBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      reportNavBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      // In a real application, this would load different chart data
      // Here we'll just simulate changing the chart
      const reportType = this.textContent.toLowerCase();
      switch (reportType) {
        case "idade":
          updateChartData([25, 28, 22, 26, 30, 28], [15, 18, 14, 13, 16, 17]);
          break;
        case "renda":
          updateChartData([20, 25, 35, 30, 20, 25], [12, 15, 22, 18, 14, 16]);
          break;
        case "atividades":
          updateChartData([35, 30, 25, 28, 32, 30], [20, 18, 15, 17, 19, 18]);
          break;
        case "engajamento":
          updateChartData([15, 25, 35, 30, 25, 20], [10, 15, 20, 18, 15, 12]);
          break;
        default: // frequência
          updateChartData([30, 25, 35, 30, 22, 25], [18, 15, 20, 18, 12, 15]);
          break;
      }
    });
  });

  // Function to update chart data
  function updateChartData(studentData, volunteerData) {
    attendanceChart.data.datasets[0].data = studentData;
    attendanceChart.data.datasets[1].data = volunteerData;
    attendanceChart.update();
  }

  // Star action button functionality
  const starButtons = document.querySelectorAll(".action-btn:first-child");
  starButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });

  // Edit buttons functionality
  const editButtons = document.querySelectorAll(".action-btn:nth-child(2)");
  editButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const studentRow = this.closest("tr");
      const studentName = studentRow.querySelector(".student-name").textContent;
      alert(`Editar aluno: ${studentName}`);
      // In a real implementation, this would redirect to the edit page
      // window.location.href = `cadastro_aluno.html?id=${studentId}`;
    });
  });

  // More options buttons functionality
  const moreButtons = document.querySelectorAll(".action-btn:last-child");
  moreButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const studentName =
        this.closest("tr").querySelector(".student-name").textContent;
      alert(`Opções adicionais para: ${studentName}`);
      // In a real implementation, this would show a dropdown menu
    });
  });
  // Sanfona lateral (accordion)
  const accordionItems = document.querySelectorAll(".accordion");

  accordionItems.forEach((item) => {
    const toggle = item.querySelector(".accordion-toggle");
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      accordionItems.forEach((i) => i !== item && i.classList.remove("open"));
      item.classList.toggle("open");
    });
  });
});
