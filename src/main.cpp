#include "game.h"
#include "button.h"
#include "script.h"
#include "easing.h"


int main() {

    std::cout <<"\nRetaining's memory - Version 2.1\n"<<
                "\n (c) The KageScan community - Under the MIT/X11 license,please read COPYRIGHT file"<<
                "\n\n"<<std::flush;
    const int scrw = 1280, scrh = 720;
    sf::RenderWindow scr(sf::VideoMode(scrw,scrh), "Kagerou Project Fangame V2");//,sf::Style::Fullscreen
    scr.clear(sf::Color::White);
    scr.display();
    scr.setFramerateLimit(60);
    //LOADING GRAPHICS
        sf::Font bloody,animeace;
          if(!bloody.loadFromFile("resources/fonts/bloody.ttf")) return error("error loading bloody.ttf");
          if(!animeace.loadFromFile("resources/fonts/animeacefr.ttf")) return error("error loading animeacefr.ttf");

        sf::Texture imgmenubg, logotxt, imgmenubgMore;
          if (!imgmenubg.loadFromFile("resources/img/background/menu2.jpg")) return error("error loading menu2.jpg");
          sf::Sprite menubg;menubg.setTexture(imgmenubg);
          if (!imgmenubgMore.loadFromFile("resources/img/menu.png")) return error("error loading menu2.jpg");
          sf::Sprite menubgMore;menubgMore.setTexture(imgmenubgMore);
          menubg.setOrigin(scrw/2,scrh/2);
          menubg.setPosition(scrw/2,scrh/2);
          if (!logotxt.loadFromFile("resources/img/background/logo.png")) return error("error loading logo.png");
          sf::Sprite logo;
            logotxt.setSmooth(true);
            logo.setTexture(logotxt);
            logo.setScale(0.5,0.5);
            logo.setPosition(scrw-10-logotxt.getSize().x/2,7);
          bool playBlackTrans=false;
          menubgMore.setColor(sf::Color(0,0,0,0));

          sf::Music inadaze;
            if (!inadaze.openFromFile("resources/sounds/ostdaze.ogg")) return error("unable to load ostdaze.ogg");

    /*intro(scr,scrw,scrh,animeace);
    inadaze.play();inadaze.setLoop(true);*/

    sf::Clock clock;
    sf::Time animStart=clock.getElapsedTime();
    std::string theScriptFile("resources/scripts/script.txt");
    float iter(0);
    guiSelect menu;
    menu.displaying = true;
    std::vector<std::string> elems = {"Jouer", "Options", "Quitter"};
    menu.setChoices(elems);
    menu.type(false);
    menu.position(sf::Vector2f(50,75));
    /*TileMap map;
    map.load("resources/img/tilesets/school.png",sf::Vector2u(32,32),18,3);*/
    //bool testspace(false);
    //LOOP
    Script engine(theScriptFile);
    while (scr.isOpen()) {
      sf::Event event;
        while (scr.pollEvent(event)) {switch (event.type){
          case sf::Event::Closed: scr.close();break;
          case sf::Event::KeyReleased :
            //if (event.key.code == sf::Keyboard::Escape) scr.close();
            if (event.key.code == sf::Keyboard::Return) {
              //engine.debug(scr);

              inadaze.stop();

              if (menu.displaying){
                int selected = menu.enter();
                switch (selected){
                  case 0: 
                  engine.read(scr);
                  break;
                  case 1: 
                    playBlackTrans = !playBlackTrans;
                    iter = 0;
                  break;
                  case 2: 
                    scr.close();
                  break;
                  default:break;
                }
                menu.displaying = true;
              }

              //menubg.setOrigin(scrw/2,scrh/2);
              //menubg.setPosition(scrw/2,scrh/2);
              
              inadaze.play();
              //playBlackTrans=true;
              animStart=clock.getElapsedTime();
            } else if (event.key.code == sf::Keyboard::Up) {
              if (menu.displaying) menu.change(true);
            } else if (event.key.code == sf::Keyboard::Down) {
              if (menu.displaying) menu.change(false);
            }
            break;
          case sf::Event::MouseButtonReleased :{
            if (event.mouseButton.button == sf::Mouse::Left) {
              animStart=clock.getElapsedTime();
              playBlackTrans = !playBlackTrans;
              iter = 0;
            }break;}/*
        case sf::Event::MouseMoved :{
                if (play.clicked(event.mouseMove.x,event.mouseMove.y)) {play.select(true);} else {play.select(false);}
            break;}*/
          default:break;
        }}



        scr.clear();
        
        if (playBlackTrans){
          int getms = clock.getElapsedTime().asMilliseconds() - animStart.asMilliseconds();
          int alpha = easeOutCirc(
                    getms>2000 ? 2000:getms,//elapsed time or max value
                    0, //start value
                    255, //adds 255
                    2000 //duration of the animation
                );
          menubgMore.setColor(sf::Color(255,255,255,alpha));
          iter = alpha*0.001;
          menubg.setScale(1+iter,1+iter);
          if (getms>2000)
            playBlackTrans=false;
        }
        scr.draw(menubg);
        scr.draw(logo);
        scr.draw(menubgMore);
        if (menu.displaying) menu.draw(scr);
        //if (testspace) scr.draw(map);
        scr.display();
    }

    return 0;
}

