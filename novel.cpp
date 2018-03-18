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
  bool active(true),mode(true);
  int selected(0),position(20);
  std::string lines;
  sf::Font animeace;
  if(!animeace.loadFromFile("resources/fonts/animeacefr.ttf")) /*return error("error loading animeacefr.ttf")*/;
  sf::RectangleShape dialog;
      dialog.setPosition(0,0);
      dialog.setSize(sf::Vector2f(1280,720));
      dialog.setFillColor(sf::Color(255,0,0));

  while (active) {
    scr.clear();
    std::vector<button> display;
    scr.draw(dialog);

    if (mode) {
        for (unsigned int i=0;i<parsed.size();i++) {
          display.push_back( button(animeace,toSfString(parsed[i][0][0][0]),20,sf::Color::White,10,position+30*i) );
          scr.draw(display[i].gettxt());
        }
    } else {
      int icommands(0);
        for (unsigned int i=0;i<parsed[selected].size()-1;i++){
          for (unsigned int j=0;j<parsed[selected][i].size();j++) {
            std::string lineTmp;
              if (parsed[selected][i][j][0]=="1" or parsed[selected][i][j][0]=="0") {
                lineTmp = "Afficher une boite avec comme titre "+parsed[selected][i][j][1]+" et comme contenu :";
                for (unsigned int k=2;k<parsed[selected][i][j].size();k++) lineTmp+= " "+parsed[selected][i][j][k];
              } else {
                lineTmp = "commande :"+parsed[selected][i][j][0]+" arguments :";
                for (unsigned int k=1;k<parsed[selected][i][j].size();k++) lineTmp+= " "+parsed[selected][i][j][k];
              }
            display.push_back( button(animeace,toSfString(lineTmp),10,sf::Color::White,12,position+15*icommands) );
            scr.draw(display[icommands].gettxt());
          icommands++;
          }
        }
        //scr.draw(display[0].gettxt());
    }


    display.push_back( button(animeace,"Kagerou Project Fangame - Novel engine debug. Click for go back.",20,sf::Color::Black,10,0) );
    int temp(display.size()-1);
    display[temp].centerx(1280,0,true);
    scr.draw( display[temp].gettxt() );

    scr.display();
    sf::Event event;

    while (scr.pollEvent(event)) {switch (event.type){
        case sf::Event::Closed:       scr.close();std::cout<<"fin";return 0;break;
        case sf::Event::KeyReleased : if (event.key.code == sf::Keyboard::Escape) scr.close();return 0;break;
        case sf::Event::MouseButtonReleased :{
          if (mode) {
              for (unsigned int i=0;i<=parsed.size();i++) {
                if ( display[i].clicked(event.mouseButton.x,event.mouseButton.y) ) {
                  if (i<parsed.size()) {
                    mode=false;
                    selected=i;
                    position=0;
                  } else {return 0;}
                };
              }
          } else if (display[temp].clicked(event.mouseButton.x,event.mouseButton.y)) {mode=true;position=0;}
          break;}
        case sf::Event::MouseWheelScrolled: if (event.mouseWheelScroll.wheel == sf::Mouse::VerticalWheel) position+=event.mouseWheelScroll.delta*10;break;

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

sf::String novel::toSfString(std::string theStdString) {
  std::basic_string<sf::Uint32> utf32line;
  sf::Utf8::toUtf32(theStdString.begin(), theStdString.end(), back_inserter(utf32line));
  return sf::String(utf32line);
}
