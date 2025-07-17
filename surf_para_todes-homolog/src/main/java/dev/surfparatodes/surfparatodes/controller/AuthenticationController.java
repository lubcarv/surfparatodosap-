package dev.surfparatodes.surfparatodes.controller;

import dev.surfparatodes.surfparatodes.infra.security.TokenService;
import dev.surfparatodes.surfparatodes.model.user.user.Users;
import dev.surfparatodes.surfparatodes.model.user.userlogin.*;
import dev.surfparatodes.surfparatodes.repository.UserLoginRepository;
import dev.surfparatodes.surfparatodes.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final UserLoginRepository repository;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthenticationDTO data) {
        try {
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(data.email(), data.password());

            Authentication authentication = authenticationManager.authenticate(authToken);

            UserLogin user = (UserLogin) authentication.getPrincipal();
            String token = tokenService.generateToken(user);

            return ResponseEntity.ok(new LoginResponseDTO(token));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponseDTO("Falha na autenticação", e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterDTO data) {
        if (repository.findByEmail(data.email()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new ErrorResponseDTO("Cadastro duplicado", "Usuário já existe."));
        }

        try {
            Users user = userRepository.findById(data.userId())
                    .orElseThrow(() -> new EntityNotFoundException("Usuário base não encontrado."));

            String encryptedPassword = passwordEncoder.encode(data.password());

            UserLogin newUser = new UserLogin(
                    data.email(),
                    data.fullName(),
                    user,
                    encryptedPassword,
                    data.role(),
                    data.phone()
            );

            repository.save(newUser);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new MessageDTO("Usuário registrado com sucesso."));

        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponseDTO("Erro no cadastro", e.getMessage()));
        }
    }

    private record ErrorResponseDTO(String falhaNaAutenticação, String message) {
    }
}
