#include "script.h"


/*
    issues : (solution)
    negative numbers: ((0-1)*x)
        in = 25*-10
        out = 10
    limited to a number that have more than 30 numbers (x*10^n)
        in : 11111111111111111111111111111111111111111111111111111111111111111111
        *** stack smashing detected ***: <unknown> terminated
        /home/logan/programmation/cpp/parser/run.sh : ligne 8 :  2520 Abandon                 (core dumped) ./a.out
*/

// http://teknicalprog.blogspot.com/2014/10/c-program-to-evaluate-infix-expression.html


Script::Script(std::string file){

    //regex helpers
      rgQuote = "[\"|']";
      rgSpacestar = "[[:space:]]*";
      rgVarNames = rgSpacestar+ "([_[:alnum:]]+)" +rgSpacestar;

    loadfile = file;
    init();

}

bool Script::init() {
  int i(1);
  //bool limitation=false;
  std::string str;
  std::regex command( rgVarNames+"[[:space:]]+(.+)"), tag( rgSpacestar + ":(.+)");
  std::smatch match;

  std::ifstream file(loadfile.c_str());
  if (file) {
    while (std::getline(file,str)) {
        str = replaceVars(str);
        if (std::regex_match(str, match, command)){ //this is a command
            //std::string results[2] = {match[1], match[2]};
            //scriptInstructions.push_back(results);
            scriptInstructions.push_back(str);
        } else if (std::regex_match(str, match, tag)) { //this is a tag
            std::string tagContent = match[1];
            if (tagContent[1] != ':') labelRefs[tagContent] = scriptInstructions.size();//not a comment
        } //else std::cerr<<"! Line "<<i<<" : Syntax Error (not a command/tag)\n";
      i++;
    }
    return true;
  } else {
    std::cout<<"\n! File Error : (unable to open/read the file) !";
  }
  return false;
}

bool Script::read(sf::RenderWindow &scr){
    std::cout<<"lel\n";
    return 0;
}

//---------------Commands
    std::string Script::cmdSet(std::string str){
        std::smatch match;
        std::string prefix = rgSpacestar + "set" + rgSpacestar;
        std::string suffix = rgVarNames+ "=" +rgSpacestar+ "(.+)";
        std::regex setC( prefix + "/c" + suffix);
        std::regex setO( prefix + '<'+rgVarNames+'>' + suffix);
        std::regex setOC( prefix + "/c" + rgSpacestar+'<'+rgVarNames+'>' + suffix);
        std::regex set(  prefix + suffix);
        if (std::regex_match(str, match, setOC))     assign(match[1],calc(match[3]),match[2]);  
        else if (std::regex_match(str, match, setC)) assign(match[1],calc(match[2]));
        else if (std::regex_match(str, match, setO)) assign(match[1],match[3],match[2]);
        else if (std::regex_match(str, match, set))  assign(match[1],match[2]);
        else
            std::cerr<<"Syntax Error (Syntax expected set (/c) (<object>) variable = value).\n";
        return str;
    }

    std::string Script::cmdEntity(std::string str){
        std::smatch match;
        std::regex entity(  rgSpacestar + "entity" + rgSpacestar + '<' +rgVarNames + '>' + rgVarNames + rgSpacestar + "=" +rgSpacestar + rgQuote + "(.+)"+ rgQuote);

        if (std::regex_match(str, match, entity))
            std::cout<<"Commande entity. Déclarer "<<match[2]<<" en tant que "<<match[1]<<" avec valeur "<<match[3]<<"\n";
        else
            std::cerr<<"Syntax Error (Syntax expected: entity <type> variable = \"value\").\n";
        return str;
    }

    bool Script::cmdEcho(std::string str){
        std::cout<<">"<<str<<"\n";
        return true;
    }



//---------------HELPERS
    std::string Script::removeSpaces(std::string str) { //remove all spaces from a string
        std::string output;
        output.reserve(str.size()); // optional, avoids buffer reallocations in the loop
        for(size_t i(0); i < str.size(); ++i)
          if (!std::isspace(str[i])) output += str[i];
        return output;
    }

    std::string Script::calc(std::string input){
        std::string inf = removeSpaces(input);
        char post[30], temp[30];
        //temp limited to 30 numbers lenght.
        float oper[30],stack[30],so;
        int top=-1,y=0,op=0;

        for(size_t i(0); i < inf.size(); ++i) { //Reach all characters of the char*
            if(std::isdigit(inf[i])) { //if number
                post[y++]=inf[i];
                //wrap the entire number
                    int z;
                    for(z=i;inf[z]=='.' || (inf[z]<=57&&inf[z]>=48);z++)
                          temp[z-i]=inf[z];
                    temp[z-i]='\0'; 
                oper[op++]=std::atof(temp); //convert to sciencist expr. (x.xxe+x) and add to a stack
                i=z-1;
            } else {
                switch(inf[i]) {
                case '+':
                case '-':
                    while(top>=0&&stack[top]!='(')
                        post[y++]=stack[top--];
                    stack[++top]=inf[i];
                    break;
                case '*':
                case '/':
                    while(stack[top]!='+'&&stack[top]!='-'&&top>=0&&stack[top]!='(')
                        post[y++]=stack[top--];
                    stack[++top]=inf[i];
                    break;
                case '^':
                    stack[++top]=inf[i];
                    break;
                case '(':
                    stack[++top]=inf[i];
                    break;
                case ')':
                    while(stack[top]!='(')
                            post[y++]=stack[top--];
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
        for(int i=0;i<y;i++)
        {
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
        int i = result.size(); //cursor 1 char before EOL
        while (result[i-1] == '0') i--; //delete all 0
        if (result[i-1] == '.') i--; //if before cursor is a dot then delete it
        result.erase(i, result.size()); 

        return result;
    }

    bool Script::assign(std::string var, std::string value, std::string object){
        if (object != "") var += '.'+object;
        varValues[var] = value;
        return true;
    }

    std::string Script::getValue(std::string varName){
        if (varValues.find(varName) !=  varValues.end() )
            return varValues[varName];
        else return "";
    }

    std::string Script::strReplace(std::string& s, const std::string& toReplace, const std::string& replaceWith) {
        std::size_t pos = s.find(toReplace);
        if (pos == std::string::npos) return s;
        return s.replace(pos, toReplace.length(), replaceWith);
    }

    std::string Script::replaceVars(std::string str){
        std::string newStr=str;
        std::regex regexVar("%([_[:alnum:]]+)%");
        auto words_begin = std::sregex_iterator(str.begin(), str.end(), regexVar);
        for (std::sregex_iterator i = words_begin; i != std::sregex_iterator(); ++i) {
            std::smatch match = *i;
            std::string strInitial = match.str(), strReplaced = getValue( strInitial.substr(1, strInitial.size()-2) );
            if (strReplaced != "") strReplace(newStr, strInitial, strReplaced);
        }
        return newStr;
    }