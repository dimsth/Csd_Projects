#include "PokemonLeague.h"

START_GAME
pkmn::Pokemon::Pokemon{"Hoothoot", "Fire", 90};

pkmn::Pokemon tmp = pkmn::Pokemon::getFromAllPokemons("Hoothoot");
std::cout<< tmp.getType()<<std::endl;
END_GAME
