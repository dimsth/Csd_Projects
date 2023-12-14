#include "Pokemon.h"

std::list<pkmn::Pokemon> allPokemon;

pkmn::Pokemon pkmn::Pokemon::getFromAllPokemons(const std::string& _name) {
    for (auto& _pok : allPokemon) {
        if (_name == _pok.getName()) {
            return _pok; 
        }
    }

    return pkmn::Pokemon("", "", -1);
}


pkmn::Pokemon::Pokemon(std::string _name, std::string _type, int _maxhp){
    setHP(_maxhp);
    setMaxHP(_maxhp);
    setType(_type);
    setName(_name);

    allPokemon.push_back(*this);
}



// Setters
void pkmn::Pokemon::setHP(int newHP) {
    HP = newHP;
}

void pkmn::Pokemon::setMaxHP(int newMaxHP) {
    maxHP = newMaxHP;
}

void pkmn::Pokemon::setType(const std::string& newType) {
    Type = newType;
}

void pkmn::Pokemon::setName(const std::string& newName) {
    Name = newName;
}

void pkmn::Pokemon::setInPokeball(bool newValue) {
    inPokeball = newValue;
}

void pkmn::Pokemon::setIsAlive(bool newValue) {
    isAlive = newValue;
}

void pkmn::Pokemon::setMoves(const std::list<std::string>& newMoves) {
    Moves = newMoves;
}

void pkmn::Pokemon::setOpponentsType(const std::string& newOpponentsType) {
    opponentsType = newOpponentsType;
}

void pkmn::Pokemon::setPlayerNum(int newPlayerNum) {
    playerNum = newPlayerNum;
}

void pkmn::Pokemon::setRound(int newRound) {
    round = newRound;
}

// Getters
int pkmn::Pokemon::getHP() const {
    return HP;
}

int pkmn::Pokemon::getMaxHP() const {
    return maxHP;
}

std::string pkmn::Pokemon::getType() const {
    return Type;
}

std::string pkmn::Pokemon::getName() const {
    return Name;
}

bool pkmn::Pokemon::getInPokeball() const {
    return inPokeball;
}

bool pkmn::Pokemon::getIsAlive() const {
    return isAlive;
}

std::list<std::string> pkmn::Pokemon::getMoves() const {
    return Moves;
}

std::string pkmn::Pokemon::getOpponentsType() const {
    return opponentsType;
}

int pkmn::Pokemon::getPlayerNum() const {
    return playerNum;
}

int pkmn::Pokemon::getRound() const {
    return round;
}