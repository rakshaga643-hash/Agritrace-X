// Alert Management
class AlertManager {
    constructor() {
        this.alerts = [];
        this.audioContext = null;
    }

    checkCriticalCluster() {
        const criticalMarkers = mapManager.markerData.filter(m => m.status === 'critical');
        
        if (criticalMarkers.length >= 3) {
            // Check if they're close together
            const firstMarker = criticalMarkers[0];
            const nearbyCritical = mapManager.getNearbyMarkers(firstMarker.lat, firstMarker.lon, 0.1)
                .filter(m => m.status === 'critical');

            if (nearbyCritical.length >= 3) {
                this.triggerClusterAlert();
                return true;
            }
        }
        return false;
    }

    triggerClusterAlert() {
        this.createAlert('Regional Stress Detected!', 'critical');
        this.showAlertBanner();
        this.playSoundAlert();
    }

    createAlert(message, type = 'info') {
        const alert = {
            id: Date.now(),
            message,
            type,
            timestamp: new Date()
        };
        this.alerts.unshift(alert);
        if (this.alerts.length > 5) {
            this.alerts.pop();
        }
        return alert;
    }

    showAlertBanner() {
        const banner = document.getElementById('alertBanner');
        banner.style.display = 'block';
        setTimeout(() => {
            banner.style.display = 'none';
        }, 5000);
    }

    playSoundAlert() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        const ctx = this.audioContext;
        const now = ctx.currentTime;

        // Create oscillator for alert sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.setValueAtTime(800, now);
        osc.frequency.setValueAtTime(600, now + 0.1);
        
        gain.setValueAtTime(0.3, now);
        gain.setValueAtTime(0, now + 0.2);

        osc.start(now);
        osc.stop(now + 0.2);
    }

    getAlerts() {
        return this.alerts;
    }

    clearAlerts() {
        this.alerts = [];
    }
}

// Initialize Alert Manager
const alertManager = new AlertManager();

// Helper function to close alert banner
function closeAlertBanner() {
    document.getElementById('alertBanner').style.display = 'none';
}
