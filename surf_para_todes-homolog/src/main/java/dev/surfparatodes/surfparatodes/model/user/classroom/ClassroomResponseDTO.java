package dev.surfparatodes.surfparatodes.model.user.classroom;

import dev.surfparatodes.surfparatodes.enums.ClassroomStatus;

import java.time.LocalDateTime;
import java.util.Set;

public class ClassroomResponseDTO {

    private Integer id;
    private Set<TeacherSummaryDTO> teachers;
    private LocalDateTime createdAt;
    private String name;
    private ClassroomStatus status;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<TeacherSummaryDTO> getTeachers() {
        return teachers;
    }

    public void setTeachers(Set<TeacherSummaryDTO> teachers) {
        this.teachers = teachers;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ClassroomStatus getStatus() {
        return status;
    }
    public void setStatus(ClassroomStatus status) {
        this.status = status;
    }




    public static class TeacherSummaryDTO {
        private Integer id;
        private String name;

        public TeacherSummaryDTO(Integer id, String name) {
            this.id = id;
            this.name = name;
        }

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}
