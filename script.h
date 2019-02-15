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
        std::string calc(std::string input);
        std::string getValue(std::string varName);
        std::string replaceVars(std::string str);

        //std::vector<std::string[2]> scriptInstructions;
        std::vector< std::array<std::string,3> > scriptInstructions;
        std::map<std::string, std::string> varValues;
        std::map<std::string, int> labelRefs;
        std::string loadfile;
        std::string rgQuote, rgSpacestar, rgVarNames;
        std::smatch m;
        bool playing, waiting;
        unsigned int iread;
        //std::map<std::string, std::string> varTypes;
};

//helpers who don't need object
bool blank(std::string str);
std::string removeSpaces(std::string str);
std::string strReplace(std::string& s, const std::string& toReplace, const std::string& replaceWith);
std::string str_tolower(std::string s);

#endif
