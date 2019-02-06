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


Script::Script(){

    //regex helpers
      rgQuote = "[\"|']";
      rgSpacestar = "[[:space:]]*";
      rgVarNames = "([_[:alnum:]]+)";

}



//---------------Commands
std::string Script::cmdSet(std::string str){
    std::smatch match;
    std::regex setC(  rgSpacestar + "set" + rgSpacestar + "/c" + rgSpacestar // .set./c.
                     +rgVarNames+rgSpacestar+ "=" +rgSpacestar+ "(.+)"); // xx.=.****.
    std::regex set(  rgSpacestar+ "set" +rgSpacestar+rgVarNames+rgSpacestar+ "=" +rgSpacestar+ "(.+)"); // set.xx.=.****.
    
    if (std::regex_match(str, match, setC)){
        std::cout<<"Commande Set /C. Assigner à "<<match[1]<<" la valeur "<<calc(match[2])<<"\n";
    } else if (std::regex_match(str, match, set)){ 
        std::cout<<"\nCommande Set. Assigner à "<<match[1]<<" la valeur "<<match[2]<<"\n";
    } else {
        std::cerr<<"Syntax Error (Syntax expected set (/c) variable = value).\n";
    }
    return str;
}

std::string Script::cmdEntity(std::string str){
    std::smatch match;
    std::regex entity(  rgSpacestar + "entity" // ....entity
                        + rgSpacestar + '<' + rgSpacestar +rgVarNames+ rgSpacestar + '>' + rgSpacestar // .<.xxx.>.
                        + rgVarNames + rgSpacestar + "=" +rgSpacestar + rgQuote + "(.+)"+ rgQuote // xx.=.".****."
                        );

    if (std::regex_match(str, match, entity)){
        std::cout<<"Commande entity. Déclarer "<<match[2]<<" en tant que "<<match[1]<<" avec valeur "<<match[3]<<"\n";
    /*} else if (std::regex_match(str, match, command)){ 
        std::cout<<"Commande Set. Assigner à "<<match[1]<<" la valeur "<<match[2]<<"\n";
     */
    } else {
        std::cerr<<"Syntax Error (Syntax expected: entity <type> variable = \"value\").\n";
    }
    return str;
}


bool Script::regexTest(std::string str){

    std::regex command( rgSpacestar +'('+rgVarNames+")[[:space:]]+.+");
    std::regex tag( rgSpacestar + ":(.+)");
    std::smatch match;

    if (std::regex_match(str, match, command)){ //this is a command
        std::cout << "commande entrée: " << match[1] << '\n';

        if (match[1]=="set") cmdSet(str);
        else if (match[1]=="entity") cmdEntity(str);
        else {
            std::cout<<"Commande inconnue !\n";
        }

    } else if (std::regex_match(str, match, tag)) { //this is a tag

        std::cout << "tag: " << match[1] << '\n';

    } else {
        std::cerr<<"Syntax Error (not a command) !\n";
    }

    /*
    bool retval = std::regex_match(str, entity);
    if (!retval) retval = std::regex_match(str, setC);*/
    bool retval = true;
    return retval;
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
                for(z=i;inf[z]<=57&&inf[z]>=48||inf[z]=='.';z++)
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