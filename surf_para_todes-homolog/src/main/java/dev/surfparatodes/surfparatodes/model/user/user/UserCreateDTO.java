package dev.surfparatodes.surfparatodes.model.user.user;

import dev.surfparatodes.surfparatodes.enums.SchoolingType;
import dev.surfparatodes.surfparatodes.enums.UserRole;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserCreateDTO {
        @NotNull
        private UserRole userRole;
        @NotBlank
        private String registerName;
        private String socialName;
        private LocalDate birthDate;
        private String guardianName;
        private String guardianRelationship;
        private String guardianPhone;
        private String gender;
        private String race;
        private String phone;
        private String email;
        private SchoolingType schooling;
}
