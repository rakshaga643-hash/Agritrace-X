// ========== MAIN APPLICATION ==========

class AgriTraceApp {
    constructor() {
        this.initializeEventListeners();
        this.updateDashboard();
    }

    initializeEventListeners() {
        // Scan Field Button
        document.getElementById('scanBtn').addEventListener('click', () => this.scanField());

        // Simulate Cluster Button
        document.getElementById('simulateBtn').addEventListener('click', () => this.simulateCluster());

        // Slider Updates
        document.getElementById('moisture').addEventListener('input', (e) => {
            document.getElementById('moistureValue').textContent = e.target.value + '%';
        });

        document.getElementById('light').addEventListener('input', (e) => {
            document.getElementById('lightValue').textContent = e.target.value + '%';
        });
    }

    scanField() {
        const moisture = parseInt(document.getElementById('moisture').value);
        const light = parseInt(document.getElementById('light').value);
        const temperature = parseInt(document.getElementById('temp').value);

        // Get sensor data
        const result = sensorManager.scanField(moisture, light, temperature);

        // Get current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                const markerEntry = mapManager.addMarker(latitude, longitude, result.status, {
                    moisture, light, temperature
                });

                // Update UI
                this.updateHistoryUI();
                this.updateDashboard();
                this.updateMarkersUI();

                // Check for critical cluster
                if (alertManager.checkCriticalCluster()) {
                    console.log('🚨 Critical cluster detected!');
                }

                // Show success feedback
                this.showScanFeedback(result.status);
            });
        }
    }

    simulateCluster() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;

                // Add 3 random critical markers nearby
                mapManager.addRandomCriticalMarkers(latitude, longitude, 3);

                // Update UI
                this.updateHistoryUI();
                this.updateDashboard();
                this.updateMarkersUI();

                // Trigger alert
                alertManager.checkCriticalCluster();
            });
        }
    }

    updateDashboard() {
        const markers = mapManager.getMarkers();
        const totalScans = sensorManager.getHistory().length;
        const healthyCount = markers.filter(m => m.status === 'healthy').length;
        const riskCount = markers.filter(m => m.status === 'risk').length;
        const criticalCount = markers.filter(m => m.status === 'critical').length;

        document.getElementById('totalScans').textContent = totalScans;
        document.getElementById('healthyCount').textContent = healthyCount;
        document.getElementById('riskCount').textContent = riskCount;
        document.getElementById('criticalCount').textContent = criticalCount;
    }

    updateHistoryUI() {
        const history = sensorManager.getHistory();
        const historyList = document.getElementById('historyList');

        if (history.length === 0) {
            historyList.innerHTML = '<p class="empty-state">No scans yet...</p>';
            return;
        }

        historyList.innerHTML = history.map(entry => `
            <div class="history-item ${entry.status}">
                <div class="history-time">${new Date(entry.timestamp).toLocaleTimeString()}</div>
                <div class="history-status">● ${entry.status.toUpperCase()}</div>
                <div class="history-values">
                    M: ${entry.moisture}% | L: ${entry.light}% | T: ${entry.temperature}°C
                </div>
            </div>
        `).join('');
    }

    updateMarkersUI() {
        const markers = mapManager.getMarkers();
        const markersList = document.getElementById('markersList');

        if (markers.length === 0) {
            markersList.innerHTML = '<p class="empty-state">No markers added...</p>';
            return;
        }

        markersList.innerHTML = markers.map(marker => `
            <div class="marker-item ${marker.status}">
                <div class="marker-info">
                    <div class="marker-status">● ${marker.status.toUpperCase()}</div>
                    <div class="marker-coords">${marker.lat.toFixed(4)}, ${marker.lon.toFixed(4)}</div>
                </div>
                <button class="marker-delete" onclick="deleteMarker(${marker.id})">Delete</button>
            </div>
        `).join('');
    }

    showScanFeedback(status) {
        const messages = {
            healthy: '✓ Field is healthy!',
            risk: '⚠ Caution: Field at risk',
            critical: '✕ Critical condition detected!'
        };

        alert(messages[status]);
    }
}

// Global function to delete marker
function deleteMarker(id) {
    mapManager.deleteMarker(id);
    const app = new AgriTraceApp();
    app.updateMarkersUI();
    app.updateDashboard();
}

// Initialize Application
const app = new AgriTraceApp();

// Update dashboard on page load
window.addEventListener('load', () => {
    app.updateHistoryUI();
    app.updateMarkersUI();
    app.updateDashboard();
});
