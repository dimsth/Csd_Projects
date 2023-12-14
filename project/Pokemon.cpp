#include "Pokemon.h"

std::list<Pokemon> allPokemon;

void getFromAllPokemons(std::string _name){
    for(auto _pok: allPokemon){
        if(_name == _pok.getName())
            break;
    }
    return _pok;
}

pkmn::Pokemon::Pokemon(std::string _name, std::string _type, int _maxhp){
    setHP(_maxhp);
    setMaxHP(_maxhp)
    setType(_type);
    setName(_name);

    allPokemon.push_back(*this);
}



// Setters
void setHP(int newHP) {
    HP = newHP;
}

void setMaxHP(int newMaxHP) {
    maxHP = newMaxHP;
}

void setType(const std::string& newType) {
    Type = newType;
}

void setName(const std::string& newName) {
    Name = newName;
}

void setInPokeball(bool newValue) {
    inPokeball = newValue;
}

void setIsAlive(bool newValue) {
    isAlive = newValue;
}

void setMoves(const std::list<std::string>& newMoves) {
    Moves = newMoves;
}

void setOpponentsType(const std::string& newOpponentsType) {
    opponentsType = newOpponentsType;
}

void setPlayerNum(int newPlayerNum) {
    playerNum = newPlayerNum;
}

void setRound(int newRound) {
    round = newRound;
}

// Getters
int getHP() const {
    return HP;
}

int getMaxHP() const {
    return maxHP;
}

std::string getType() const {
    return Type;
}

std::string getName() const {
    return Name;
}

bool getInPokeball() const {
    return inPokeball;
}

bool getIsAlive() const {
    return isAlive;
}

std::list<std::string> getMoves() const {
    return Moves;
}

std::string getOpponentsType() const {
    return opponentsType;
}

int getPlayerNum() const {
    return playerNum;
}

int getRound() const {
    return round;
}