package dev.surfparatodes.surfparatodes.model.user.user;

import dev.surfparatodes.surfparatodes.enums.SchoolingType;
import dev.surfparatodes.surfparatodes.enums.UserRole;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class UserResponseDTO {
    private Integer id;
    private UserRole userRole;
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
    private Boolean active;
    private LocalDateTime createdAt;
}
