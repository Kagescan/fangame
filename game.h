#ifndef GAME_H
#define GAME_H
#include <iostream>
#include <SFML/Graphics.hpp>
#include <SFML/Window.hpp>
#include <SFML/Audio.hpp>
#include "button.h"
#include "easing.h"
#include <fstream>
#include <sstream>


int error(std::string type);
int intro(sf::RenderWindow &scr,int scrw,int scrh,sf::Font&font); //function only for the game,don't touch :)


bool fadeout(sf::RenderWindow &scr,int scrw=1280,int scrh=720,int time=0); //should not exist. Ahhhh my eyes *A* it is a horrible code !!
bool fadein(sf::RenderWindow &scr,sf::Sprite &texture,int time=0);

bool blank(std::string str);

std::string removeSpaces(std::string str);
std::string strReplace(std::string& s, const std::string& toReplace, const std::string& replaceWith);
std::string str_tolower(std::string s);
std::vector<std::string> split(std::string string, char search);
std::vector<sf::String> splitQuotes(std::string str,unsigned int numLine);
sf::String toSfString(std::string theStdString);
std::string calc(std::string input);
#endif
