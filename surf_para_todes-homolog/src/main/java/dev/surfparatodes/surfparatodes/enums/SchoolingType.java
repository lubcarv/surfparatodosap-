package dev.surfparatodes.surfparatodes.enums;

public enum SchoolingType {

    FUNDAMENTAL_CURSANDO("Cursando Fundamental"),
    FUNDAMENTAL_INCOMPLETO("Fundamental Incompleto"),
    FUNDAMENTAL_CONCLUIDO("Fundamental Concluído"),
    MEDIO_CURSANDO("Cursando Médio"),
    MEDIO_INCOMPLETO("Médio Incompleto"),
    MEDIO_CONCLUIDO("Médio Concluído"),
    SUPERIOR_CURSANDO("Cursando Superior"),
    SUPERIOR_INCOMPLETO("Superior Incompleto"),
    SUPERIOR_CONCLUIDO("Superior Concluído"),
    POS_CURSANDO("Cursando Pós-Graduação"),
    POS_INCOMPLETO("Pós-Graduação Incompleta"),
    POS_CONCLUIDO("Pós-Graduação Concluída"),
    MESTRADO_CURSANDO("Cursando Mestrado"),
    MESTRADO_INCOMPLETO("Mestrado Incompleto"),
    MESTRADO_CONCLUIDO("Mestrado Concluído"),
    DOUTORADO_CURSANDO("Cursando Doutorado"),
    DOUTORADO_INCOMPLETO("Doutorado Incompleto"),
    DOUTORADO_CONCLUIDO("Doutorado Concluído");

    private final String description;

    SchoolingType(String description) {
        this.description = description;
    }
    public String getDescription() {
        return description;
    }
}
