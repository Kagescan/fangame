/* CALC - Evaluate a math expression from a string.
 * Copyright (c) 2018, 2019 ShinProg
 * Under MIT license, more informations in the file LICENSE
 */

#ifndef CALC_H
#define CALC_H
#include <vector>
#include <cstring>
#include <cmath>
#include <limits>
#include <cassert>
#include <cstdarg>
#define   MAX_TOKEN_ID      1000

enum Errores {
  ERROR_SINTAXIS_PARTE = 1,
  ERROR_SINTAXIS = 2,
  PARENTESIS_FALTANTE = 3,
  EXPRESION_VACIA = 4,
  PARTE_NO_ESPERADA = 5,
  FIN_INESPERADO_EXPRESION = 6,
  VALOR_ESPERADO = 7,
  OPERADOR_DESCONOCIDO = 101,
  EXPRESION_DEMASIADA_LARGA = 200,
  DIVISION_POR_CERO = 702,
  CORCHETE_FALTANTE = 705
};
class ParsingException {
  public:
    ParsingException(const int col, int id = 2, ... ) {
      this->err_col = col;
      this->err_id = id;
      const char* msg_desc = msgdesc(id);
      va_list args;
      va_start(args, id);
      vsnprintf(msg, sizeof(msg) - 1, msg_desc, args);
      msg[sizeof(msg) - 1] = '\0';
      va_end(args);
    }
    ~ParsingException() {}
    inline int get_col(void) const { return err_col; } 
    inline int get_id(void) const { return err_id; }
    inline char* get_msg(void) { return msg; }
  private:
    int err_col, err_id;
    char msg[255];
    const char* msgdesc(const int error_id) {
      switch (error_id) {
        case ERROR_SINTAXIS_PARTE:  return "syntax error in \"%s\"";
        case ERROR_SINTAXIS:        return "syntax error";
        case PARENTESIS_FALTANTE:   return "')' expected";
        case EXPRESION_VACIA:       return "empty expression";
        case PARTE_NO_ESPERADA:     return "unexpected expression \"%s\"";
        case FIN_INESPERADO_EXPRESION: return "expected expression";
        case VALOR_ESPERADO:        return "value expected";
        case OPERADOR_DESCONOCIDO:  return "wrong operator %s";
        case EXPRESION_DEMASIADA_LARGA: return "expression too long";
        case DIVISION_POR_CERO:     return "divide by zero";
        case CORCHETE_FALTANTE:     return "']' expected";
      }
      return "unknown error";
    }
};
class Lexema {
  public:
    Lexema(std::string lex, int i, int tipo) :
      lexema(lex), inicio(i), tipo(tipo) {
      final_pos = lex.size();
    }
    ~Lexema() {}
    inline std::string get_lexema(void) const { return lexema; }
    inline int get_inicio(void)    const { return inicio; }
    inline int get_final_pos(void) const { return final_pos; }
    inline int get_tipo(void)      const { return tipo; }
    friend std::ostream& operator<<(std::ostream& out, const Lexema& lex) {
      out << '{' << lex.lexema << ", init(" << lex.inicio << "), tipo(";
      switch(lex.tipo) {
        case 0: out << "DELIMITADOR"; break;
        case 1: out << "NUMERO";      break;
        case 4: out << "DESCONOCIDO"; break;
        case 5: out << "OPERADOR";    break; }
      out << ')' << '}';
      return out;
    }
  private:
    std::string lexema;
    int inicio, final_pos, tipo;
};

class Calc {
  public:
    Calc(void) {
      expr[0] = '\0';
      pExpr = NULL;
      token[0] = '\0';
      tipoTokenActual = NADA;
      show_error_flag = false;
    }
    ~Calc() {}
    void set_error(bool error_flag) { show_error_flag = error_flag; }
    inline bool get_error_flag(void) const { return show_error_flag; }
    inline double get_numeric_answer(void) { return respuesta; }
    inline std::vector<Lexema>& get_lexemas_positions(void) { return lexemas_positions; }
    void parse(const char new_expr[]) {
      try {
        if((int)strlen(new_expr) > MAX_TOKEN_ID) {
          if(show_error_flag) showError();
          throw ParsingException(0, EXPRESION_DEMASIADA_LARGA);
        }
        strncpy(expr, new_expr, MAX_TOKEN_ID - 1);
        pExpr = expr;
        respuesta = 0.0;
        get_token_2(); // Obtener el primer token:
        if(tipoTokenActual == DELIMITADOR && *token == '\0') {
          if(show_error_flag) showError();
          throw ParsingException(col(), EXPRESION_VACIA);
        }
        respuesta = parse_level_assign();
        if(tipoTokenActual != DELIMITADOR || *token != '\0') {
          if(show_error_flag) showError();
          throw ParsingException(col(), (tipoTokenActual == DELIMITADOR) ? OPERADOR_DESCONOCIDO : PARTE_NO_ESPERADA, token);
        }
      } catch(ParsingException errEx) { throw errEx; }
    }

	private:
  bool show_error_flag;
	std::vector<Lexema> lexemas_positions;

  enum TOKEN_TYPE { NADA = -1, DELIMITADOR, NUMERO, DESCONOCIDO, OPERADOR };
  enum OPERADOR_ID { AND,OR,  EQUAL,UNEQUAL,SMALLER,LARGER,SMALLEREQ,LARGEREQ,  PLUS,MINUS,  MULTIPLY,DIVIDE,MODULUS,  POW,  NOT };
  char token[MAX_TOKEN_ID + 1], expr[MAX_TOKEN_ID + 1];
  char* pExpr;
  double respuesta;
  TOKEN_TYPE tipoTokenActual;
  std::vector<std::string> _tokens_list;
  inline bool is_digit_dot(const char c) { return (c == 0) ? false : strchr("0123456789.", c) != 0; }
  inline bool is_digit(const char c) { return (c == 0) ? false : strchr("0123456789", c) != 0; }
  inline int col(void) { return (pExpr - expr - strlen(token) + 1); }
  inline void showError(void) {
    for (int j = 0; j <= col(); j++) std::cout << '~';
    std::cout << '^' <<std::endl;
  }
  void get_token_2(void) {
    tipoTokenActual = NADA;
    char* t = token;
    *t = '\0';
    while(*pExpr == ' ' || *pExpr == '\t') pExpr++;
    if (*pExpr == '\0') {
      tipoTokenActual = DELIMITADOR;
      return;
    }
    switch(*pExpr) {
      case '-': case '+':  case '*': case '/':
      case '(': case ')':  case '[': case ']':  //ES ALGÚN DELIMITADOR.
      case '%': case '^':  case ';': case ',':
        tipoTokenActual = DELIMITADOR; *t++ = *pExpr++;
        *t = '\0'; return;
      case '<': // Buscar si es el operador < ó <=
        tipoTokenActual = DELIMITADOR; *t++ = *pExpr++;
        if(*pExpr == '=') *t++ = *pExpr++;
        *t = '\0'; return;
      case '>': // Buscar si es el operador > ó >= 
        tipoTokenActual = DELIMITADOR; *t++ = *pExpr++;
        if(*pExpr == '=') *t++ = *pExpr++;
        *t = '\0'; return;
      case '!': //Buscar si es el operador ! ó !=
        tipoTokenActual = DELIMITADOR; *t++ = *pExpr++;
        if(*pExpr == '=') *t++ = *pExpr++;
        *t = '\0'; return;
      case '&': //Buscar si es el operador &&
        tipoTokenActual = DELIMITADOR; *t++ = *pExpr++;
        if(*pExpr == '&') *t++ = *pExpr++;
        *t = '\0'; return;
      case '|': //Buscar si es el operador ||
        tipoTokenActual = DELIMITADOR; *t++ = *pExpr++;
        if(*pExpr == '|') *t++ = *pExpr++;
        *t = '\0'; return;
      case '=': // Buscar si es el operador = ó == 
        tipoTokenActual = DELIMITADOR; *t++ = *pExpr++;
        if(*pExpr == '=') *t++ = *pExpr++;
        *t = '\0'; return;
    }
    if (is_digit_dot(*pExpr)) {
      tipoTokenActual = NUMERO;
      while (is_digit(*pExpr)) *t++ = *pExpr++;
      if (*pExpr == '.') *t++ = *pExpr++;
      while (is_digit(*pExpr)) *t++ = *pExpr++;
      if (std::toupper(*pExpr) == 'E') {
        *t++ = *pExpr++;
        if (*pExpr == '+' || *pExpr == '-') *t++ = *pExpr++;
        while (is_digit(*pExpr)) *t++ = *pExpr++;
      }
      *t = '\0';
      return;
    }
    tipoTokenActual = NADA;
    while (*pExpr != '\0') *t++ = *pExpr++;
    *t = '\0';
    if(show_error_flag) showError();
    throw ParsingException(col(), ERROR_SINTAXIS_PARTE, token);
    return;
  }
  double parse_level_assign(void) { return parse_level2(); }
  double parse_level2(void) {
    double answer = parse_level3();
    int op_id = get_operator_id(token);
    while((op_id == AND) || (op_id == OR)) {
      get_token_2();
      answer = eval_operator(op_id, answer, parse_level3());
      op_id = get_operator_id(token);
    }
    return answer;
  }
  double parse_level3(void) {
    double answer = parse_level4();
    int op_id = get_operator_id(token);
    while( (op_id == EQUAL) || (op_id == UNEQUAL) || (op_id == SMALLER) || (op_id == LARGER) || (op_id == SMALLEREQ) || (op_id == LARGEREQ) ) {
      get_token_2();
      answer = eval_operator(op_id, answer, parse_level4());
      op_id = get_operator_id(token);
    }
    return answer;
  }
  double parse_level4(void) {
    double answer = parse_level5();
    int op_id = get_operator_id(token);
    while(op_id == PLUS || op_id == MINUS) {
      get_token_2();
      if(token[0] == '-') throw ParsingException(col() - 1, PARTE_NO_ESPERADA, token);
      answer = eval_operator(op_id, answer, parse_level5());
      op_id = get_operator_id(token);
    }
    return answer;
  }
  double parse_level5(void) {
    double answer = parse_level6();
    int op_id = get_operator_id(token);
    while((op_id == MULTIPLY) || (op_id == DIVIDE) || (op_id == MODULUS)) {
      get_token_2();
      answer = eval_operator(op_id, answer, parse_level6());
      op_id = get_operator_id(token);
    }
    return answer;
  }
  double parse_level6(void) {
    double answer = parse_level8();
    int op_id = get_operator_id(token);
    while(op_id == POW) {
      get_token_2();
      answer = eval_operator(op_id, answer, parse_level8());
      op_id = get_operator_id(token);
    }
    return answer;
  }
  double parse_level8(void) {
    double answer;
    int op_id = get_operator_id(token);
    if(op_id == MINUS) {
      get_token_2();
      answer = parse_not();
      answer = -answer;
    } else answer = parse_not();
    return answer;
  }
  double parse_level9(void) {
    if(tipoTokenActual == DELIMITADOR && token[0] == '(' && token[1] == '\0') {
      get_token_2();
      double answer = parse_level2();
      if(tipoTokenActual != DELIMITADOR || token[0] != ')' || token[1] || '\0') {
        if(show_error_flag) showError();
        throw ParsingException(col(), PARENTESIS_FALTANTE);
      }
      get_token_2();
      return answer;
    }
    return parse_number();
  }
  double parse_not(void) {
    double answer;
    int op = get_operator_id(token);
    if(op == NOT) {
      get_token_2();
      answer = parse_level9();
      answer = !(answer);
    } else answer = parse_level9();
    return answer;
  }
  double parse_number(void) {
    double answer = 0.0;
    switch(tipoTokenActual) {
      case NUMERO:
        answer = std::strtod(token, NULL);
        get_token_2();
        break;
      default: // Error de sintáxis o expresión inesperada:
        if(show_error_flag) showError();
        throw ParsingException(col() - 1, (token[0] == '\0') ? FIN_INESPERADO_EXPRESION : VALOR_ESPERADO);
        break;
    }
    return answer;
  }
  int get_operator_id(const char op_name[]) const {
    if (!strcmp(op_name, "&&")) return AND;
    if (!strcmp(op_name, "||")) return OR;
    if (strcmp(op_name, "==") == 0) return EQUAL;
    if (!strcmp(op_name, "!=")) return UNEQUAL;
    if (!strcmp(op_name, "<")) return SMALLER;
    if (!strcmp(op_name, ">")) return LARGER;
    if (!strcmp(op_name, "<="))return SMALLEREQ;
    if (!strcmp(op_name, ">="))return LARGEREQ;
    if (!strcmp(op_name, "+")) return PLUS;
    if (!strcmp(op_name, "-")) return MINUS;
    if (!strcmp(op_name, "*")) return MULTIPLY;
    if (!strcmp(op_name, "/")) return DIVIDE;
    if (!strcmp(op_name, "%")) return MODULUS;
    if (!strcmp(op_name, "^")) return POW;
    if (!strcmp(op_name, "!")) return NOT;
    return -1;
  }
  double eval_operator(const int op_id, const double &lhs, const double &rhs) {
    //if(evaluate) return 1.0;
    switch (op_id) {
      case AND:     return static_cast<int>(lhs) && static_cast<int>(rhs);
      case OR:      return static_cast<int>(lhs) || static_cast<int>(rhs);
      case EQUAL:   return lhs == rhs;
      case UNEQUAL: return lhs != rhs;
      case SMALLER: return lhs < rhs;
      case LARGER:  return lhs > rhs;
      case SMALLEREQ: return lhs <= rhs;
      case LARGEREQ:return lhs >= rhs;
      case PLUS:    return lhs + rhs;
      case MINUS:   return lhs - rhs;
      case MULTIPLY:return lhs * rhs;
      case DIVIDE: // Verificar que no se divida entre 0, si se divide lanzamos una excepción
        if( fabs(rhs - 0.0) < std::numeric_limits<double>::epsilon() ) throw ParsingException(col(), DIVISION_POR_CERO);
        return lhs / rhs;
      case MODULUS: return static_cast<int>(lhs) % static_cast<int>(rhs);
      case POW:     return pow(lhs, rhs);
      default:      assert(false);
    }
    throw ParsingException(col(), 104, op_id);
    return 0;
  }
};

#endif
