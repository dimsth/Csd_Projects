#include "PokemonLeague.h"

START_GAME

CREATE ABILITY {
    NAME: "Shock",
    ACTION: START
        std::cout << "Shock"<< std::endl;
    END
}


CREATE POKEMON{
    NAME: "Mewtwo", 
    TYPE: "Electric", 
    HP: 85
    };

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
END_GAME
