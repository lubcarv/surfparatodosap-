package dev.surfparatodes.surfparatodes.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ClassroomTeacherChecker {

    private final JdbcTemplate jdbcTemplate;

    public boolean existsByTeacherId(long teacherId) {
        String sql = "SELECT COUNT(*) FROM classroom_teachers WHERE teacher_id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, teacherId);
        return count != null && count > 0;
    }
}
