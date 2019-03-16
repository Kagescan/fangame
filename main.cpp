#include "game.h"
#include "button.h"
#include "script.h"
#include "easing.h"


int main() {

    std::cout <<"\nYaki's recall - Version 2.1\n"<<
                "\n (c) The KageScan community - Under the MIT/X11 license,please read COPYRIGHT file"<<
                "\n\n"<<std::flush;
    int scrw = 1280, scrh = 720;
    sf::RenderWindow scr(sf::VideoMode(scrw,scrh), "Kagerou Project Fangame V2");//,sf::Style::Fullscreen
    scr.setFramerateLimit(60);
    //LOADING GRAPHICS
        sf::Font bloody,animeace;
          if(!bloody.loadFromFile("resources/fonts/bloody.ttf")) return error("error loading bloody.ttf");
          if(!animeace.loadFromFile("resources/fonts/animeacefr.ttf")) return error("error loading animeacefr.ttf");
          //loading...
          Button loading(animeace,"LOADING...",70,sf::Color::Red);
            loading.centerx(scrw);loading.centery(scrh,0,true);
            loading.render(scr);scr.display();

        sf::Texture imgmenubg;
          if (!imgmenubg.loadFromFile("resources/img/background/menu2.jpg")) return error("error loading menu2.jpg");
          sf::Sprite menubg;menubg.setTexture(imgmenubg);
        sf::RectangleShape dialog,blackTransition( sf::Vector2f(scrw,scrh) );
          int dialogposx=0,dialogposy=scrh-scrh/3;
          dialog.setPosition(dialogposx,dialogposy);
          dialog.setSize(sf::Vector2f(scrw,scrh/3));
          dialog.setFillColor(sf::Color(255,255,255,200));
          blackTransition.setFillColor(sf::Color::Black);
          bool playBlackTrans=true;

          Button play(bloody,"PLAY",70,sf::Color::Black,dialogposx+100,dialogposy+100,sf::Color::Red);
            play.centerx(scrw);play.centery(scrh-dialogposy,dialogposy,true);
          sf::Music inadaze;
            if (!inadaze.openFromFile("resources/sounds/ostdaze.ogg")) return error("unable to load ostdaze.ogg");

    /*intro(scr,scrw,scrh,animeace);
    inadaze.play();inadaze.setLoop(true);*/

    sf::Clock clock;
    sf::Time animStart=clock.getElapsedTime();
    std::string theScriptFile("resources/scripts/script.txt");
    /*TileMap map;
    map.load("resources/img/tilesets/school.png",sf::Vector2u(32,32),18,3);*/
    bool testspace(false);
    //LOOP
    while (scr.isOpen()) {

        sf::Event event;
            while (scr.pollEvent(event)) {switch (event.type){
                case sf::Event::Closed: scr.close();break;
                case sf::Event::KeyReleased :
                    if (event.key.code == sf::Keyboard::Escape) scr.close();
                    if (event.key.code == sf::Keyboard::Space) {
                      //engine.debug(scr);
                      /*inadaze.stop();
                      engine.readPart("part1",scr);
                      inadaze.play();
                      playBlackTrans=true;
                      animStart=clock.getElapsedTime();*/
                      testspace = !testspace;
                    }
                    break;
                case sf::Event::MouseButtonReleased :{
                    if (event.mouseButton.button == sf::Mouse::Left) {
                        if (play.clicked(event.mouseButton.x,event.mouseButton.y)) {
                          //engine.debug(scr);
                          inadaze.stop();
                          Script engine(theScriptFile);
                          engine.read(scr);
                          inadaze.play();
                          playBlackTrans=true;
                          animStart=clock.getElapsedTime();
                        } else {}
                    }break;}
                case sf::Event::MouseMoved :{
                        if (play.clicked(event.mouseMove.x,event.mouseMove.y)) {play.select(true);} else {play.select(false);}
                    break;}
                default:break;
            }}



        scr.clear();
        scr.draw(menubg);
        scr.draw(dialog);
        play.render(scr);
        if (playBlackTrans){
          int getms = clock.getElapsedTime().asMilliseconds() - animStart.asMilliseconds();
          int posy = easeInOutCirc(
                    getms>1000 ? 1000:getms,//elapsed time or max value
                    0, //start value
                    -scrh, //move x px
                    1000 //duration of the animation
                );
          blackTransition.setPosition(0,posy);
          scr.draw(blackTransition);
          if (getms>1000)
            playBlackTrans=false;
        }
        //if (testspace) scr.draw(map);
        scr.display();
    }

    return 0;
}
