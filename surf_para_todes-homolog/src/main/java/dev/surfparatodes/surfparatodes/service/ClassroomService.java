package dev.surfparatodes.surfparatodes.service;

import dev.surfparatodes.surfparatodes.converters.user.ClassroomMapper;
import dev.surfparatodes.surfparatodes.enums.ClassroomStatus;
import dev.surfparatodes.surfparatodes.enums.UserRole;
import dev.surfparatodes.surfparatodes.repository.ClassroomScheduleRepository;
import dev.surfparatodes.surfparatodes.repository.UserScheduleRepository;
import dev.surfparatodes.surfparatodes.model.user.classroom.Classroom;
import dev.surfparatodes.surfparatodes.model.user.classroom.ClassroomCreateDTO;
import dev.surfparatodes.surfparatodes.model.user.classroom.ClassroomResponseDTO;
import dev.surfparatodes.surfparatodes.model.user.user.Users;
import dev.surfparatodes.surfparatodes.model.user.userschedule.UserScheduleResponseDTO;
import dev.surfparatodes.surfparatodes.repository.ClassroomRepository;
import dev.surfparatodes.surfparatodes.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;
@Service
public class ClassroomService {

    private final ClassroomRepository classroomRepository;
    private final UserRepository userRepository;
    private final ClassroomMapper classroomMapper;
    private final ClassroomScheduleRepository classroomScheduleRepository;
    private final UserScheduleRepository userScheduleRepository;

    @Autowired
    public ClassroomService(
            ClassroomRepository classroomRepository,
            UserRepository userRepository,
            ClassroomMapper classroomMapper,
            ClassroomScheduleRepository classroomScheduleRepository,
            UserScheduleRepository userScheduleRepository
    ) {
        this.classroomRepository = classroomRepository;
        this.userRepository = userRepository;
        this.classroomMapper = classroomMapper;
        this.classroomScheduleRepository = classroomScheduleRepository;
        this.userScheduleRepository = userScheduleRepository;
    }

    @Transactional
    public ClassroomResponseDTO createClassroom(ClassroomCreateDTO createDTO) {
        Set<Users> teachers = new HashSet<>(userRepository.findAllById(createDTO.getTeacherIds()));

        List<Users> invalidUsers = teachers.stream()
                .filter(user -> user.getUserRole() != UserRole.PROFESSOR)
                .toList();

        if (!invalidUsers.isEmpty()) {
            String invalidNames = invalidUsers.stream()
                    .map(Users::getDisplayName)
                    .collect(Collectors.joining(", "));
            throw new IllegalArgumentException("Os seguintes usuários não são professores: " + invalidNames);
        }

        Classroom classroom = classroomMapper.toEntity(createDTO, teachers);
        Classroom saved = classroomRepository.save(classroom);
        return classroomMapper.toResponseDTO(saved);
    }

    public List<ClassroomResponseDTO> findAll() {
        return classroomRepository.findAll()
                .stream()
                .map(classroomMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    public Optional<ClassroomResponseDTO> findById(Integer id) {
        return classroomRepository.findById(id)
                .map(classroomMapper::toResponseDTO);
    }

    // ✅ NOVO MÉTODO ADICIONADO
    public Classroom findEntityById(Integer id) {
        return classroomRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Classroom not found with id: " + id));
    }

    @Transactional
    public void addTeachersToClassroom(Integer classroomId, Set<Integer> teacherIds) {
        Classroom classroom = findEntityById(classroomId);
        List<Users> foundUsers = userRepository.findAllById(teacherIds);

        // Verifica se todos os IDs foram encontrados
        Set<Integer> foundIds = foundUsers.stream().map(Users::getId).collect(Collectors.toSet());
        Set<Integer> notFoundIds = new HashSet<>(teacherIds);
        notFoundIds.removeAll(foundIds);
        if (!notFoundIds.isEmpty()) {
            throw new IllegalArgumentException("IDs de usuários não encontrados: " + notFoundIds);
        }
        //verifica se todos são professores
        List<Users> invalidUsers = foundUsers.stream()
                .filter(user -> user.getUserRole() != UserRole.PROFESSOR)
                .toList();

        if (!invalidUsers.isEmpty()) {
            String names = invalidUsers.stream()
                    .map(Users::getDisplayName)
                    .collect(Collectors.joining(", "));
            throw new IllegalArgumentException("Os seguintes usuários não são professores: " + names);
        }

        // método para  setar status como ativo após professor ser inserido
        classroom.getTeachers().addAll(foundUsers);
        classroomRepository.save(classroom);

        classroom.getTeachers().addAll(foundUsers);

        if (!classroom.getTeachers().isEmpty()) {
            classroom.setStatus(ClassroomStatus.ATIVA);
        }

        classroomRepository.save(classroom);
    }


    @Transactional
    public void removeTeachersFromClassroom(Integer classroomId, Set<Integer> teacherIds) {
        Classroom classroom = findEntityById(classroomId);
        Set<Users> teachers = new HashSet<>(userRepository.findAllById(teacherIds));

        classroom.getTeachers().removeAll(teachers);
        if(classroom.getTeachers().isEmpty()) {
            classroom.setStatus(ClassroomStatus.AGUARDANDO_PROFESSOR);
        }
        classroomRepository.save(classroom);

    }

    @Transactional
    public void deleteClassroom(Integer classroomId) {
        Classroom classroom = findEntityById(classroomId);
        classroomRepository.delete(classroom);
    }


    public List<UserScheduleResponseDTO> findStudentsByClassroom(Integer classroomId) {
        // 1. Pega todos os schedules da turma
        List<Integer> scheduleIds = classroomScheduleRepository.findByClassroomId(classroomId)
                .stream()
                .map(cs -> cs.getSchedule().getId())
                .toList();

        if (scheduleIds.isEmpty()) {
            throw new EntityNotFoundException("Nenhum horário associado à turma.");
        }

        // 2. Para cada schedule, pega os alunos associados
        List<UserScheduleResponseDTO> students = new ArrayList<>();

        for (Integer scheduleId : scheduleIds) {
            List<Users> users = userScheduleRepository.findStudentsByScheduleId(scheduleId);
            for (Users user : users) {
                UserScheduleResponseDTO dto = new UserScheduleResponseDTO();
                dto.setUserId(user.getId());
                dto.setUserName(user.getDisplayName());
                dto.setScheduleId(scheduleId);
                // Pode setar info do schedule se quiser
                students.add(dto);
            }
        }

        return students;
    }

}

