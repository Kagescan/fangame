#include "novel.h"
#include "button.h"
#include "game.h"

novel::novel(std::string file,sf::RenderWindow &scr){
  //VARS
    //VARS
    scrw=1280;
    scrh=720;

    //Class vars
    loadfile=file;
    actualPart="";
    lastPartLine=0;
    readingLabel=false;
    endReading=false;
    endAnimation=false;
    nogui=false; //There is no gui (debug mode)
    barPosY=scrh-scrh/3;
    bgColor=sf::Color::Black;

    if (!fontDeja.loadFromFile("resources/fonts/DejaVuSans.ttf"))
      std::cerr<<"Info : (internal error) during loading font Deja Vu Sans. The novel engine could be unable to display any text\n";

    bar.setPosition(0,barPosY);
    bar.setSize(sf::Vector2f(scrw,barPosY));
    bar.setFillColor(sf::Color(255,255,255,200));

    blackWindow.setSize(sf::Vector2f(scrw,scrh));
    blackWindow.setFillColor(sf::Color::Black);

    for (int i=0; i<3; i++){ //reset values
      animDuration[i] = 1000;
      animStart[i] = 0;
      animEnd[i] = 0;
      sizeX[i] = 1;
      playingAnimation[i] = false;
    }


  //first read the script for save variables and check basic synthax
    read(scr,true);
};

bool novel::read(sf::RenderWindow &scr,bool init,int from, int to) {
  if (endReading) return true;
  int i(1);
  bool limitation=false;
  std::string part;

  if (to==1 || from>to){
    if (nogui) std::cout<<"Reading the entire novel script ["<<loadfile<<"]...\n\n"<<std::flush;
  } else {
    if (nogui) std::cout<<" (from line "<<from<<" to line "<<to<<")\n\n"<<std::flush;
    limitation=true;
  }

  std::ifstream file(loadfile.c_str());
  if (file) {
    //Parse parts :
    while (std::getline(file,part)) {
      if (limitation) {
        if (i>=from && i<=to) play(part,scr,i,init);
      }
      else
        play(part,scr,i,init);
      i++;
    }
    return true;
  } else {std::cout<<"\nError : the file specified is not available !";return false;};
}

bool novel::play(std::string readline,sf::RenderWindow &scr,int numLine,bool init) {
  if (endReading) return true;
  saying=false;
  makeAchoice=false;

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

  std::vector<std::string> parsed=split(readline,' ');

  std::string command=parsed[0];
  if (init) {
    if (command=="character") newchara(readline,numLine); //Switch of std::string not exists :(
    else if (command=="varfile") ;//will be implemented soon
    else if (command=="mapfile") ;//this too
    else if (command=="label") newLabel(readline,numLine);
    else if (command=="sound") loadSound(readline,numLine); //waiting for a answer of an issue
    else if (command=="music") loadMusic(readline,numLine); //this too
    else if (command=="image") loadImage(readline,numLine);
    else if (command=="endLabel") endLabel(readline,numLine);
  } else {
    //-------------------------//
    if (command=="scene")       newScene(readline,numLine);
    else if (command=="print")  print(readline);
    else if (command=="show")   show(readline,numLine+1);
    else if (command=="play")   playSound(readline, numLine);
    else if (command=="stop")   stopSound(readline, numLine);
    else if (command=="choice") choice(readline, scr, numLine);
    else if (command=="goto")   goTo(readline, scr, numLine);
    else if (command=="end")    end(readline);
    else if (command=="music"||command=="character"||command=="varfile"||command=="mapfile"||command=="label"||command=="sound"||command=="image"||command=="endLabel") ; //do nothing.
    else say(readline,numLine); //this is a character or a unknow command
    display(scr);
  }
  return true;
}

bool novel::readPart(std::string part,sf::RenderWindow &scr, int numLine){
  if ( allLabels.find(part) != allLabels.end() ){
    std::vector<std::string> fromto=split(allLabels[part],';');

    if (fromto.size()>1){
      if (nogui) std::cout<<"\nReading the part "<<part;
      return read(scr, false, std::stoi(fromto[0]) , std::stoi(fromto[1]) );
    } else {
      std::cerr<<"Internal error during loading part "<<part<<". Unable to parse the part declaration.\n";
      return false;
    }

  }
  else {
    std::cerr<<"Error : on line "<<numLine<<", the part ["<<part<<"] was not found. Unable to load the part.\n";
    return false;
  }
  return true;
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
        //Color
          if (parsed[0]=="color"){
            std::vector<std::string> colors=split(parsed[1],',');
            if (colors.size()==3){
              try {
                bool validColor=true;
                for (unsigned int i=0; i<3;i++){
                  if (std::stoi(colors[i])<0 || std::stoi(colors[i])>255)
                    validColor=false;
                }
                if (validColor)
                  internalSave.insert(std::make_pair(character+".color", parsed[1])); //all for this ._.
              } catch (std::invalid_argument) {
                std::cerr<<"An error happened during applying the color for the character "<<actualCharacter<<". Please enter R,G,B values between 0 ans 255\n\n";
              }
            }

        } else
          std::cerr<<"Warning : undefined option ["<<parsed[0]<<"] in ["<<arguments[i]<<"] on line "<<numLine<<" . Skipping.\n\n";

      } else {
        std::cerr<< "Warning : ["<<arguments[i]<<"] is not a valid form of option argument in this command on line "<<numLine<<" . Skipping.\n\n";
      }
    } else {
      std::cout << "Warning : ["<<arguments[i]<<"] is not a valid option argument for this command on line "<<numLine<<" . Skipping.\n\n";
    }
  }
}

void novel::say(std::string line,int numLine){
  std::vector<std::string> arguments=split(line,' '); //splitting arguments
  std::string character=arguments[0]; //1st argument is the name of the characters
  bool unknowChara=true;
  if (arguments.size()>1) {
    for (auto i:charaList) {if (i==character) unknowChara=false;}
    if (unknowChara) {
      std::cerr<<"Error : Unknown command ["<<character<<"] on line "<<numLine<<". Skipping.\n\n";
    } else {
      //----------------------------------------------
      if (nogui){
        std::vector<sf::String> lines=splitQuotes(line,numLine);
        std::cout<<"\n"<<character<<" :\n";
        for (auto i:lines) std::cout<<"\t"<<i.toAnsiString()<<"\n";
      } else {
        displaySay=splitQuotes(line,numLine);
        displayedTxt.clear();
        displayedTxt.resize(displaySay.size(),false);
        substrPos=true;
        actualCharacter=character;
        saying=true;
        animatingTextFinished=false;
      }
    }
  } else {
    std::cerr<<"Warning : the line "<<numLine<<" ["<<line<<"] has no arguments !! skipping.\n\n";
  }
}

void novel::newLabel(std::string line, int numLine){
  if (readingLabel)
    std::cerr<<"Error : On line "<<numLine<<", a new part has been declared but endLabel not found for the first part !\n\n";
  else {
    std::vector<std::string> temp = split(line,' ');

    if (temp.size()>1) {
      actualPart = temp[1];
      lastPartLine = numLine;
      readingLabel = true;
    } else
      std::cerr<<"Error : On line "<<numLine<<", no part name provided.\n\n";
  }
}

void novel::endLabel(std::string line, int numLine){
  if (readingLabel) {
    allLabels.insert(std::make_pair(actualPart, std::to_string(lastPartLine)+";"+std::to_string(numLine)));
    readingLabel=false;
  } else
    std::cerr<<"Error : no label to end at this state\n\n";
}

void novel::loadMusic(std::string line, int numLine) {
  std::vector<sf::String> temp=splitQuotes(line,numLine);
  if (temp.size()>0){
    std::string fileLocation=temp[0].toAnsiString();
    std::vector<std::string> temp2=split(line,' ');
    std::vector<std::string> temp3=split(temp2[1],'=');

      sf::Music& music = allMusics[temp3[0]]; // construit l'élément directement dans la map et le retourne

      if (!music.openFromFile(fileLocation))
        std::cerr<<"Info : An error happened during loading ["+fileLocation+"] on line "+std::to_string(numLine)+" (read error below). Music will be unable to play !\n\n";
  }
  else
    std::cerr<<"On line "<<numLine<<" , no arguments found (arguments must be in the form variable=\"location\"). Skipping loading sound.\n\n";

}

void novel::loadSound(std::string line, int numLine) {
  std::vector<sf::String> temp=splitQuotes(line,numLine);
  if (temp.size()>0){
    std::vector<std::string> temp2=split(line,' ');
    std::vector<std::string> temp3=split(temp2[1],'=');
    std::string fileLocation=temp[0].toAnsiString();
    std::string name=temp3[0];

    sf::SoundBuffer& soundBuff=buffer[name];
    sf::Sound& sound=allSounds[name];

    if (!soundBuff.loadFromFile(fileLocation))
      std::cerr<<"Info : an error happened during loading ["<<fileLocation<<"] on line "<<numLine<<" (read error below). Skipping loading sound !\n\n";
    else
      sound.setBuffer(buffer[name]);
  } else {
    std::cerr<<"On line "<<numLine<<" , no arguments found (arguments must be in the form variable=\"location\"). Skipping loading sound.\n\n";
  }
}

void novel::loadImage(std::string line, int numLine) {
  sf::Texture texture;

  std::vector<sf::String> temp=splitQuotes(line,numLine);
  std::vector<std::string> temp2=split(line,' ');
  std::vector<std::string> temp3=split(temp2[1],'=');
  std::string fileLocation=temp[0].toAnsiString();
  std::string name=temp3[0];

  if ( !texture.loadFromFile(fileLocation) ) {std::cerr<<"Info: an error happened during loading an image on line "<<numLine<<" (read the error below). Skipping loading the image !\n\n";}
  else {
    allTextures.insert( std::make_pair(name,texture) );
    sf::Sprite sprite(allTextures[name]);
    allImages.insert( std::make_pair(name,sprite) );
  }
}

int novel::newScene(std::string line, int numLine){
  std::vector<std::string> arguments=split(line,' ');
  for (unsigned int i=1; i<arguments.size();i++){ //reach all arguments
    std::vector<std::string> parsed=split(arguments[i],'=');
    if (parsed.size()==2){
      std::string option=parsed[0], argument=parsed[1];
      //Change the bar color
      if (option=="bar-color"){ //parse colors
        std::vector<std::string> colors=split(parsed[1],',');
        if (colors.size()>=3 && colors.size()<=4){
          try {
            bool validColor=true;
            for (unsigned int i=0; i<colors.size();i++){
              if (std::stoi(colors[i])<0 || std::stoi(colors[i])>255)
                validColor=false;
            }
            if (validColor) {
              if (colors.size()==3)
                bar.setFillColor( sf::Color( std::stoi(colors[0]) , std::stoi(colors[1]) , std::stoi(colors[2]) ) );
              else
                bar.setFillColor( sf::Color( std::stoi(colors[0]) , std::stoi(colors[1]) , std::stoi(colors[2]) , std::stoi(colors[3]) ) );
            }
          } catch (std::invalid_argument){
            std::cerr<<"An error happened during applying the color for the bar. Please enter R,G,B(,A) values between 0 ans 255\n\n";
          }
        } else
          std::cerr<<"An error happened during applying the color for the bar. Please enter R,G,B(,A) values between 0 ans 255\n\n";
      }
      //Change the background color
      else if (option=="bg-color"){
        std::vector<std::string> colors=split(parsed[1],',');
        if (colors.size()==3){
          try {
            bool validColor=true;
            for (unsigned int i=0; i<3;i++){
              if (std::stoi(colors[i])<0 || std::stoi(colors[i])>255)
                validColor=false;
            }
            if (validColor)
                bgColor=sf::Color( std::stoi(colors[0]) , std::stoi(colors[1]) , std::stoi(colors[2]) );

          } catch (std::invalid_argument){
            std::cerr<<"An error happened during applying the color for the bar. Please enter R,G,B(,A) values between 0 ans 255\n\n";
          }
        } else
          std::cerr<<"An error happened during applying the color for the bar. Please enter R,G,B(,A) values between 0 ans 255\n\n";
      }
      //Change the background
      else if (option=="bg"){
        if (allImages.find(argument) == allImages.end())
          std::cerr<<"Error : On line "<<numLine<<" the image for the background wasn't defined at this scope\n\n";
        else
          background = allImages[argument];
      }

    } else
      std::cerr<<"Error on line "<<numLine<<", invalid argument format (excepted option=argument ). \n\n";
  }

  return 0;
}

void novel::show(std::string line, int numLine){
  std::vector<std::string> allArgs=split(line,' ');
  int at=0; //default value
  bool loadImage=false,makeTransition=false;
  std::string loadImageArgument, makeTransitionArgument;
  //bool imageLoaded=false;
  if (allArgs.size()<2){std::cerr<<"Error : on line "<<numLine<<" too few arguments excepted\n\n";}
  else {
    if (nogui) std::cout<<"For the character "<<allArgs[1]<<"\n";

    for (unsigned int i=2; i<allArgs.size();i++){ //reaching all options and save (don't interpret yet because there is an order)
      std::vector<std::string> parsed=split(allArgs[i],'=');
      if (parsed.size()<2){std::cerr<<"To few arguments in "<<allArgs[i]<<" on line"<<numLine<<". have you used the form option=argument for this command? Skipping...\n\n";}
      else {
        std::string option=parsed[0];
        std::string argument=parsed[1];

        if (option=="image"){
          loadImage=true;
          loadImageArgument=argument;
        } else if (option=="at"){
          if (argument=="right")      {}//do nothing because the default value is right...
          else if (argument=="left")  {at=1;}
          else if (argument=="center"){at=2;}
          else {std::cerr<<"Warning : On line "<<numLine<<", value ["<<at<<"] is incorrect (only right,left,center is excepted !)\n\n";}
          if (nogui) std::cout<<"\tposition of the character : "<<argument<<"\n";
        }
        else if (option=="transition") {
          makeTransition=true;
          makeTransitionArgument=argument;
        }
        else if (option=="ease") {
          //checkEase(argument);
        }
        else
          std::cerr<<"Error : unknow option ["<<option<<"].Skipping...\n\n";
      }
    }

    if (loadImage){ //then interpret whith defined values
      showLoadImage(loadImageArgument,at,numLine);
      if (makeTransition)
        newTransition(makeTransitionArgument,at);
    }
  }

}

int novel::showLoadImage(std::string argument,int at,int numLine){
    if (allImages.find(argument) == allImages.end()) {
      std::cerr<<"Warning : On line "<<numLine<<" the image ["<<argument<<"] was not declared in this scope.\n\n";
      return 1;
    } else {
      sf::Vector2u imageSize=allTextures[argument].getSize();
      if (at>=0 && at<=2){
        sizeX[at]=imageSize.x; //Used in transition functions
        transFadeSprite=displayAt[at];
        displayAt[at]=allImages[argument];
        atPosY[at]=scrh-imageSize.y;
      }
      switch (at) {
        case 0: //At left
          atPosX[0]=scrw-imageSize.x-15; //margin left 15px
          break;
        case 1: //At center
          atPosX[1]=scrw/2-imageSize.x/2; //center the image
          break;
        case 2: //At right
          atPosX[2]=15;//margin right 15px
          break;
        default:
          std::cerr<<"Warning or internal error on line "<<numLine<<", Variable At not defined or incorrect value.(at="<<at<<")\n\n";
          return 1;
          break;
      }
      displayAt[at].setPosition(atPosX[at],atPosY[at]); //at should be valid
      if (nogui) std::cout<<"\tDisplay image : "<<argument<<"\n";
      return 0;
    }
}

int novel::playSound(std::string line, int numLine) {
  std::vector<std::string> allArgs=split(line,' ');
  std::string type="Music";
  bool loop=false;

  if (allArgs.size()>1) {
    std::string name = allArgs[1];
    if ( allMusics.find(name) != allMusics.end() )    {} //do nothing
    else if (allSounds.find(name) != allSounds.end())
      type="Sound";
    else {
      std::cerr<<"Error : On line "<<numLine<<" The music or the sound ["<<name<<"] was not declared in this scope.\n\n";
      return 0; //exit the function
    }

    // Verify only the first argument, I Will fix this after finishing something...
    std::vector<std::string> splitSpaces=split(line,' ');
    if (splitSpaces.size()>2) { //verify there is an argument
      std::vector<std::string> splitEq=split(splitSpaces[2],'=');
      if (splitEq.size()>2) { //and it is valid

        if (splitEq[0]=="loop") {
          if (splitEq[1]=="true")       loop=true;
          else if (splitEq[1]=="false") {} //do nothing because the var is already set to false
          else {
            std::cerr<<"Warning : On line "<<numLine<<" unknow option ["<<splitEq[1]<<"] for ["<<splitEq[0]<<"] .\n\n";
            return 0;
          }

          if (type=="Sound")
            allSounds[name].setLoop(loop);
          else
            allMusics[name].setLoop(loop);
        }
      }
    }

    //All the code before for only this  \_._._/
    if (type=="Sound")
      allSounds[name].play();
    else
      allMusics[name].play();
  }
  else
    std::cerr<<"Error : no music variables specified. Unable to play sound.\n\n";
  return 0;
}

void novel::stopSound(std::string line, int numLine) {
  std::vector<std::string> allArgs=split(line,' ');

  if (allArgs.size()>1) {
    std::string name = allArgs[1];
    if ( allMusics.find(name) != allMusics.end() )
      allMusics[name].stop();
    else if (allSounds.find(name) != allSounds.end())
      allSounds[name].stop();
    else
      std::cerr<<"Error : On line "<<numLine<<" The music or the sound ["<<name<<"] was not declared in this scope.\n\n";
  }
  else
    std::cerr<<"Error : no music variables specified. Unable to play sound.\n\n";
}

int novel::goTo(std::string line, sf::RenderWindow &scr, int numLine) {
  if (endReading) return 0;
  std::vector<std::string> allArgs=split(line,' ');

  if (allArgs.size()>1) readPart(allArgs[1],scr,numLine);

  return 0;
}

bool novel::end(std::string line){
  std::vector<std::string> parsed=split(line,' ');
  endReading=false;
  if (parsed.size()>1){
    if (parsed[1]=="right"){
      endCoord="x";
      endAnimStart=scrw;
      endAnimMove=-scrw;
    }
    else if (parsed[1]=="up"){
      endCoord="y";
      endAnimStart=scrh;
      endAnimMove=-scrh;
    }
    else{
      endReading=true;
      return true;
    }
    endStart = clock.getElapsedTime();
    endAnimation=true;
  }
  else
    endReading=true;

  return endReading;
}

int novel::displayEnd(sf::RenderWindow &scr){
  if (endAnimation){
    int getms = clock.getElapsedTime().asMilliseconds() - endStart.asMilliseconds();
    int pos = ease.easeInOutCirc(
              getms>1000 ? 1000:getms,//elapsed time or max value
              endAnimStart, //start value
              endAnimMove, //move x px
              1000 //duration of the animation
          );
    if (endCoord=="y")
      blackWindow.setPosition(0,pos);
    else
      blackWindow.setPosition(pos,0);

    if (getms>1000) {
      endReading=true;
      endAnimation=true;
    }
    scr.draw(blackWindow);
  }
  return 0;
}

void novel::print(std::string line){
  std::vector<std::string> text=split(line,' ');
  if (nogui) std::cout<<"\n\n"; //if there is a gui then don't need to break line because there is not much text in the console
  std::cout<<"<<";
  for (unsigned int i=1;i<text.size();i++)
    std::cout<<text[i]<<" ";
  std::cout<<"\n\n"<<std::flush;

}

int novel::choice(std::string line, sf::RenderWindow &scr, int numLine){
  std::vector<std::string> choices=split(line,'/');
  std::string numberchoice;
  choicesList.clear();
  choicesListGoto.clear();
  if (choices.size()>1) {
    if (nogui)
      std::cout<<"\n Make your choice now : ";

    for (unsigned int i=0;i<choices.size();i++){
      std::vector<std::string> gotochoice=split(choices[i],'=');

      if (gotochoice.size()>1){
        std::vector<sf::String> display=splitQuotes(choices[i]);

        if (display.size()>0){
          if (nogui)
            std::cout<<"\n\t["<<i<<"]"<<display[0].toAnsiString();
          else {
            makeAchoice=true;
            choicesList.push_back(display[0]);
            choicesListGoto.push_back(gotochoice[1]);
          }
        }
        else{
          std::cerr<<"Error on line "<<numLine<<",no text for the button entered... Have you insered text in quotes?\n\n";
          return 0;
        }
      }
      else{
        std::cerr<<" Error on line "<<numLine<<", too few arguments. Is argument is like partName=\"Text to display in the button\" ?\n\n";
        return 0;
      }
    }
    if (nogui){
      bool correctEntry=false;
      while (!correctEntry){
        std::cout<<"Enter the number of the choice : ";
        std::getline (std::cin,numberchoice);
        try{
          unsigned int numchoice2=std::stoi(numberchoice);
          if (numchoice2>=0 && numchoice2<choices.size()){
            std::vector<std::string> gotochoice=split(choices[numchoice2],'=');
            readPart(gotochoice[1],scr,numLine);
            correctEntry=true;
          } else
            std::cerr<<"Incorrect entry. Please enter a number between 0 and "<<choices.size()-1<<"\n\n";
        }
        catch (std::invalid_argument) {
          std::cerr<<"Incorrect entry. Please enter a number between 0 and "<<choices.size()-1<<"\n\n";
        }
      }
    } else {
        unsigned int size=choicesList.size();
        choiceWindow.setSize( sf::Vector2f(scrw/4,25*size+35) );
        sf::FloatRect windowSize=choiceWindow.getLocalBounds();
        int windowX = scrw-15 - windowSize.width;
        int windowY = scrh-40 - windowSize.height;
        choiceWindow.setPosition (windowX, windowY);
        choiceWindow.setFillColor(sf::Color(255,0,0,200));
        choiceWindow.setOutlineColor(sf::Color::Black);
        choiceWindow.setOutlineThickness(1);

        for (unsigned int i=0; i<size; i++){
          choiceButtons.push_back( Button(fontDeja,choicesList[i],20,sf::Color::Black,windowX+6,windowY+30 + 21*i,sf::Color::White) );
        }

        choiceButtons.push_back( Button(fontDeja,"Faites le choix :",25,sf::Color::Black,windowX+2,windowY+2) );
    }

  }
  else
    std::cout<<"\n Error on line "<<numLine<<" : too few arguments for choice. have you separed the choices with a slash (/) ?";

  return 0;
}

int novel::newTransition(std::string transition, int who, int numLine){
  if (checkTransition(transition)) {
    if (who>=0 && who<=2){
      transitionAt[who]=transition; //IDK i named it transitionAT :/
      transitionTime[who]=clock.getElapsedTime();
      playingAnimation[who]=true;
      if (transition=="slideR"){
        animStart[who] = scrw;
        animEnd[who] = atPosX[who]-scrw;
      } else if (transition=="slideL"){
        animStart[who] = -sizeX[who];
        animEnd[who] = sizeX[who]+atPosX[who];
      } else if (transition=="fade"){
        transFadeSpriteRef=who;
        animStart[who] = 255;
        animEnd[who] = -255;
        transFadeSprite.setPosition(displayAt[who].getPosition());//transFadeSprite already defined in showLoadImage()
        //transFadeSprite.setPosition(0,0);
      }

    } else
      std::cerr<<"Internal error on line "<<numLine<<", the sprite to apply effects is incorrect ("<<who<<")";
  }
  else {
    std::cerr<<"Error : on line "<<numLine<<", the transition ["<<transition<<"] is incorrect.\n\n";
  }

  return 0;
}

bool novel::checkTransition(std::string transition){
  std::vector<std::string> list;
  list.push_back("fade");
  list.push_back("slideL");
  list.push_back("slideR");
  for (auto check: list){
    if (check==transition)
      return true;
  }
  return false; //Then return false
}

int novel::updateTransition(int who){
  int returnVal=0;
  if (who>=0 && who<=2) {
    if (playingAnimation[who]){
      int getms = clock.getElapsedTime().asMilliseconds() - transitionTime[who].asMilliseconds();
      int easeValue = ease.easeOutExpo(
                getms>animDuration[who] ? animDuration[who]:getms,//elapsed time or max value
                animStart[who], //start value
                animEnd[who], //count
                animDuration[who] //duration of the animation
            );
      if (transitionAt[who]=="fade"){
        displayAt[who].setColor( sf::Color(255,255,255,255-easeValue) );
        transFadeSprite.setColor( sf::Color(255,255,255,easeValue) );
        returnVal=1;
      } else
        displayAt[who].setPosition(easeValue,atPosY[who]);
      if (getms>animDuration[who])
        playingAnimation[who]=false;
    }
  }
  else {
    std::cerr<<"Warning : (internal error) unable to update a sprite due to an incorrect variable"<<who;
  }
  return returnVal;
}


//-----------------------------------------------------------------GUI functions

int novel::display(sf::RenderWindow &scr){
  if (nogui || endReading) return 0;//If I don't need a GUI, i don't need to draw all the visual novel...
  if (saying || makeAchoice){ //If there is a character who is speaking
    bool waitForEvent=true;

    while (waitForEvent && !endReading) {
      sf::Event event;
      draw(scr);

      while (scr.pollEvent(event)) {

        if (event.type==sf::Event::Closed){
          endReading=true;
          return 0;

        } else if (event.type==sf::Event::KeyReleased) {

          if (event.key.code == sf::Keyboard::Escape){
            endReading=true;
            return 0;
          } else {
            if (!makeAchoice){
              if (animatingTextFinished)
                waitForEvent=false;
              else
                animatingTextFinished=true;
            }
          }

        }
        else if (event.type==sf::Event::MouseButtonReleased){
          if (!makeAchoice) {
            if (animatingTextFinished)
              waitForEvent=false;
            else
              animatingTextFinished=true;
          }
          else {
            for (unsigned int i=0; i<choiceButtons.size()-1;i++){
              if (choiceButtons[i].clicked(event.mouseButton.x,event.mouseButton.y)){
                readPart(choicesListGoto[i],scr);
                waitForEvent=false;
              }
            }
          }
        }
      }
    }
  } else {
    draw(scr);
  }
  return 0;
}

int novel::draw(sf::RenderWindow &scr){
  scr.clear(bgColor);
  scr.draw(background);
  for (int i=0;i<3;i++){
    if (updateTransition(i))
      scr.draw(transFadeSprite);
    scr.draw(displayAt[i]);
  }
  scr.draw(bar);
  if (!endAnimation){ //Display name of the character
    sf::Text tempTxt(actualCharacter,fontDeja,20);
    tempTxt.setPosition(5,barPosY+8);
    //Apply the color of the character
      if(internalSave.find(actualCharacter+".color") != internalSave.end()){
        std::vector<std::string> colors = split(internalSave[actualCharacter+".color"], ',');
        if (colors.size()==3){
          try {
              tempTxt.setOutlineColor(sf::Color( std::stoi(colors[0]), std::stoi(colors[1]), std::stoi(colors[2]) ));
              tempTxt.setOutlineThickness(1);
          }
          catch (std::invalid_argument) {} //don't display any error because it should be displayed before.
          catch (const std::out_of_range& e) {std::cerr<<"\tInternal error during displaying a color (out of range arg.)\n\n";}
        }
      }
    tempTxt.setStyle(sf::Text::Bold);
    scr.draw(tempTxt);
  //Display text...

    for (unsigned int i=0; i<displaySay.size();i++){
      if (!displayedTxt[i] && !animatingTextFinished){
        sf::String text=displaySay[i];
        sf::String substr=text.substring(0,substrPos);
        sf::Text tempTxt(substr,fontDeja,27);
        tempTxt.setPosition(10,barPosY+31+29*i);
        tempTxt.setFillColor(sf::Color::Black);
        scr.draw(tempTxt);
        substrPos+=2;
        if (substrPos>=text.getSize()){
          displayedTxt[i]=true;
          substrPos=0;
        }
        break;
      }
      else {
        sf::Text tempTxt(displaySay[i],fontDeja,27);
        tempTxt.setPosition(10,barPosY+31+29*i);
        tempTxt.setFillColor(sf::Color::Black);
        scr.draw(tempTxt);
        if (i+1>=displaySay.size())
          animatingTextFinished=true;
      }
    }
    drawChoices(scr); //Draw if there is a choice to do...

  } else //display an animation if the novel ends
    displayEnd(scr);

  //scr.draw()
  scr.display();
  //scr.draw()
  return 0;
}

int novel::drawChoices(sf::RenderWindow &scr){
  if (makeAchoice){
    scr.draw(choiceWindow);
    for (auto choice:choiceButtons){
      scr.draw(choice.gettxt());
    }
  }
  /*std::vector<std::string> gotochoice=split(choices[numchoice2],'=');
  readPart(gotochoice[1],scr,numLine);*/
  return 0;
}

//--------------------------------------------------------------Useful functions


int novel::debug(sf::RenderWindow &scr) { //don't use event if you debug please. It burn eyes.
  std::string part;
  std::vector<Button> display;
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
      //I don't use read() because I want to use a if statement with bool play()
      while (std::getline(file,part)) {
        if (play(part,scr,i)) display.push_back( Button(animeace,part,10,sf::Color::White,10,position+15*i) );
        i++;
      }
    }
    display.push_back( Button(animeace,"Kagerou Project Fangame - Novel engine debug. Click for go back. this is the content of the script, check the console",10,sf::Color::Black,10,0) );
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
  for (unsigned int iter=0;iter<str.length();iter++){
    std::string::size_type i = str.find(search);
    if (i != std::string::npos) str.erase(i, search.length()); else break;
  }
  return str;
}

std::vector<std::string> novel::split(std::string string, char search) {
  std::vector<std::string> parsed;
  std::string command;
  std::istringstream spart(string);
  while(std::getline(spart,command,search)) parsed.push_back(command);
  return parsed;
}

std::string novel::removeindent(std::string text) {
  char charTxt[text.length()+1];
  strcpy(charTxt, text.c_str()); //convert char* to char[]
  int i=0;

  while (std::isspace(charTxt[i])) {//while the first character is a space or an indent
    text.erase(text.begin());//remove it.
    i++;
  }
  return text;
}

std::vector<sf::String> novel::splitQuotes(std::string line,int numLine) {
  bool endStr=false;
  sf::String sfStrLine=toSfString(line);
  std::size_t start(-1),from(0);

  std::vector<std::string> positions;
  std::vector<sf::String> parsed;

  while ( sfStrLine.find('"',start+1)<sfStrLine.getSize() ){
    start = sfStrLine.find('"',start+1);
    endStr = !endStr;
    if (endStr){from=start+1;}
    else {positions.push_back(std::to_string(from)+";"+std::to_string(start));}
  }

  if (start==0) {std::cerr<<"Warning : there is not any string in the line "+std::to_string(numLine)+" . Skipping.\n\n";}
  else {
    if (endStr){std::cerr<<"Error : Unterminated string on line "<<numLine<<"\n\n";}
    else {
      for (auto i:positions){
        std::vector<std::string> temp=split(i,';');
        parsed.push_back( sfStrLine.substring(  std::stoi(temp[0]),
                                                std::stoi(temp[1])-std::stoi(temp[0])
                                              ) );
      }
    }
  }
  return parsed;
}
