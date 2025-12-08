#!/bin/bash
echo "Starting Legacy Version (0.3.93) on Port 3005..."
cd legacy-comparison
export PORT=3005
export BROWSER=none
npm run start:legacy
