package dev.surfparatodes.surfparatodes.model.user.schedule;
import dev.surfparatodes.surfparatodes.model.user.classroomschedule.ClassroomScheduleResponseDTO;

import java.time.DayOfWeek;
import java.util.Set;

public record ScheduleResponseDTO(
        Integer id,
        DayOfWeek dayOfWeek,
        String shift,
        String schedule_time,
        Boolean active,
        Set<ClassroomScheduleResponseDTO> classes

) {
}
