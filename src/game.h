#ifndef GAME_H
#define GAME_H
#include <iostream>
#include <SFML/Graphics.hpp>
#include <SFML/Window.hpp>
#include <SFML/Audio.hpp>
#include "easing.h"
#include "calc.h"
#include <fstream>
#include <sstream>


int error(std::string type);
int intro(sf::RenderWindow &scr,int scrw,int scrh,sf::Font&font); //function only for the game,don't touch :)


bool fadeout(sf::RenderWindow &scr,int scrw=1280,int scrh=720,int time=0); //should not exist. Ahhhh my eyes *A* it is a horrible code !!
bool fadein(sf::RenderWindow &scr,sf::Sprite &texture,int time=0);

bool blank(std::string str);
std::string removeTabs(std::string str);
std::string removeSpaces(std::string str);
std::string strReplace(std::string& s, const std::string& toReplace, const std::string& replaceWith);
std::string str_tolower(std::string s);
std::vector<std::string> split(std::string string, char search);
std::vector<sf::String> splitQuotes(std::string str,unsigned int numLine);
sf::String toSfString(std::string theStdString);
std::vector<sf::String> cutString(sf::String line, unsigned int lenghtLimit);
std::string calc(std::string input);

class guiSelect{
  public:
    guiSelect();
    bool draw(sf::RenderWindow& src);
    sf::Vector2f position(sf::Vector2f position);
    bool type(bool type);
    bool change(bool direction);
    unsigned int enter();
    bool displaying = false;
    std::vector<std::string> choices;
  private:
    sf::Font fontDeja;
    sf::Texture barTxt, smallBarTxt;
    sf::Sprite bar, smallBar, barSelected, smallBarSelected;

    bool valType;
    sf::Vector2f valPosition;
    unsigned int iter, choicePos;
};


class Character {

    public:
      Character(int winHeight = 720);
      bool animatePos(std::string from, std::string to, std::string ease, sf::Time time, sf::Time curr, unsigned int line);
      bool animateOpacity(std::string from, std::string to, std::string ease, sf::Time duration, sf::Time curr, unsigned int line);
      bool animateSprite(sf::Sprite from, sf::Sprite to, sf::Time time, sf::Time curr);
      bool animateSpeak(bool in, sf::Time curr);
      bool update(sf::RenderWindow& scr, sf::Time curr);
      int reloadY(int changeY = 0);
      sf::Sprite sprite;
      sf::Color titleColor, spriteColor;
    private: 
      int x, y;
      bool animX, animS, animO, animSp, animSp_type;
      int animX_from, animX_to, animS_from, animS_to, animO_from, animO_to, animSp_posy, scrh;
      std::string animX_ease, animS_ease, animO_ease;
      sf::Time animX_duration, animX_init, animS_duration, animS_init, animO_duration, animO_init, animSp_init;
      sf::Sprite oldSprite;
      sf::Texture emptyTxt;
};
#endif
