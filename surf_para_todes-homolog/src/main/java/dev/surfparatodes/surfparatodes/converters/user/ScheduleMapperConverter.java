package dev.surfparatodes.surfparatodes.converters.user;

import dev.surfparatodes.surfparatodes.model.user.schedule.Schedule;
import dev.surfparatodes.surfparatodes.model.user.schedule.ScheduleCreateDTO;
import dev.surfparatodes.surfparatodes.model.user.schedule.ScheduleResponseDTO;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@Primary
public class ScheduleMapperConverter implements ScheduleMapper {

    private final ClassroomScheduleMapper classroomScheduleMapper;

    public ScheduleMapperConverter(ClassroomScheduleMapper classroomScheduleMapper) {
        this.classroomScheduleMapper = classroomScheduleMapper;
    }

    @Override
    public ScheduleResponseDTO toResponseDTO(Schedule schedule) {
        return new ScheduleResponseDTO(
                schedule.getId(),
                schedule.getDayOfWeek(),
                schedule.getShift(),
                schedule.getScheduleTime(),
                schedule.getActive(),
                Optional.ofNullable(schedule.getClassroomSchedule())
                        .orElseGet(Set::of)
                        .stream()
                        .map(classroomScheduleMapper::toResponseDTO)
                        .collect(Collectors.toSet())

        );
    }

    @Override
    public Schedule toEntity(ScheduleCreateDTO dto) {
        Schedule schedule = new Schedule();
        schedule.setDayOfWeek(dto.dayOfWeek());
        schedule.setShift(dto.shift());
        schedule.setScheduleTime(dto.scheduleTime());
        schedule.setActive(dto.active());
        return schedule;
    }
}
