# Stage 1: Build the React app
FROM node:18-alpine AS builder
WORKDIR /app

# Install pnpm globally (cached unless package.json or pnpm-lock.yaml change)
RUN npm install -g pnpm

# Copy only package manager files first to leverage Docker cache
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the app files and build (will invalidate cache only if source files change)
COPY . . 
RUN pnpm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy only the build output to the final image (smaller final image size)
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the application on port 80
EXPOSE 80

# Default command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
