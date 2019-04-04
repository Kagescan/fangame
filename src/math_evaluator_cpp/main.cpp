#include <iostream>
#include <cstdlib>
#include <vector>
#include "calc.h"


int main(void) {
  try {
    Calc evaluator;
    char expression[] = "120+30==15*10";
    evaluator.parse(expression);
    double result = evaluator.get_numeric_answer();
    std::cout << "Ans: " << result << std::endl;
  } catch(ParsingException ex) {
    std::cout << "Error: " << ex.get_msg() << ", at " << ex.get_col() << std::endl;
  }
  return EXIT_SUCCESS;
}