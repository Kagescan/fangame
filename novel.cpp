#include "novel.h"
#include "button.h"
#include "game.h"

novel::novel(std::string file,sf::RenderWindow &scr){
  //VARS
    //some vars...

    loadfile=file;
    read(scr,true);
};

bool novel::read(sf::RenderWindow &scr,bool init,int from, int to) {
  int i(0);
  bool limitation=false;
  std::string part;

  if (to==0 || from>to) {std::cout<<"reading the entire novel script ["+loadfile+"]...";}
  else {
    std::cout<<"reading the file from line "+std::to_string(from)+" to line "+std::to_string(to);
    limitation=true;
  }

  std::ifstream file(loadfile.c_str());
  if (file) {
    //Parse parts :
    while (std::getline(file,part)) {
      if (limitation){
        if (i>=from && i<=to) play(part,scr,i,init);
      } else {
        play(part,scr,i,init);
      }
      i++;
    }
  } else {std::cout<<"Error : the file specified is not available !";};
}

bool novel::play(std::string readline,sf::RenderWindow &scr,int numLine,bool init) {
  readline=removeindent(readline); //remove indents
  sf::String line=toSfString(readline); //converting to sfString add built-in functions and unicode support !
  std::size_t lenght=line.getSize();

  if (line.isEmpty() || line.find("//")<lenght) return false; //skip if the line is empty or a comment
  if (line.find("/*")<lenght) { //if the multiple comment character found then skip until the end of the command
    comment=true;
    return false;
  }
  if (comment) {
    if (line.find("*/")<lenght) comment=false;
    return false;
  }
  //-------------Assume that the line is a command and there is not indent or errors in synthax.

  std::vector<std::string> parsed=split(readline,' ');


  std::string command=parsed[0];
  if (init) {
    if (command=="character") newchara(readline,numLine); //Switch in std::string not exists.
    else if (command=="varfile") ;
    else if (command=="mapfile") ;
    else if (command=="label") ;
    else if (command=="sound") ;
    else if (command=="image") ;
    else if (command=="label") ;
  } else {
    //-------------------------//
    if (command!="scene");
    else if (command!="show");
    else if (command!="play");
    else if (command!="choice");
    else if (command!="goto");
    else if (command!="end");
    else say(readline,numLine); //this is a character or a unknow command
  }
  return true;
}

int novel::debug(sf::RenderWindow &scr) {
  std::string part;
  std::vector<button> display;
  bool active(true);
  int position(20),i(0);
  sf::Font animeace;
  if(!animeace.loadFromFile("resources/fonts/animeacefr.ttf")) std::cout<<"error loading animeacefr.ttf";
  sf::RectangleShape dialog;
      dialog.setPosition(0,0);
      dialog.setSize(sf::Vector2f(1280,720));
      dialog.setFillColor(sf::Color(255,0,0));

  std::ifstream file(loadfile.c_str()); //convert string to char*
    if (file) {
      //I don't use read because I want to use a if statement with bool play()
      while (std::getline(file,part)) {
        if (play(part,scr,i)) display.push_back( button(animeace,part,10,sf::Color::White,10,position+15*i) );
        i++;
      }
    }
    display.push_back( button(animeace,"Kagerou Project Fangame - Novel engine debug. Click for go back. this is the content of the script, check the console",10,sf::Color::Black,10,0) );
    int temp(display.size()-1);
    display[temp].centerx(1280,0,true);

  while (active) {
    scr.clear();
    scr.draw(dialog);

    for (unsigned int i=0; i<display.size();i++) {
      if (i<display.size()-1) display[i].setPosY(position+15*i,true);
      scr.draw(display[i].gettxt());
    }

    scr.display();
    sf::Event event;

    while (scr.pollEvent(event)) {switch (event.type){
        case sf::Event::Closed:       scr.close();std::cout<<"fin";return 0;break;
        case sf::Event::KeyReleased : if (event.key.code == sf::Keyboard::Escape) scr.close();return 0;break;
        case sf::Event::MouseButtonReleased :if ( display[display.size()-1].clicked(event.mouseButton.x,event.mouseButton.y) ) return 0;break;
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

std::vector<std::string> novel::split(std::string string, char search) {
  std::vector<std::string> parsed;
  std::string command;
  std::istringstream spart(string);
  while(std::getline(spart,command,search)) {
    parsed.push_back(command);
  }
  return parsed;
}

std::string novel::removeindent(std::string text) {
  char charTxt[text.length()+1];
  strcpy(charTxt, text.c_str()); //convert char* to char[]
  int i=0;

  while (std::isspace(charTxt[i])) {
    text.erase(text.begin());//Supposing delete always the first character...
    i++;
  }
  return text;
}



void novel::newchara(std::string line,int numLine){
  std::vector<std::string> arguments=split(line,' '); //splitting arguments
  std::string character=arguments[1]; //1st argument is the name of the characters
  charaList.push_back(character);
  internalSave.insert(std::make_pair(character, line));

  for (unsigned int i=2; i<arguments.size();i++){ //other arguments are options
    sf::String sfArg=toSfString(arguments[i]);

    if (sfArg.find("=")<sfArg.getSize()) {
      std::vector<std::string> parsed=split(arguments[i],'=');
      if (parsed.size()==2){
        if (parsed[0]=="color"){
          internalSave.insert(std::make_pair(character+".color", parsed[1]));
        } else {std::cout<<"\nWarning : undefined option ["+parsed[0]+"] in ["+arguments[i]+"] on line "+std::to_string(numLine)+" . Skipping.";}

      } else {
        std::cout<< "\nWarning : ["+arguments[i]+"] is not a valid form of option argument in this command on line "+std::to_string(numLine)+" . Skipping.";
      }
    } else {
      std::cout << "\nWarning : ["+arguments[i]+"] is not a valid option argument for this command on line "+std::to_string(numLine)+" . Skipping.";
    }
  }
}

void novel::say(std::string line,int numLine){
  std::vector<std::string> arguments=split(line,' '); //splitting arguments
  std::string character=arguments[0]; //1st argument is the name of the characters
  bool unknowChara=true;
  if (arguments.size()>1) {
    for (unsigned int i=0;i<charaList.size();i++) {if (charaList[i]==character) unknowChara=false;}
    if (unknowChara) {
      std::cout<<"\nError : Unknown command ["+character+"] on line "+std::to_string(numLine)+". Skipping.";
    } else {
      std::cout<<"\ncharacter ["+character+"] is ok.";
    }
  } else {
    std::cout<<"\nWarning : the line "+std::to_string(numLine)+" ["+line+"] has no arguments !! skipping.";
  }
}
