package dev.surfparatodes.surfparatodes.service;

import dev.surfparatodes.surfparatodes.model.user.classroomschedule.ClassroomSchedule;
import dev.surfparatodes.surfparatodes.model.user.classroomschedule.ClassroomScheduleId;
import dev.surfparatodes.surfparatodes.repository.ClassroomRepository;
import dev.surfparatodes.surfparatodes.repository.ClassroomScheduleRepository;
import dev.surfparatodes.surfparatodes.repository.ScheduleRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClassroomScheduleService {
    private final ClassroomScheduleRepository classroomScheduleRepository;
    private final ClassroomRepository classroomRepository;
    private final ScheduleRepository scheduleRepository;

    public ClassroomSchedule findById(Integer classroomId, Integer scheduleId) {
        ClassroomScheduleId id = new ClassroomScheduleId(classroomId, scheduleId);
        return classroomScheduleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Associação de aula e horário não encontrada para Class ID: " +
                                classroomId + " e Schedule ID: " + scheduleId));
    }

    public List<ClassroomSchedule> findByClassroomId(Integer classroomId) {
        // Verificar se a sala existe
        if (!classroomRepository.existsById(classroomId)) {
            throw new EntityNotFoundException("Sala não encontrada com ID: " + classroomId);
        }
        return classroomScheduleRepository.findByClassroomId(classroomId);
    }

    public List<ClassroomSchedule> findByScheduleId(Integer scheduleId) {
        // Verificar se o horário existe
        if (!scheduleRepository.existsById(scheduleId)) {
            throw new EntityNotFoundException("Horário não encontrado com ID: " + scheduleId);
        }
        return classroomScheduleRepository.findByScheduleId(scheduleId);
    }

    public List<ClassroomSchedule> findAll() {
        return classroomScheduleRepository.findAll();
    }

    @Transactional
    public void save(ClassroomSchedule cs) {
        classroomScheduleRepository.save(cs);
    }

    public boolean existsById(ClassroomScheduleId id) {
        return classroomScheduleRepository.existsById(id);
    }

    @Transactional
    public ClassroomSchedule update(Integer classroomId, Integer scheduleId, Boolean active) {
        ClassroomSchedule cs = findById(classroomId, scheduleId);

        // Atualizar status ativo
        if (active != null) {
            cs.setActive(active);
        }

        return classroomScheduleRepository.save(cs);
    }

    @Transactional
    public ClassroomSchedule setActive(Integer classroomId, Integer scheduleId, boolean active) {
        ClassroomSchedule cs = findById(classroomId, scheduleId);
        cs.setActive(active);
        return classroomScheduleRepository.save(cs);
    }

    @Transactional
    public void delete(Integer classroomId, Integer scheduleId) {
        ClassroomScheduleId id = new ClassroomScheduleId(classroomId, scheduleId);
        if (!classroomScheduleRepository.existsById(id)) {
            throw new EntityNotFoundException(
                    "Associação de aula e horário não encontrada para Class ID: " +
                            classroomId + " e Schedule ID: " + scheduleId);
        }
        classroomScheduleRepository.deleteById(id);
    }

    // Busca salas disponíveis para um determinado horário
    public List<Integer> findAvailableClassroomsForSchedule(Integer scheduleId) {
        // Esta é uma implementação básica - você pode expandir com lógica adicional
        // como verificação de capacidade, equipamentos, etc.
        return classroomRepository.findAll().stream()
                .filter(classroom -> classroomScheduleRepository
                        .findByClassroomIdAndScheduleId(classroom.getId(), scheduleId)
                        .isEmpty())
                .map(classroom -> classroom.getId())
                .toList();
    }

    // Busca horários disponíveis para uma determinada sala
    public List<Integer> findAvailableSchedulesForClassroom(Integer classroomId) {
        return scheduleRepository.findAll().stream()
                .filter(schedule -> classroomScheduleRepository
                        .findByClassroomIdAndScheduleId(classroomId, schedule.getId())
                        .isEmpty())
                .map(schedule -> schedule.getId())
                .toList();
    }
}
