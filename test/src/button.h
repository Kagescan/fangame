#ifndef BUTTON_H
#define BUTTON_H
#include <iostream>
#include <SFML/Graphics.hpp>
#include "game.h"

class Button
{
    public:
        Button(sf::Font &font,std::string texte="bouton",unsigned int characterSize=50,sf::Color color=sf::Color::Black,int x=0,int y=0,sf::Color selected=sf::Color::Red);
        void render(sf::RenderWindow &scr);
        void updatepos();
        void centerx(int w=1080,int margin=0,bool update=false);
        void centery(int h=720,int margin=0,bool update=false);
        void setPosX(int x=0,bool update=false);
        void setPosY(int y=0,bool update=false);
        void moveX(int x,bool update=false);
        void moveY(int y,bool update=false);
        sf::Text gettxt();
        bool clicked(int x,int y);
        bool select();
        bool select(bool change);
    private:
        sf::Text text;
        sf::FloatRect surface;
        int posx,posy;
        bool selected;
        sf::Color color,sColor;
};

#endif // BUTTON_H
