package dev.surfparatodes.surfparatodes.validation;

import dev.surfparatodes.surfparatodes.enums.UserRole;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class TypeUserValidator implements ConstraintValidator<ValidTypeUser, UserRole> {

    @Override
    public boolean isValid(UserRole value, ConstraintValidatorContext context) {
        if (value == null) {
            return false; // ou true se quiser aceitar nulo
        }
        // Valida se o valor está entre os enums permitidos
        return value == UserRole.ALUNO || value == UserRole.PROFESSOR;
    }
}
