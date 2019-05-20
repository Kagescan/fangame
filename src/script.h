#ifndef SCRIPT_H
#define SCRIPT_H

#include "game.h"
#include <cmath>
#include <regex>

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
        bool cmdSay(std::string arg, unsigned int line, bool noWait=false);
        bool cmdSet(std::string arg, unsigned int line);
        bool cmdMusic(std::string arg, unsigned int line);
        bool cmdWait(std::string arg, unsigned int line);
        bool cmdAnimate(std::string arg, unsigned int line);
        bool cmdChoice(std::string arg, unsigned int line);
        bool cmdPlayScript(std::string arg, unsigned int line, sf::RenderWindow& scr);
        bool cmdSave(std::string arg, unsigned int line);
        bool cmdFor(std::string arg, unsigned int line);
        bool cmdIf(std::string arg, unsigned int line);
        bool cmdElse(std::string arg, unsigned int line);
        bool cmdEnd(std::string arg, unsigned int line);
        bool newCharacter(std::string name, std::string spriteName, unsigned int line);
        bool newMusic(std::string name, std::string path, unsigned int line);
        bool newSound(std::string name, std::string path, unsigned int line);
        bool newSprite(std::string name, std::string path, unsigned int line);
        bool newSave(std::string varName, std::string loadfile, unsigned int line);
        bool setCharacterSprite(std::string charaName, std::string spriteName, unsigned int line);
        bool drawCharacters(sf::RenderWindow& scr);
        bool drawChoices(sf::RenderWindow& scr);
        bool drawText(sf::RenderWindow& scr);
        //bool drawCharacters(sf::RenderWindow& scr, sf::Time currentTime, sf::Time initialTime);
        
        std::string getValue(std::string varName);
        std::string replaceVars(std::string str, bool replaceEvals = false);

      /* Var declarations*/
        //std::vector<std::string[2]> scriptInstructions;
        std::vector< std::array<std::string,3> > scriptInstructions, forActions;
        std::vector<unsigned int> forBlocks;
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
        std::vector<std::array<sf::String, 2> > allChoices;
        //std::map<std::string, Character> allCharacters;

        sf::Vector2u winSize;
        //sf::RectangleShape bar;,choiceWindow,blackWindow;
        sf::Font fontDeja, fontURW;
        sf::Color txtColor, titleColor;
        sf::Texture arrowTxt, barTxt, choiceTxt;
        sf::Sprite arrow, bar, choiceBar, choiceBarSelected;
        sf::Clock clock;
        sf::Time waitLimit;

        std::string loadfile, rgQuote, rgSpacestar, rgVarNames, actualCharacter, refOldChara;
        std::smatch m;
        bool playing, waiting, displaying, pause, animatingTextFinished, drawingChoices;
        unsigned int iread, substrPos, textSpeed, txtSpeedIter, choicePos, choiceErrLine, ifBlocks, animChoiceType;
        float arrowIter;
        int barPosY, fps, animAlpha;
        //std::map<std::string, std::string> varTypes;
};

template<size_t sz> bool in_array(const std::string &value, std::array<std::string, sz> bar);
sf::Color hex2color(std::string arg);
#endif
