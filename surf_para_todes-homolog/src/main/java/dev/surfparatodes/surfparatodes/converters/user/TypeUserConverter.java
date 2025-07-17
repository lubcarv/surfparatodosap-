package dev.surfparatodes.surfparatodes.converters.user;

import dev.surfparatodes.surfparatodes.enums.UserRole;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class TypeUserConverter implements AttributeConverter<UserRole, Integer> {

    @Override
    public Integer convertToDatabaseColumn(UserRole attribute) {
        return attribute != null ? attribute.getCode() : null;
    }

    @Override
    public UserRole convertToEntityAttribute(Integer dbData) {
        return dbData != null ? UserRole.fromCode(dbData) : null;
    }
}
