package dev.surfparatodes.surfparatodes.service;

import dev.surfparatodes.surfparatodes.enums.UserRole;
import dev.surfparatodes.surfparatodes.model.user.schedule.Schedule;
import dev.surfparatodes.surfparatodes.model.user.user.Users;
import dev.surfparatodes.surfparatodes.model.user.userschedule.UserSchedule;
import dev.surfparatodes.surfparatodes.model.user.userschedule.UserScheduleId;
import dev.surfparatodes.surfparatodes.repository.ScheduleRepository;
import dev.surfparatodes.surfparatodes.repository.UserRepository;
import dev.surfparatodes.surfparatodes.repository.UserScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserScheduleService {

    private final UserScheduleRepository userScheduleRepository;
    private final UserRepository userRepository;
    private final ScheduleRepository scheduleRepository;

    @Autowired
    public UserScheduleService(
            UserScheduleRepository userScheduleRepository,
            UserRepository userRepository,
            ScheduleRepository scheduleRepository
    ) {
        this.userScheduleRepository = userScheduleRepository;
        this.userRepository = userRepository;
        this.scheduleRepository = scheduleRepository;
    }

    /**
     * Adiciona um aluno a uma programação de aula
     * @param userId ID do usuário (deve ser um aluno)
     * @param scheduleId ID da programação
     */
    @Transactional
    public void addStudentToSchedule(Integer userId, Integer scheduleId) {
        // Buscar o usuário
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("Usuário não encontrado com ID: " + userId));

        // Validar que o usuário é um aluno (equivalente ao type=1)
        if (user.getUserRole() != UserRole.ALUNO) {
            throw new IllegalArgumentException("O usuário " + user.getDisplayName() + " não é um aluno. Apenas alunos podem ser adicionados às turmas.");
        }

        // Buscar a programação
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new NoSuchElementException("Programação não encontrada com ID: " + scheduleId));

        // Criar UserSchedule
        UserSchedule userSchedule = new UserSchedule();
        UserScheduleId id = new UserScheduleId(userId, scheduleId);
        userSchedule.setId(id);
        userSchedule.setUserSchedule(user);
        userSchedule.setSchedule(schedule);

        // Salvar
        userScheduleRepository.save(userSchedule);
    }

    /**
     * Adiciona vários alunos a uma programação
     * @param scheduleId ID da programação
     * @param userIds IDs dos usuários (devem ser alunos)
     */
    @Transactional
    public void addStudentsToSchedule(Integer scheduleId, Set<Integer> userIds) {
        // Buscar a programação
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new NoSuchElementException("Programação não encontrada com ID: " + scheduleId));

        // Buscar todos os usuários de uma vez
        List<Users> users = userRepository.findAllById(userIds);

        // Verificar se todos os IDs foram encontrados
        Set<Integer> foundIds = users.stream().map(Users::getId).collect(Collectors.toSet());
        Set<Integer> notFoundIds = new HashSet<>(userIds);
        notFoundIds.removeAll(foundIds);
        if (!notFoundIds.isEmpty()) {
            throw new IllegalArgumentException("IDs de usuários não encontrados: " + notFoundIds);
        }

        // Filtrar usuários que não são alunos
        List<Users> invalidUsers = users.stream()
                .filter(user -> user.getUserRole() != UserRole.ALUNO)
                .toList();

        // Lançar exceção se algum usuário não for aluno
        if (!invalidUsers.isEmpty()) {
            String names = invalidUsers.stream()
                    .map(Users::getDisplayName)
                    .collect(Collectors.joining(", "));
            throw new IllegalArgumentException("Os seguintes usuários não são alunos: " + names);
        }

        // Adicionar todos os alunos à programação
        for (Users user : users) {
            UserSchedule userSchedule = new UserSchedule();
            UserScheduleId id = new UserScheduleId(user.getId(), scheduleId);
            userSchedule.setId(id);
            userSchedule.setUserSchedule(user);
            userSchedule.setSchedule(schedule);
            userScheduleRepository.save(userSchedule);
        }
    }

    /**
     * Remove um aluno de uma programação
     */
    @Transactional
    public void removeStudentFromSchedule(Integer userId, Integer scheduleId) {
        UserScheduleId id = new UserScheduleId(userId, scheduleId);
        userScheduleRepository.deleteById(id);
    }

    /**
     * Busca todos os alunos de uma programação
     */
    public List<Users> findAllStudentsBySchedule(Integer scheduleId) {
        return userScheduleRepository.findByIdScheduleId(scheduleId).stream()
                .map(UserSchedule::getUserSchedule)
                .collect(Collectors.toList());
    }

    /**
     * Busca todas as programações de um aluno
     */
    public List<Schedule> findAllSchedulesByStudent(Integer userId) {
        return userScheduleRepository.findByIdUserId(userId).stream()
                .map(UserSchedule::getSchedule)
                .collect(Collectors.toList());
    }
}
