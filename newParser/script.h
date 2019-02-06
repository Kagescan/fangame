#ifndef SCRIPT_H
#define SCRIPT_H


#include <iostream>
#include <stack>
#include <cmath>
#include <string>
#include <regex>


class Script {

    public:
    	Script();
        std::string calc(std::string input);
        bool regexTest(std::string str);

    private :
        std::string cmdSet(std::string str);
        std::string cmdEntity(std::string str);
        std::string removeSpaces(std::string str);
        std::string rgQuote, rgSpacestar, rgVarNames;
        std::smatch m;
};


#endif