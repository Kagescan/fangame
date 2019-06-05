#include <iostream>
#include <SFML/Graphics.hpp>
#include <SFML/Window.hpp>
#include <SFML/Audio.hpp>
#include "../../easing.h"

class MapEntity{
  public:
    MapEntity(){
      x = animInit = animDist = 0;
      frameN = 18;
      frameW = 170;
      frameH = 280;
      spritePosX = 0;
      spritePosY = 680;
      animatingX = animatingY = false;
      spriteTxt.loadFromFile("test.png");
      oldTime = clock.getElapsedTime();
      sprite.setTexture(spriteTxt);
      sprite.setOrigin(170/2,280);
      sprite.setPosition(spritePosX,spritePosY);
      sprite.setTextureRect(sf::IntRect(0,0,frameW,frameH));
    };
    bool draw(sf::RenderWindow& scr){
      const float getms = clock.getElapsedTime().asSeconds() - animStart.asSeconds();
      if (animatingX)
        spritePosX = animInit + animDist * getms;
      if (animatingY)
        spritePosY = animInit + animDist * getms;
      sprite.setPosition(spritePosX,spritePosY);
      newTime = clock.getElapsedTime();
      if (newTime>oldTime+sf::milliseconds(50)){
        if (x>=frameN)
          x=0;
        //sprite.setTextureRect(sf::IntRect(120*x,0,120,198));
        sprite.setTextureRect(sf::IntRect(frameW*x,0,frameW,frameH));
        oldTime = newTime;
        x++;
      }
      scr.draw(sprite);
      return 0;
    };
    bool animate(int direction){
      animatingX = true;
      animStart = clock.getElapsedTime();
      switch (direction) {
      case sf::Keyboard::Right :{
        sprite.setScale(1,1);
        animInit = spritePosX;
        animDist = 280;
        break; }
      case sf::Keyboard::Left :{
        sprite.setScale(-1,1);
        animInit = spritePosX;
        animDist = -280;
        break;}
      case sf::Keyboard::Up : {spritePosY -= 10;break;}
      case sf::Keyboard::Down : {spritePosY += 10;break;}
      }
      return true;
    }
    bool animatingX, animatingY;
  private :
    sf::Texture spriteTxt;
    sf::Clock clock;
    sf::Time newTime, oldTime, animStart;
    sf::Sprite sprite;
    int x, frameN, frameW, frameH, spritePosX, spritePosY,
      animInit, animDist;
};

int main(){
  sf::RenderWindow scr(sf::VideoMode(1280,720), "Test shintaro ruuunnn");
  scr.setFramerateLimit(60);
  MapEntity sprite;
  while (scr.isOpen()) {
      sf::Event event;
      while (scr.pollEvent(event)) {
        switch (event.type){
          case sf::Event::Closed: scr.close(); break;
          case sf::Event::KeyPressed:
            if (!sprite.animatingX && event.key.code >= 71 && event.key.code <= 74)
              sprite.animate(event.key.code);
            break;
          case sf::Event::KeyReleased:
            sprite.animatingX = false;
          default:break; }
      }
      scr.clear(sf::Color::White);
      sprite.draw(scr);
      scr.display();
  }

  return 0;
}