package dev.surfparatodes.surfparatodes.model.user.classroomschedule;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ClassroomScheduleCreateDTO {

@NotNull(message = "O ID da turma é obrigatório.")
private Integer classroomId;

@NotNull(message = "O ID do horário é obrigatório.")
private Integer scheduleId;

private Boolean active = true;
}
