package dev.surfparatodes.surfparatodes.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = TypeUserValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidTypeUser {
    String message() default "Tipo de usuário inválido. Deve ser ALUNO (1) ou PROFESSOR (2).";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
