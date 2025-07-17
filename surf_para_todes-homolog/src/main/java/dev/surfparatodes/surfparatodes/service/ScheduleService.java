package dev.surfparatodes.surfparatodes.service;

import dev.surfparatodes.surfparatodes.model.user.schedule.Schedule;
import dev.surfparatodes.surfparatodes.repository.ScheduleRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    // Busca por ID com exceção personalizada se não existir
    public Schedule findById(Integer id) {
        return scheduleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Schedule não encontrado com ID: " + id));
    }

    // Criação de novo horário, garantindo que 'active' esteja como true se nulo
    public Schedule create(Schedule schedule) {
        if (schedule.getActive() == null) {
            schedule.setActive(true);
        }
        boolean exists = scheduleRepository.existsByShiftAndScheduleTime(schedule.getShift(), schedule.getScheduleTime());
        if (exists) {
            throw new IllegalStateException("Horário já cadastrado para o turno informado.");
        }
        return scheduleRepository.save(schedule);
    }

    // Atualização de horário com merge de dados no registro atual
    public Schedule update(Schedule schedule) {
        Schedule existing = findById(schedule.getId());
        updateScheduleData(existing, schedule); // merge dos dados
        return scheduleRepository.save(existing);
    }

    // Método de apoio para fazer merge dos dados de forma controlada
    private void updateScheduleData(Schedule target, Schedule source) {
        target.setDayOfWeek(source.getDayOfWeek());
        target.setShift(source.getShift());
        target.setScheduleTime(source.getScheduleTime());
        target.setActive(source.getActive() != null ? source.getActive() : target.getActive());
    }

    // Soft delete apenas marcando o campo 'active' como false
    public void softDelete(Integer id) {
        Schedule schedule = findById(id);
        schedule.setActive(false);
        scheduleRepository.save(schedule);
    }

    // Filtro por dia da semana, turno e/ou horário
    public List<Schedule> findByFilters(DayOfWeek dayOfWeek, String shift, String time) {
        if (shift != null && time != null && dayOfWeek != null) {
            return scheduleRepository.findByShiftAndScheduleTimeAndDayOfWeek(shift, time, dayOfWeek);
        } else if (shift != null && time != null) {
            return scheduleRepository.findByShiftAndScheduleTime(shift, time);
        } else if (shift != null) {
            return scheduleRepository.findByShift(shift);
        } else if (time != null) {
            return scheduleRepository.findByScheduleTime(time);
        } else if (dayOfWeek != null) {
            return scheduleRepository.findByDayOfWeek(dayOfWeek);
        }
        return scheduleRepository.findAll(); // caso nenhum filtro seja passado
    }

    // Filtro apenas pelo campo ativo
    public List<Schedule> findByActive(boolean active) {
        return active ? scheduleRepository.findByActiveTrue() : scheduleRepository.findByActiveFalse();
    }

    // Filtro opcional por todos os campos incluindo ativo (usado no controller getAll)
    public List<Schedule> findByFilters(DayOfWeek dayOfWeek, String shift, String time, Boolean active) {
        return scheduleRepository.findByOptionalFilters(dayOfWeek, shift, time, active);
    }

    // Métodos para obter listas distintas para popular combos no front (ex: Swagger)
    public List<String> findDistinctShifts() {
        return scheduleRepository.findDistinctShifts();
    }

    public List<String> findDistinctScheduleTimes() {
        return scheduleRepository.findDistinctScheduleTimes();
    }
}
