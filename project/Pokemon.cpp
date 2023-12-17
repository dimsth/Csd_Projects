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

    std::list<pkmn::Pokemon> pkmn::Pokemon::getAllPokemon() {
        return allPokemon;
    }


pkmn::Pokemon::Pokemon(std::string _name, std::string _type, int _maxhp){
        std::cout << "Creating Pokemon: " << _name << std::endl;

    setHP(_maxhp);
    setMaxHP(_maxhp);
    setType(_type);
    setName(_name);

    allPokemon.push_back(*this);
}

pkmn::Pokemon pkmn::Pokemon::operator,(const pkmn::Pokemon& _pkmn) {
    return *this;
}

void pkmn::Pokemon::operator[](const pkmn::Pokemon& _pkmn) {
    return;
}

void pkmn::Pokemon::operator[](std::string abilitiesNames) {
    std::vector<std::string> abilities;
    size_t pos = 0;
    std::string token;

    while ((pos = abilitiesNames.find(",")) != std::string::npos) {
        token = abilitiesNames.substr(0, pos);
        abilities.push_back(token);
        abilitiesNames.erase(0, pos + 1);
    }

    addAbilities(abilities);

    pkmn::Pokemon tmp=getFromAllPokemons(getName());
    auto it = std::find(allPokemon.begin(), allPokemon.end(), tmp);

    if (it != allPokemon.end()) {
        allPokemon.erase(it);
        allPokemon.push_back(*this);
    }

}

bool pkmn::Pokemon::operator==(const Pokemon& other) const {
    return Name == other.Name && Type == other.Type;
}

void pkmn::Pokemon::addAbilities(const std::vector<std::string>& abilities) {
    std::list<std::string> updatedMoves = getMoves(); 

    for (const auto& ability : abilities) {
        updatedMoves.push_back(ability);
    }

    setMoves(updatedMoves);
   
}

void pkmn::Pokemon::printAbilities() {
    std::cout << "Number of abilities: " << Moves.size() << std::endl;
    std::cout << "Abilities: ";
    for (const auto& ability : Moves) {
        std::cout << ability << " ";
    }
    std::cout << std::endl;
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