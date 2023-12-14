#include "Pokemon.h"

std::list<pkmn::Ability> allAbilities;

pkmn::Ability pkmn::Ability::getFromAllAbilities(const std::string& _name) {
    for (auto& _abil : allAbilities) {
        if (_name == _abil.getName()) {
            return _abil; 
        }
    }

    std::function<void(pkmn::Pokemon&, pkmn::Pokemon&)> noOp;
    return pkmn::Ability("", noOp);
}


pkmn::Ability::Ability(std::string _name, std::function<void(pkmn::Pokemon& attacker, pkmn::Pokemon& defender)> _move){
    setName(_name);
    setMove(_move);

    allAbilities.push_back(*this);
}

void pkmn::Ability::setName(const std::string& newName) {
    Name = newName;
}

void pkmn::Ability::setMove(const std::function<void(pkmn::Pokemon& , pkmn::Pokemon& )> newMove) {
    Move = newMove;
}

std::function<void(pkmn::Pokemon&, pkmn::Pokemon&)> pkmn::Ability::getMove(){
    return Move;
}

std::string pkmn::Ability::getName(){
    return Name;
}