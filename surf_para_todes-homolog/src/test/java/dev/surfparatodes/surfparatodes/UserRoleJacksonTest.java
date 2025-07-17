package dev.surfparatodes.surfparatodes;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.surfparatodes.surfparatodes.enums.UserRole;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

    public class UserRoleJacksonTest {

        private final ObjectMapper mapper = new ObjectMapper();

        @Test
        public void testSerializeTypeUser() throws Exception {
            String json = mapper.writeValueAsString(UserRole.ALUNO);
            assertEquals("1", json); // Deve serializar como "1"
        }

        @Test
        public void testDeserializeTypeUser() throws Exception {
            UserRole type = mapper.readValue("2", UserRole.class);
            assertEquals(UserRole.PROFESSOR, type);
        }

        @Test
        public void testDeserializeInvalidTypeUser() {
            Exception exception = assertThrows(Exception.class, () -> {
                mapper.readValue("99", UserRole.class);
            });
            assertTrue(exception.getCause() instanceof IllegalArgumentException);
            assertTrue(exception.getCause().getMessage().contains("Código inválido"));
        }
    }


