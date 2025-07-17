package dev.surfparatodes.surfparatodes.controller;

import dev.surfparatodes.surfparatodes.model.user.classroom.ClassroomCreateDTO;
import dev.surfparatodes.surfparatodes.model.user.classroom.ClassroomResponseDTO;
import dev.surfparatodes.surfparatodes.model.user.userlogin.MessageDTO;
import dev.surfparatodes.surfparatodes.model.user.userschedule.UserScheduleResponseDTO;
import dev.surfparatodes.surfparatodes.service.ClassroomService;
import dev.surfparatodes.surfparatodes.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/classrooms")
@RequiredArgsConstructor
public class ClassroomController {

    private final ClassroomService classroomService;
    private final UserService userService; // ✅ INJEÇÃO CORRETA

    @PostMapping
    public ResponseEntity<ClassroomResponseDTO> create(@RequestBody @Valid ClassroomCreateDTO dto) {
        ClassroomResponseDTO responseDTO = classroomService.createClassroom(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @GetMapping
    public ResponseEntity<List<ClassroomResponseDTO>> getAll() {
        List<ClassroomResponseDTO> classrooms = classroomService.findAll();
        return ResponseEntity.ok(classrooms);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClassroomResponseDTO> getById(@PathVariable Integer id) {
        return classroomService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{classroomId}/students")
    public ResponseEntity<?> getStudentsByClassroom(@PathVariable Integer classroomId) {
        try {
            List<UserScheduleResponseDTO> students = classroomService.findStudentsByClassroom(classroomId);
            return ResponseEntity.ok(students);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


    @PutMapping("/{id}/teachers/add")
    public ResponseEntity<?> addTeachers(
            @PathVariable Integer id,
            @RequestBody Set<Integer> teacherIds) {

        List<Integer> invalidIds = userService.validateTeacherIds(teacherIds);
        if (!invalidIds.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageDTO("IDs inválidos: " + invalidIds));
        }

        classroomService.addTeachersToClassroom(id, teacherIds);
        return ResponseEntity.ok(new MessageDTO("Professores adicionados com sucesso."));
    }

    @PutMapping("/{id}/teachers/remove")
    public ResponseEntity<?> removeTeachers(
            @PathVariable Integer id,
            @RequestBody Set<Integer> teacherIds) {

        List<Integer> invalidIds = userService.validateTeacherIds(teacherIds);
        if (!invalidIds.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageDTO("IDs inválidos: " + invalidIds));
        }

        classroomService.removeTeachersFromClassroom(id, teacherIds);
        return ResponseEntity.ok(new MessageDTO("Professores removidos com sucesso."));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClassroom(@PathVariable Integer id) {
        classroomService.deleteClassroom(id);
        return ResponseEntity.noContent().build();
    }
}
