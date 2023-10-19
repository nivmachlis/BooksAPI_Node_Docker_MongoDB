# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy your source code into the container
COPY . .

# Expose the port your app is listening on (default is 3000)
EXPOSE 4000

# Define the command to start your Node.js application
CMD [ "npm", "start" ]
