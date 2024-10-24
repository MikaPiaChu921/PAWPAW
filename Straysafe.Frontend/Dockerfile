FROM node:18

# Define build arguments for environment variables
ARG VITE_API_BASE_URL

# Set environment variables during the build process
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev"]