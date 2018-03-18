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

class novel{
    public:
        novel(std::string loadfile);
        std::string remove(std::string str,std::string search);
        std::vector<std::vector<std::vector<std::vector<std::string> > > > getParsed();
        void play(std::string partName);
        int showParsed(sf::RenderWindow &scr);
        sf::String toSfString(std::string theStdString);
    private:
        std::vector<std::vector<std::vector<std::vector<std::string> > > > parsed;
};
#endif
