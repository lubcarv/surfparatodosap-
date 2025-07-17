package dev.surfparatodes.surfparatodes.model.user.classroomschedule;

import dev.surfparatodes.surfparatodes.model.user.classroom.Classroom;
import dev.surfparatodes.surfparatodes.model.user.schedule.Schedule;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "classroom_schedule")
@Getter
@Setter
@NoArgsConstructor
public class ClassroomSchedule {

    @EmbeddedId
    private ClassroomScheduleId id = new ClassroomScheduleId();

    @MapsId("classroomId")
    @ManyToOne
    @JoinColumn(name = "classroom_id")
    private Classroom classroom;

    @MapsId("scheduleId")
    @ManyToOne
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    @Column(name = "active")
    private Boolean active = true;

    public ClassroomSchedule(Classroom classroom, Schedule schedule) {
        this.classroom = classroom;
        this.schedule = schedule;
        this.id = new ClassroomScheduleId(classroom.getId(), schedule.getId());
    }
}
