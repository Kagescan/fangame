#include "game.h"
#include "button.h"
#include "script.h"
#include "easing.h"


int main() {

    std::cout <<"\nYaki's recall - Version 2.1\n"<<
                "\n (c) The KageScan community - Under the MIT/X11 license,please read COPYRIGHT file"<<
                "\n\n"<<std::flush;
    const int scrw = 1280, scrh = 720;
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
        /*sf::RectangleShape dialog,blackTransition( sf::Vector2f(scrw,scrh) );
          int dialogposx=0,dialogposy=scrh-scrh/3;
          dialog.setPosition(dialogposx,dialogposy);
          dialog.setSize(sf::Vector2f(scrw,scrh/3));
          dialog.setFillColor(sf::Color(255,255,255,200));
          blackTransition.setFillColor(sf::Color::Black);*/
          bool playBlackTrans=true;

          //Button play(bloody,"PLAY",70,sf::Color::Black,dialogposx+100,dialogposy+100,sf::Color::Red);
            //play.centerx(scrw);play.centery(scrh-dialogposy,dialogposy,true);
          sf::Music inadaze;
            if (!inadaze.openFromFile("resources/sounds/ostdaze.ogg")) return error("unable to load ostdaze.ogg");

    /*intro(scr,scrw,scrh,animeace);
    inadaze.play();inadaze.setLoop(true);*/

    sf::Clock clock;
    sf::Time animStart=clock.getElapsedTime();
    std::string theScriptFile("resources/scripts/script.txt");
    float iter(0);
    /*TileMap map;
    map.load("resources/img/tilesets/school.png",sf::Vector2u(32,32),18,3);*/
    //bool testspace(false);
    //LOOP
    while (scr.isOpen()) {

        sf::Event event;
            while (scr.pollEvent(event)) {switch (event.type){
                case sf::Event::Closed: scr.close();break;
                case sf::Event::KeyReleased :
                    //if (event.key.code == sf::Keyboard::Escape) scr.close();
                    if (event.key.code == sf::Keyboard::Space) {
                      //engine.debug(scr);
                      inadaze.stop();
                      Script engine(theScriptFile);
                      engine.read(scr);
                      inadaze.play();
                      //playBlackTrans=true;
                      animStart=clock.getElapsedTime();
                      playBlackTrans = !playBlackTrans;
                      iter = 0;
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
                    getms>1500 ? 1500:getms,//elapsed time or max value
                    0, //start value
                    255, //adds 255
                    1500 //duration of the animation
                );
          menubgMore.setColor(sf::Color(255,255,255,alpha));
          iter = alpha*0.001;
          menubg.setScale(1+iter,1+iter);
          if (getms>1500)
            playBlackTrans=false;
        }
        scr.draw(menubg);
        scr.draw(logo);
        scr.draw(menubgMore);
        //if (testspace) scr.draw(map);
        scr.display();
    }

    return 0;
}
