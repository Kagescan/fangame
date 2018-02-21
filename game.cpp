#include "game.h"
/*Basic game functions*/


int intro(sf::RenderWindow &scr,int scrw,int scrh,sf::Font&font) {
    //definition des variables (attention pique les yeux X_X)

        sf::Music prologue; if (!prologue.openFromFile("resources/sounds/prologue.ogg")) return error("unable to load prologue.ogg");
        sf::Time time; int secs=0;
        bool cityfaded=false,credit1faded=false,credit2faded=false;
        sf::Texture tcredit1,tcredit2,tcity,tcityglitch;
        sf::Sprite credit1,credit2,city,cityglitch;
        if (!tcredit1.loadFromFile("resources/img/background/credit1.jpg"))         {return error("error loading credit1.jpg");}    else {credit1.setTexture(tcredit1);}
        if (!tcredit2.loadFromFile("resources/img/background/credit2.jpg"))         {return error("error loading credit2.jpg");}    else {credit2.setTexture(tcredit2);}
        if (!tcity.loadFromFile("resources/img/background/city.jpg"))               {return error("error loading city.jpg");}       else {city.setTexture(tcity);city.setPosition(sf::Vector2f(0, 100));}
        if (!tcityglitch.loadFromFile("resources/img/background/cityglitch.jpg"))   {return error("error loading cityglitch.jpg");} else {cityglitch.setTexture(tcityglitch);cityglitch.setPosition(sf::Vector2f(0, 100));}
        button *script[3];script[0] = new button(font,"It was an ordinary Day",50,sf::Color::White);script[1] = new button(font,"Without a single obstacle in my path",50,sf::Color::White);script[2] = new button(font,"Until such time that the sound of the annoying cricket",30,sf::Color::White);script[3] = new button(font,"disapparead",70,sf::Color::Red);
        for (unsigned int i=0;i<4;i++) {script[i]->centerx(scrw,0,true);}

    sf::sleep(sf::seconds(0.5));
    scr.clear();
    prologue.play();
    do {
        scr.clear();
        sf::Time time=prologue.getPlayingOffset();
        secs = (int)time.asSeconds();
        //background
            if (secs>=0 and secs<=5)        {if (credit1faded) {scr.draw(credit1);} else {credit1faded = fadein(scr,credit1,10);}}
            else if (secs>5 and secs<=10)  {if (credit2faded) {scr.draw(credit2);} else {credit2faded = fadein(scr,credit2,10);}}
            if (secs>=12 and secs<=22) {if (cityfaded) {scr.draw(city);} else {cityfaded = fadein(scr,city,1);}} else if (secs>=24){scr.draw(cityglitch);}
        //subtitles
            if (secs>12 and secs<15)            {scr.draw(script[0]->gettxt());}
            else if (secs>15 and secs<18)       {scr.draw(script[1]->gettxt());}
            else if (secs>=20 and secs<=22)     {scr.draw(script[2]->gettxt());}
            else if (secs==23)                  {scr.draw(cityglitch);}
            else if (secs>=24 and secs<26)      {scr.draw(cityglitch);scr.draw(script[3]->gettxt());}
        sf::Event event;
            while (scr.pollEvent(event)) {switch (event.type){
                case sf::Event::Closed: scr.close();return 0;break;
                case sf::Event::KeyReleased :if (event.key.code == sf::Keyboard::Escape) scr.close();return 0;break;
                default:break;
            }}
        scr.display();
    } while (secs<26);

    fadeout(scr,scrw,scrh);

    return 0;
}


int error(std::string type) {
    std::cout <<"\n AN ERROR OCCURED !! \n REASON : "<< type;
    return EXIT_FAILURE;
}


bool fadeout(sf::RenderWindow &scr,int scrw,int scrh,int time) {
    sf::RectangleShape filtre(sf::Vector2f(scrw,scrh));
    filtre.setFillColor(sf::Color(0,0,0,15));
    for (unsigned int i=0;i < 256;i++) {
        scr.draw(filtre);
        sf::sleep(sf::milliseconds(time));
        scr.display();
    }
    return true;
}

bool fadein(sf::RenderWindow &scr,sf::Sprite &texture,int time) {
    for (unsigned int i=0;i < 256;i+=5) {
        scr.clear();
        texture.setColor(sf::Color(255,255,255,i));
        sf::sleep(sf::milliseconds(time));
        scr.draw(texture);
        scr.display();
    }
    return true;
}