#include "novel.h"

novel::novel(std::string loadfile){
  /*The Kage Script is parsed like this:
    parts are delimited with "#""
      commands are delimited with ";"
        arguments are delimited with "`"
  */

  //VARS
    //some vars...
      std::ifstream file(loadfile.c_str()); //convert string to char*
      int icommmand(0),iargs(0);
      std::string part,command,args;
    //Vector that load the file
      std::vector<std::vector<std::vector<std::vector<std::string> > > > vfile;
    //Temp vectors (it is not possible to make a std::vector<std::string> in one time...)
      std::vector<std::vector<std::vector<std::string> > > vparts;
      std::vector<std::vector<std::string> > vcommands;
      std::vector<std::string> vargs;

  //Start reading the file
    if (file) {
      //Parse parts :
      while (std::getline(file,part,'#')) {
        std::istringstream spart(part); //convert the string into a stream to parse it using readline
        icommmand = 0; //reset the var

        //Parse commands:
        while(std::getline(spart,command,';')) {
          if (icommmand==0) {vargs.push_back(command); } //the first command is the part's title...
          else if (command != "\n") {                    //... so ignore it and ignore empty lines too
            std::istringstream scommand(command);
            iargs=0;

            //parse arguments
            while(std::getline(scommand,args,'`')) {
              args = remove(args,"\t"); //remove indent
              args = remove(args,"  ");
              if (args[0]=='\n') args[0]='\0'; //remove the \n if it is the first char...
              if (iargs!=0) vargs.push_back(args); //ignore the first argument (it is \n)
              iargs++;
            }
            vcommands.push_back(vargs);
            vargs.clear();
          }
          icommmand++;
          if (icommmand!=1){
            vparts.push_back(vcommands);
            vcommands.clear();
          }
        }
        if (icommmand!=1){
          vfile.push_back(vparts);
          vparts.clear();
        }
      }
    }
    parsed=vfile;
};

void novel::play(std::string partName) {

}

void novel::showParsed() {
  //display the generated file
  for (unsigned int i=0;i<parsed.size();i++) {
    for (unsigned int j=0;j<parsed[i].size();j++) {
      for (unsigned int k=0;k<parsed[i][j].size();k++) {
        for (unsigned int l=0;l<parsed[i][j][k].size();l++)
          std::cout <<"\n"<<i<<"."<<j<<"."<<k<<"."<<l<<" = "<<parsed[i][j][k][l];
          std::cout.flush();
      }
    }
  }
}

std::string novel::remove(std::string str,std::string search) {
  for (unsigned int iter=0;iter<str.length()/2;iter++){  //delete most of characters searched (length/2 for more speed,we don't need to test all characters if it is indent)
    std::string::size_type i = str.find(search);
    if (i != std::string::npos) str.erase(i, search.length()); else break;
  }
  return str;
}

std::vector<std::vector<std::vector<std::vector<std::string> > > > novel::getParsed() {return parsed;}
