#include "PokemonLeague.h"

BEGIN_GAME

CREATE ABILITY {
    NAME: "Shock",
    ACTION: START
        FOR 3 ROUNDS DO
            DAMAGE DEFENDER 5
        END
    END
}

CREATE ABILITY {
    NAME: "Spark",
    ACTION: START
        DAMAGE ATTACKER 15
    END
}

CREATE ABILITY {
    NAME: "Crunch",
    ACTION: START
        DAMAGE DEFENDER 20
        POKEBALL DEFENDER _
        AFTER 1 ROUNDS DO
            POKEBALL DEFENDER -- -α
        END
    END
}

CREATE ABILITY {
    NAME: "Water_Gun",
    ACTION: START
        DAMAGE DEFENDER 5
    END
}

CREATE ABILITIES [
    ABILITY {
        NAME: "Earth_Power",
        ACTION: START
            DAMAGE DEFENDER 15
            HEAL ATTACKER 5
        END
    },
    ABILITY {
        NAME: "Grass_Knot",
        ACTION: START
            // HEAL DEFENDER 10
            SHOW "Name: " << GET_NAME(DEFENDER)<< "Type: " << GET_TYPE(DEFENDER)
        END
    },
    ABILITY {
        NAME: "Aqua_Jet",
        ACTION: START
            // HEAL ATTACKER 10
            IF NOT(IS_IN_POKEBALL(DEFENDER)) DO
                SHOW "Name: " << GET_NAME(DEFENDER)<< "Type: " << GET_TYPE(DEFENDER)
            END
        END
    },
    ABILITY {
        NAME: "Bite",
        ACTION: START
            POKEBALL DEFENDER _
        END
    }
]

CREATE POKEMONS [
     POKEMON{
    NAME: "Mew", 
    TYPE: "Electric", 
    HP: 85
    },
    POKEMON{
    NAME:"Hoothoot", 
    TYPE:"Fire", 
    HP: 90
    }
]

DEAR "Mew" LEARN [
    ABILITY_NAME(Grass_Knot)
    ABILITY_NAME(Shock)
    ABILITY_NAME(Water_Gun)
    ABILITY_NAME(Bite)
]

DEAR "Hoothoot" LEARN [
    ABILITY_NAME(Crunch)
    ABILITY_NAME(Aqua_Jet)
    ABILITY_NAME(Spark)
    ABILITY_NAME(Earth_Power)
]

DUEL

END_GAME
