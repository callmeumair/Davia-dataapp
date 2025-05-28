// Initialize the dashboard when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

// Initialize dashboard with data from the API
async function initializeDashboard(retryCount = 0) {
    try {
        const response = await fetch('/api/data');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.status === 'success') {
            updateDashboard(data.data);
            updateChart(data.data);
            updateAnalysis(data.data);
        } else {
            throw new Error(data.message || 'Unknown error occurred');
        }
    } catch (error) {
        console.error('Error:', error);
        
        // Retry logic (up to 3 times)
        if (retryCount < 3) {
            showNotification(`Retrying... (${retryCount + 1}/3)`, 'warning');
            setTimeout(() => {
                initializeDashboard(retryCount + 1);
            }, 2000 * (retryCount + 1)); // Exponential backoff
        } else {
            showNotification('Error loading data. Please refresh the page.', 'danger');
        }
    }
}

// Update dashboard summary cards
function updateDashboard(data) {
    try {
        // Update total points
        document.getElementById('totalPoints').textContent = data.values.length;
        
        // Calculate and update average
        const avg = data.values.reduce((a, b) => a + b, 0) / data.values.length;
        document.getElementById('avgValue').textContent = avg.toFixed(2);
        
        // Update category count
        const uniqueCategories = new Set(data.categories);
        document.getElementById('categoryCount').textContent = uniqueCategories.size;
    } catch (error) {
        console.error('Error updating dashboard:', error);
        showNotification('Error updating dashboard display', 'danger');
    }
}

// Update the chart with data
function updateChart(data) {
    try {
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
    } catch (error) {
        console.error('Error updating chart:', error);
        showNotification('Error updating chart display', 'danger');
    }
}

// Update analysis section
function updateAnalysis(data) {
    try {
        const values = data.values;
        const categories = new Set(data.categories);
        
        document.getElementById('maxValue').textContent = Math.max(...values).toFixed(2);
        document.getElementById('minValue').textContent = Math.min(...values).toFixed(2);
        document.getElementById('categories').textContent = Array.from(categories).join(', ');
    } catch (error) {
        console.error('Error updating analysis:', error);
        showNotification('Error updating analysis display', 'danger');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    try {
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
    } catch (error) {
        console.error('Error showing notification:', error);
    }
}

// Add refresh button functionality
document.addEventListener('DOMContentLoaded', function() {
    const refreshButton = document.createElement('button');
    refreshButton.className = 'btn btn-primary position-fixed bottom-0 end-0 m-3';
    refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i>';
    refreshButton.title = 'Refresh Data';
    refreshButton.onclick = () => initializeDashboard();
    document.body.appendChild(refreshButton);
}); 