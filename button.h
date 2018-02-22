#ifndef BUTTON_H
#define BUTTON_H
#include <iostream>
#include <SFML/Graphics.hpp>

class button
{
    public:
        button(sf::Font &font,std::string texte="bouton",unsigned int characterSize=50,sf::Color color=sf::Color::Black,int x=0,int y=0,sf::Color selected=sf::Color::Red);
        void render(sf::RenderWindow &scr);
        void updatepos();
        void centerx(int w,int margin=0,bool update=false);
        void centery(int h,int margin=0,bool update=false);
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
