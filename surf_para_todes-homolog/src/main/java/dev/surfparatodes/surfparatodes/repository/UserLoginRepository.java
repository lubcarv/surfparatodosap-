package dev.surfparatodes.surfparatodes.repository;

import dev.surfparatodes.surfparatodes.model.user.userlogin.UserLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserLoginRepository extends JpaRepository<UserLogin, Integer> {
    UserLogin findByEmail(String email);
    @Modifying
    @Query("DELETE FROM UserLogin ul WHERE ul.user.id = :userId")
    void deleteByUserId(@Param("userId") Long userId);
}
