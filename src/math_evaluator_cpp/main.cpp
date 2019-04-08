#include <iostream>
#include <cstdlib>
#include <vector>
#include "parser.h"


int main() {

    try {
        Parser evaluator;
        evaluator.parse("2+2");
        double a = evaluator.get_numeric_answer();
        std::cout << "Ans 1: " << a << std::endl;

        evaluator.parse("(4+6)*2");
        a = evaluator.get_numeric_answer();
        std::cout << "Ans 2: " << a << std::endl;
        
        evaluator.parse("12 == 11 + 1");
        a = evaluator.get_numeric_answer();
        std::cout << "Ans 3: " << a << std::endl;
        
        evaluator.parse("12 == 11 + 2");
        a = evaluator.get_numeric_answer();
        std::cout << "Ans 4: " << a << std::endl;

        evaluator.parse("1.04 + 17");
        a = evaluator.get_numeric_answer();
        std::cout << "Ans 4: " << a << std::endl;
        
        evaluator.parse("1.04+17 + (5+5)^2");
        a = evaluator.get_numeric_answer();
        std::cout << "Ans 5: " << a << std::endl;

    } catch(ParsingException ex) {
        std::cout << "Error: " << ex.get_msg() << ", at " << ex.get_col() << std::endl;
    }

    return 0;
}