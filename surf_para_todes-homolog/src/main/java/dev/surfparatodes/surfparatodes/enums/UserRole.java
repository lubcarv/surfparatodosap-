package dev.surfparatodes.surfparatodes.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public enum UserRole {
    ALUNO(1),
    PROFESSOR(2);

    private final int code;

    // Construtor do enum, deve ser privado (por padrão é)
    UserRole(int code) {
        this.code = code;
    }

    //mapeamento estático, evitando switch/case
    private static final Map<Integer, UserRole> lookup = new HashMap<>();

    static {
        for (UserRole type : UserRole.values()) {
            lookup.put(type.getCode(), type);
        }
    }

    @JsonValue
    public int getCode() {
        return code;
    }

    @JsonCreator
    public static UserRole fromCode(int code) {
        UserRole type = lookup.get(code);
        if (type == null) {
            throw new IllegalArgumentException("Código inválido para tipo de usuário: " + code);
        }
        return type;
    }
}
