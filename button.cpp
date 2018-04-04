#include "button.h"

Button::Button(sf::Font &font,std::string texte,unsigned int characterSize,sf::Color color,int x,int y,sf::Color selec)
{
    text.setFont(font);
    text.setString(toSfString(texte));
    text.setCharacterSize(characterSize);
    text.setFillColor(color);
    text.setPosition(x,y);
    surface = text.getGlobalBounds();
    posx = surface.left,posy = surface.top;
    color = color;sColor=selec;
    selected=false; //default value for private var.
}

void Button::render(sf::RenderWindow &scr) {scr.draw(text);}
void Button::updatepos() {text.setPosition(posx,posy);surface = text.getGlobalBounds();}
void Button::centerx(int w,int margin,bool update) {posx = margin + w/2 - surface.width/2;if (update) updatepos();}
void Button::centery(int h,int margin,bool update) {posy = margin + h/2 - surface.height/2;if (update) updatepos();}
void Button::setPosX(int x,bool update) {posx=x;if (update) updatepos();}
void Button::setPosY(int y,bool update) {posy=y;if (update) updatepos();}
void Button::moveX(int x,bool update) {posx+=x;if (update) updatepos();}
void Button::moveY(int y,bool update) {posy+=y;if (update) updatepos();}
sf::Text Button::gettxt() {return text;}

bool Button::clicked(int x,int y) {return surface.contains(x,y);}
bool Button::select() {if (selected) text.setFillColor(sColor);else text.setFillColor(color); selected=!selected;return selected;}
bool Button::select(bool change) {if (selected) text.setFillColor(sColor);else text.setFillColor(color); selected=change;return selected;}
