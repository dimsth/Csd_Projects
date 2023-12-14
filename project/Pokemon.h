#ifndef POKEMON_H
#define POKEMON_H
#include <iostream>
#include <string>
#include <list>

namespace pkmn{
    class Pokemon{
    private:
    // static std::list<Pokemon> allPokemon;

        int HP;
        int maxHP;
        std::string Type;
        std::string Name;
        bool inPokeball = false;
        bool isAlive = true;
        std::list<std::string> Moves;
        std::string opponentsType;
        int playerNum = 0;
        int round = 0;
    
    public:

// Constructor
    Pokemon(std::string, std::string, int);

    // Setters
    void setHP(int newHP);
    void setMaxHP(int newMaxHP);
    void setType(const std::string& newType);
    void setName(const std::string& newName);
    void setInPokeball(bool newValue);
    void setIsAlive(bool newValue);
    void setMoves(const std::list<std::string>& newMoves);
    void setOpponentsType(const std::string& newOpponentsType);
    void setPlayerNum(int newPlayerNum);
    void setRound(int newRound);

    // Getters
    int getHP() const;
    int getMaxHP() const;
    std::string getType() const;
    std::string getName() const;
    bool getInPokeball() const;
    bool getIsAlive() const;
    std::list<std::string> getMoves() const;
    std::string getOpponentsType() const;
    int getPlayerNum() const;
    int getRound() const;

    // Other member functions...

    // Static function
    static Pokemon getFromAllPokemons(const std::string& _name);
};

    class Ability;
}

#endif // POKEMON_H