package dev.surfparatodes.surfparatodes.model.user.userlogin;

import dev.surfparatodes.surfparatodes.enums.TypeRole;
import dev.surfparatodes.surfparatodes.model.user.user.Users;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterDTO(

        @NotBlank(message = "O e-mail é obrigatório")
        @Email(message = "O e-mail deve ser válido")
        String email,

        @NotBlank(message = "A senha é obrigatória")
        @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
        String password,

        Integer userId,

        @NotNull(message = "O tipo de role é obrigatório")
        TypeRole role,

        @NotBlank(message = "O nome completo é obrigatório")
        @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres")
        String fullName,


        @Pattern(regexp = "^\\+?[0-9]{10,14}$", message = "Formato de telefone inválido")
        String phone
) {}
