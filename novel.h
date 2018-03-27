#ifndef NOVEL_H
#define NOVEL_H
/*Novel - parser for .kage scripts,scripts used for the Kagerou Project Fangame
 *copyright (c) Logan Tann
 *Under the MIT license. See COPYING file.
 */
#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <SFML/Graphics.hpp>
#include "game.h"
#include <string.h>
#include <map>
//#include <iterator>

class novel{
    public:
      novel(std::string loadfile);
      std::string remove(std::string str,std::string search);
      bool play(std::string readline, bool init=false);
      int debug(sf::RenderWindow &scr);
      std::vector<std::string> split(std::string str, char token);
    private:
      std::string removeindent(std::string text);
      std::string loadfile;
      bool comment;
      std::vector<std::string> charaList;
      std::map<std::string, std::string> internalSave;
      std::map<std::string, std::string> externalSave;
      void newchara(std::string line);
      void say(std::string line);

};
#endif
