package dev.surfparatodes.surfparatodes.converters.user;

import dev.surfparatodes.surfparatodes.model.user.classroomschedule.ClassroomSchedule;
import dev.surfparatodes.surfparatodes.model.user.classroomschedule.ClassroomScheduleCreateDTO;
import dev.surfparatodes.surfparatodes.model.user.classroomschedule.ClassroomScheduleId;
import dev.surfparatodes.surfparatodes.model.user.classroomschedule.ClassroomScheduleResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ClassroomScheduleMapper {

    @Mapping(target = "classroomId", source = "classroom.id")
    @Mapping(target = "scheduleId", source = "schedule.id")
    ClassroomScheduleResponseDTO toResponseDTO(ClassroomSchedule classroomSchedule);

    @Mapping(target = "classroom.id", source = "classroomId")
    @Mapping(target = "schedule.id", source = "scheduleId")
    ClassroomSchedule toEntity(ClassroomScheduleCreateDTO dto);
}

