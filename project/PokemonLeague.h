#include <algorithm>
#include <functional>
#include <iostream>
#include <string>
#include <vector>
#include "Pokemon.h"

#define START_GAME                                                             \
  int main() {                                                                 \
    std::function<void(pkmn::Pokemon&, pkmn::Pokemon&)> noOp;                  \
    pkmn::Ability temp{"Temp", noOp};                                           \
    pkmn::Pokemon temp2{"Temp", "Temp", 0};                        

#define END_GAME                                                               \
  return 0;                                                                    \
  }
#define CREATE ;
#define DAMAGE ;
#define HEAL ;
#define EQUIP ;

#define POKEMON pkmn::Pokemon
#define POKEMONS temp2
#define ABILITY pkmn::Ability
#define ABILITIES temp

#define NAME false ? ""
#define TYPE false ? ""
#define HP false ? 0
#define ACTION false ? noOp

#define START [](pkmn::Pokemon& attacker, pkmn::Pokemon& defender){
#define END ;}
#define ATTACKER attacker
#define DEFENDER defender
#define GET_TYPE(x) (x).getType()
#define GET_NAME(x) (x).getName()
#define IS_IN_POKEBALL(x) (x).getInPokeball()

#define IF if(
#define DO ){
#define ELSE_IF ;}else if(
#define ELSE ;}else{
#define AND(a, b, ...) [&](decltype(b))->bool{ std::vector<bool> exps{a, b, __VA_ARGS__}; bool exp = true; for(bool val : exps) exp = exp && val; return exp; }(b)
#define OR(a, b, ...) [&](decltype(b))->bool{ std::vector<bool> exps{a, b, __VA_ARGS__}; bool exp = false; for(bool val : exps) exp = exp || val; return exp; }(b)
#define NOT(a) !(a)
