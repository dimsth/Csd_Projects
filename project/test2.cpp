#include "PokemonLeague.h"

START_GAME

CREATE POKEMON{
    "Mewtwo", 
    "Electric", 
    85
    };

CREATE POKEMON{
    "Hoothoot", 
    "Fire", 
    90
    };

pkmn::Pokemon tmp = pkmn::Pokemon::getFromAllPokemons("Hoothoot");
std::cout<< tmp.getType()<<std::endl;
tmp = pkmn::Pokemon::getFromAllPokemons("Mewtwo");
std::cout<< tmp.getType()<<std::endl;
END_GAME
