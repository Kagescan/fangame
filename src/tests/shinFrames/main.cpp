#include <iostream>
#include <SFML/Graphics.hpp>
#include <SFML/Window.hpp>
#include <SFML/Audio.hpp>

int main(){
  sf::RenderWindow scr(sf::VideoMode(620,280), "Test shintaro ruuunnn");
  scr.setFramerateLimit(60);

  sf::Clock clock;
  sf::Time newTime, oldTime;
  oldTime = clock.getElapsedTime();
  sf::Texture perso;
    //if (!perso.loadFromFile("resized.png")) return 0;
    if (!perso.loadFromFile("test.png")) return 0;
    int x = 0, frameN = 18, frameW = 170, frameH = 280;
  sf::Sprite sprite_perso;
    sprite_perso.setTexture(perso);
    sprite_perso.setPosition(200,0);
    sprite_perso.setTextureRect(sf::IntRect(0,0,frameW,frameH));
  while (scr.isOpen()) {
      sf::Event event;
      while (scr.pollEvent(event)) {switch (event.type){
        case sf::Event::Closed: scr.close(); break;
        case sf::Event::KeyReleased :
          if (event.key.code == sf::Keyboard::Return) {
            std::cout<<"return";
          }
          break;
        default:break;
      }}
      newTime = clock.getElapsedTime();
      if (newTime>oldTime+sf::milliseconds(40)){
        if (x>=frameN)
          x=0;
        //sprite_perso.setTextureRect(sf::IntRect(120*x,0,120,198));
        sprite_perso.setTextureRect(sf::IntRect(frameW*x,0,frameW,frameH));
        oldTime = newTime;
        x++;
      }

      scr.clear(sf::Color::White);
      scr.draw(sprite_perso);
      scr.display();
  }

  return 0;
}