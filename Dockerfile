# Use the official Node.js 20 Alpine base image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Copy dependency manifests
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy the rest of the application files with appropriate ownership
COPY --chown=node:node . .

# Use the non-root node user for executing the application
USER node

# Expose the port on which the app runs
EXPOSE 8080

# Run the app directly using node for better OS signal handling
CMD ["node", "app.js"]
