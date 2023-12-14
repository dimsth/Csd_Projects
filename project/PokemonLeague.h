#include <algorithm>
#include <functional>
#include <iostream>
#include <string>
#include <vector>
#include "Pokemon.h"

#define START_GAME                                                             \
  int main() {                                                                 \
    std::cout << "test" << std::endl;
#define END_GAME                                                               \
  return 0;                                                                    \
  }
#define CREATE ;
#define DAMAGE ;
#define HEAL ;
#define EQUIP ;
#define POKEMON pkmn::Pokemon

#define NAME false ? ""
#define TYPE false ? ""
#define HP false ? 0

#define IF if(
#define DO ){
#define ELSE_IF ;}else if(
#define ELSE ;}else{
#define END ;}
#define AND(a, b, ...) [&](decltype(b))->bool{ std::vector<bool> exps{a, b, __VA_ARGS__}; bool exp = true; for(bool val : exps) exp = exp && val; return exp; }(b)
#define OR(a, b, ...) [&](decltype(b))->bool{ std::vector<bool> exps{a, b, __VA_ARGS__}; bool exp = false; for(bool val : exps) exp = exp || val; return exp; }(b)
#define NOT(a) !(a)

