#include <algorithm>
#include <functional>
#include <iostream>
#include <string>
#include <vector>
#include "Pokemon.h"

#define START_GAME                                                             \
  int main() {                                                                 \
    std::function<void(pkmn::Pokemon&, pkmn::Pokemon&)> noOp;                  \
    pkmn::Ability tempAbility{"Temp", noOp};                                   \
    pkmn::Pokemon tempPokemon{"Temp", "Temp", 0};                        
#define END_GAME                                                               \
  ; return 0;                                                                    \
  }
#define CREATE ;
#define DAMAGE ;-
#define HEAL ;
#define EQUIP ;
#define DUEL ; startDuel()

#define POKEMON pkmn::Pokemon
#define POKEMONS tempPokemon
#define ABILITY pkmn::Ability
#define ABILITIES tempAbility

#define NAME false ? ""
#define TYPE false ? ""
#define HP false ? 0
#define ACTION false ? noOp

#define START [](pkmn::Pokemon& attacker, pkmn::Pokemon& defender){
#define END ;}
#define ATTACKER attacker +
#define DEFENDER defender +
#define GET_TYPE(x) (x + 0).getType()
#define GET_NAME(x) (x + 0).getName()
#define IS_IN_POKEBALL(x) (x + 0).getInPokeball()
#define SHOW ;std::cout <<

#define DEAR ; pkmn::Pokemon::getFromAllPokemons (
#define LEARN )
#define ABILITY_NAME(abilityName) #abilityName ","

enum pokeballValue {
	α = false
};
pokeballValue& operator-(pokeballValue value);
bool operator--(pokeballValue value);
#define POKEBALL ;
#define _ true

#define IF ;if(
#define DO ){
#define ELSE_IF ;}else if(
#define ELSE ;}else{
#define AND(a, b, ...) [&](decltype(b))->bool{ std::vector<bool> exps{a, b, __VA_ARGS__}; bool exp = true; for(bool val : exps) exp = exp && val; return exp; }(b)
#define OR(a, b, ...) [&](decltype(b))->bool{ std::vector<bool> exps{a, b, __VA_ARGS__}; bool exp = false; for(bool val : exps) exp = exp || val; return exp; }(b)
#define NOT(a) !(a)

extern void startDuel();