package dev.surfparatodes.surfparatodes.controller;

import dev.surfparatodes.surfparatodes.converters.user.ScheduleMapper;
import dev.surfparatodes.surfparatodes.model.user.schedule.Schedule;
import dev.surfparatodes.surfparatodes.model.user.schedule.ScheduleCreateDTO;
import dev.surfparatodes.surfparatodes.model.user.schedule.ScheduleResponseDTO;
import dev.surfparatodes.surfparatodes.service.ScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.util.List;

@RestController
@RequestMapping("/api/schedules")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;
    private final ScheduleMapper scheduleMapper;

    @GetMapping("/{id}")
    public ResponseEntity<ScheduleResponseDTO> getById(@PathVariable Integer id) {
        Schedule schedule = scheduleService.findById(id);
        return ResponseEntity.ok(scheduleMapper.toResponseDTO(schedule));
    }

    @GetMapping
    public ResponseEntity<List<ScheduleResponseDTO>> getAll(
            @RequestParam(required = false) DayOfWeek dayOfWeek,
            @RequestParam(required = false) String shift,
            @RequestParam(required = false) String time,
            @RequestParam(required = false) Boolean active) {

        List<Schedule> schedules = scheduleService.findByFilters(dayOfWeek, shift, time, active);
        List<ScheduleResponseDTO> dtos = schedules.stream()
                .map(scheduleMapper::toResponseDTO)
                .toList();

        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<ScheduleResponseDTO> create(@RequestBody @Valid ScheduleCreateDTO dto) {
        Schedule schedule = scheduleMapper.toEntity(dto);
        Schedule createdSchedule = scheduleService.create(schedule);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(scheduleMapper.toResponseDTO(createdSchedule));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ScheduleResponseDTO> update(
            @PathVariable Integer id,
            @RequestBody @Valid ScheduleCreateDTO dto) {

        Schedule schedule = scheduleMapper.toEntity(dto);
        schedule.setId(id);
        Schedule updatedSchedule = scheduleService.update(schedule);
        return ResponseEntity.ok(scheduleMapper.toResponseDTO(updatedSchedule));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        scheduleService.softDelete(id);
        return ResponseEntity.noContent().build(); // padrão para DELETE
    }

    // Endpoint para listar todos os turnos (shifts) existentes no banco
    @GetMapping("/shifts")
    public ResponseEntity<List<String>> getAllShifts() {
        List<String> shifts = scheduleService.findDistinctShifts();
        return ResponseEntity.ok(shifts);
    }

    // Endpoint para listar todos os horários (scheduleTime) existentes no banco
    @GetMapping("/times")
    public ResponseEntity<List<String>> getAllScheduleTimes() {
        List<String> times = scheduleService.findDistinctScheduleTimes();
        return ResponseEntity.ok(times);
    }

    // Endpoint para listar os dias da semana fixos
    @GetMapping("/daysOfWeek")
    public ResponseEntity<List<String>> getAllDaysOfWeek() {
        List<String> days = List.of(
                DayOfWeek.MONDAY.name(),
                DayOfWeek.TUESDAY.name(),
                DayOfWeek.WEDNESDAY.name(),
                DayOfWeek.THURSDAY.name(),
                DayOfWeek.FRIDAY.name(),
                DayOfWeek.SATURDAY.name(),
                DayOfWeek.SUNDAY.name()
        );
        return ResponseEntity.ok(days);
    }
}
