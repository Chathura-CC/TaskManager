# Use Node.js 22.8.0 as base image
FROM node:22.8.0

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the entire backend code
COPY backend/ ./

# Expose the backend port
EXPOSE 5000

# Load environment variables
ENV NODE_ENV=production

# Run the backend (app.js or server.js entry point)
CMD ["npm", "start"]
