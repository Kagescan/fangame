#include "novel.h"
#include "button.h"
#include "game.h"

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

int novel::showParsed(sf::RenderWindow &scr) {
  //display the generated file
  //std::vector<string> display;
  bool active(true);
  int mode=0;
  sf::Font animeace;
  if(!animeace.loadFromFile("resources/fonts/animeacefr.ttf")) /*return error("error loading animeacefr.ttf")*/;
  sf::RectangleShape dialog;
      dialog.setPosition(0,0);
      dialog.setSize(sf::Vector2f(1280,720));
      dialog.setFillColor(sf::Color(255,0,0));

  while (active) {
    scr.clear();
    std::vector<button> display;

    switch (mode) {
      case 0: {
        scr.draw(dialog);
        for (unsigned int i=0;i<parsed.size();i++) {
          display.push_back( button(animeace,parsed[i][0][0][0],20,sf::Color::White,10,30*i) );
          scr.draw(display[i].gettxt());
        }
        display.push_back( button(animeace,"Retour",20,sf::Color::White,10,30*parsed.size()) );
        scr.draw( display[parsed.size()].gettxt() );
      }

      case 1: {
        /*for (unsigned int j=0;j<parsed[j].size();j++) {
          for (unsigned int k=0;k<parsed[j][k].size();k++) {
            for (unsigned int l=0;l<parsed[j][k][l].size();l++) {
              for (unsigned int m=0;l<parsed[j][k][l][m].size();l++)
                std::cout <<"\n"<<j<<"."<<k<<"."<<l<<"."<<m<<" = "<<parsed[j][k][l][m];
            }
          }
        }*/
        break;
      }

      default: return error("This is a code bug. REF : swich<showParsed<novel");break;
    }


    scr.display();
    sf::Event event;

    while (scr.pollEvent(event)) {switch (event.type){
        case sf::Event::Closed:       scr.close();std::cout<<"fin";return 0;break;
        case sf::Event::KeyReleased : if (event.key.code == sf::Keyboard::Escape) scr.close();return 0;break;
        case sf::Event::MouseButtonReleased :{
          switch (mode) {
            case 0: {
              for (unsigned int i=0;i<=parsed.size();i++) {
                if ( display[i].clicked(event.mouseButton.x,event.mouseButton.y) ) {
                  if (i<parsed.size()) {
                    std::cout<<"\nvous avez cliqué "<<parsed[i][0][0][0]<<std::flush;
                  } else {return 0;}
                };
              }
              break;
            }
            case 1: break;
            default: return error("This is a code bug. REF : switch<event<showParsed<novel");break;
          }
          break;}
        default:break;
    }}
  }
  return 0;
}

std::string novel::remove(std::string str,std::string search) {
  for (unsigned int iter=0;iter<str.length()/2;iter++){  //delete most of characters searched (length/2 for more speed,we don't need to test all characters if it is indent)
    std::string::size_type i = str.find(search);
    if (i != std::string::npos) str.erase(i, search.length()); else break;
  }
  return str;
}

std::vector<std::vector<std::vector<std::vector<std::string> > > > novel::getParsed() {return parsed;}
