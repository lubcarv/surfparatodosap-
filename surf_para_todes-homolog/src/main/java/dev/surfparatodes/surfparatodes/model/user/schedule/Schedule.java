package dev.surfparatodes.surfparatodes.model.user.schedule;

import dev.surfparatodes.surfparatodes.model.user.classroomschedule.ClassroomSchedule;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.DayOfWeek;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "schedule")
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToMany(mappedBy = "schedule")
    private Set<ClassroomSchedule> classroomSchedule;

    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;


    @Column(name = "shift", nullable = false)
    @Pattern(regexp = "^(manhã|tarde)$", message = "Turno deve ser 'manhã' ou 'tarde'")
    private String shift;

    @Column(name = "schedule_time", nullable = false)
    @Pattern(
            regexp = "^das ([01]?\\d|2[0-3])h às ([01]?\\d|2[0-3])h$",
            message = "Informe o horário no formato: das 11h às 12h"
    )
    private String scheduleTime;

    @Column(name = "active")
    private Boolean active = true;
}
