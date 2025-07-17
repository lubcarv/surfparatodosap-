# Etapa de build
FROM ubuntu:latest AS build

RUN apt-get update && \
    apt-get install -y openjdk-21-jdk maven

# Define diretório de trabalho dentro do container
WORKDIR /app

# Copia todos os arquivos do projeto para dentro do container
COPY . .

# Executa o Maven no local correto (onde está o pom.xml)
RUN mvn clean install -DskipTests

# Etapa de execução
FROM openjdk:21-jdk-slim

EXPOSE 8080

# Copia o JAR gerado na etapa anterior
COPY --from=build /app/target/surfparatodes-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
