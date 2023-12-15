#include "PokemonLeague.h"

START_GAME

CREATE ABILITY {
    NAME: "Shock",
    ACTION: START
        std::cout << "Shock"<< std::endl;
    END
}

CREATE ABILITY {
    NAME: "Spark",
    ACTION: START
        std::cout << "Its gonna Spark!"<< std::endl;
    END
}

CREATE ABILITIES[
    ABILITY {
        NAME: "Earth_Power",
        ACTION: START
            std::cout << "The earth will move"<< std::endl;
        END
    },
    ABILITY {
        NAME: "Grass_Knot",
        ACTION: START
            std::cout << "Grass is weird"<< std::endl;
        END
    },
    ABILITY {
        NAME: "Aqua_Jet",
        ACTION: START
            std::cout << "Water"<< std::endl;
        END
    },
    ABILITY {
        NAME: "Bite",
        ACTION: START
            std::cout << "Meow" << std::endl;
        END
    }
]

CREATE POKEMON{
    NAME: "Mewtwo", 
    TYPE: "Electric", 
    HP: 85
    }

CREATE POKEMON{
    NAME:"Hoothoot", 
    TYPE:"Fire", 
    HP: 90
    };

pkmn::Pokemon tmpPok = pkmn::Pokemon::getFromAllPokemons("Hoothoot");
std::cout<< tmpPok.getType()<<std::endl;
tmpPok = pkmn::Pokemon::getFromAllPokemons("Mewtwo");
std::cout<< tmpPok.getHP()<<std::endl;

pkmn::Ability tmpAbil = pkmn::Ability::getFromAllAbilities("Shock");
if (tmpAbil.getMove()) {
    tmpAbil.getMove()(tmpPok, tmpPok);
} else {
    std::cout << "Move function is not set for Ability" << std::endl;
}

tmpAbil = pkmn::Ability::getFromAllAbilities("Spark");
if (tmpAbil.getMove()) {
    tmpAbil.getMove()(tmpPok, tmpPok);
} else {
    std::cout << "Move function is not set for Ability" << std::endl;
}

tmpAbil = pkmn::Ability::getFromAllAbilities("Grass_Knot");
if (tmpAbil.getMove()) {
    tmpAbil.getMove()(tmpPok, tmpPok);
} else {
    std::cout << "Move function is not set for Ability" << std::endl;
}

tmpAbil = pkmn::Ability::getFromAllAbilities("Earth_Power");
if (tmpAbil.getMove()) {
    tmpAbil.getMove()(tmpPok, tmpPok);
} else {
    std::cout << "Move function is not set for Ability" << std::endl;
}

tmpAbil = pkmn::Ability::getFromAllAbilities("Bite");
if (tmpAbil.getMove()) {
    tmpAbil.getMove()(tmpPok, tmpPok);
} else {
    std::cout << "Move function is not set for Ability" << std::endl;
}

tmpAbil = pkmn::Ability::getFromAllAbilities("Aqua_Jet");
if (tmpAbil.getMove()) {
    tmpAbil.getMove()(tmpPok, tmpPok);
} else {
    std::cout << "Move function is not set for Ability" << std::endl;
}

END_GAME
