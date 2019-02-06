#include <iostream>
#include "script.h"


int main() { 
	std::string input, expression,result; 
	Script engine;
	
    while (result!="0"){
    	std::cout<<"\n> ";
    	getline(std::cin,expression);

    	//std::string result = engine.calc(expression);
		//std::cout<<std::boolalpha<<
		engine.regexTest(expression);

    	//std::cout <<"Result : "<< result << "\n\n"; 
        }
	return 0;
} 

