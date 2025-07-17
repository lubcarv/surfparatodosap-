package dev.surfparatodes.surfparatodes.controller;

import dev.surfparatodes.surfparatodes.enums.UserRole;
import dev.surfparatodes.surfparatodes.converters.user.UserMapper;
import dev.surfparatodes.surfparatodes.model.user.user.UserUpdateDTO;
import dev.surfparatodes.surfparatodes.model.user.user.Users;
import dev.surfparatodes.surfparatodes.model.user.user.UserCreateDTO;
import dev.surfparatodes.surfparatodes.model.user.user.UserResponseDTO;
import dev.surfparatodes.surfparatodes.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    // Criar usuário
    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody @Valid UserCreateDTO userDTO) {
        Users user = userMapper.toEntity(userDTO);
        Users savedUser = userService.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(userMapper.toDTO(savedUser));
    }

    // Listar todos
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = userService.getAllUsers()
                .stream()
                .map(userMapper::toDTO)
                .toList();
        return ResponseEntity.ok(users);
    }




    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(
            @PathVariable int id,
            @RequestBody @Valid UserUpdateDTO userDTO) {

        Users userEntity = userMapper.toEntity(userDTO);
        Users updatedUser = userService.updateUser(id, userEntity);
        return ResponseEntity.ok(userMapper.toDTO(updatedUser));
    }


    @PutMapping("/{id}/reactivate")
    public ResponseEntity<UserResponseDTO> reactivateUser(@PathVariable int id) {
        Users reactivatedUser = userService.reactivateUser(id);
        return ResponseEntity.ok(userMapper.toDTO(reactivatedUser));
    }

    // Deletar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // Listar usuários ativos por tipo
    @GetMapping("/{userRole}/ativos")
    public ResponseEntity<List<UserResponseDTO>> getActiveUsersByRole(@PathVariable UserRole userRole) {
        List<UserResponseDTO> users = userService
                .getUsersByRoleAndStatus(userRole, true)
                .stream()
                .map(userMapper::toDTO)
                .toList();
        return ResponseEntity.ok(users);
    }

    // Listar usuários inativos por tipo
    @GetMapping("/{userRole}/inativos")
    public ResponseEntity<List<UserResponseDTO>> getInactiveUsersByRole(@PathVariable UserRole userRole) {
        List<UserResponseDTO> users = userService
                .getUsersByRoleAndStatus(userRole, false)
                .stream()
                .map(userMapper::toDTO)
                .toList();
        return ResponseEntity.ok(users);
    }


}
