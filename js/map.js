// Map Management
class MapManager {
    constructor(containerId) {
        this.map = L.map(containerId).setView([20, 78], 5);
        this.markers = [];
        this.markerData = this.loadMarkers();
        this.initMap();
        this.loadSavedMarkers();
    }

    initMap() {
        // Dark tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap, © CartoDB',
            maxZoom: 19,
            noWrap: true
        }).addTo(this.map);

        // Get user location
        this.getUserLocation();
    }

    getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    this.map.setView([latitude, longitude], 12);
                    this.addLocationMarker(latitude, longitude);
                },
                (error) => {
                    console.log('Geolocation not available:', error);
                    // Default to center of India
                    this.map.setView([20, 78], 5);
                }
            );
        }
    }

    addLocationMarker(lat, lon) {
        L.circleMarker([lat, lon], {
            radius: 8,
            fillColor: 'var(--primary-color)',
            color: '#00ff41',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(this.map).bindPopup('📍 Your Location');
    }

    addMarker(lat, lon, status, data) {
        const statusConfig = {
            healthy: { color: '#00ff41', icon: '✓' },
            risk: { color: '#ffaa00', icon: '⚠' },
            critical: { color: '#ff0055', icon: '✕' }
        };

        const config = statusConfig[status] || statusConfig.healthy;

        const marker = L.marker([lat, lon], {
            icon: L.divIcon({
                className: `custom-marker marker-${status}`,
                html: `<div style="color: ${config.color}; font-size: 24px; text-shadow: 0 0 10px ${config.color};">${config.icon}</div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            })
        }).addTo(this.map);

        const popupContent = `
            <strong>${status.toUpperCase()}</strong><br>
            Moisture: ${data.moisture}%<br>
            Light: ${data.light}%<br>
            Temp: ${data.temperature}°C
        `;
        marker.bindPopup(popupContent);

        const markerEntry = {
            id: Date.now(),
            lat,
            lon,
            status,
            data,
            timestamp: new Date().toISOString()
        };

        this.markers.push(marker);
        this.markerData.push(markerEntry);
        this.saveMarkers();

        return markerEntry;
    }

    getMarkers() {
        return this.markerData;
    }

    deleteMarker(id) {
        const index = this.markerData.findIndex(m => m.id === id);
        if (index !== -1) {
            this.map.removeLayer(this.markers[index]);
            this.markers.splice(index, 1);
            this.markerData.splice(index, 1);
            this.saveMarkers();
        }
    }

    getNearbyMarkers(lat, lon, radius = 0.05) {
        return this.markerData.filter(marker => {
            const distance = Math.sqrt(
                Math.pow(marker.lat - lat, 2) + Math.pow(marker.lon - lon, 2)
            );
            return distance < radius;
        });
    }

    saveMarkers() {
        localStorage.setItem('agritrace_markers', JSON.stringify(this.markerData));
    }

    loadMarkers() {
        const saved = localStorage.getItem('agritrace_markers');
        return saved ? JSON.parse(saved) : [];
    }

    loadSavedMarkers() {
        this.markerData.forEach(data => {
            this.addMarker(data.lat, data.lon, data.status, data.data);
        });
    }

    addRandomCriticalMarkers(centerLat, centerLon, count = 3) {
        const newMarkers = [];
        for (let i = 0; i < count; i++) {
            const randomLat = centerLat + (Math.random() - 0.5) * 0.05;
            const randomLon = centerLon + (Math.random() - 0.5) * 0.05;
            const markerEntry = this.addMarker(randomLat, randomLon, 'critical', {
                moisture: Math.random() * 30,
                light: Math.random() * 100,
                temperature: 20 + Math.random() * 10
            });
            newMarkers.push(markerEntry);
        }
        return newMarkers;
    }
}

// Initialize Map Manager
const mapManager = new MapManager('map');
