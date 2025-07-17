# ---------- Stage 1: build ----------
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /build
COPY pom.xml .
COPY src ./src
RUN mvn -B package -DskipTests   # gera target/*.jar

# ---------- Stage 2: runtime ----------
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /build/target/surfparatodes-0.0.1-SNAPSHOT.jar app.jar

# espaço entre a instrução e os argumentos!
ENTRYPOINT ["java", "-jar", "app.jar"]
