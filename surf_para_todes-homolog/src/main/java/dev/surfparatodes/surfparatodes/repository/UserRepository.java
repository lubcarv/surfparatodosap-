package dev.surfparatodes.surfparatodes.repository;

import dev.surfparatodes.surfparatodes.enums.UserRole;
import dev.surfparatodes.surfparatodes.model.user.user.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Integer> {
    List<Users> findByUserRole(UserRole userRole);

    List<Users> findByUserRoleAndActive(UserRole userRole, boolean active);

    List<Users> findAll();
    Optional<Users> findByEmail(String email);
    List<Users> findByActive(boolean active);

}
