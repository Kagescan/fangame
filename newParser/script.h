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
        bool regexTest(std::string str);

    private :
        bool cmdEcho(std::string str);
        std::string cmdSet(std::string str);
        std::string cmdEntity(std::string str);
        std::string calc(std::string input);
        std::string removeSpaces(std::string str);
        std::string getValue(std::string varName);
        std::string strReplace(std::string& s, const std::string& toReplace, const std::string& replaceWith);
        std::string replaceVars(std::string str);
        bool assign(std::string var, std::string value, std::string object="");

        std::string rgQuote, rgSpacestar, rgVarNames;
        std::smatch m;
        std::map<std::string, std::string> varValues;
        //std::map<std::string, std::string> varTypes;
};


#endif