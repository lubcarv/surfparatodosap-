package dev.surfparatodes.surfparatodes.configurations;


import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Surf Para Todes")
                        .version("1.0.0")
                        .description("Documentação dos endpoints da Surf Para Todes, oferecendo recursos para limpeza eficiente e rápida.")
                        .termsOfService("http://surfparatodes.com/terms")
                        .contact(new Contact()
                                .name("Equipe Surf Para Todes")
                                .email("contato@surfparatodes.com")
                                .url("http://surfparatodes.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("http://opensource.org/licenses/MIT"))
                );
    }
}
