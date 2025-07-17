package dev.surfparatodes.surfparatodes.model.user.classroomschedule;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassroomScheduleId implements Serializable {

    private Integer classroomId;
    private Integer scheduleId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ClassroomScheduleId)) return false;
        ClassroomScheduleId that = (ClassroomScheduleId) o;
        return Objects.equals(classroomId, that.classroomId) &&
                Objects.equals(scheduleId, that.scheduleId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(classroomId, scheduleId);
    }
}
