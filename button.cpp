#include "button.h"

button::button(sf::Font &font,std::string texte,unsigned int characterSize,sf::Color color,int x,int y,sf::Color selec)
{
    text.setFont(font);
    text.setString(texte);
    text.setCharacterSize(characterSize);
    text.setFillColor(color);
    text.setPosition(x,y);
    surface = text.getGlobalBounds();
    posx = surface.left,posy = surface.top;
    color = color;sColor=selec;
    selected=false; //default value for private var.
}

void button::render(sf::RenderWindow &scr) {scr.draw(text);}
void button::updatepos() {text.setPosition(posx,posy);surface = text.getGlobalBounds();}
void button::centerx(int w,int margin,bool update) {posx = margin + w/2 - surface.width/2;if (update) updatepos();}
void button::centery(int h,int margin,bool update) {posy = margin + h/2 - surface.height/2;if (update) updatepos();}
sf::Text button::gettxt() {return text;}

bool button::clicked(int x,int y) {return surface.contains(x,y);}
bool button::select() {if (selected) text.setFillColor(sColor);else text.setFillColor(color); selected=!selected;return selected;}
bool button::select(bool change) {if (selected) text.setFillColor(sColor);else text.setFillColor(color); selected=change;return selected;}
