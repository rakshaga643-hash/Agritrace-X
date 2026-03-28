// Sensor Data Management
class SensorManager {
    constructor() {
        this.data = {
            moisture: 50,
            light: 50,
            temperature: 25,
            status: 'healthy'
        };
        this.history = this.loadHistory();
    }

    scanField(moisture, light, temperature) {
        this.data = { moisture, light, temperature };
        
        // Decision Logic
        if (moisture < 30) {
            this.data.status = 'critical';
        } else if (light > 70) {
            this.data.status = 'risk';
        } else {
            this.data.status = 'healthy';
        }

        // Save to history
        this.addToHistory({
            timestamp: new Date(),
            status: this.data.status,
            moisture,
            light,
            temperature
        });

        return this.data;
    }

    addToHistory(entry) {
        this.history.unshift(entry);
        if (this.history.length > 10) {
            this.history.pop();
        }
        this.saveHistory();
    }

    getStatus() {
        return this.data.status;
    }

    getHistory() {
        return this.history;
    }

    saveHistory() {
        localStorage.setItem('agritrace_history', JSON.stringify(this.history));
    }

    loadHistory() {
        const saved = localStorage.getItem('agritrace_history');
        return saved ? JSON.parse(saved) : [];
    }
}

// Initialize Sensor Manager
const sensorManager = new SensorManager();
