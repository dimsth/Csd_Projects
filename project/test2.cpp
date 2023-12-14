#include "PokemonLeague.h"

START_GAME

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

pkmn::Pokemon tmp = pkmn::Pokemon::getFromAllPokemons("Hoothoot");
std::cout<< tmp.getType()<<std::endl;
tmp = pkmn::Pokemon::getFromAllPokemons("Mewtwo");
std::cout<< tmp.getType()<<std::endl;
END_GAME