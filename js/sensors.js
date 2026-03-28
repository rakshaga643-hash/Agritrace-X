// sensors.js

// Sensor data management functions for AgriTrace-X

/**
 * Function to initialize sensor data
 * @returns {Object} Initialized sensor data object
 */
function initializeSensorData() {
    return {
        temperature: null,
        humidity: null,
        soilMoisture: null,
        lightIntensity: null
    };
}

/**
 * Function to update temperature data
 * @param {number} temperature - The current temperature reading
 */
function updateTemperature(temperature) {
    this.temperature = temperature;
}

/**
 * Function to update humidity data
 * @param {number} humidity - The current humidity reading
 */
function updateHumidity(humidity) {
    this.humidity = humidity;
}

/**
 * Function to update soil moisture data
 * @param {number} moisture - The current soil moisture reading
 */
function updateSoilMoisture(moisture) {
    this.soilMoisture = moisture;
}

/**
 * Function to update light intensity data
 * @param {number} light - The current light intensity reading
 */
function updateLightIntensity(light) {
    this.lightIntensity = light;
}

module.exports = { 
    initializeSensorData, 
    updateTemperature, 
    updateHumidity, 
    updateSoilMoisture, 
    updateLightIntensity
};