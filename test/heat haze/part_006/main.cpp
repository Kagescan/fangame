/*!
 * \file    main.cpp
 * \brief   apply a shaders to a sprite (http://www.lucidarme.me/?p=6127)
 * \author  Philippe Lucidarme
 * \version 1.0
 * \date    12/20/2016
 */

// SFML libraries
#include <SFML/Graphics.hpp>
#include <iostream>
#include <math.h>


// Example 1 : distorsion
// Example 2 : breath
// Example 3 : shaked
// Example 4 : fade
//#define SHADER_FILENAME         "example_001.frag"
//#define SHADER_FILENAME         "example_002.frag"
//#define SHADER_FILENAME         "example_003.frag"
#define SHADER_FILENAME         "example_004.frag"
//#define SHADER_FILENAME         "example_005.frag"

#define     WINDOW_WIDTH    256
#define     WINDOW_HEIGHT   256

int main()
{

    // _____________________
    // ::: Create window :::

    // Create a non resizable window
    sf::RenderWindow window(sf::VideoMode(WINDOW_WIDTH, WINDOW_HEIGHT), "SFML Shader Example", sf::Style::Titlebar | sf::Style::Close);


    // Create a window size texture and a sprite for the shader
    sf::Texture tex;
    tex.create(WINDOW_WIDTH, WINDOW_HEIGHT);
    sf::Sprite spr(tex);

    // Enable vertical sync. (vsync)
    window.setVerticalSyncEnabled (true);



    // ____________________
    // ::: Load texture :::

    // Create texture from PNG file
    sf::Texture texture;
    if (!texture.loadFromFile("sfml-icon-small.png"))
    {
        std::cerr << "Error while loading texture" << std::endl;
        return -1;
    }
    // Enable the smooth filter. The texture appears smoother so that pixels are less noticeable.
    texture.setSmooth(true);



    // _______________________________________
    // ::: Create sprite and apply texture :::

    // Create the sprite and apply the texture
    sf::Sprite sprite;
    sprite.setTexture(texture);
    sf::FloatRect spriteSize=sprite.getGlobalBounds();
    // Set origin in the middle of the sprite
    sprite.setOrigin(spriteSize.width/2.,spriteSize.height/2.);



    // _______________
    // ::: Shaders :::

    // Check if shaders are available
    if (!sf::Shader::isAvailable())
    {
        std::cerr << "Shader are not available" << std::endl;
        return -1;
    }

    // Load shaders
    sf::Shader shader;
    if (!shader.loadFromFile(SHADER_FILENAME, sf::Shader::Fragment))
    {
        std::cerr << "Error while shaders" << std::endl;
        return -1;
    }




    // _________________
    // ::: Main loop :::

    sf::Clock time;
    while (window.isOpen())
    {
        // Process events
        sf::Event event;
        while (window.pollEvent(event))
        {
            // Close the window if a key is pressed or if requested
            if (event.type == sf::Event::Closed) window.close();

            // If escape is pressed, close the application
            if (event.type == sf::Event::KeyPressed && event.key.code==sf::Keyboard::Escape) window.close();
        }

        // Set shader parameters
        shader.setParameter("time", time.getElapsedTime().asSeconds());

        // Clear the window and apply grey background
        window.clear( sf::Color(127,127,127));

        // Draw the sprite and apply shader
        sprite.setPosition(window.getSize().x/2.,window.getSize().y/2.);
        window.draw(sprite,&shader);

        // Update display and wait for vsync
        window.display();
    }
    return 0;
}


