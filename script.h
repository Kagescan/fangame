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
#include "game.h"

class Character {

    public:
      Character();
      sf::Sprite sprite;
      sf::Color titleColor;
      int x, y;
};
class Script {

    public:
    	Script(std::string file);
      bool regexTest(std::string str);
      bool read(sf::RenderWindow &scr);

    private :
      /* Functions */
        bool init();
        bool assign(std::string var, std::string value, std::string object="");
        bool cmdGoto(std::string arg, unsigned int line);
        bool cmdEcho(std::string arg);
        bool cmdEntity(std::string arg, unsigned int line);
        bool cmdSay(std::string arg, unsigned int line);
        bool cmdSet(std::string arg, unsigned int line);
        bool newCharacter(std::string name, std::string spriteName, unsigned int line);
        bool newMusic(std::string name, std::string path, unsigned int line);
        bool newSound(std::string name, std::string path, unsigned int line);
        bool newSprite(std::string name, std::string path, unsigned int line);
        bool setCharacterSprite(std::string charaName, std::string spriteName, unsigned int line);
        bool drawBackground(sf::RenderWindow& scr);
        bool drawCharacters(sf::RenderWindow& scr);
        bool drawText(sf::RenderWindow& scr);
        //bool drawCharacters(sf::RenderWindow& scr, sf::Time currentTime, sf::Time initialTime);
        std::string calc(std::string input);
        std::string getValue(std::string varName);
        std::string replaceVars(std::string str);

      /* Var declarations*/
        //std::vector<std::string[2]> scriptInstructions;
        std::vector< std::array<std::string,3> > scriptInstructions;
        std::vector<sf::String> displaySay;
        std::vector<bool> displayedTxt;
        std::map<std::string, int> labelRefs;

        std::map<std::string, std::string> varValues;
        //std::map<std::string, std::string> entityTypes;
        std::map<std::string, sf::Texture> allTextures;
        std::map<std::string, sf::Sprite> allSprites;
        std::map<std::string, sf::Music> allMusics;
        std::map<std::string, sf::SoundBuffer> buffer;
        std::map<std::string, sf::Sound> allSounds;
        std::map<std::string, Character> allCharacters;
        //std::map<std::string, Character> allCharacters;

        sf::Vector2u winSize;
        sf::RectangleShape bar;//,choiceWindow,blackWindow;
        sf::Font fontDeja;
        sf::Color txtColor;

        std::string loadfile, rgQuote, rgSpacestar, rgVarNames, actualCharacter;
        std::smatch m;
        bool playing, waiting, displaying, pause, animatingTextFinished;
        unsigned int iread, substrPos;
        int barPosY;
        //std::map<std::string, std::string> varTypes;
};


//helpers who don't need objects
  bool blank(std::string str);
  template<size_t sz> bool in_array(const std::string &value, std::array<std::string, sz> bar);
  std::string removeSpaces(std::string str);
  std::string strReplace(std::string& s, const std::string& toReplace, const std::string& replaceWith);
  std::string str_tolower(std::string s);
  std::vector<std::string> split(std::string string, char search);
  std::vector<sf::String> splitQuotes(std::string str,unsigned int numLine);
  //sf::String toSfString(std::string theStdString);
#endif
