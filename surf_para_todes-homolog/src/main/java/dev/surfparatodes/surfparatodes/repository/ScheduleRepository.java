package dev.surfparatodes.surfparatodes.repository;

import dev.surfparatodes.surfparatodes.model.user.schedule.Schedule;
import jakarta.validation.constraints.Pattern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {

    List<Schedule> findByDayOfWeek(DayOfWeek dayOfWeek);

    List<Schedule> findByShift(String shift);

    List<Schedule> findByScheduleTime(String scheduleTime);

    List<Schedule> findByActiveTrue();

    List<Schedule> findByActiveFalse();

    boolean existsByShiftAndScheduleTime(
            @Pattern(regexp = "^(manhã|tarde)$", message = "Turno deve ser 'manhã' ou 'tarde'") String shift,
            @Pattern(regexp = "^das ([01]?\\d|2[0-3])h às ([01]?\\d|2[0-3])h$", message = "Informe o horário no formato: das 11h às 12h") String scheduleTime
    );

    List<Schedule> findByShiftAndScheduleTimeAndDayOfWeek(String shift, String scheduleTime, DayOfWeek dayOfWeek);

    List<Schedule> findByShiftAndScheduleTime(String shift, String scheduleTime);

    @Query("SELECT s FROM Schedule s WHERE " +
            "(:dayOfWeek IS NULL OR s.dayOfWeek = :dayOfWeek) AND " +
            "(:shift IS NULL OR s.shift = :shift) AND " +
            "(:time IS NULL OR s.scheduleTime = :time) AND " +
            "(:active IS NULL OR s.active = :active)")
    List<Schedule> findByOptionalFilters(
            @Param("dayOfWeek") DayOfWeek dayOfWeek,
            @Param("shift") String shift,
            @Param("time") String time,
            @Param("active") Boolean active
    );

    @Query("SELECT DISTINCT s.shift FROM Schedule s WHERE s.shift IS NOT NULL")
    List<String> findDistinctShifts();

    @Query("SELECT DISTINCT s.scheduleTime FROM Schedule s WHERE s.scheduleTime IS NOT NULL")
    List<String> findDistinctScheduleTimes();
}
