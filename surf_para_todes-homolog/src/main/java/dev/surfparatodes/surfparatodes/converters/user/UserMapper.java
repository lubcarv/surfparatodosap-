package dev.surfparatodes.surfparatodes.converters.user;

import dev.surfparatodes.surfparatodes.model.user.user.UserUpdateDTO;
import dev.surfparatodes.surfparatodes.model.user.user.Users;
import dev.surfparatodes.surfparatodes.model.user.user.UserCreateDTO;
import dev.surfparatodes.surfparatodes.model.user.user.UserResponseDTO;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component @Mapper(componentModel = "spring")
public class UserMapper {

    public Users toEntity(UserCreateDTO dto) {
        Users user = new Users();
        user.setUserRole(dto.getUserRole());
        user.setRegisterName(dto.getRegisterName());
        user.setSocialName(dto.getSocialName());
        user.setBirthDate(dto.getBirthDate());
        user.setGuardianName(dto.getGuardianName());
        user.setGuardianRelationship(dto.getGuardianRelationship());
        user.setGuardianPhone(dto.getGuardianPhone());
        user.setGender(dto.getGender());
        user.setRace(dto.getRace());
        user.setPhone(dto.getPhone());
        user.setEmail(dto.getEmail());
        user.setSchooling(dto.getSchooling());
        user.setActive(true);
        return user;
    }

    public UserResponseDTO toDTO(Users user) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(user.getId());
        dto.setUserRole(user.getUserRole());
        dto.setRegisterName(user.getRegisterName());
        dto.setSocialName(user.getSocialName());
        dto.setBirthDate(user.getBirthDate());
        dto.setGuardianName(user.getGuardianName());
        dto.setGuardianRelationship(user.getGuardianRelationship());
        dto.setGuardianPhone(user.getGuardianPhone());
        dto.setGender(user.getGender());
        dto.setRace(user.getRace());
        dto.setPhone(user.getPhone());
        dto.setEmail(user.getEmail());
        dto.setSchooling(user.getSchooling());
        dto.setActive(user.getActive());
        dto.setCreatedAt(user.getCreatedAt());
        return dto;
    }

    public Users toEntity(UserUpdateDTO dto) {
        Users user = new Users();
        user.setUserRole(dto.getUserRole());
        user.setRegisterName(dto.getRegisterName());
        user.setSocialName(dto.getSocialName());
        user.setBirthDate(dto.getBirthDate());
        user.setGuardianName(dto.getGuardianName());
        user.setGuardianRelationship(dto.getGuardianRelationship());
        user.setGuardianPhone(dto.getGuardianPhone());
        user.setGender(dto.getGender());
        user.setRace(dto.getRace());
        user.setPhone(dto.getPhone());
        user.setEmail(dto.getEmail());
        user.setSchooling(dto.getSchooling());
        if (dto.getActive() != null) {
            user.setActive(dto.getActive());
        }
        return user;
    }

}
