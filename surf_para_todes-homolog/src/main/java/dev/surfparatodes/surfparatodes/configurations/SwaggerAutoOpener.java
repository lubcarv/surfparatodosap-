package dev.surfparatodes.surfparatodes.configurations;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class SwaggerAutoOpener implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments args) {
        try {
            Thread.sleep(2000);

            String swaggerUrl = "http://localhost:3535/swagger-ui/index.html";
            String os = System.getProperty("os.name").toLowerCase();

            if (os.contains("win")) {
                new ProcessBuilder("cmd", "/c", "start", swaggerUrl).start();
            } else if (os.contains("mac")) {
                new ProcessBuilder("open", swaggerUrl).start();
            } else if (os.contains("nix") || os.contains("nux")) {
                new ProcessBuilder("xdg-open", swaggerUrl).start();
            }

            System.out.println("Swagger UI aberto em: " + swaggerUrl);

        } catch (Exception e) {
            System.err.println("Erro ao tentar abrir o navegador: " + e.getMessage());
        }
    }
}
