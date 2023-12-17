#include "PokemonLeague.h"

START_GAME

// CREATE ABILITY {
//     NAME: "Shock",
//     ACTION: START
//         std::cout << "Shock"<< GET_TYPE(ATTACKER) <<std::endl;
//         DAMAGE DEFENDER 20
//     END
// }

// CREATE ABILITY {
//     NAME: "Spark",
//     ACTION: START
//         std::cout << "Its gonna Spark!"<< GET_TYPE(DEFENDER)<<std::endl;
//     END
// }

CREATE ABILITIES [
    ABILITY {
        NAME: "Earth_Power",
        ACTION: START
            std::cout << "The earth will move"<< GET_NAME(ATTACKER)<< std::endl;
        END
    },
    ABILITY {
        NAME: "Grass_Knot",
        ACTION: START
            HEAL DEFENDER 10;
            std::cout << "Grass is weird"<< GET_NAME(DEFENDER)<<std::endl;
        END
    },
    ABILITY {
        NAME: "Aqua_Jet",
        ACTION: START
            HEAL ATTACKER 10;
            std::cout << "Water" << std::endl;
            IF NOT(IS_IN_POKEBALL(DEFENDER)) DO
                std::cout << "Water" << std::endl;
            END
        END
    },
    ABILITY {
        NAME: "Bite",
        ACTION: START
            std::cout << "Meow" << std::endl;
            POKEBALL DEFENDER _
        END
    }
]

CREATE POKEMONS [
     POKEMON{
    NAME: "Mewtwo", 
    TYPE: "Electric", 
    HP: 85
    },
    POKEMON{
    NAME:"Hoothoot", 
    TYPE:"Fire", 
    HP: 90
    }
]

// ==============================================TESTING GROUND==============================================
CREATE

pkmn::Pokemon tmpPokA = pkmn::Pokemon::getFromAllPokemons("Hoothoot");
std::cout<< tmpPokA.getType()<<std::endl;
pkmn::Pokemon tmpPokD = pkmn::Pokemon::getFromAllPokemons("Mewtwo");
std::cout<< tmpPokD.getHP()<<std::endl;

tmpPokA.setOpponentsType(tmpPokD.getType());
tmpPokD.setOpponentsType(tmpPokA.getType());

pkmn::Ability tmpAbil = pkmn::Ability::getFromAllAbilities("Shock");
if (tmpAbil.getMove()) {
    tmpAbil.getMove()(tmpPokA, tmpPokD);
    std::cout<< tmpPokD.getHP()<<std::endl;
} else {
    std::cout << "Move function is not set for Ability" << std::endl;
}

tmpAbil = pkmn::Ability::getFromAllAbilities("Spark");
if (tmpAbil.getMove()) {
    tmpAbil.getMove()(tmpPokA, tmpPokD);
} else {
    std::cout << "Move function is not set for Ability" << std::endl;
}

tmpAbil = pkmn::Ability::getFromAllAbilities("Grass_Knot");
if (tmpAbil.getMove()) {
    tmpAbil.getMove()(tmpPokA, tmpPokD);
    std::cout<< tmpPokD.getHP()<<std::endl;
} else {
    std::cout << "Move function is not set for Ability" << std::endl;
}

tmpAbil = pkmn::Ability::getFromAllAbilities("Earth_Power");
if (tmpAbil.getMove()) {
    tmpAbil.getMove()(tmpPokA, tmpPokD);
} else {
    std::cout << "Move function is not set for Ability" << std::endl;
}

tmpAbil = pkmn::Ability::getFromAllAbilities("Bite");
if (tmpAbil.getMove()) {
    tmpAbil.getMove()(tmpPokA, tmpPokD);
} else {
    std::cout << "Move function is not set for Ability" << std::endl;
}

tmpAbil = pkmn::Ability::getFromAllAbilities("Aqua_Jet");
if (tmpAbil.getMove()) {
    tmpAbil.getMove()(tmpPokA, tmpPokD);
    std::cout<< tmpPokA.getHP()<<std::endl;
} else {
    std::cout << "Move function is not set for Ability" << std::endl;
}


DEAR "Hoothoot" LEARN [
    ABILITY_NAME(Bite)
    ABILITY_NAME(Aqua_Jet)
    ABILITY_NAME(Spark)
    ABILITY_NAME(Earth_Power)
];

tmpPokD = pkmn::Pokemon::getFromAllPokemons("Hoothoot");

tmpPokD.pkmn::Pokemon::printAbilities();

    std::list<pkmn::Pokemon> allPokemonList = pkmn::Pokemon::getAllPokemon();

 for (const auto& pokemon : allPokemonList) {
        std::cout << pokemon.getName() << std::endl;
    };
END_GAME
