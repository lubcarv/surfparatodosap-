package dev.surfparatodes.surfparatodes.controller;

import dev.surfparatodes.surfparatodes.enums.UserRole;
import dev.surfparatodes.surfparatodes.model.user.schedule.Schedule;
import dev.surfparatodes.surfparatodes.model.user.user.Users;
import dev.surfparatodes.surfparatodes.model.user.userschedule.UserSchedule;
import dev.surfparatodes.surfparatodes.model.user.userschedule.UserScheduleCreateDTO;
import dev.surfparatodes.surfparatodes.model.user.userschedule.UserScheduleId;
import dev.surfparatodes.surfparatodes.model.user.userschedule.UserScheduleResponseDTO;
import dev.surfparatodes.surfparatodes.repository.ScheduleRepository;
import dev.surfparatodes.surfparatodes.repository.UserRepository;
import dev.surfparatodes.surfparatodes.service.UserScheduleService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user-schedule")
@RequiredArgsConstructor
public class UserScheduleController {

    private final UserScheduleService userScheduleService;
    private final UserRepository userRepository;
    private final ScheduleRepository scheduleRepository;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid UserScheduleCreateDTO dto) {
        try {
            // Adiciona um aluno à programação
            userScheduleService.addStudentToSchedule(dto.getUserId(), dto.getScheduleId());

            // Prepara resposta
            Users user = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

            Schedule schedule = scheduleRepository.findById(dto.getScheduleId())
                    .orElseThrow(() -> new EntityNotFoundException("Programação não encontrada"));

            UserScheduleResponseDTO responseDTO = new UserScheduleResponseDTO();
            responseDTO.setUserId(dto.getUserId());
            responseDTO.setScheduleId(dto.getScheduleId());
            responseDTO.setUserName(user.getDisplayName());
            responseDTO.setScheduleInfo(schedule.getShift() + " - " + schedule.getScheduleTime());
            responseDTO.setActive(true);

            return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/batch")
    public ResponseEntity<?> createBatch(@RequestBody @Valid Set<Integer> userIds,
                                         @RequestParam Integer scheduleId) {
        try {
            userScheduleService.addStudentsToSchedule(scheduleId, userIds);
            return ResponseEntity.status(HttpStatus.CREATED).body("Alunos adicionados com sucesso");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/{userId}/{scheduleId}")
    public ResponseEntity<?> remove(@PathVariable Integer userId,
                                    @PathVariable Integer scheduleId) {
        try {
            userScheduleService.removeStudentFromSchedule(userId, scheduleId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/schedule/{scheduleId}/students")
    public ResponseEntity<?> findStudentsBySchedule(@PathVariable Integer scheduleId) {
        try {
            List<Users> students = userScheduleService.findAllStudentsBySchedule(scheduleId);

            List<UserScheduleResponseDTO> responseDTOs = students.stream()
                    .map(student -> {
                        UserScheduleResponseDTO dto = new UserScheduleResponseDTO();
                        dto.setUserId(student.getId());
                        dto.setScheduleId(scheduleId);
                        dto.setUserName(student.getDisplayName());
                        // Não precisamos definir scheduleInfo aqui pois estamos buscando por scheduleId
                        return dto;
                    })
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responseDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/student/{userId}/schedules")
    public ResponseEntity<?> findSchedulesByStudent(@PathVariable Integer userId) {
        try {
            List<Schedule> schedules = userScheduleService.findAllSchedulesByStudent(userId);

            List<UserScheduleResponseDTO> responseDTOs = schedules.stream()
                    .map(schedule -> {
                        UserScheduleResponseDTO dto = new UserScheduleResponseDTO();
                        dto.setUserId(userId);
                        dto.setScheduleId(schedule.getId());
                        dto.setScheduleInfo(schedule.getShift() + " - " + schedule.getScheduleTime());
                        // Não precisamos definir userName aqui pois estamos buscando por userId
                        return dto;
                    })
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responseDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
