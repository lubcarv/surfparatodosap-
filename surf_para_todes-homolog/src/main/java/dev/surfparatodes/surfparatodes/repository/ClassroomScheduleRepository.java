package dev.surfparatodes.surfparatodes.repository;

import dev.surfparatodes.surfparatodes.model.user.classroomschedule.ClassroomSchedule;
import dev.surfparatodes.surfparatodes.model.user.classroomschedule.ClassroomScheduleId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassroomScheduleRepository extends JpaRepository<ClassroomSchedule, ClassroomScheduleId> {
    List<ClassroomSchedule> findByClassroomId(Integer classroomId);

    List<ClassroomSchedule> findByScheduleId(Integer scheduleId);

    Optional<ClassroomSchedule> findByClassroomIdAndScheduleId(Integer classroomId, Integer scheduleId);

}
