#include <iostream>
#include <string>
#include <list>

namespace pkmn{
    class Pokemon{
    private:
        int HP;
        int maxHP;
        std::string Type;
        std::string Name;
        bool inPokeball = false;
        bool isAlive = true;
        std::list<std::string> Moves;
        std::string oppenentsType;
        int playerNum = 0;
        int round = 0;
    
    public:
        void setHP(int newHP);

void setMaxHP(int newMaxHP) ;

void setType(const std::string& newType) ;

void setName(const std::string& newName) ;

void setInPokeball(bool newValue) ;

void setIsAlive(bool newValue) ;

void setMoves(const std::list<std::string>& newMoves) ;

void setOpponentsType(const std::string& newOpponentsType) ;

void setPlayerNum(int newPlayerNum);

void setRound(int newRound) ;

// Getters
int getHP() ;

int getMaxHP() ;

std::string getType();

std::string getName() ;
bool getInPokeball() ;

bool getIsAlive();

std::list<std::string> getMoves() ;

std::string getOpponentsType();


int getPlayerNum() ;

int getRound();
    };

    class Ability;
}