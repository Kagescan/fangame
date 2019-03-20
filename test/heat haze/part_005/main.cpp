#include <SFML/Graphics.hpp>
#include <iostream>

// Examples from http://glslsandbox.com/
// Example 1 : mouse on fire
// Example 2 : scrolling of shapes
// Example 3 : cells
// Example 4 : fire
// Example 5 : moving circles
// Example 6 : smoke
// Example 7 : horizontal scrolling mountains
//#define SHADER_FILENAME         "example_001.frag"
//#define SHADER_FILENAME         "example_002.frag"
//#define SHADER_FILENAME         "example_003.frag"
//#define SHADER_FILENAME         "example_004.frag"
//#define SHADER_FILENAME         "example_005.frag"
//#define SHADER_FILENAME         "example_006.frag"
#define SHADER_FILENAME         "example_007.frag"


#define     WINDOW_WIDTH    800
#define     WINDOW_HEIGHT   600

int main()
{


    // Create a non resizable window
    sf::RenderWindow window(sf::VideoMode(WINDOW_WIDTH, WINDOW_HEIGHT), "SFML Shader Example", sf::Style::Titlebar | sf::Style::Close);


    // Create a window size texture and a sprite for the shader
    sf::Texture tex;
    tex.create(WINDOW_WIDTH, WINDOW_HEIGHT);
    sf::Sprite spr(tex);


    // Create an load the shader from file
    sf::Shader shader;
    shader.loadFromFile(SHADER_FILENAME, sf::Shader::Fragment);
    if (!shader.isAvailable()) {
        std::cout << "The shader is not available\n";
        return -1;
    }


    // Set the resolution parameter (initial window size)
    shader.setParameter("resolution", sf::Vector2f(WINDOW_WIDTH , WINDOW_HEIGHT));


    // Use a timer to obtain the time elapsed
    sf::Clock clk;


   // Main loop
    while (window.isOpen()) {
        // Event handling
        sf::Event event;

        // Event loop (keyboard, mouse ...
        while (window.pollEvent(event))
        {
            // Close the window if a key is pressed or if requested
            if (event.type == sf::Event::Closed) window.close();

            // Exit the app when a key is pressed
            if (event.type == sf::Event::KeyPressed) window.close();
        }

        // Set the others parameters who need to be updated every frames (time and mouse)
        shader.setParameter("time", clk.getElapsedTime().asSeconds());
        sf::Vector2i mousePos = sf::Mouse::getPosition(window);
        shader.setParameter("mouse", sf::Vector2f(mousePos.x, mousePos.y - WINDOW_HEIGHT/2));

        // Draw the sprite with the shader on it
        window.clear();
        window.draw(spr, &shader);
        window.display();
    }

    return 0;
}

