package dev.surfparatodes.surfparatodes.repository;

import dev.surfparatodes.surfparatodes.model.user.user.Users;
import dev.surfparatodes.surfparatodes.model.user.userschedule.UserSchedule;
import dev.surfparatodes.surfparatodes.model.user.userschedule.UserScheduleId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserScheduleRepository extends JpaRepository<UserSchedule, UserScheduleId> {
    // Busca por ID do usuário (aluno)
    List<UserSchedule> findByIdUserId(Integer userId);

    // Busca por ID da programação
    List<UserSchedule> findByIdScheduleId(Integer scheduleId);


    @Query("SELECT us.userSchedule FROM UserSchedule us WHERE us.schedule.id = :scheduleId AND us.userSchedule.userRole = dev.surfparatodes.surfparatodes.enums.UserRole.ALUNO")
    List<Users> findStudentsByScheduleId(@Param("scheduleId") Integer scheduleId);


}
