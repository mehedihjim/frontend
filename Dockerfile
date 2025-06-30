# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine

WORKDIR /app

# Copy the built application from the previous stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public

# Expose the port the app runs on
EXPOSE 3000

# Start the server using the standalone build
CMD ["node", "server.js"]