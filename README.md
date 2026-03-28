# 🌾 AgriTrace X – Smart Farm Intelligence System

**Decentralized Farm Intelligence Network**

## 📋 Overview

AgriTrace X is a cutting-edge web application that brings IoT-enabled agricultural monitoring to the palms of farmers. Using real-time sensor data, geolocation, and advanced analytics, the system helps detect critical field conditions and prevent crop loss.

## 🎨 Features

### ✨ Core Features

1. **🌍 Live Geolocation Map**
   - Interactive Leaflet.js map centered on user location
   - Dynamic marker placement based on scan results
   - Color-coded markers (Green/Yellow/Red)

2. **📥 Smart Sensor Scanner**
   - Soil Moisture monitoring (0-100%)
   - Light Level tracking (0-100%)
   - Temperature reading (°C)
   - Single-click field scanning

3. **📊 Status Dashboard**
   - Real-time statistics
   - Total scans, Healthy, Risk, and Critical counts
   - Visual metric displays

4. **🔥 Critical Alert System**
   - Automatic cluster detection (3+ critical markers)
   - Animated alert banners
   - Sound notifications
   - Regional stress detection

5. **📜 Scan History**
   - Last 10 scans displayed
   - Timestamp, status, and sensor values
   - Color-coded status indicators

6. **💾 Data Persistence**
   - localStorage integration
   - Persistent markers and history
   - Automatic data recovery on refresh

### 🎯 Advanced Features

- **Glassmorphism Design** with modern UI/UX
- **Neon Highlights** for better visibility
- **Responsive Design** for mobile & desktop
- **Glow & Pulse Animations** for visual appeal
- **Simulate Cluster Feature** for testing alerts

## 🏗️ Project Structure

```
agritrace-x/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js           # Main application logic
│   ├── sensors.js       # Sensor data management
│   ├── map.js           # Map & marker management
│   └── alerts.js        # Alert system
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for Leaflet map tiles)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/agritrace-x.git
cd agritrace-x
```

2. Open in browser:
```bash
# Using Python
python -m http.server 8000

# Or using Node.js
npx http-server

# Or simply open index.html in your browser
```

3. Grant location permission when prompted

## 📖 Usage Guide

### Scanning a Field

1. Adjust the sliders for:
   - **Soil Moisture**: 0-100% (lower = drier)
   - **Light Level**: 0-100% (higher = brighter)
   - **Temperature**: Enter manual temperature value

2. Click **"🔍 SCAN FIELD"**

3. Grant location permission (first time only)

4. View results:
   - Map marker appears at your location
   - Status dashboard updates
   - Scan history recorded

### Status Logic

| Condition | Status | Color |
|-----------|--------|-------|
| Moisture < 30% | 🔴 CRITICAL | Red |
| Light > 70% | 🟡 RISK | Yellow |
| Otherwise | 🟢 HEALTHY | Green |

### Cluster Alerts

When 3+ critical markers are detected within close proximity:
- **Alert Banner**: Animated notification at top
- **Sound Alert**: Beep notification
- **Dashboard**: Critical count highlights

### Testing Alerts

Click **"⚡ SIMULATE CLUSTER"** to:
- Add 3 random critical markers
- Trigger cluster alert
- Test notification system

## 🎨 Design System

### Color Palette
- **Primary (Healthy)**: `#00ff41` (Neon Green)
- **Warning (Risk)**: `#ffaa00` (Neon Yellow)
- **Danger (Critical)**: `#ff0055` (Neon Red)
- **Background**: `#0a0e27` (Dark Blue)

### Typography
- **Font**: Segoe UI, Tahoma, Geneva, Verdana
- **Headers**: Letter-spaced, bold
- **Body**: Clean, readable

### Effects
- **Glassmorphism**: Blur + transparency
- **Glow**: Box-shadow with neon colors
- **Animations**: Smooth transitions, pulse effects

## 📱 Responsive Breakpoints

- **Desktop**: Full layout with 3-column design
- **Tablet**: 2-column layout
- **Mobile**: Single-column, stacked panels

## 💾 Data Storage

### localStorage Keys
- `agritrace_history` – Scan history (max 10 entries)
- `agritrace_markers` – Saved markers with metadata

## 🔧 Technologies Used

- **HTML5** – Semantic structure
- **CSS3** – Glassmorphism, animations
- **JavaScript (ES6+)** – Core logic
- **Leaflet.js** – Interactive maps
- **Geolocation API** – User location
- **Web Audio API** – Sound alerts
- **localStorage** – Data persistence

## 🎯 Hackathon Features

✅ Visually impressive UI
✅ Fully functional features
✅ Real-time monitoring simulation
✅ Professional branding
✅ Responsive design
✅ Advanced animations
✅ Sound alerts
✅ Persistent data storage

## 📜 License

MIT License - Feel free to use for personal or commercial projects

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📧 Support

For issues or questions, open a GitHub issue or contact the development team.

---

**Built with ❤️ for sustainable agriculture**
