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
  //let's "tokenize" the script
  init();

}

bool Script::init() {
  //the syntax of the script engine is similar to batch
    
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
  while (iread<scriptInstructions.size() && playing){

    //std::cout<<scriptInstructions[iread][2]<<" : "<<scriptInstructions[iread][0]<<"("<<scriptInstructions[iread][1]<<")\n";

    std::string command = str_tolower(scriptInstructions[iread][0]), arguments = replaceVars(scriptInstructions[iread][1]);
    unsigned int line = std::stoul(scriptInstructions[iread][2]);

    if (command == "goto") cmdGoto(arguments,line);
    else if (command == "set") cmdSet(arguments, line);
    else if (command == "entity") cmdEntity(arguments, line);
    else if (command == "echo") cmdEcho(arguments);
    else if (command == "wait") displaying = true;
    else {
      std::cerr << "! Line "<<line<<" : Unknown command : ["<<command<<"]\n";
    }

    iread++;

    while (displaying) { //Main loop
      sf::Event event;
      while (scr.pollEvent(event)) {
          if (event.type == sf::Event::Closed) scr.close();

          if (event.type == sf::Event::KeyPressed) {
              switch (event.key.code) {
              // If escape is pressed, close the application
              case  sf::Keyboard::Escape : scr.close(); break;
              case  sf::Keyboard::Space : displaying = false; break;

              /*/ Process the up, down, left and right keys to modify parameters
              case sf::Keyboard::Up :     distortionFactor *= 2.f;    break;
              case sf::Keyboard::Down:    distortionFactor /= 2.f;    break;
              case sf::Keyboard::Left:    riseFactor *= 2.f;          break;
              case sf::Keyboard::Right:   riseFactor /= 2.f;          break;*/
              default : break;
              }
          }
      }
      scr.clear();
      drawBackground(scr);
      drawCharacters(scr);
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



//---------------HELPERS

  std::string Script::calc(std::string input){
    /*
      Calc function : return the calculus entered. Support operative priorities.
      Edited from http://teknicalprog.blogspot.com/2014/10/c-program-to-evaluate-infix-expression.html
        issues : (solution)
        negative numbers: ((0-1)*x)
            in = 25*-10
            out = 10
        limited to a number that have more than 30 numbers (x*10^n)
            in : 11111111111111111111111111111111111111111111111111111111111111111111
            *** stack smashing detected ***: <unknown> terminated
            /home/logan/programmation/cpp/parser/run.sh : ligne 8 :  2520 Abandon                 (core dumped) ./a.out
    */


    std::string inf = removeSpaces(input);
    char post[30], temp[30];
    //temp limited to 30 numbers lenght...
    float oper[30],stack[30],so;
    int top=-1,y=0,op=0;

    for(size_t i(0); i < inf.size(); ++i) { //Reach all characters of the char*
      if(std::isdigit(inf[i])) { //if number
        post[y++]=inf[i];
        //wrap the entire number
          int z;
          for(z=i;inf[z]=='.' || (inf[z]<=57&&inf[z]>=48);z++) temp[z-i]=inf[z];
          temp[z-i]='\0'; 
        oper[op++]=std::atof(temp); //convert to sciencist expr. (x.xxe+x) and add to a stack
        i=z-1;
      } else {
        switch(inf[i]) {
          case '+': case '-':
            while(top>=0&&stack[top]!='(') post[y++]=stack[top--];
            stack[++top]=inf[i];
            break;
          case '*': case '/':
            while(stack[top]!='+'&&stack[top]!='-'&&top>=0&&stack[top]!='(') post[y++]=stack[top--];
            stack[++top]=inf[i];
            break;
          case '^':case '(':
            stack[++top]=inf[i];
            break;
          case ')':
            while(stack[top]!='(') post[y++]=stack[top--];
            top--;
            break;
          default :
          std::cerr<<"Parsing the expression '"<<inf<< "' illegal char '"<<inf[i]<<"' !! Aborting.\n";
          return input;
        }
      }
    }
    while(top>=0)
      post[y++]=stack[top--];

    //solve
    op=0;
    for(int i=0;i<y;i++) {
      if(post[i]>=48&&post[i]<=57)
        stack[++top]=oper[op++];
      else {
        switch(post[i]) {
          case '+':
          so=stack[top]+stack[top-1];
          stack[--top]=so;
          break;
          case '-':
          so=stack[top-1]-stack[top];
          stack[--top]=so;
          break;
          case '*':
          so=stack[top-1]*stack[top];
          stack[--top]=so;
          break;
          case '/':
          so=stack[top-1]/stack[top];
          stack[--top]=so;
          break;
          case '^':
          so=powf(stack[top-1],stack[top]);
          stack[--top]=so;
          break;
          default :
          std::cerr<<"Parsing the expression '"<<post<< "' illegal char '"<<post[i]<<"' !! Aborting.\n";
          return input;
        }
      }
    }
    std::string result = std::to_string(stack[0]); //convert to str
    // the result is always a float number not simplified :
    int i = result.size(); //cursor 1 char before EOL
    while (result[i-1] == '0') i--; //delete all 0
    if (result[i-1] == '.') i--; //if before cursor is a dot then delete it
    result.erase(i, result.size()); 

    return result;
  }

  bool Script::assign(std::string var, std::string value, std::string object){
    if (object != ""){
      if (object == "image" && (var == "__scene__" || getValue(var+".type")=="character")){
        //if we change the image object of an entity character/background, check if the image has been declared and valid (and do nothing) else abort and display an error
        if (allSprites.find(value) ==  allSprites.end() ){
          std::cerr<<"! Declaring the object [Image] for the variable ["<<var<<"] : Var Error (The variable ["<<value<<"] hasn't been defined, or isn't an image entity !)\n";
          return false;
        }
      }
      // but do the most important stuff :
      var += '.'+object;
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
    } else {
      allTextures.insert_or_assign( name,texture );
      sf::Sprite sprite(allTextures[name]);
      allSprites.insert_or_assign( name,sprite );
      assign(name, path); // assign a simple variable
      assign(name, "image", "type");
      return true;
    }
    return false;
  }

  bool Script::newMusic(std::string name, std::string path, unsigned int line){
    sf::Music& music = allMusics[name]; // construit l'élément directement dans la map et le retourne
    if (!music.openFromFile(path))
      std::cerr<<"! Line "<<line<<" : File Error (unable to load file ["<<path<<"])\n";
    else {
      assign(name, path);
      assign(name, "music", "type");
      return true;
    }
    return false;
  }

  bool Script::newSound(std::string name, std::string path, unsigned int line){
    sf::SoundBuffer& soundBuff=buffer[name]; //même technique...
    sf::Sound& sound=allSounds[name];

    if (!soundBuff.loadFromFile(path))
      std::cerr<<"! Line "<<line<<" : File Error (unable to load file ["<<path<<"])\n";
    else {
      sound.setBuffer(buffer[name]);
      assign(name, path);
      assign(name, "sound", "type");
      return true;
    }
    return false;
  }

  bool Script::newCharacter(std::string name, std::string spriteName, unsigned int line) {
    assign(name,"undef");
    assign(name,"character","type");
    allCharacters.push_back(name);

    if (spriteName !="") assign(name, spriteName, "image");
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
    for (auto& elem : allCharacters) {
      const std::string spriteRef( getValue(elem+".image") );
      if (allSprites.find(spriteRef) !=  allSprites.end() )
        scr.draw(allSprites[spriteRef]);
    }
    return true;
  }
//-------------character class /* but not useful yet */

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

  bool blank(std::string str){
    for (int i(0);str[i];i++) if (!isspace(str[i])) return false;
    return true;
  }

  template<size_t sz> bool in_array(const std::string &value, std::array<std::string, sz> array){
    return std::find(array.begin(), array.end(), value) != array.end();
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


/* bouts de code

for(ta_map::const_iterator it=ta_map.begin() ; it!=ta_map.end() ; ++it) {
    it->first; // accede à la clé
    if->second; // accede à la valeur
}
*/