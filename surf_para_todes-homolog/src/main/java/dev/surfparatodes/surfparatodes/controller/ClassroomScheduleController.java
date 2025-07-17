package dev.surfparatodes.surfparatodes.controller;

import dev.surfparatodes.surfparatodes.model.user.classroomschedule.*;
import dev.surfparatodes.surfparatodes.model.user.classroom.Classroom;
import dev.surfparatodes.surfparatodes.model.user.schedule.Schedule;
import dev.surfparatodes.surfparatodes.model.user.userlogin.MessageDTO;
import dev.surfparatodes.surfparatodes.repository.ClassroomRepository;
import dev.surfparatodes.surfparatodes.repository.ClassroomScheduleRepository;
import dev.surfparatodes.surfparatodes.repository.ScheduleRepository;
import dev.surfparatodes.surfparatodes.service.ClassroomScheduleService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/classroom-schedule")
@RequiredArgsConstructor
public class ClassroomScheduleController {

    private final ClassroomScheduleService classroomScheduleService;
    private final ClassroomRepository classroomRepository;
    private final ScheduleRepository scheduleRepository;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid ClassroomScheduleCreateDTO dto) {
        ClassroomScheduleId id = new ClassroomScheduleId(dto.getClassroomId(), dto.getScheduleId());

        // Verificar se já existe
        boolean exists = classroomScheduleService.existsById(id);
        if (exists) {
            return ResponseEntity.badRequest()
                    .body("Essa associação já existe entre a sala e o horário.");
        }

        // Buscar entidades Classroom e Schedule
        Classroom classroom = classroomRepository.findById(dto.getClassroomId())
                .orElseThrow(() -> new EntityNotFoundException("Sala não encontrada"));

        Schedule schedule = scheduleRepository.findById(dto.getScheduleId())
                .orElseThrow(() -> new EntityNotFoundException("Horário não encontrado"));

        // Criar associação
        ClassroomSchedule cs = new ClassroomSchedule(classroom, schedule);
        cs.setActive(dto.getActive() != null ? dto.getActive() : true);

        classroomScheduleService.save(cs);

        // DTO de resposta
        ClassroomScheduleResponseDTO responseDTO = new ClassroomScheduleResponseDTO();
        responseDTO.setClassroomId(cs.getClassroom().getId());
        responseDTO.setScheduleId(cs.getSchedule().getId());
        responseDTO.setActive(cs.getActive());

        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/{classroomId}/{scheduleId}")
    public ResponseEntity<?> getById(
            @PathVariable Integer classroomId,
            @PathVariable Integer scheduleId) {
        try {
            ClassroomSchedule cs = classroomScheduleService.findById(classroomId, scheduleId);
            ClassroomScheduleResponseDTO responseDTO = convertToDTO(cs);
            return ResponseEntity.ok(responseDTO);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/classroom/{classroomId}")
    public ResponseEntity<?> getByClassroomId(@PathVariable Integer classroomId) {
        List<ClassroomSchedule> schedules = classroomScheduleService.findByClassroomId(classroomId);
        List<ClassroomScheduleResponseDTO> responseDTOs = schedules.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    @GetMapping("/schedule/{scheduleId}")
    public ResponseEntity<?> getByScheduleId(@PathVariable Integer scheduleId) {
        List<ClassroomSchedule> classrooms = classroomScheduleService.findByScheduleId(scheduleId);
        List<ClassroomScheduleResponseDTO> responseDTOs = classrooms.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<ClassroomSchedule> all = classroomScheduleService.findAll();
        List<ClassroomScheduleResponseDTO> responseDTOs = all.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    @PutMapping("/{classroomId}/{scheduleId}")
    public ResponseEntity<?> update(
            @PathVariable Integer classroomId,
            @PathVariable Integer scheduleId,
            @RequestBody @Valid ClassroomScheduleResponseDTO dto) {
        try {
            ClassroomSchedule updated = classroomScheduleService.update(classroomId, scheduleId, dto.getActive());
            ClassroomScheduleResponseDTO responseDTO = convertToDTO(updated);
            return ResponseEntity.ok(responseDTO);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{classroomId}/{scheduleId}")
    public ResponseEntity<MessageDTO> delete(@PathVariable Integer classroomId,
                                             @PathVariable Integer scheduleId) {
        classroomScheduleService.delete(classroomId, scheduleId);
        return ResponseEntity.ok(new MessageDTO("Associação removida com sucesso."));
    }

    @PatchMapping("/{classroomId}/{scheduleId}/activate")
    public ResponseEntity<MessageDTO> activate(@PathVariable Integer classroomId,
                                               @PathVariable Integer scheduleId) {
        classroomScheduleService.setActive(classroomId, scheduleId, true);
        return ResponseEntity.ok(new MessageDTO("Associação ativada com sucesso."));
    }

    @PatchMapping("/{classroomId}/{scheduleId}/desactivate")
    public ResponseEntity<MessageDTO> deactivate(@PathVariable Integer classroomId,
                                                 @PathVariable Integer scheduleId) {
        classroomScheduleService.setActive(classroomId, scheduleId, false);
        return ResponseEntity.ok(new MessageDTO("Associação desativada com sucesso."));
    }


    //Metodo utilitário para converter ClassroomSchedule para DTO
    private ClassroomScheduleResponseDTO convertToDTO(ClassroomSchedule cs) {
        ClassroomScheduleResponseDTO dto = new ClassroomScheduleResponseDTO();
        dto.setClassroomId(cs.getClassroom().getId());
        dto.setScheduleId(cs.getSchedule().getId());
        dto.setActive(cs.getActive());
        return dto;
    }
}
