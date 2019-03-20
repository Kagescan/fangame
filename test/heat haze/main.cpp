/*!
 * \file    main.cpp
 * \brief   apply a heat shader to a sprite (http://www.lucidarme.me/?p=6127)
 * \author  Philippe Lucidarme (from https://github.com/SFML/SFML/wiki/Source:-HeatHazeShader)
 * \version 1.0
 * \date    12/19/2016
 */

// SFML libraries
#include <SFML/Graphics.hpp>
#include <iostream>
#include <math.h>


int main() {

    // Create a window with the same pixel depth as the desktop
    sf::VideoMode desktopMode = sf::VideoMode::getDesktopMode();

    /*sf::RenderWindow window(sf::VideoMode(  desktopMode.width,
                                            desktopMode.height,
                                            desktopMode.bitsPerPixel),
                            "SFML part 5",
                            sf::Style::Fullscreen);*/

    sf::RenderWindow window(sf::VideoMode(  1280,
                                            720,
                                            desktopMode.bitsPerPixel),
                            "SFML part 5");
    // Enable vertical sync. (vsync)
    window.setVerticalSyncEnabled (true);

    // Create texture from PNG file
    sf::Texture texture;
    if (!texture.loadFromFile("city.jpg")) {
        std::cerr << "Error while loading texture" << std::endl;
        return -1;
    }
    // Enable the smooth filter. The texture appears smoother so that pixels are less noticeable.
    texture.setSmooth(true);

    // Create the sprite and apply the texture
    sf::Sprite sprite;
    sprite.setTexture(texture);
    sf::FloatRect spriteSize=sprite.getGlobalBounds();
    // Set origin in the middle of the sprite
    sprite.setOrigin(spriteSize.width/2.,spriteSize.height/2.);

    // Check if shaders are available
    if (!sf::Shader::isAvailable()) {
        std::cerr << "Shader are not available" << std::endl;
        return -1;
    }

    // Load shaders
    sf::Shader shader;
    //if (!shader.loadFromFile("distort.frag", sf::Shader::Fragment)) {
    if (!shader.loadFromFile("example_001.frag", sf::Shader::Fragment)) {
        std::cerr << "Error while loading shaders" << std::endl;
        return -1;
    }

    sf::Texture distortionMap;
    if (!distortionMap.loadFromFile("distortion_map.png")) {
        sf::err() << "Error while loading distortion map" << std::endl;
        return -1;
    }

    // It is important to set repeated to true to enable scrolling upwards
    distortionMap.setRepeated(true);
    // Setting smooth to true lets us use small maps even on larger images
    distortionMap.setSmooth(true);

    // Set texture to the shader
    shader.setParameter("currentTexture", sf::Shader::CurrentTexture);
    shader.setParameter("distortionMapTexture", distortionMap);

    // Shader parameters
    float distortionFactor = .05f;
    float riseFactor = .2f;


    // _________________
    // ::: Main loop :::

    sf::Clock timer;

    while (window.isOpen()){
        // Process events
        sf::Event event;
        while (window.pollEvent(event)) {
            // Close the window if a key is pressed or if requested
            if (event.type == sf::Event::Closed) window.close();

            // If a key is pressed
            if (event.type == sf::Event::KeyPressed)
            {
                switch (event.key.code)
                {
                // If escape is pressed, close the application
                case  sf::Keyboard::Escape : window.close(); break;

                // Process the up, down, left and right keys to modify parameters
                case sf::Keyboard::Up :     distortionFactor *= 2.f;    break;
                case sf::Keyboard::Down:    distortionFactor /= 2.f;    break;
                case sf::Keyboard::Left:    riseFactor *= 2.f;          break;
                case sf::Keyboard::Right:   riseFactor /= 2.f;          break;
                default : break;
                std::cout<<"distortion : "<<distortionFactor<<" - Rise : "<<riseFactor<<"\n";
                }
            }
        }

        // Set shader parameters
        shader.setParameter("time", timer.getElapsedTime().asSeconds());
        shader.setParameter("distortionFactor", distortionFactor);
        shader.setParameter("riseFactor", riseFactor);


        // Clear the window and apply grey background
        window.clear();

        // Draw the sprite and apply shader
        sprite.setPosition(window.getSize().x/2.,window.getSize().y/2.);
        //sprite.setScale(2,2);
        window.draw(sprite,&shader);

        // Update display and wait for vsync
        window.display();
    }
    return 0;
}


