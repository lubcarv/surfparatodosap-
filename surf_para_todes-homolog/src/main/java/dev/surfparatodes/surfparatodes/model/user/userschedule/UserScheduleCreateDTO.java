package dev.surfparatodes.surfparatodes.model.user.userschedule;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserScheduleCreateDTO {
    @NotNull(message = "ID do aluno é obrigatório")
    private Integer userId;

    @NotNull(message = "ID da programação é obrigatório")
    private Integer scheduleId;

    private Boolean active;
}
