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
#include "novel.h"
#include <SFML/Graphics.hpp>

class novel{
    public:
        novel(std::string loadfile);
        std::string remove(std::string str,std::string search);
        std::vector<std::vector<std::vector<std::vector<std::string> > > > getParsed();
        void play(std::string partName);
        void showParsed();
    private:
        std::vector<std::vector<std::vector<std::vector<std::string> > > > parsed;
};
#endif
