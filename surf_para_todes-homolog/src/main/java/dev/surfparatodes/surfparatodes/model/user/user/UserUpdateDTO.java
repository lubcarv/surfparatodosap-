package dev.surfparatodes.surfparatodes.model.user.user;

import dev.surfparatodes.surfparatodes.enums.SchoolingType;
import dev.surfparatodes.surfparatodes.enums.UserRole;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UserUpdateDTO {
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
    private UserRole userRole;
    private Boolean active;
    private SchoolingType schooling;
}
