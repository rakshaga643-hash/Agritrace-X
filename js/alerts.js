'use strict';

class AlertSystem {
    constructor() {
        this.alerts = [];
    }

    addAlert(message) {
        const alert = { message, timestamp: new Date().toISOString() };
        this.alerts.push(alert);
        this.notify(alert);
    }

    notify(alert) {
        console.log(`New Alert: ${alert.message} at ${alert.timestamp}`);
        // Here you can add more notification handling (e.g. email, push notifications, etc.)
    }

    getAlerts() {
        return this.alerts;
    }
}

// Example usage:
const alertSystem = new AlertSystem();
alertSystem.addAlert('New planting data received.');
alertSystem.addAlert('Weather alert: Heavy rain expected.');

