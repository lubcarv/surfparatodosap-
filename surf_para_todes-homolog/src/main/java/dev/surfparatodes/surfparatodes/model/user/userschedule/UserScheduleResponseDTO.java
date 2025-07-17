package dev.surfparatodes.surfparatodes.model.user.userschedule;

import lombok.Data;

@Data
public class UserScheduleResponseDTO {
    private Integer userId;
    private Integer scheduleId;
    private String userName;
    private String scheduleInfo;
    private Boolean active;
}
