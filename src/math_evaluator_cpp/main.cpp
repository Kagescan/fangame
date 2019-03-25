#include <iostream>
#include <cstdlib>
#include <vector>

#include "parser.h"

using std::endl;
using std::cout;

using std::vector;

int main(void) {

    try {
        Parser evaluator;
        char expression[] = " 13-1 != 1+12";
        evaluator.evaluate_expression_with_exception(expression);
        evaluator.parse(expression);

        double result = evaluator.get_numeric_answer();

        cout << "Ans: " << result << endl;

    } catch(ParsingException ex) {
        cout << "Error: " << ex.get_msg() << ", at " << ex.get_col() << endl;
    }

    return EXIT_SUCCESS;
}