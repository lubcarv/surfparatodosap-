package dev.surfparatodes.surfparatodes.model.user.classroom;

import com.fasterxml.jackson.annotation.JsonBackReference;
import dev.surfparatodes.surfparatodes.enums.ClassroomStatus;
import dev.surfparatodes.surfparatodes.model.user.classroomschedule.ClassroomSchedule;
import dev.surfparatodes.surfparatodes.model.user.classroomschedule.ClassroomScheduleId;
import dev.surfparatodes.surfparatodes.model.user.user.Users;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "classroom")
public class Classroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @ManyToMany
    @JoinTable(
            name = "classroom_teachers",
            joinColumns = @JoinColumn(name = "classroom_id"),
            inverseJoinColumns = @JoinColumn(name = "teacher_id")
    )
    @JsonBackReference
    private Set<Users> teachers;

    @OneToMany(mappedBy = "classroom", cascade = CascadeType.ALL)
    private Set<ClassroomSchedule> classroomSchedules = new HashSet<>();

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ClassroomStatus status;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Classroom that = (Classroom) o;
        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
