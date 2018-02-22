#include <stdio.h>
#include <iostream>
#include <SFML/Graphics.hpp>
#include "button.h"
#include "game.h"
#include "novel.h"


int main()
{

    std::cout <<"Kagerou Project Fangame Version 2.0\n"<<
                "\n (c) The KageTeam Fr community - Under the MIT/X11 license,please read COPYRIGHT file\n\n";
    int scrw = 1280, scrh = 720;
    sf::RenderWindow scr(sf::VideoMode(scrw,scrh), "Kagerou Project Fangame V2");//,sf::Style::Fullscreen

    //LOADING GRAPHICS
        sf::Font bloody,animeace;
            if(!bloody.loadFromFile("resources/fonts/bloody.ttf")) return error("error loading bloody.ttf");
            if(!animeace.loadFromFile("resources/fonts/animeacefr.ttf")) return error("error loading animeacefr.ttf");
            //loading...
            button loading(animeace,"LOADING...",70,sf::Color::Red);
                   loading.centerx(scrw);loading.centery(scrh,0,true);
            loading.render(scr);scr.display();

        sf::Texture imgmenubg;
            if (!imgmenubg.loadFromFile("resources/img/background/menu2.jpg")) return error("error loading menu2.jpg");
            sf::Sprite menubg;menubg.setTexture(imgmenubg);
        sf::RectangleShape dialog;
            //sf::IntRect dialogpos(scrw,scrh/3,0,scrh-scrh/3);
            int dialogposx=0,dialogposy=scrh-scrh/3;
            dialog.setPosition(dialogposx,dialogposy);
            dialog.setSize(sf::Vector2f(scrw,scrh/3));
            dialog.setFillColor(sf::Color(255,255,255,200));

            button play(bloody,"PLAY",70,sf::Color::Black,dialogposx+100,dialogposy+100,sf::Color::Red);
            play.centerx(scrw);play.centery(scrh-dialogposy,dialogposy,true);
            sf::Music inadaze;
            if (!inadaze.openFromFile("resources/sounds/ostdaze.ogg")) return error("unable to load ostdaze.ogg");

    //intro(scr,scrw,scrh,animeace);
    inadaze.play();inadaze.setLoop(true);
    //LOOP
    while (scr.isOpen())
    {
        sf::Event event;
            while (scr.pollEvent(event)) {switch (event.type){
                case sf::Event::Closed: scr.close();break;
                case sf::Event::KeyReleased :
                    if (event.key.code == sf::Keyboard::Escape) scr.close();
                    break;
                case sf::Event::MouseButtonReleased :{
                    if (event.mouseButton.button == sf::Mouse::Left) {
                        if (play.clicked(event.mouseButton.x,event.mouseButton.y)) {
                          std::string theScriptFile("I.txt");
                          novel engine(theScriptFile);
                          std::vector<std::vector<std::vector<std::vector<std::string> > > > script=engine.getParsed();
                          engine.showParsed();
                          std::cout<< "clicked";
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
        scr.display();
    }

    return 0;
}
