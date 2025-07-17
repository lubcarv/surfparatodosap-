package dev.surfparatodes.surfparatodes.model.user.classroomschedule;

import lombok.Data;

@Data
public class ClassroomScheduleResponseDTO {

    private Integer classroomId;
    private Integer scheduleId;
    private Boolean active;
}
