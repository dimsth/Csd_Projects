#ifndef POKEMON_H
#define POKEMON_H
#include <iostream>
#include <string>
#include <functional>
#include <list>
#include <vector>
#include <cassert>

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
        std::string opponentsType;
        int playerNum = 0;
        int round = 0;

        std::list<bool> extraFunctionType;
        std::list<int> finishExtraFuncRound;
        std::list<int> numOfRoundExtraFunc;
        std::list<std::function<void(pkmn::Pokemon&, pkmn::Pokemon&)>> ExtraFunc;
    
    public:
    int functions = 0;

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
    void setFinishExtraFuncRound(int);
    void setFinishRound(int, int);

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
    std::function<void(pkmn::Pokemon&, pkmn::Pokemon&)> getExtraFunc(int); 
    bool getFuncType(int);
    int getFinishRound(int);
    int getRoundextrafunc(int);

    // Other member functions...

        Pokemon operator,(const pkmn::Pokemon&);
        void operator[](const pkmn::Pokemon&);
        Pokemon operator+(int);
        void operator+(bool);
        Pokemon &operator-();
        void operator/(std::function<void(pkmn::Pokemon&, pkmn::Pokemon&)>);
	void operator[](std::string);
    void printAbilities();
    void addAbilities(const std::vector<std::string>& abilities);
    bool checkAbility(std::string);

    // Static function
    static Pokemon getFromAllPokemons(const std::string& _name);
    static std::list<pkmn::Pokemon> getAllPokemon();

    void setExtraFuncFor(int);
    void setExtraFuncAfter(int);

    bool operator==(const Pokemon& other) const;
};

    class Ability{
    private:
        std::string Name;
        std::function<void(pkmn::Pokemon&, pkmn::Pokemon&)> Move;

    public:
        static Ability getFromAllAbilities(const std::string&);
        Ability(std::string, std::function<void(pkmn::Pokemon& , pkmn::Pokemon& )>);
        Ability operator,(const pkmn::Ability&);
        void operator[](const pkmn::Ability&);


        std::string getName();
        std::function<void(pkmn::Pokemon&, pkmn::Pokemon&)> getMove();

        void setName(const std::string& newName);
        void setMove(const std::function<void(pkmn::Pokemon& , pkmn::Pokemon& )> newMove); 
        };
        // static std::list<Pokemon> allPokemon;

}

#endif // POKEMON_H
