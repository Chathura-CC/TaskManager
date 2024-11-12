# Use Node.js as base image
FROM node:22.8.0

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install frontend dependencies
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the entire frontend code
COPY frontend/ ./

# Build the frontend for production
RUN npm run build

# Install a simple HTTP server to serve the React app
RUN npm install -g serve

# Expose port 3000 for the frontend
EXPOSE 3000

# Serve the built React app
CMD ["serve", "-s", "build", "-l", "3000"]
