// Fetch data from the backend API
fetch("http://localhost:3000/api/logs?userId=123")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Check if logs exist and are not empty
    if (!data.logs || data.logs.length === 0) {
      throw new Error("No tracking data found. Please browse some websites with the extension active first!");
    }

    // Prepare data for Chart.js
    // Extract domain names and map time from seconds to minutes
    const labels = data.logs.map((log) => {
      try {
        return new URL(log.url).hostname;
      } catch (e) {
        return log.url; // Fallback if URL is already a hostname
      }
    });
    
    const timeSpentMinutes = data.logs.map((log) => (log.timeSpent / 60).toFixed(2));
    const totalMinutes = timeSpentMinutes.reduce((a, b) => parseFloat(a) + parseFloat(b), 0).toFixed(2);

    // Add a summary text below the header if you want
    const container = document.querySelector('.container');
    const summary = document.createElement('p');
    summary.style.color = "#94a3b8";
    summary.innerHTML = `Total Time Tracked: <strong>${totalMinutes} minutes</strong>`;
    container.insertBefore(summary, document.querySelector('.chart-wrapper'));

    // Create a Chart.js pie chart
    const ctx = document.getElementById("chart").getContext("2d");
    
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Time Spent (minutes)",
            data: timeSpentMinutes,
            backgroundColor: [
              "#6366f1", // Indigo
              "#a855f7", // Purple
              "#ec4899", // Pink
              "#f43f5e", // Rose
              "#3b82f6", // Blue
              "#10b981", // Emerald
              "#f59e0b"  // Amber
            ],
            borderColor: "rgba(15, 23, 42, 0.5)",
            borderWidth: 2,
            hoverOffset: 15,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#f8fafc",
              padding: 20,
              font: {
                size: 14,
                family: "'Inter', sans-serif"
              }
            },
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return ` ${context.label}: ${context.raw} min`;
              }
            }
          }
        },
      },
    });
  })
  .catch((error) => {
    console.error("Error fetching or processing data:", error);
    const errorContainer = document.getElementById("error-container");
    if (errorContainer) {
      errorContainer.innerHTML = `<p class="error-msg">⚠️ ${error.message}</p>`;
    } else {
      document.body.innerHTML += `<p class="error-msg">⚠️ ${error.message}</p>`;
    }
  });