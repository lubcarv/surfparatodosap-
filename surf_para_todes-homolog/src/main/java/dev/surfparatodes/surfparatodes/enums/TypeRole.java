package dev.surfparatodes.surfparatodes.enums;

public enum TypeRole {
    ADMIN("admin"),
    USER("user");

    private String role;

    TypeRole(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}
