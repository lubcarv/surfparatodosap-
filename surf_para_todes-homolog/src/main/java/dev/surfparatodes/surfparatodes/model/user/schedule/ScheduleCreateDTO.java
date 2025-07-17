package dev.surfparatodes.surfparatodes.model.user.schedule;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.time.DayOfWeek;

public record ScheduleCreateDTO (

        @NotNull(message = "O dia da semana é obrigatório")
        DayOfWeek dayOfWeek,

        @Pattern(regexp = "^(manhã|tarde)$", message = "Turno deve ser 'manhã', 'tarde'")
    String shift,

        @Pattern(regexp = "^das ([01]?\\d|2[0-3])h às ([01]?\\d|2[0-3])h$", message = "Informe o horário no formato: das 11h às 12h")
    String scheduleTime,

        Boolean active
)
{}
