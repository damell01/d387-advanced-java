FROM ubuntu:latest
LABEL authors="DamellBell"



# Start with a base image containing a Java runtime
FROM openjdk:17-jdk-slim as build

# Set the working directory inside the Docker image
WORKDIR /app

# Copy the JAR file from the target directory to the container at /app
COPY target/D387_sample_code-0.0.2-SNAPSHOT.jar /app/app.jar

# Expose port 8080
EXPOSE 8080

# Define the entry point of the application
ENTRYPOINT ["java", "-jar", "app.jar"]

