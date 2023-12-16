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

pkmn::Pokemon pkmn::Pokemon::operator,(const pkmn::Pokemon& move) {
    allPokemon.push_back(move);
    return *this;
}

void pkmn::Pokemon::operator[](const pkmn::Pokemon& move) {
    allPokemon.push_back(move);
}

pkmn::Pokemon& pkmn::Pokemon::operator-()
{
	setHP(-getHP());
	return *this;
}

pkmn::Pokemon pkmn::Pokemon::operator+(int iValue)
{
	double dValue = iValue;
	if (getHP() < 0) {
		setHP(abs(getHP()));
		
        int finalDamage = iValue;
        std::cout<< finalDamage << std::endl;


        finalDamage = getType() == "Electric" ? 
        (getOpponentsType() == "Fire" ? static_cast<int>(finalDamage - (0.3f * finalDamage)) : static_cast<int>(finalDamage - (0.2f * finalDamage))) :
        finalDamage;

        finalDamage = getOpponentsType() == "Fire"?
        (getType() == "Electric" ? static_cast<int>(finalDamage + (0.2f * finalDamage)) : static_cast<int>(finalDamage + (0.15f * finalDamage))) :
        finalDamage;

        finalDamage = getType() == "Water" ?
        static_cast<int>(finalDamage - (0.07f * finalDamage)):
        finalDamage;

        finalDamage = getOpponentsType() == "Water" ?
        static_cast<int>(finalDamage + (0.07f * finalDamage)):
        finalDamage;

        finalDamage = getOpponentsType() == "Grass" && getRound() % 2 == 1 ?
        static_cast<int>(finalDamage + (0.07f * finalDamage)):
        finalDamage;

        setHP(getHP() - finalDamage);

        return *this;
	}
	setHP(getHP() + iValue);

    getHP() > getMaxHP() ? setHP(getMaxHP()) : setHP(getHP());

	return *this;
}

void pkmn::Pokemon::operator+(bool value){
	setInPokeball(value);
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