package dev.surfparatodes.surfparatodes.converters.user;

import dev.surfparatodes.surfparatodes.enums.UserRole;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class StringToTypeUserConverter implements Converter<String, UserRole> {

    @Override
    public UserRole convert(String source) {
        try {
            return UserRole.fromCode(Integer.parseInt(source));
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Código inválido para TypeUser: " + source);
        }
    }
}
