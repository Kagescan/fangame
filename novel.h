#ifndef NOVEL_H
#define NOVEL_H

/*Novel - parser for .kage scripts,scripts used for the Kagerou Project Fangame
 *copyright (c) Logan Tann
 *Under the MIT license. See COPYING file.
 */
#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <string.h>
#include <map>
#include <memory>
#include <SFML/Graphics.hpp>
#include "game.h"
#include "easing.h"
//#include <iterator>

class novel{
    public:
      novel(std::string loadfile,sf::RenderWindow &scr);
      //Main functions
      bool play(std::string readline, sf::RenderWindow &scr,int numLine=-1,bool init=false);
      int debug(sf::RenderWindow &scr);

      //utility functions
      std::string remove(std::string str,std::string search);
      std::vector<std::string> split(std::string str, char token);

      //public novel functions
      bool readPart(std::string part, sf::RenderWindow &scr, int numLine=-1);

    private:
      //Vars
        std::string loadfile,actualPart,actualCharacter,endCoord;
        std::string transitionAt[3];
        bool comment,readingLabel,endReading,nogui,saying,makeAchoice,endAnimation,animatingTextFinished;
        bool playingAnimation[3];
        int lastPartLine,barPosY,scrw,scrh,endAnimStart,endAnimMove,substrPos;
        int atPosX[3],atPosY[3],animDuration[3],animStart[3],animEnd[3],sizeX[3];

        Easing ease;

        sf::Font fontDeja;
        sf::Sprite atRight,atLeft,center,background;
        sf::Sprite displayAt[3];
        sf::Color bgColor;
        sf::RectangleShape bar,choiceWindow,blackWindow;
        sf::Clock clock;
        sf::Time transitionTime[3],endStart;

        std::vector<std::string> charaList,choicesListGoto;
        std::vector<bool> displayedTxt;
        std::vector<sf::String> displaySay,choicesList;
        std::vector<Button> choiceButtons;
        std::map<std::string, std::string> internalSave;
        std::map<std::string, std::string> externalSave;
        std::map<std::string, std::string> allLabels;
        std::map<std::string, sf::Music> allMusics;
        std::map<std::string, sf::SoundBuffer> buffer;
        std::map<std::string, sf::Sound> allSounds;
        std::map<std::string, sf::Texture> allTextures;
        std::map<std::string, sf::Sprite> allImages;



      //novel functions
        //init functions
          void newchara(std::string line,int numLine=-1);
          void newLabel(std::string line,int numLine=-1);
          void endLabel(std::string line,int numLine=-1);
          void loadSound(std::string line, int numLine=-1);
          void loadMusic(std::string line, int numLine=-1);
          void loadImage(std::string line, int numLine=-1);
        //control functions
          void say(std::string line,int numLine=-1);
          void show(std::string line, int numLine=-1);
            int showLoadImage(std::string argument,int at,int numLine=-1);
          int  choice(std::string line, sf::RenderWindow &scr, int numLine=-1);
          int  playSound(std::string line, int numLine=-1);
          void stopSound(std::string line, int numLine=-1);
          int newScene(std::string line, int numLine=-1);
        //transitions
          int  newTransition(std::string transition, int who, int numLine=-1);
          bool checkTransition(std::string transition);
          int  updateTransition(int who);
        //display functions
          int  display(sf::RenderWindow &scr);
          int  displayEnd(sf::RenderWindow &scr);
          int  draw(sf::RenderWindow &scr);
          int  drawChoices(sf::RenderWindow &scr);
        //other functions
          int  goTo(std::string line, sf::RenderWindow &scr, int numLine=-1);
          void print(std::string line);
          bool end(std::string line);

      //utility functions
        bool read(sf::RenderWindow &scr,bool init=false,int from=1, int to=0);
        std::string removeindent(std::string text);
        std::vector<sf::String> splitQuotes(std::string line,int numLine=-1);

      //some code... because i'm not working online :(
      /*
      mapOfWords.insert(std::make_pair("earth", 1));
      if(mapOfWords.find("sun") != mapOfWords.end())
          std::cout<<"word 'sun' found"<<std::endl;
      */
};
#endif
