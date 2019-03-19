#include "script.h"

//INIT
  Script::Script(std::string file){
    //regex helpers
    rgQuote = "[\"|']";
    rgSpacestar = "[[:space:]]*";
    rgVarNames = rgSpacestar+ "([$_\\.[:alnum:]]+)" +rgSpacestar;

    loadfile = file;
    playing = true;
    waiting = displaying = false;
    arrowIter = iread = substrPos = 0;
    textSpeed = 1;
    if (!fontDeja.loadFromFile("resources/fonts/DejaVuSans.ttf"))
      std::cerr<<"INTERNAL ERROR : Can't load default font [resources/fonts/DejaVuSans.ttf] !!";
    if (!fontURW.loadFromFile("resources/fonts/URW"))
      std::cerr<<"INTERNAL ERROR : Can't load default font [resources/fonts/URW] !!";
    if (!arrowTxt.loadFromFile("resources/img/arrow.png"))
      std::cerr<<"INTERNAL ERROR : Can't load the image [resources/img/arrow.png] !!";
    else arrow.setTexture(arrowTxt);
    if (!barTxt.loadFromFile("resources/img/textbox.png"))
      std::cerr<<"INTERNAL ERROR : Can't load the image [resources/img/textbox.png] !!";
    else bar.setTexture(barTxt);

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
          if (!blank(str)) std::cerr<<"! Line "<<i<<": Syntax Error (no arguments given or invalid command)\n";
        }
        i++;
      }
      return true;
    } else {
      std::cerr<<"! : File Error (unable to open/read the file) !\n";
    }
    return false;
  }

  bool Script::read(sf::RenderWindow &scr){
    winSize = scr.getSize();
    barPosY = winSize.y - 185;
    bar.setPosition(0,barPosY);

    while (iread<scriptInstructions.size() && playing){
      //std::cout<<scriptInstructions[iread][2]<<" : "<<scriptInstructions[iread][0]<<"("<<scriptInstructions[iread][1]<<")\n";
      std::string command = str_tolower(scriptInstructions[iread][0]), arguments = replaceVars(scriptInstructions[iread][1]);
      unsigned int line = std::stoul(scriptInstructions[iread][2]);

      if (command == "goto")  cmdGoto(arguments,line);
      else if (command == "set")  cmdSet(arguments, line);
      else if (command == "entity") cmdEntity(arguments, line);
      else if (command == "music")  cmdMusic(arguments, line);
      else if (command == "wait") cmdWait(arguments, line);
      else if (command == "animate") cmdAnimate(arguments, line);
      else if (command == "say")  displaying = cmdSay(arguments, line);
      else if (command == "$ay")  displaying = cmdSay(arguments, line, true);
      else if (command == "echo") cmdEcho(arguments);
      else if (command == "end") playing = false;
      else 
        std::cerr << "! Line "<<line<<" : Unknown command : ["<<command<<"]\n";
      iread++;
      while (displaying && playing) { //Main loop
        sf::Event event;
        sf::Time currentTime = clock.getElapsedTime();
        while (scr.pollEvent(event)) {
          if (event.type == sf::Event::Closed) playing = false;
          if (event.type == sf::Event::KeyPressed) {
            switch (event.key.code) {
              case sf::Keyboard::Escape :
                playing = false;
                break;
              case sf::Keyboard::Space :
                if (animatingTextFinished && !waiting) {
                  displaying = false;
                  arrowIter = 0;
                } else animatingTextFinished = true;
                break;
              default : break;
            }
          }
        }
        if (waiting && currentTime>=waitLimit ) displaying = waiting = false;
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
    std::regex setC( rgSpacestar + "/c" + suffix),
      setO( rgSpacestar + '<'+rgVarNames+'>' + suffix),
      setOC( rgSpacestar + "/c" + rgSpacestar+'<'+rgVarNames+'>' + suffix),
      set(  rgSpacestar + suffix);
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
    std::cout<<"> "<<arg<<"\n";
    return true;
  }

  bool Script::cmdSay(std::string arg, unsigned int line, bool noWait){
    std::vector<sf::String> retval = splitQuotes(arg, line);
    std::string character = split(arg,' ')[0]; //1st argument is the name of the characters
    if (! retval.empty() ){
        if (allCharacters.find(character) != allCharacters.end()) {
          titleColor = allCharacters[character].titleColor;
          actualCharacter = getValue(character+".name");
        } else actualCharacter = character;
        displaySay = retval;
        displayedTxt.clear();
        displayedTxt.resize(displaySay.size(),false);
        substrPos=true;
        animatingTextFinished=false;
      return !noWait;
    }
    std::cerr<< "! Line "<<line<<" : Syntax Error (Syntax expected : say variable \"line 1\" \"line2\" ... ).\n";
    return false;
  }

  bool Script::cmdMusic(std::string arg, unsigned int line){
    std::smatch match;
    std::regex syntax( rgVarNames + "(play|pause|stop)" + rgSpacestar + "(loop)?", std::regex::icase);
    if (std::regex_match(arg, match, syntax)){
      std::string cmd = str_tolower(match[2]);
      if (allMusics.find(match[1]) != allMusics.end()) {
        if (cmd=="play"){       allMusics[match[1]].play(); allMusics[match[1]].setLoop( str_tolower(match[2])=="loop" ); }
        else if (cmd=="pause")  allMusics[match[1]].pause();
        else if (cmd=="stop")   allMusics[match[1]].stop();
        return true;
      } else if (allSounds.find(match[1]) != allSounds.end()) {
        if (cmd=="play"){       allSounds[match[1]].play(); allSounds[match[1]].setLoop( str_tolower(match[2])=="loop" ); }
        else if (cmd=="pause")  allSounds[match[1]].pause();
        else if (cmd=="stop")   allSounds[match[1]].stop();
        return true;
      } else { std::cerr<<"! Line "<<line<<" : Var Error (The variable ["<<match[1]<<"] is not a valid music entity"; return false; }
    } std::cerr<< "! Line "<<line<<" : Syntax Error (Syntax expected : music variable {play|stop|pause}).\n"; return false;
  }

  bool Script::cmdWait(std::string arg, unsigned int line){
    std::smatch match;
    if (arg=="pause") displaying = true;
    else if ( std::regex_search(arg, match, std::regex("([[:digit:]]+)")) ){ //yeah, i know it isn't optimized but I haven't an Internet connection yet...
      waiting = displaying = true;
      waitLimit = clock.getElapsedTime() + sf::milliseconds( std::stoul(match[1]) );
    } else std::cerr<< "! Line "<<line<<" : Syntax Error (Syntax expected : Wait {n milliseconds|pause}).\n"; return false;
    return true;
  }
//
  bool Script::cmdAnimate(std::string arg, unsigned int line){
    std::regex syntax(rgSpacestar+'<'+rgVarNames+'>'+rgVarNames+"(.+)");
    std::smatch match;
    if (std::regex_match(arg, match, syntax)){
    // Parse options
      std::string object( str_tolower(match[1]) ), entity(match[2]), lastCmd, from, to, ease, time;
      for ( auto elem: split(match[3], ' ') ) {
        if (elem.front()=='/')
          lastCmd = str_tolower(elem.substr(1));
        else {
          if      (lastCmd == "from") from.append(elem);
          else if (lastCmd == "to")   to.append(elem);
          else if (lastCmd == "ease") ease.append(elem);
          else if (lastCmd == "time") time.append(elem);
          else { std::cerr<<"! Line "<<line<<" : Argument Error (Unknown option ["<<lastCmd<<"])\n"; return false; }
        }
      }
    //treat default options
      sf::Time timeVal;
      if (! checkEase(ease)) ease = "none";
      try { timeVal = sf::milliseconds( std::stoi(time) ); }
        catch (const std::invalid_argument &e) {std::cerr<<"! Line "<<line<<" : Option Error (The value of /time must be a positive number)\n"; return false;}
        catch (const std::out_of_range &e) {std::cerr<<"! Line "<<line<<" : Option Error (The value of /time must be a positive number)\n"; return false;}

    // Execute
      if (allCharacters.find(entity) !=  allCharacters.end()){ //for character entities
        if (object == "position"){
          allCharacters[entity].animatePos(from, to, ease, timeVal, clock.getElapsedTime(), line);
        } else if (object == "spritechange"){
          if (allSprites.find(to) !=  allSprites.end()){
            sf::Sprite fromVal = (allSprites.find(from) !=  allSprites.end()) ? allSprites[from] : allCharacters[entity].sprite,
              toVal = allSprites[to];
            allCharacters[entity].animateSprite(fromVal, toVal, ease, timeVal, clock.getElapsedTime());
          } else {std::cerr<<"! Line "<<line<<" : Var Error ( ["<<entity<<"] is not a valid sprite entity.)\n"; return false; }
        } else {std::cerr<<"! Line "<<line<<" : Var Error ( Unknown object ["<<entity<<"]. The entity 'character' works only with the object position or spriteChange )\n"; return false; }
      } else { std::cerr<<"! Line "<<line<<" : Var Error (This command works only with the entity 'Character', and ["<<entity<<"] is not a valid entity.)\n"; return false; }
    } else std::cerr<< "! Line "<<line<<" : Syntax Error (Syntax expected : animate <object> variable /options values).\n";
    return false;
  }
//---------------HELPERS
  bool Script::assign(std::string var, std::string value, std::string object){
    //SPECIAL VALUES (that need to be treated)
    if (object != ""){
      if (object == "image" && (var == "__scene__" || getValue(var+".type")=="character")) {
        if (allSprites.find(value) ==  allSprites.end() )
          {std::cerr<<"! Declaring the object [Image] for the variable ["<<var<<"] : Var Error (The variable ["<<value<<"] hasn't been defined, or isn't an image entity !)\n"; return false;}
        else if (getValue(var+".type")=="character")//assumes that allCharacters[var] is defined. Else => value is valid.
          allCharacters[var].sprite = allSprites[value];
      } else if (object == "color" && (getValue(var+".type")=="character")) {
        if (allCharacters.find(var) ==  allCharacters.end() )
          {std::cerr<<"! Declaring the object [Image] for the variable ["<<var<<"] : Var Error (The variable ["<<var<<"] hasn't been defined, or isn't a character entity !)\n"; return false;}
        else
          allCharacters[var].titleColor = hex2color(value);
      }
      var += '.'+object; // but do the most important stuff
    } 
    //ASSIGN
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
    sf::Music& music = allMusics[name]; // Construct the element directly to the map and return it
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
    sf::SoundBuffer& soundBuff=buffer[name]; //same technique...
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
    assign(name,name,"name");
    allCharacters[name] = Character(winSize.y);
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
      v.second.update(scr, clock.getElapsedTime());
    return true;
  }

  bool Script::drawText(sf::RenderWindow& scr){
    //draw the title
      sf::Text titleTxt(actualCharacter,fontURW,24);
      titleTxt.setFillColor(titleColor);
      titleTxt.setPosition(265,barPosY+5);
      scr.draw(titleTxt);

    sf::Text tempTxt("",fontDeja,27); tempTxt.setFillColor(txtColor);
      for (unsigned int i=0; i<displaySay.size();i++){ //fetch all lines
        tempTxt.setPosition(270,barPosY+41+29*i);
        if (!displayedTxt[i] && !animatingTextFinished){
          sf::String text=displaySay[i];
          tempTxt.setString(text.substring(0,substrPos));
          scr.draw(tempTxt);
          if (substrPos>=text.getSize()){
            displayedTxt[i]=true;
            substrPos=0;
          } else if (txtSpeedIter>=textSpeed){
            substrPos++;
            txtSpeedIter=0;
          } else txtSpeedIter++;
          break;
        } else {
          tempTxt.setString(displaySay[i]);
          scr.draw(tempTxt);
          if (i+1>=displaySay.size())
            animatingTextFinished=true;
        }
      }
    if (animatingTextFinished && !waiting){
      arrowIter += 0.1;
      int change = -5*( std::sin(0.6*arrowIter) + std::cos(1.2*arrowIter) );
        arrow.setPosition(winSize.x+change-250,winSize.y-50);
      if      (arrowIter==0.1) arrow.setColor(sf::Color(255,255,255,0)); //initial
      else if (arrowIter<2.5)  arrow.setColor(sf::Color(255,255,255,arrowIter*100+5)); //before the 25 iterations
      scr.draw(arrow);
    }
    return true;
  }
//-------------Simple helpers
  template<size_t sz> bool in_array(const std::string &value, std::array<std::string, sz> array){
    return std::find(array.begin(), array.end(), value) != array.end();
  }


  sf::Color hex2color(std::string arg){

    std::smatch match;
    std::regex color_regex("#([a-fA-F0-9]{2}[a-fA-F0-9]{2}[a-fA-F0-9]{2})([a-fA-F0-9]{2})?");

    if (std::regex_search(arg, match, color_regex)){
      std::string hex = match[1];
      if (match[2]=="") hex += "ff";
      else hex += match[2];
      int r, g, b, a;
      sscanf(hex.c_str(), "%02x%02x%02x%02x", &r, &g, &b, &a);
      if (r+g+b+a <= 4*255 && r+g+b+a >= 0)
        return sf::Color(r,g,b,a);
    }
    std::cerr<<"! Parse error (The color ["<<arg<<"] is not a valid hexadecimal color code)\n";
    return sf::Color::Black;
  }