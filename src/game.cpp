/* GAME - Helpers functions for the game
 * Copyright (c) 2018, 2019 ShinProg
 * Under MIT license, more informations in the file LICENSE
 */
#include "game.h"


int intro(sf::RenderWindow &scr,int scrw,int scrh,sf::Font&font) {
  sf::Music prologue; if (!prologue.openFromFile("resources/sounds/prologue.ogg")) return error("unable to load prologue.ogg");
  sf::Clock clock;
  sf::Time time,timer2;
  int secs=0;
  sf::Vector2u temp=scr.getSize();
  bool cityfaded=false,credit1faded=false;
  sf::Texture tcredit1,tcredit2,tcity,tcityglitch;
  sf::Sprite credit1,credit2,city,cityglitch;

  if (!tcredit1.loadFromFile("resources/img/background/credit1.jpg"))         {return error("error loading credit1.jpg");}    else {credit1.setTexture(tcredit1);}
  if (!tcredit2.loadFromFile("resources/img/background/credit2.jpg"))         {return error("error loading credit2.jpg");}    else {credit2.setTexture(tcredit2);}
  if (!tcity.loadFromFile("resources/img/background/city.jpg"))               {return error("error loading city.jpg");}       else {city.setTexture(tcity);city.setPosition(sf::Vector2f(0, 100));}
  if (!tcityglitch.loadFromFile("resources/img/background/cityglitch.jpg"))   {return error("error loading cityglitch.jpg");} else {cityglitch.setTexture(tcityglitch);cityglitch.setPosition(sf::Vector2f(0, 100));}

  scr.clear();
  prologue.play();
  do {
    scr.clear();
    sf::Time time=prologue.getPlayingOffset();
    timer2 = clock.getElapsedTime();
    secs = (int)time.asSeconds();
    //background
      if (secs>=0 and secs<=5)        {if (credit1faded) {scr.draw(credit1);clock.restart();} else {credit1faded = fadein(scr,credit1,10);}}
      else if (secs>5 and secs<=10)  {
        int test=temp.y; // can't make a wrong value
        int getms=timer2.asMilliseconds();
        if (getms<1500) {
          scr.draw(credit1);
          credit2.setPosition(sf::Vector2f( 0, easeOutExpo(getms>1000?1000:getms,temp.y,-test,1000) ));
        }

        scr.draw(credit2);
      }
      if (secs>=12 and secs<=22) {if (cityfaded) {scr.draw(city);} else {cityfaded = fadein(scr,city,1);}} else if (secs>=24){scr.draw(cityglitch);}
    /*/subtitles
      if (secs>12 and secs<15)            {scr.draw(script[0]->gettxt());}
      else if (secs>15 and secs<18)       {scr.draw(script[1]->gettxt());}
      else if (secs>=20 and secs<=22)     {scr.draw(script[2]->gettxt());}
      else if (secs==23)                  {scr.draw(cityglitch);}
      else if (secs>=24 and secs<26)      {scr.draw(cityglitch);scr.draw(script[3]->gettxt());}
      */
    sf::Event event;
      while (scr.pollEvent(event)) {switch (event.type){
        case sf::Event::Closed: scr.close();  return 0;  break;
        case sf::Event::KeyReleased :if (event.key.code == sf::Keyboard::Escape) scr.close();  return 0;  break;
        default:break;
      }}
    scr.display();
  } while (secs<26);

  fadeout(scr,scrw,scrh);

  return 0;
}

sf::String toSfString(std::string theStdString) {
  std::basic_string<sf::Uint32> utf32line;
  sf::Utf8::toUtf32(theStdString.begin(), theStdString.end(), back_inserter(utf32line));
  return sf::String(utf32line);
}

//shitty code...
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

  int error(std::string type) { 
      std::cerr <<"\n AN ERROR OCCURED !! \n REASON : "<< type;
      return EXIT_FAILURE;
  }

//helpers
  bool blank(std::string str){
    for (int i(0);str[i];i++) if (!isspace(str[i])) return false;
    return true;
  }

  std::string removeTabs(std::string str){
    for (int i(0);str[i];i++) if (!isspace(str[i])) return str.substr(i);
    return str;
  }
  std::string removeSpaces(std::string str) { //remove all spaces from a string
    std::string output;
    output.reserve(str.size()); // optional, avoids buffer reallocations in the loop
    for(size_t i(0); i < str.size(); ++i)
      if (!std::isspace(str[i])) output += str[i];
    return output;
  }

  std::string strReplace(std::string& s, const std::string& toReplace, const std::string& replaceWith) {
    std::size_t pos = s.find(toReplace);
    if (pos == std::string::npos) return s;
    return s.replace(pos, toReplace.length(), replaceWith);
  }

  std::string str_tolower(std::string s) {
      std::transform(s.begin(), s.end(), s.begin(), [](unsigned char c){ return std::tolower(c); });
      return s;
  }

  std::vector<std::string> split(std::string string, char search) {
    std::vector<std::string> parsed;
    std::string command;
    std::istringstream spart(string);
    while(std::getline(spart,command,search)) parsed.push_back(command);
    return parsed;
  }

  std::vector<sf::String> splitQuotes(std::string str,unsigned int numLine) {
    bool endStr=false;
    sf::String sfStrLine=toSfString(str);
    std::size_t start(-1),from(0);
    std::vector<std::string> positions;
    std::vector<sf::String> parsed;
    while ( sfStrLine.find('"',start+1)<sfStrLine.getSize() ){
      start = sfStrLine.find('"',start+1);
      endStr = !endStr;
      if (endStr)
        from=start+1;
      else 
        positions.push_back(std::to_string(from)+";"+std::to_string(start));
    }

    if (start==0) std::cerr<<"! On line "<<numLine<<" : Error - There isn't any quote in the argument !!\n";
    else {
      if (endStr) std::cerr<<"! On line "<<numLine<<" : Error - Unterminated string\n";
      else {
        for (auto i:positions){
          std::vector<std::string> temp=split(i,';');
          parsed.push_back( sfStrLine.substring(  std::stoi(temp[0]), std::stoi(temp[1])-std::stoi(temp[0])) );
        }
      }
    }
    return parsed;
  }

std::vector<sf::String> cutString(sf::String line, unsigned int lenghtLimit){
  std::vector<sf::String> retval;
  unsigned int j(line.getSize()-1);
  if (j<lenghtLimit) {
    retval.push_back(line);
  } else {
    while (j>0){
      if (isspace(line[j]) && j<lenghtLimit) { //wrap
        sf::String cut = line.substring(j+1) + ' ';
        line.erase(j, sf::String::InvalidPos);
        retval.push_back(line);
        line = cut;
        j = line.getSize();
      }
      j--;
    } 
  }
  return retval;
}

std::string calc(std::string input){
  try {
    char test[input.size()];
    strcpy(test, input.c_str());
    Calc evaluator;
    evaluator.parse(test);
    std::string result = std::to_string(evaluator.get_numeric_answer()); //convert to str
    // the result is always a float number not simplified : we need to reduce it
    int i = result.size(); //cursor 1 char before EOL
    while (result[i-1] == '0') i--; //delete all 0
    if (result[i-1] == '.') i--; //if before cursor is a dot then delete it
    result.erase(i, result.size()); 

    return result;
  } catch(ParsingException ex) {
    std::cerr <<"! Evaluation Error : " << ex.get_msg() << ", at char #" << ex.get_col()<<" (Expression : "<<input<<")\n";
    return "";
  }
}


guiSelect::guiSelect(){
  if (!fontDeja.loadFromFile("resources/fonts/DejaVuSans.ttf"))
    std::cerr<<"INTERNAL ERROR : Can't load default font [resources/fonts/DejaVuSans.ttf] !!";
  if (!barTxt.loadFromFile("resources/img/choice.png"))
    std::cerr<<"ERROR : unable to load [resources/img/choice.png]\n";
  if (!smallBarTxt.loadFromFile("resources/img/smallChoice.png"))
    std::cerr<<"ERROR : unable to load [resources/img/smallChoice.png]\n";
  bar.setTexture(barTxt);
  smallBar.setTexture(smallBarTxt);
  bar.setColor(sf::Color(255,100,100));
  smallBar.setColor(sf::Color(255,100,100));
  barSelected.setTexture(barTxt);
  smallBarSelected.setTexture(smallBarTxt);
  valType = true;
  iter = choicePos = 0;
}
bool guiSelect::change(bool direction){
  if (direction) choicePos = (choicePos==0) ? choices.size()-1 : choicePos-1;
  else choicePos = (choicePos+1>=choices.size()) ? 0 : choicePos+1;
  return direction;
}
unsigned int guiSelect::enter(){
  displaying = false;
  return choicePos;
}
bool guiSelect::draw(sf::RenderWindow& scr){
  iter++;
  int colorIter = 32*std::sin(0.1*iter)+32;
  sf::Text tempTxt("",fontDeja,27); tempTxt.setFillColor(sf::Color::Black);
  if (valType) barSelected.setColor( sf::Color(255,colorIter,colorIter) );
  else smallBarSelected.setColor( sf::Color(255,colorIter,colorIter) );

  for (unsigned int i(0); i<choices.size(); i++){
  //draw bar
    sf::Vector2f position(valPosition.x,valPosition.y+i*50);
    if (i==choicePos) {
      if (valType){
        barSelected.setPosition(position);
        scr.draw(barSelected); 
      } else {
        smallBarSelected.setPosition(position);
        scr.draw(smallBarSelected); 
      }
    } else {
      if (valType){
        bar.setPosition(position);
        scr.draw(bar);
      } else {
        smallBar.setPosition(position);
        scr.draw(smallBar);
      }
    }
  //draw text
    tempTxt.setString(toSfString(choices[i]));
    sf::Rect txtBounds = tempTxt.getGlobalBounds();
    if (valType) tempTxt.setPosition(scr.getSize().x/2 - txtBounds.width/2, valPosition.y+i*50 + (12-txtBounds.height/2) );
    else tempTxt.setPosition(valPosition.x + 200 - txtBounds.width/2, valPosition.y+i*50 + (12-txtBounds.height/2) );
    scr.draw(tempTxt);
  }
  return true;
}
sf::Vector2f guiSelect::position(sf::Vector2f position){ return valPosition = position; }
bool guiSelect::type(bool type){ return valType = type; }

//---------------Character class
  Character::Character(int winHeight){
    titleColor = sf::Color::Black;
    spriteColor = sf::Color::White;
    x = 0;
    y = 0;
    scrh = winHeight;
  }
  int Character::reloadY(int changeY) {
    return y = (changeY==0) ? scrh - sprite.getTextureRect().height : changeY;
  }
  bool Character::animatePos(std::string from, std::string to, std::string ease, sf::Time duration, sf::Time curr, unsigned int line){
    x = 0;
    y = scrh - sprite.getTextureRect().height;
    try {
      animX_from = (from.empty()) ? x : std::stoi(from);
      animX_to = (to.empty()) ? 0 : std::stoi(to);
    } catch (const std::invalid_argument &e){ std::cerr<<"! Line "<<line<<" : Option Error (The value for options /from or /to must be valid numbers !)\n"; return false;
    } catch (...) { std::cerr<<"! Line "<<line<<" : Unknown Error (This may came from the option /from or /to)\n"; return false; }
    animX_ease = ease;
    animX_duration = duration;
    animX_init = curr;
    animX = true;
    return true;
  }

  bool Character::animateOpacity(std::string from, std::string to, std::string ease, sf::Time duration, sf::Time curr, unsigned int line){
    try {
      animO_from = (from.empty()) ? sprite.getColor().a : std::stoi(from);
      animO_to = (to.empty()) ? 0 : std::stoi(to);
      if (animO_from<0 || animO_from>255 || animO_to<0 || animO_to>255 ) {std::cerr<<"! Line "<<line<<" : Option Error (The value for options /from or /to must be a number between 0 and 255!)\n"; return false;}
    } catch (const std::invalid_argument &e){ std::cerr<<"! Line "<<line<<" : Option Error (The value for options /from or /to must be valid numbers!)\n"; return false;
    } catch (...) { std::cerr<<"! Line "<<line<<" : Unknown Error (This may came from the option /from or /to)\n"; return false; }
    animO_ease = ease;
    animO_duration = duration;
    animO_init = curr;
    animO = true;
    return true;
  }

  bool Character::animateSprite(sf::Sprite from, sf::Sprite to, sf::Time time, sf::Time curr){
    animS_duration = time;
    animS_init = curr;
    animS = true;
    oldSprite = from;
    sprite = to;
    return true;
  }

  bool Character::update(sf::RenderWindow& scr, sf::Time curr){
  //animations
    if (animX){
      if (curr > animX_init + animX_duration){
        animX = false;
        x = animX_to;
      } else {
        const int time = sf::Time(curr - animX_init).asMilliseconds(),
          duration = animX_duration.asMilliseconds();
        x = returnEase(animX_ease, time, animX_from, animX_to - animX_from, duration);
      }
      sprite.setPosition(x,y);
    }
    if (animO){
      if (curr > animO_init + animO_duration){
        animO = false;
        sprite.setColor(sf::Color(spriteColor.r,spriteColor.g,spriteColor.b,animO_to));
      } else {
        const int time = sf::Time(curr - animO_init).asMilliseconds(),
          duration = animO_duration.asMilliseconds(),
          alpha = returnEase(animS_ease, time, animO_from, animO_to - animO_from, duration);
        sprite.setColor(sf::Color(spriteColor.r,spriteColor.g,spriteColor.b, alpha ));
      }
    }
    if (animS){
      if (curr > animS_init + animS_duration){
        animS = false;
        sprite.setColor(spriteColor);
        y = scrh - sprite.getTextureRect().height;
      } else {
        const int time = sf::Time(curr - animS_init).asMilliseconds(),
          duration = animS_duration.asMilliseconds();
        oldSprite.setColor(sf::Color(spriteColor.r,spriteColor.g,spriteColor.b, easeLinear(time, 255, -255, duration) ));
        sprite.setColor(sf::Color(spriteColor.r,spriteColor.g,spriteColor.b, easeLinear(time, 0, 255, duration) ));
        scr.draw(oldSprite);
      }
      oldSprite.setPosition(x, scrh - oldSprite.getTextureRect().height);
      sprite.setPosition(x, scrh - sprite.getTextureRect().height);
    }
  //draw
    scr.draw(sprite);
    return true;
  }
