#include "PokemonLeague.h"

pokeballValue operator-(pokeballValue value){
	return value;
}
bool operator--(pokeballValue value){
	return static_cast<bool>(value);
}

void printPokemonStatus(pkmn::Pokemon _pok1, pkmn::Pokemon _pok2){
	std::cout << std::endl;
	std::cout << "############################################" << std::endl;
	std::cout << "Name: " << _pok1.getName() << std::endl;
	std::cout << "HP: " << _pok1.getHP() << std::endl;
	_pok1.getInPokeball() ? std::cout << "Pokemon in Pokeball" << std::endl : std::cout << "Pokemon out of Pokeball" << std::endl;
	std::cout << "############################################" << std::endl << std::endl << std::endl;

	std::cout << "############################################" << std::endl;
	std::cout << "Name: " << _pok2.getName() << std::endl;
	std::cout << "HP: " << _pok2.getHP() << std::endl;
	_pok2.getInPokeball() ? std::cout << "Pokemon in Pokeball" << std::endl : std::cout << "Pokemon out of Pokeball" << std::endl;
	std::cout << "############################################" << std::endl << std::endl;
}

void printPokemonAbilities(pkmn::Pokemon _pok){
	if (!_pok.getInPokeball()){
		std::cout << _pok.getName() << "(Player" << _pok.getPlayerNum() << ") select ability:" << std::endl;
		std::cout << "__________________________________" << std::endl;
		_pok.printAbilities();
		std::cout << "__________________________________" << std::endl;
		return;
	}
	std::cout << _pok.getName() << "(Player" << _pok.getPlayerNum() << ") has not a pokemon out of pokeball so he can't cast an ability!" << std::endl;
}

void printRound(int _r){
	std::cout << "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" << std::endl;
	std::cout << "Round " << _r << std::endl;
	std::cout << "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" << std::endl;
}

bool checkIfPokemonStillAlive(pkmn::Pokemon _pok){
	if (0 >= _pok.getHP()){
		_pok.setIsAlive(false);
		return false;
	}
	return true;		
}

void startDuel(){
	int Round = 0;
	std::string temp;

    std::cout << "-------------------------------------THE POKEMON GAME-------------------------------------" << std::endl << std::endl;

	pkmn::Pokemon player1{"Temp", "Temp", 0};
    pkmn::Pokemon player2{"Temp", "Temp", 0};
	pkmn::Ability abilityToCast = pkmn::Ability::getFromAllAbilities("foo");

	std::list<pkmn::Pokemon> Pokemons = pkmn::Pokemon::getAllPokemon();

	std::cout << "Player1 select Pokemon:\n----------------------------" << std::endl;
	for (auto _pok : Pokemons) {
		std::cout << "      "<< _pok.getName() << std::endl;
	}
	std::cout << "----------------------------" << std::endl;
	getline(std::cin, temp);
    player1 = pkmn::Pokemon::getFromAllPokemons(temp);

	while (-1 == player1.getMaxHP()) {
		std::cout << "There is no pokemon with name \"" << temp << "\". Please try again" << std::endl;
		getline(std::cin, temp);
        player1 = pkmn::Pokemon::getFromAllPokemons(temp);
	}
	player1.setPlayerNum(1);

	std::cout << "Player2 select Pokemon:\n----------------------------" << std::endl;
	for (auto _pok : Pokemons) {
		std::cout << "      "<< _pok.getName() << std::endl;
	}
	std::cout << "----------------------------" << std::endl;
	getline(std::cin, temp);
    player2 = pkmn::Pokemon::getFromAllPokemons(temp);

	while (-1 == player2.getMaxHP()) {
		std::cout << "There is no pokemon with name \"" << temp << "\". Please try again" << std::endl;
		getline(std::cin, temp);
        player2 = pkmn::Pokemon::getFromAllPokemons(temp);
	}
	player2.setPlayerNum(2);

    player1.setOpponentsType(player2.getType());
    player2.setOpponentsType(player1.getType());
	player1.setRound(Round);
	player2.setRound(Round);

	while(player1.getIsAlive() && player2.getIsAlive()){
		std::cout << std::endl;
		printRound(Round);

		printPokemonAbilities(player1);
		if(!player1.getInPokeball()){
			getline(std::cin, temp);
			while(!player1.checkAbility(temp)){
				std::cout << "The pokemon does not have an ability called \"" << temp << "\". Please try again" << std::endl;
				getline(std::cin, temp);
			}
			abilityToCast = pkmn::Ability::getFromAllAbilities(temp);

			abilityToCast.getMove()(player1, player2);

			if(player1.getType() == "Grass" && Round % 2 == 0){
				int hpRestor = player1.getMaxHP() * 0.05f;
				player1 + hpRestor;
			}
		}
		if (-1 != player1.getRoundextrafunc()){
			int _round = player1.getRoundextrafunc();

			if(-1 == player1.getFinishRound())
				player1.setFinishExtraFuncRound(_round + Round);

			if(Round < player1.getFinishRound() && player1.getFuncType())
				player1.getExtraFunc()(player1, player2);
			else if(Round >= player1.getFinishRound() && player1.getFuncType())
				player1.setFinishExtraFuncRound(-1);

			if(Round == player1.getFinishRound() && !player1.getFuncType())
				player1.getExtraFunc()(player1, player2);
			else if(Round >= player1.getFinishRound() && !player1.getFuncType())
				player1.setFinishExtraFuncRound(-1);
		}

		printPokemonStatus(player1, player2);
		if(!checkIfPokemonStillAlive(player2))
			break;


		printPokemonAbilities(player2);
		if(!player2.getInPokeball()){
			getline(std::cin, temp);
			while(!player2.checkAbility(temp)){
				std::cout << "The pokemon does not have an ability called \"" << temp << "\". Please try again" << std::endl;
				getline(std::cin, temp);
			}
			abilityToCast = pkmn::Ability::getFromAllAbilities(temp);

			abilityToCast.getMove()(player2, player1);
			if(player2.getType() == "Grass" && Round % 2 == 0){
				int hpRestor = player2.getMaxHP() * 0.05f;
				player2 + hpRestor;
			}
		}

		if (-1 != player2.getRoundextrafunc()){
			int _round = player2.getRoundextrafunc();

			if(-1 == player2.getFinishRound())
				player2.setFinishExtraFuncRound(_round + Round);

			if(Round < player2.getFinishRound() && player2.getFuncType())
				player2.getExtraFunc()(player2, player1);
			else if(Round >= player2.getFinishRound() && player2.getFuncType())
				player2.setFinishExtraFuncRound(-1);

			if(Round == player2.getFinishRound() && !player2.getFuncType())
				player2.getExtraFunc()(player2, player1);
			else if(Round >= player2.getFinishRound() && !player2.getFuncType())
				player2.setFinishExtraFuncRound(-1);
		}

		printPokemonStatus(player1, player2);
		if(!checkIfPokemonStillAlive(player1))
			break;

		Round++;
		player1.setRound(Round);
		player2.setRound(Round);
	}
}