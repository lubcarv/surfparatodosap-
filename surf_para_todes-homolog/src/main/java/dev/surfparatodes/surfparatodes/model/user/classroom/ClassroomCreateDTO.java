package dev.surfparatodes.surfparatodes.model.user.classroom;

import jakarta.validation.constraints.NotBlank;

import java.util.Set;

public class ClassroomCreateDTO {

    private Set<Integer> teacherIds;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @NotBlank(message = "O nome da sala é obrigatório.")
    private String name;

    public Set<Integer> getTeacherIds() {
        return teacherIds;
    }

    public void setTeacherIds(Set<Integer> teacherIds) {
        this.teacherIds = teacherIds;
    }

}
