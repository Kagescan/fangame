#include "script.h"

Script::Script(std::string file){
  //regex helpers
  rgQuote = "[\"|']";
  rgSpacestar = "[[:space:]]*";
  rgVarNames = rgSpacestar+ "([_\\.[:alnum:]]+)" +rgSpacestar;

  loadfile = file;
  playing = true;
  waiting = false;
  displaying = false;
  iread = 0;
  actualCharacter = "???";
  substrPos = 0;
  arrowIter = 0;
  textSpeed = 1;
  if (!fontDeja.loadFromFile("resources/fonts/DejaVuSans.ttf"))
    std::cerr<<"INTERNAL ERROR : Can't load default font [resources/fonts/DejaVuSans.ttf] !!";
  if (!fontURW.loadFromFile("resources/fonts/URW"))
    std::cerr<<"INTERNAL ERROR : Can't load default font [resources/fonts/URW] !!";
  if (!arrowTxt.loadFromFile("resources/img/arrow.png"))
    std::cerr<<"INTERNAL ERROR : Can't load the image [resources/img/arrow.png] !!";
  else arrow.setTexture(arrowTxt);

  //let's "tokenize" the script
  init();

}

bool Script::init() {
  //This will read and parse commands/arguments from the script file. The syntax of the script engine is similar to batch
    
  int i(1);
  //bool limitation=false;
  std::string str;
  std::regex command( rgVarNames+"[[:space:]]+(.+)"), tag( rgSpacestar + ":"+ rgSpacestar +"(.+)");
  std::smatch match;

  std::ifstream file(loadfile.c_str());
  if (file) {
    while (std::getline(file,str)) { //read line by line
      str = replaceVars(str); // replace variables (%var%) by its value if available.
      if (std::regex_match(str, match, command)) { //this is a command
        std::array<std::string,3> results = {match[1], match[2], std::to_string(i)}; //command, arg, line N°
        scriptInstructions.push_back(results); //store the command
      } else if (std::regex_match(str, match, tag)) { //this is a tag
        std::string tagContent = match[1];
        if (tagContent[1] != ':') labelRefs[tagContent] = scriptInstructions.size()-1; //store if not a comment
      } else {
        if (!blank(str)) std::cout<<"! Line "<<i<<": Syntax Error (no arguments given or invalid command)\n";
      }
      i++;
    }
    return true;
  } else {
    std::cout<<"! : File Error (unable to open/read the file) !\n";
  }
  return false;
}

bool Script::read(sf::RenderWindow &scr){
  winSize = scr.getSize();
  barPosY = winSize.y - 300;
  bar.setPosition(0,barPosY);
  bar.setSize(sf::Vector2f(winSize.x,barPosY));
  bar.setFillColor(sf::Color(255,255,255,200));

  while (iread<scriptInstructions.size() && playing){
    //std::cout<<scriptInstructions[iread][2]<<" : "<<scriptInstructions[iread][0]<<"("<<scriptInstructions[iread][1]<<")\n";
    std::string command = str_tolower(scriptInstructions[iread][0]), arguments = replaceVars(scriptInstructions[iread][1]);
    unsigned int line = std::stoul(scriptInstructions[iread][2]);

    if (command == "goto") cmdGoto(arguments,line);
    else if (command == "set") cmdSet(arguments, line);
    else if (command == "entity") cmdEntity(arguments, line);
    else if (command == "say") displaying = cmdSay(arguments, line);
    else if (command == "echo") cmdEcho(arguments);
    else if (command == "wait") displaying = true;
    else 
      std::cerr << "! Line "<<line<<" : Unknown command : ["<<command<<"]\n";
    iread++;
    while (displaying && playing) { //Main loop
      sf::Event event;
      while (scr.pollEvent(event)) {
        if (event.type == sf::Event::Closed)
          playing = false;
        if (event.type == sf::Event::KeyPressed) {
          switch (event.key.code) {
            case sf::Keyboard::Escape :
              playing = false;
              break;
            case sf::Keyboard::Space :
              if (animatingTextFinished) {
                displaying = false;
                arrowIter = 0;
              } else
                animatingTextFinished = true;
              break;
            default : break;
          }
        }
      }
      scr.clear();
      drawBackground(scr);
      drawCharacters(scr);
      scr.draw(bar);
      drawText(scr);
      scr.display();
    }
  }
  return 0;
}

//---------------Commands
  bool Script::cmdGoto(std::string arg, unsigned int line){
    if (labelRefs.find(arg) !=  labelRefs.end() ){
      iread = labelRefs[arg];
      return true;
    } else {
      std::cerr << "! Line "<<line<<" : Undefined label "<<arg<<"\n";
      return false;
    }
  }

  bool Script::cmdSet(std::string arg, unsigned int line){
    std::smatch match;
    std::string suffix = rgVarNames+ "=" +rgSpacestar+ "(.+)";
    std::regex setC( rgSpacestar + "/c" + suffix);
    std::regex setO( rgSpacestar + '<'+rgVarNames+'>' + suffix);
    std::regex setOC( rgSpacestar + "/c" + rgSpacestar+'<'+rgVarNames+'>' + suffix);
    std::regex set(  rgSpacestar + suffix);
    if (std::regex_match(arg, match, setOC))     assign(match[2],calc(match[3]),match[1]);  
    else if (std::regex_match(arg, match, setC)) assign(match[1],calc(match[2]));
    else if (std::regex_match(arg, match, setO)) assign(match[2],match[3],match[1]);
    else if (std::regex_match(arg, match, set))  assign(match[1],match[2]);
    else{
      std::cerr<< "! Line "<<line<<" : Syntax Error (Syntax expected : set (/c) (<object>) variable = value).\n";
      return false;
    }
    return true;
  }

  bool Script::cmdEntity(std::string arg, unsigned int line){
    std::smatch match;
    std::regex entity( rgSpacestar + '<' +rgVarNames + '>' + rgVarNames);
    std::regex entityValues( rgSpacestar + '<' +rgVarNames + '>' + rgVarNames + rgSpacestar + "=" +rgSpacestar + rgQuote + "(.+)"+ rgQuote);

    if (std::regex_match(arg, match, entity)){
      std::string entityType = str_tolower(match[1]);
      std::array<std::string, 3> availableTypes= {"image","music","sound"};
      if (entityType=="character")
        newCharacter(match[2],"",line);
      else if (in_array(entityType,availableTypes)){ //do something for nothing
        assign(match[2], "undef");
        assign(match[2], entityType, "type");
      }
      else
        std::cerr<< "! Line "<<line<<" : Syntax Error (Unknown entity type ["<<entityType<<"]).\n";
    } else if (std::regex_match(arg, match, entityValues)){
      std::string entityType = str_tolower(match[1]);

      if (entityType == "character") 
        newCharacter(match[2], match[3], line);
      else if (entityType == "image")
        newSprite(match[2], match[3], line);
      else if (entityType == "music")
        newMusic(match[2], match[3], line);
      else if (entityType == "sound")
        newSound(match[2], match[3], line);
    } else {
      std::cerr<< "! Line "<<line<<" : Syntax Error (Syntax expected: entity <type> variable (= \"value\") ).\n";
      return false;
    }
    return true;
  }

  bool Script::cmdEcho(std::string arg){
    std::cout<<">"<<arg<<"\n";
    return true;
  }

  bool Script::cmdSay(std::string arg, unsigned int line){
    std::vector<sf::String> retval = splitQuotes(arg, line);
  std::string character = split(arg,' ')[0]; //1st argument is the name of the characters
    if (! retval.empty() ){
        actualCharacter = character;
        displaySay = retval;
        displayedTxt.clear();
        displayedTxt.resize(displaySay.size(),false);
        substrPos=true;
        animatingTextFinished=false;
    } else {
      std::cerr<< "! Line "<<line<<" : Syntax Error (Syntax expected : say variable \"line 1\" \"line2\" ... ).\n";
      return false;
    }
    return true;
  }

//---------------HELPERS

  bool Script::assign(std::string var, std::string value, std::string object){
    if (object != ""){
      if (object == "image" && (var == "__scene__" || getValue(var+".type")=="character")){
        //if we change the image object of an entity character/background, check if the image has been declared and valid (and do nothing) else abort and display an error
        if (allSprites.find(value) ==  allSprites.end() ){
          std::cerr<<"! Declaring the object [Image] for the variable ["<<var<<"] : Var Error (The variable ["<<value<<"] hasn't been defined, or isn't an image entity !)\n"; return false;
        } else if (getValue(var+".type")=="character") { //assumes that allCharacters[var] is defined. Else => value is valid.
          allCharacters[var].sprite = allSprites[value];
        }
      } else if (object == "color" && getValue(var+".type")=="character"){
        if (allCharacters.find(var) ==  allCharacters.end() ){
          std::cerr<<"! Declaring the object [Image] for the variable ["<<var<<"] : Var Error (The variable ["<<var<<"] hasn't been defined, or isn't a character entity !)\n"; return false;
        } else {
          allCharacters[var].color(str_tolower(value));
        }
      }
      var += '.'+object; // but do the most important stuff
    } 
    varValues[var] = value;
    return true;
  }

  std::string Script::getValue(std::string varName){
    if (varValues.find(varName) !=  varValues.end() )
      return varValues[varName];
    else return "";
  }

  std::string Script::replaceVars(std::string str){
    std::string newStr=str;
    std::regex regexVar("%([_\\.[:alnum:]]+)%");
    auto words_begin = std::sregex_iterator(str.begin(), str.end(), regexVar);
    for (std::sregex_iterator i = words_begin; i != std::sregex_iterator(); ++i) {
      std::smatch match = *i;
      std::string strInitial = match.str(), strReplaced = getValue( strInitial.substr(1, strInitial.size()-2) );
      if (strReplaced != "") strReplace(newStr, strInitial, strReplaced);
    }
    return newStr;
  }

  bool Script::newSprite(std::string name, std::string path, unsigned int line){
    sf::Texture texture;
    if ( !texture.loadFromFile(path) ) {
      std::cerr<<"! Line "<<line<<" : File Error (unable to load file ["<<path<<"])\n";
      return false;
    } else {
      allTextures.insert_or_assign( name,texture );
      sf::Sprite sprite(allTextures[name]);
      allSprites.insert_or_assign( name,sprite );
      assign(name, path); // assign a simple variable
      assign(name, "image", "type");
      return true;
    }
  }

  bool Script::newMusic(std::string name, std::string path, unsigned int line){
    sf::Music& music = allMusics[name]; // construit l'élément directement dans la map et le retourne
    if (!music.openFromFile(path)){
      std::cerr<<"! Line "<<line<<" : File Error (unable to load file ["<<path<<"])\n";
    return false;
    } else {
      assign(name, path);
      assign(name, "music", "type");
      return true;
    }
  }

  bool Script::newSound(std::string name, std::string path, unsigned int line){
    sf::SoundBuffer& soundBuff=buffer[name]; //même technique...
    sf::Sound& sound=allSounds[name];

    if (!soundBuff.loadFromFile(path)){
      std::cerr<<"! Line "<<line<<" : File Error (unable to load file ["<<path<<"])\n";
      return false;
    } else {
      sound.setBuffer(buffer[name]);
      assign(name, path);
      assign(name, "sound", "type");
      return true;
    }
  }

  bool Script::newCharacter(std::string name, std::string spriteName, unsigned int line) {
    assign(name,"undef");
    assign(name,"character","type");
    allCharacters[name] = Character();
    if (spriteName != "")
      assign(name, spriteName, "image");
    return true;
  }

  bool Script::drawBackground(sf::RenderWindow& scr){
    const std::string bgRef( getValue("__scene__.image") );
    if (allSprites.find(bgRef) !=  allSprites.end() ){ //if inside the map then it's a valid image
      scr.draw(allSprites[bgRef]);
      return true;
    } else return false;
  }

  bool Script::drawCharacters(sf::RenderWindow& scr){ //it isn't really optimized yet...
    for (auto& v: allCharacters)
      scr.draw(v.second.sprite);
    return true;
  }
//
  bool Script::drawText(sf::RenderWindow& scr){
    sf::Text tempTxt(actualCharacter,fontURW,24);
    tempTxt.setPosition(5,barPosY+5);
    //tempTxt.setStyle(sf::Text::Bold);
    if (allCharacters.find(actualCharacter) != allCharacters.end())
      tempTxt.setFillColor( allCharacters[actualCharacter].titleColor );
    scr.draw(tempTxt);
    //tempTxt.set
    tempTxt.setStyle(sf::Text::Regular);
    tempTxt.setCharacterSize(27);
    tempTxt.setFillColor(txtColor);
    tempTxt.setFont(fontDeja);
    for (unsigned int i=0; i<displaySay.size();i++){ //fetch all lines
      tempTxt.setPosition(10,barPosY+41+29*i);
      if (!displayedTxt[i] && !animatingTextFinished){
        sf::String text=displaySay[i], substr=text.substring(0,substrPos)+" |";
        tempTxt.setString(substr);
        scr.draw(tempTxt);
        if (txtSpeedIter>textSpeed){
          substrPos++;
          txtSpeedIter=0;
        }
        txtSpeedIter++;
        if (substrPos>=text.getSize()){
          displayedTxt[i]=true;
          substrPos=0;
        }
        break;
      } else {
        tempTxt.setString(displaySay[i]);
        scr.draw(tempTxt);
        if (i+1>=displaySay.size())
          animatingTextFinished=true;
      }
    }
    if (animatingTextFinished){
      arrowIter += 0.1;
      if      (arrowIter==0.1) arrow.setColor(sf::Color(255,255,255,0)); //initial
      else if (arrowIter<2.5)  arrow.setColor(sf::Color(255,255,255,arrowIter*100+5)); //before the 25 iterations
      int change = -5*( std::sin(0.6*arrowIter) + std::cos(1.2*arrowIter) );
      arrow.setPosition(winSize.x+change-50,winSize.y-50);
      scr.draw(arrow);
    }
    return true;
  }
//-------------character class /* but not useful yet */
  Character::Character(){
    titleColor = sf::Color(0,0,0);
  }
  std::string Character::color(std::string arg){

    std::smatch match;
    std::regex color_regex("#([a-f0-9]{2}[a-f0-9]{2}[a-f0-9]{2})");

    if (std::regex_match(arg, match, color_regex)){
      std::string hex = match[1];
      int r, g, b;
      sscanf(hex.c_str(), "%02x%02x%02x", &r, &g, &b);
      if (r+g+b < 3*255 && r+g+b >= 0){
        titleColor = sf::Color(r,g,b);
        return arg;
      }
    }
    std::cerr<<"! Character color delaration : Wrong argument. This should be a valid hexadecimal code !";
    return "";
  }
  /*
  Character(std::string charaName, sf::Color color){
    name = charaName;
    titleColor = color;
  }
  bool updatePos(int x, int y) {
    posx = x; poxy = y;
    return sprite.setPosition(x,y);
  }
  bool draw(sf::RenderWindow& scr) {return scr.draw(sprite);}
  void setSprite(sf::Sprite arg){sprite = arg;}
  void setTitleColor(sf::Color color) {titleColor = color;}
  void setName(std::string str) {name = str;}
  sf::Color getTitleColor() {return titleColor;}*/

//-------------Simple helpers

  template<size_t sz> bool in_array(const std::string &value, std::array<std::string, sz> array){
    return std::find(array.begin(), array.end(), value) != array.end();
  }