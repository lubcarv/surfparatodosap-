package dev.surfparatodes.surfparatodes;
import static org.junit.jupiter.api.Assertions.*;

import dev.surfparatodes.surfparatodes.enums.UserRole;
import dev.surfparatodes.surfparatodes.validation.TypeUserValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import jakarta.validation.ConstraintValidatorContext;

public class UserRoleValidatorTest {

    private TypeUserValidator validator;

    @BeforeEach
    void setup() {
        validator = new TypeUserValidator();
    }

    @Test
    void testValidAluno() {
        ConstraintValidatorContext context = Mockito.mock(ConstraintValidatorContext.class);
        assertTrue(validator.isValid(UserRole.ALUNO, context));
    }

    @Test
    void testValidProfessor() {
        ConstraintValidatorContext context = Mockito.mock(ConstraintValidatorContext.class);
        assertTrue(validator.isValid(UserRole.PROFESSOR, context));
    }

    @Test
    void testNullValue() {
        ConstraintValidatorContext context = Mockito.mock(ConstraintValidatorContext.class);
        assertFalse(validator.isValid(null, context));
    }
}
