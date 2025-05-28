// Initialize the dashboard when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

// Initialize dashboard with data from the API
function initializeDashboard() {
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                updateDashboard(data.data);
                updateChart(data.data);
                updateAnalysis(data.data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Error loading data. Please try again.', 'danger');
        });
}

// Update dashboard summary cards
function updateDashboard(data) {
    // Update total points
    document.getElementById('totalPoints').textContent = data.values.length;
    
    // Calculate and update average
    const avg = data.values.reduce((a, b) => a + b, 0) / data.values.length;
    document.getElementById('avgValue').textContent = avg.toFixed(2);
    
    // Update category count
    const uniqueCategories = new Set(data.categories);
    document.getElementById('categoryCount').textContent = uniqueCategories.size;
}

// Update the chart with data
function updateChart(data) {
    const ctx = document.getElementById('mainChart').getContext('2d');
    
    if (window.mainChart) {
        window.mainChart.destroy();
    }
    
    window.mainChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.dates,
            datasets: [{
                label: 'Value',
                data: data.values,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Data Visualization'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Update analysis section
function updateAnalysis(data) {
    const values = data.values;
    const categories = new Set(data.categories);
    
    document.getElementById('maxValue').textContent = Math.max(...values).toFixed(2);
    document.getElementById('minValue').textContent = Math.min(...values).toFixed(2);
    document.getElementById('categories').textContent = Array.from(categories).join(', ');
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    notification.style.zIndex = '1050';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
} 