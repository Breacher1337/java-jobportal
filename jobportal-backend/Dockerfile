FROM ubuntu:latest
LABEL authors="elaij"

# backend/Dockerfile

FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy build artifacts (adjust if you use Gradle instead of Maven)
COPY build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
