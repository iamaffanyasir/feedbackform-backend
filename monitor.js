// Simple monitoring script to keep the app alive
const https = require('https');

const BACKEND_URL = 'https://feedback-backend-vzgsc.ondigitalocean.app/ping';
const INTERVAL_MINUTES = 10;

function pingServer() {
  https.get(BACKEND_URL, (res) => {
    console.log(`${new Date().toISOString()}: Server pinged successfully (${res.statusCode})`);
  }).on('error', (err) => {
    console.log(`${new Date().toISOString()}: Ping failed:`, err.message);
  });
}

// Ping immediately, then every INTERVAL_MINUTES
pingServer();
setInterval(pingServer, INTERVAL_MINUTES * 60 * 1000);

console.log(`Monitoring started. Pinging ${BACKEND_URL} every ${INTERVAL_MINUTES} minutes.`);
