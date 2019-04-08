#include <iostream>
#include "calc.h"


int main() {
  std::cout << "Ans 1: " << eval("2+2") << std::endl;
  std::cout << "Ans 2: " << eval("(4+6)*2") << std::endl;
  std::cout << "Ans 3: " << eval("12 == 11 + 1") << std::endl;
  std::cout << "Ans 4: " << eval("12 == 11 + 2") << std::endl;
  std::cout << "Ans 5: " << eval("1.04 + 17") << std::endl;
  std::cout << "Ans 6: " << eval("1.04+17 + (5+5)^2") << std::endl;
  return 0;
}
