#ifndef SCRIPT_H
#define SCRIPT_H

/*#include <fstream>
#include <sstream>
#include <vector>
#include <string.h>
#include <map>
#include <memory>
#include "game.h"
#include "easing.h"*/


#include <iostream>
#include <fstream>
#include <stack>
#include <cmath>
#include <string>
#include <regex>
#include <SFML/Graphics.hpp>
#include <SFML/Audio.hpp>

/*
class Character {

    public:
      Character(std::string charaName);
      bool draw(sf::RenderWindow& scr);
      //bool setActive(bool activation);
      bool updatePos(int x, int y);
      void setSprite(sf::Sprite arg);
      bool setTitleColor(sf::Color color);
      bool setName(std::string str);
      sf::Color getTitleColor();

    private :
      //std::string name;
      sf::Sprite sprite, oldSprite;
      //sf::Color titleColor;
};*/

class Script {

    public:
    	Script(std::string file);
        bool regexTest(std::string str);
        bool read(sf::RenderWindow &scr);

    private :
        bool init();
        bool assign(std::string var, std::string value, std::string object="");
        bool cmdGoto(std::string arg, unsigned int line);
        bool cmdEcho(std::string arg);
        bool cmdSet(std::string arg, unsigned int line);
        bool cmdEntity(std::string arg, unsigned int line);
        bool newSprite(std::string name, std::string path, unsigned int line);
        bool newMusic(std::string name, std::string path, unsigned int line);
        bool newSound(std::string name, std::string path, unsigned int line);
        bool newCharacter(std::string name, std::string spriteName, unsigned int line);
        bool setCharacterSprite(std::string charaName, std::string spriteName, unsigned int line);
        bool drawBackground(sf::RenderWindow& scr);
        bool drawCharacters(sf::RenderWindow& scr);
        //bool drawCharacters(sf::RenderWindow& scr, sf::Time currentTime, sf::Time initialTime);
        std::string calc(std::string input);
        std::string getValue(std::string varName);
        std::string replaceVars(std::string str);

        //std::vector<std::string[2]> scriptInstructions;
        std::vector< std::array<std::string,3> > scriptInstructions;
        std::map<std::string, int> labelRefs;

        std::map<std::string, std::string> varValues;
        //std::map<std::string, std::string> entityTypes;
        std::map<std::string, sf::Texture> allTextures;
        std::map<std::string, sf::Sprite> allSprites;
        std::map<std::string, sf::Music> allMusics;
        std::map<std::string, sf::SoundBuffer> buffer;
        std::map<std::string, sf::Sound> allSounds;
        std::vector<std::string> allCharacters;
        //std::map<std::string, Character> allCharacters;


        std::string loadfile;
        std::string rgQuote, rgSpacestar, rgVarNames;
        std::smatch m;
        bool playing, waiting, displaying, pause;
        unsigned int iread;
        //std::map<std::string, std::string> varTypes;
};


//helpers who don't need object
bool blank(std::string str);
template<size_t sz> bool in_array(const std::string &value, std::array<std::string, sz> bar);
std::string removeSpaces(std::string str);
std::string strReplace(std::string& s, const std::string& toReplace, const std::string& replaceWith);
std::string str_tolower(std::string s);

#endif
