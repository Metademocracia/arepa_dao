# Stage 1: Build the static site
# Use a Node.js image to build the Nuxt.js application.
FROM node:23-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies using npm ci for faster, more reliable builds
RUN npm ci --legacy-peer-deps

# Copy the rest of the application source code
COPY . .

# Build the application for production.
# Since target is 'static', this will generate the static files in the /dist directory.
RUN npm run build


# Stage 2: Serve the static site with Nginx
# Use a lightweight Nginx image for the production server.
FROM nginx:stable-alpine

# Copy the generated static files from the 'build' stage to the Nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration
# This file should be configured to handle a Single Page Application (SPA)
# by redirecting all routes to index.html.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx in the foreground # only nginx
CMD ["nginx", "-g", "daemon off;"]
