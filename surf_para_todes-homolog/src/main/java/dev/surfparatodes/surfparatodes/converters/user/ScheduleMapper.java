package dev.surfparatodes.surfparatodes.converters.user;

import dev.surfparatodes.surfparatodes.model.user.schedule.Schedule;
import dev.surfparatodes.surfparatodes.model.user.schedule.ScheduleCreateDTO;
import dev.surfparatodes.surfparatodes.model.user.schedule.ScheduleResponseDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "DEFAULT")
public interface ScheduleMapper {
    ScheduleResponseDTO toResponseDTO(Schedule schedule);
    Schedule toEntity(ScheduleCreateDTO dto);
}
