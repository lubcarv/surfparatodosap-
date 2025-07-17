package dev.surfparatodes.surfparatodes.model.user.userschedule;

import dev.surfparatodes.surfparatodes.model.user.schedule.Schedule;
import dev.surfparatodes.surfparatodes.model.user.user.Users;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user_schedule")
@Data
public class UserSchedule {
    @EmbeddedId
    private UserScheduleId id;

    @MapsId("userId")
    @ManyToOne
    @JoinColumn(name="student_id")
    private Users userSchedule;

    @MapsId("scheduleId")
    @ManyToOne
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

}
