package dev.surfparatodes.surfparatodes.converters.user;

import dev.surfparatodes.surfparatodes.model.user.classroom.Classroom;
import dev.surfparatodes.surfparatodes.model.user.classroom.ClassroomCreateDTO;
import dev.surfparatodes.surfparatodes.model.user.classroom.ClassroomResponseDTO;
import dev.surfparatodes.surfparatodes.model.user.user.Users;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ClassroomMapper {

    //Converte ClassroomCreateDTO + professores já carregados para a entidade Classroom
    public Classroom toEntity(ClassroomCreateDTO dto, Set<Users> teachers) {
        Classroom classroom = new Classroom();
        classroom.setName(dto.getName()); // ✅ Adiciona o nome
        classroom.setTeachers(teachers);
        return classroom;
    }


    // 2. Converte Classroom para ClassroomResponseDTO (usando TeacherSummaryDTO)
    public ClassroomResponseDTO toResponseDTO(Classroom classroom) {
        ClassroomResponseDTO responseDTO = new ClassroomResponseDTO();
        responseDTO.setId(classroom.getId());
        responseDTO.setName(classroom.getName()); // ✅ Adiciona o nome da sala
        responseDTO.setStatus(classroom.getStatus());


        // ⚠️ Aqui convertemos os professores em "TeacherSummaryDTO"
        Set<ClassroomResponseDTO.TeacherSummaryDTO> teacherSummaries = classroom.getTeachers()
                .stream()
                .map(user -> new ClassroomResponseDTO.TeacherSummaryDTO(user.getId(), user.getDisplayName()))
                .collect(Collectors.toSet());

        responseDTO.setTeachers(teacherSummaries);
        responseDTO.setCreatedAt(classroom.getCreatedAt());

        return responseDTO;
    }
}
