package dev.surfparatodes.surfparatodes.converters.user;

import dev.surfparatodes.surfparatodes.enums.SchoolingType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class SchoolingTypeConverter implements AttributeConverter<SchoolingType, String> {

    @Override
    public String convertToDatabaseColumn(SchoolingType schoolingType) {

        return (schoolingType == null) ? null : schoolingType.getDescription();
    }

    @Override
    public SchoolingType convertToEntityAttribute(String description) {
        return Stream.of(SchoolingType.values())
                .filter(e -> e.getDescription().equals(description))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Escolaridade inválida: " + description));
    }
}
