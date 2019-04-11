#include <iostream>
#include <fstream>

int main()
{
	std::string loadfile = "save.txt";
  std::cerr << "W SAVE FILE ("<<loadfile<<") : File Warning (The file don't exist. This program will write a new file to this location.)\n";
  std::ofstream ostrm(loadfile, std::ios::out | std::ios::trunc);
    ostrm << "type save\n";
    ostrm.flush();
    ostrm.close();
	return 0;
}
