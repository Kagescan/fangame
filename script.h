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
        bool cmdEcho(std::string str);
        bool assign(std::string var, std::string value, std::string object="");
        std::string cmdSet(std::string str);
        std::string cmdEntity(std::string str);
        std::string calc(std::string input);
        std::string removeSpaces(std::string str);
        std::string getValue(std::string varName);
        std::string strReplace(std::string& s, const std::string& toReplace, const std::string& replaceWith);
        std::string replaceVars(std::string str);

        //std::vector<std::string[2]> scriptInstructions;
        std::vector<std::string> scriptInstructions;
        std::map<std::string, int> labelRefs;
        std::string loadfile;
        std::string rgQuote, rgSpacestar, rgVarNames;
        std::smatch m;
        std::map<std::string, std::string> varValues;
        //std::map<std::string, std::string> varTypes;
};


#endif