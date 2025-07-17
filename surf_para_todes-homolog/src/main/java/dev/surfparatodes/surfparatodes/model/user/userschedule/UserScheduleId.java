package dev.surfparatodes.surfparatodes.model.user.userschedule;

import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Embeddable;

@Embeddable
public class UserScheduleId implements Serializable {

    private Integer userId;
    private Integer scheduleId;

    // 🔸 Construtor padrão (obrigatório)
    public UserScheduleId() {}

    // 🔸 Construtor completo
    public UserScheduleId(Integer userId, Integer scheduleId) {
        this.userId = userId;
        this.scheduleId = scheduleId;
    }

    // 🔸 Getters e Setters
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Integer scheduleId) {
        this.scheduleId = scheduleId;
    }

    // 🔸 equals e hashCode (obrigatórios)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserScheduleId)) return false;
        UserScheduleId that = (UserScheduleId) o;
        return Objects.equals(getUserId(), that.getUserId()) &&
                Objects.equals(getScheduleId(), that.getScheduleId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUserId(), getScheduleId());
    }
}

