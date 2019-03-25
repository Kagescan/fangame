#ifndef PARSER_H
#define PARSER_H

#include <vector>
#include <string>
#include <cstring>
#include <sstream>
#include <cstdio>
#include <cmath>

#include "constantes.h"
#include "parsing_exception.h"
#include "variables.h"

#include "arrays.h"
#include "keywords.h"
#include "math_functions.h"
#include "var_from_file.h"
#include "lexema.h"

#include <cctype>
#include <ctime>
#include <fstream>
#include <cassert>

#include <cstdlib>

class Parser {

	public:
		Parser(void) {
			expr[0] = '\0';
			pExpr = NULL;
			token[0] = '\0';
			tipoTokenActual = NADA;

			std::srand((unsigned)time(NULL));
			show_error_flag = false;
		}

		~Parser() {
		}

		void set_error(bool error_flag) {
			show_error_flag = error_flag;
		}

		inline bool get_error_flag(void) const {
			return show_error_flag;
		}

		inline VariablesTest& get_vars(void) {
            return user_var;
		}

		inline Arrays& get_arrays(void) {
		    return user_arrays;
		}

		inline bool create_array(const char* name) {
		    return user_arrays.create(name);
		}

		inline void view_vars(void) const {
            std::cout << user_var << std::endl;
		}

		inline void clear_vars(void) const {
            user_var.get_vars().clear();
		}

        inline double get_numeric_answer(void) {
            return respuesta;
        }

		inline std::vector<VarFromFile>& get_var_list_file(void) {
			return var_list_file;
        }

		void extract_tokens(const char new_expresion[]) /*throws (ParsingException)*/ {
			strncpy(expr, new_expresion, MAX_TOKEN_ID + 1);
			expr[sizeof(expr) - 1] = '\0';
			pExpr = expr;
			lexemas_positions.clear();

			get_token_2();
			while(*token != '\0') {
				_tokens_list.push_back(token);
				Lexema lex(token, col() - 1, tipoTokenActual);
				lexemas_positions.push_back(lex);
				get_token_2();
			}
		}

		bool evaluate_expression(const char new_expr[]) {
        	MathFunctions::evaluate = true;
			try {
			   if((int)strlen(new_expr) > MAX_TOKEN_ID) {
					if(show_error_flag) {
						showError();
					}
					MathFunctions::evaluate = false;
					throw ParsingException(0, EXPRESION_DEMASIADA_LARGA);
				}
			   strncpy(expr, new_expr, MAX_TOKEN_ID - 1);
			   pExpr = expr;
			   respuesta = 0.0;

			   get_token_2();             // Obtener el primer token:
			   if(tipoTokenActual == DELIMITADOR && *token == '\0') {
					if(show_error_flag) {
                        showError();
                    }
					MathFunctions::evaluate = false;
					throw ParsingException(col(), EXPRESION_VACIA);
				}

				parse_level_assign();

				if(tipoTokenActual != DELIMITADOR || *token != '\0') {
					MathFunctions::evaluate = false;
                	return false;
				}
				MathFunctions::evaluate = false;
				return true;
			} catch (ParsingException errEx) {
            	std::cout << errEx.get_msg() << std::endl;
				MathFunctions::evaluate = false;
            	return false;
			}
		}

		void evaluate_expression_with_exception(const char new_expr[]) throw (ParsingException) {
			MathFunctions::evaluate = true;
			try {
				if((int)strlen(new_expr) > MAX_TOKEN_ID) {
					throw ParsingException(0, EXPRESION_DEMASIADA_LARGA);
				}
				strncpy(expr, new_expr, MAX_TOKEN_ID - 1);
				pExpr = expr;
				respuesta = 0.0;

				get_token_2();
				if(tipoTokenActual == DELIMITADOR && *token == '\0') {
					throw ParsingException(col(), EXPRESION_VACIA);
				}
				parse_level_assign();
				if(tipoTokenActual != DELIMITADOR || *token != '\0') {
					if (tipoTokenActual == DELIMITADOR) {
						throw ParsingException(col(), OPERADOR_DESCONOCIDO, token);
					} else {
						throw ParsingException(col(), PARTE_NO_ESPERADA, token);
					}
				}
			} catch(ParsingException errEx) {
				MathFunctions::evaluate = false;
				throw errEx;
			}
			MathFunctions::evaluate = false;
		}

		void parse(const char new_expr[]) throw (ParsingException) {
			try {
				if((int)strlen(new_expr) > MAX_TOKEN_ID) {
					if(show_error_flag	) {
						showError();
                    }
					throw ParsingException(0, EXPRESION_DEMASIADA_LARGA);
				}

				strncpy(expr, new_expr, MAX_TOKEN_ID - 1);
				pExpr = expr;
                respuesta = 0.0;

                get_token_2(); // Obtener el primer token:

                if(tipoTokenActual == DELIMITADOR && *token == '\0') {
					if(show_error_flag) {
                        showError();
                    }
					throw ParsingException(col(), EXPRESION_VACIA);
                }
                respuesta = parse_level_assign();

                if(tipoTokenActual != DELIMITADOR || *token != '\0') {
                    if (tipoTokenActual == DELIMITADOR) {
						if(show_error_flag) {
							showError();
                        }
						throw ParsingException(col(), OPERADOR_DESCONOCIDO, token);
                    } else {
						if(show_error_flag) {
                            showError();
                        }
						throw ParsingException(col(), PARTE_NO_ESPERADA, token);
                    }
                }
			} catch(ParsingException errEx) {
            	throw errEx;
			}
		}

        std::vector<VarFromFile> import_file(std::string file_name) throw (ParsingException) {

			std::ifstream file;
			file.open(file_name.c_str());
			std::vector<VarFromFile> lista;

			if(!file) {
				throw ParsingException(-1, ERROR_LEYENDO_VAR_FILE);
			}

			char* p_tokens = NULL;

			// Iterate line by line
			for (std::string line; std::getline(file, line, '\n');) {

				// Limpiar los residuos al final de la cadena y saltar líneas vacías.
				if (*line.rbegin() == '\r') {
					line.erase(line.length() - 1);
				}
				if(line.empty() || line.size() < 2) {
					continue;
				}
				p_tokens = strtok((char *)line.c_str(), ";");
				// Crear la variable con el nombre encontrado:
				VarFromFile vf(p_tokens);

				unsigned int count_values = 0;
				while((p_tokens = strtok(NULL, ";")) != NULL) {
					// Trabajar los Strings para evitar los arrays vacíos:
					std::string str(p_tokens);
					std::stringstream trimmer;
					trimmer << str;
					str.clear();
					trimmer >> str;
					if(!str.empty()) {
						vf.get_list_values().push_back(p_tokens);
					}
					count_values++;
				}
				if(count_values == 0) {
					throw ParsingException(-1, ERROR_LEYENDO_VAR_FILE);
				}
				lista.push_back(vf);
			}
			file.close();
			return lista;
		}

		inline std::vector<Lexema>& get_lexemas_positions(void) {
			return lexemas_positions;
		}

	private:

        bool show_error_flag;
		std::vector<Lexema> lexemas_positions;

		enum TOKEN_TYPE {
			NADA = -1,                    // U OTRO....
			DELIMITADOR,
			NUMERO,
			VARIABLE,
			FUNCION,
			DESCONOCIDO,
			ARRAY,
			OPERADOR	// XXX Removerlo si da problemas.
		};

		/*
			Tipos de operadores:
		*/
        enum OPERADOR_ID {
            AND,				// nivel2
            OR,					// nivel2
			/*BITSHIFTLEFT,		// nivel2               , sin utilidad.
            BITSHIFTRIGHT,*/		// nivel2               , sin utilidad.
            EQUAL,				// nivel3
            UNEQUAL, 			// nivel3
            SMALLER, 			// nivel3
            LARGER, 			// nivel3
            SMALLEREQ, 			// nivel3
            LARGEREQ, 			// nivel3
            PLUS, 				// nivel4
            MINUS, 				// nivel4
            MULTIPLY, 			// nivel5
            DIVIDE, 			// nivel5
            MODULUS, 			// nivel5
            XOR, 				// nivel5
            POW, 				// nivel6
			FACTORIAL,			// nivel7
			NOT                 // nivel not  XXX NOT
        };

		char token[MAX_TOKEN_ID + 1];

        char expr[MAX_TOKEN_ID + 1];

		/*
			Apunta a un caracter en la expresión:
			pExpr es un puntero a una posición en la expresión.
			Para recoger cada token tenemos que irnos moviendo caracter por
			caracter en la expresión.
		 */
        char* pExpr;

		/*
			Tipo del token actual que se va leyendo.
		*/
		TOKEN_TYPE tipoTokenActual;

		/*
			Almacena el valor numérico después de traducir.
		*/
        double respuesta;

		// La lista de tokens de la expresión a traducir:
		std::vector<std::string> _tokens_list;

		/*
			 Almacena las variables definidas por el usuario.
		*/
		mutable VariablesTest user_var;

		/*
    		Objeto Arrays que almacena los arrays definidos por el usuario.
		*/
		Arrays user_arrays;

		/* Lista de variables en donde se guardarán las variables que serán
		   leídas desde un archivo de texto.
        */
		std::vector<VarFromFile> var_list_file;

        inline bool is_alpha(const char c) {
            if (c == 0) return false;
            return strchr("ABCDEFGHIJKLMNOPQRSTUVWXYZ_", std::toupper(c)) != 0;
        }

		/*
        	Devuelve true si el caracter dado es un dígito o punto.
		*/
        inline bool is_digit_dot(const char c) {
            if (c == 0) return false;
            return strchr("0123456789.", c) != 0;
        }

	    inline bool is_digit(const char c) {
            if (c == 0) return false;
            return strchr("0123456789", c) != 0;
        }

        void get_token_2(void) {

			/* Inicializar las variables necesarias:
				t es un puntero que apunta a un caracter en la cadena.
				Nos ayuda a irnos moviendo caracter por caracter por la cadena.
			*/
            tipoTokenActual = NADA;
			char* t = token;

            // Como *t apunta a token, si hace *t = '\0'; entonces se modifica t.
            *t = '\0';

            /* Saltar espacios en blanco(' ', '\t'), espacio y tab */
			while(*pExpr == ' ' || *pExpr == '\t')  {
                pExpr++;
            }

			if (*pExpr == '\0') {
				tipoTokenActual = DELIMITADOR;
				return;
			}

			/* Analizar caracter por caracter: */
			switch(*pExpr) {
				case '-':
				case '+':
				case '*':
				case '/':
                case '(':
                case ')':
                case '%':
                case '^':
                case '[':
				case ']':
				case ';':
				case ',':
					/*
                    	ES ALGÚN DELIMITADOR.
					*/
                    tipoTokenActual = DELIMITADOR;
                    *t++ = *pExpr++;
                    *t = '\0';
                    return;
				case '<':
                	/* Buscar si es el operador < ó <= */
                    tipoTokenActual = DELIMITADOR;
                    *t++ = *pExpr++;
                    if(*pExpr == '=') {
                        *t++ = *pExpr++;
                    }
                    *t = '\0';
                    return;
				case '>':
					/* Buscar si es el operador > ó >= */
                    tipoTokenActual = DELIMITADOR;
                    *t++ = *pExpr++;
                    if(*pExpr == '=') {
                        *t++ = *pExpr++;
                    }
                    *t = '\0';
                    return;
				case '!':
					/* Buscar si es el operador ! ó != */
                    tipoTokenActual = DELIMITADOR;
                    *t++ = *pExpr++;
                    if(*pExpr == '=') {
                        *t++ = *pExpr++;
                    }
                    *t = '\0';
                    return;
				case '&':
					/* Buscar si es el operador && */
                    tipoTokenActual = DELIMITADOR;
                    *t++ = *pExpr++;
                    if(*pExpr == '&') {
                        *t++ = *pExpr++;
                    }
                    *t = '\0';
                    return;
				case '|':
					/* Buscar si es el operador || */
					tipoTokenActual = DELIMITADOR;
					*t++ = *pExpr++;
					if(*pExpr == '|') {
						*t++ = *pExpr++;
					}
					*t = '\0';
					return;
				case '=':
                    /* Buscar si es el operador = ó == */
                    tipoTokenActual = DELIMITADOR;
                    *t++ = *pExpr++;
                    if(*pExpr == '=') {
                        *t++ = *pExpr++;
                    }
                    *t = '\0';
                    return;

            }

			/* Verificar si es un valor numérico */
            if (is_digit_dot(*pExpr)) {
                // Cambiamos el tipo
				tipoTokenActual = NUMERO;
            	/* Avanzamos al siguiente número */
                while (is_digit(*pExpr)) {
                    *t++ = *pExpr++;
                }

				// Coincidir el punto:
                /* Si se encuentra un punto, se trata de un número decimal */
                if(*pExpr == '.') {
                    *t++ = *pExpr++;
                }

                /* Coincidimos más números después del punto: */
                while (is_digit(*pExpr)) {
                    *t++ = *pExpr++;
                }

                /* Verificar si es notación cientifica: "2.3e-4" o "1.23e50" */
                if (std::toupper(*pExpr) == 'E') {
                    *t++ = *pExpr++;

                    if (*pExpr == '+' || *pExpr == '-') {
                        *t++ = *pExpr++;
                  }

                    while (is_digit(*pExpr)) {
                        *t++ = *pExpr++;
                    }
                }   // fin de comprobación de notación científica.
                // Cerramos la cadena:
                *t = '\0';
                return;
            }           // Fin de verificación de valores numéricos.

            // Verificar si es una variable o función */
            if (is_alpha(*pExpr)) {          // Una vez que es letra ...
                while (is_alpha(*pExpr) || is_digit(*pExpr))      // Puede ser cualquier otra cosa ...
                //while (isNotDelimeter(*e))
                {
                    *t++ = *pExpr++;
                }
                // Cerrar la cadena:
                *t = '\0';  // add a null character at the end of token

                /* Una vez que nos topamos algo que no pertenece a la forma de un identificador
                    omitimos los espacios o tabuladores que pudiera haber después:

                    Es decir:
                    sin(x+1) podría ser escrito también así: sin (x + 1) ó sin[TAB]*(x + 1)
                    */

                // Variables temporales para avanzar y luego retroceder si no es una función
                char* e2 = NULL;
                e2 = pExpr;

                // saltar espacios en blanco, por ejemplo puede haber sin (1+2)
                while (*e2 == ' ' || *e2 == '\t') {     // space or tab
                    e2++;
                }

                // Si después de avanzar o ignorar los posibles espacios y tabuladores:
                // hay un "(" entonces estamos en una función
                if (*e2 == '(') {
                    tipoTokenActual = FUNCION;
                } else if(*e2 == '[') {
                    tipoTokenActual = ARRAY;
                } else {
                    // Sino entonces es una variable:
                    tipoTokenActual = VARIABLE;
                }
                return;
            }

            // Algo desconocido se encontró, simplemente avanzamos hasta el final:
            tipoTokenActual = NADA;
            while (*pExpr != '\0') {
                *t++ = *pExpr++;
            }
            // Cerramos la cadena:
            *t = '\0';
            // Lanzamos una excepción porque no hemos encontrado la
            if(show_error_flag) {
                showError();
            }
            throw ParsingException(col(), ERROR_SINTAXIS_PARTE, token);
            return;
        }

        inline int col(void) {
            return (pExpr - expr - strlen(token) + 1);
        }

		/* Asignación de una variable o función: */
		double parse_level_assign(void) throw (ParsingException) {
            if(tipoTokenActual == VARIABLE) {
                // Copiar el token actual:
                char *e_now = pExpr;
                TOKEN_TYPE token_type_now = tipoTokenActual;
                char token_now[MAX_TOKEN_ID + 1];
                strcpy(token_now, token);

                get_token_2();

                if(strcmp(token, "=") == 0) {

                // Si se intenta hacer una asignación con una palabra reservada:
					if(KeyWords::is_function(token_now)) {
						if(show_error_flag) {
							showError();
                        }
                        throw ParsingException(col(), IDENTIFICADOR_COMO_PALABRA_RESERVADA, token_now);

				// Si se intenta hacer una asignación con una consante:
                    } else if(user_var.is_constant(token_now)) {
                      throw ParsingException(col(), ASIGNACION_DE_CONSTANTE, token_now);
                    }  else if((strcmp("pi", token_now) == 0) ||
                       (strcmp("e", token_now) == 0) || (strcmp("g", token_now) == 0) || (strcmp("random", token_now) == 0)) {
						throw ParsingException(col(), IDENTIFICADOR_COMO_PALABRA_RESERVADA, token_now);
					} /*else if((strcmp("random", token_now) == 0)*/

                    get_token_2();

                    double r_temp = parse_level2();

                    if(user_var.add(token_now, r_temp) == false) {
						throw ParsingException(col(), DEFINICION_DE_VARIABLE_FALLIDA);
					}
					return r_temp;

				} else {
					// Sino es una asignación entonces recuperamos el token anterior:
					pExpr = e_now;
					tipoTokenActual = token_type_now;
					strcpy(token, token_now);
				}
			}
			return parse_level2();
		}

		// Operadores condicionales y corrimientos de bits:
        double parse_level2(void) {

            double answer = parse_level3();
            int op_id = get_operator_id(token);

			while((op_id == AND) || (op_id == OR) /*|| (op_id == BITSHIFTLEFT) || (op_id == BITSHIFTRIGHT)*/) {

				get_token_2();

                answer = eval_operator(op_id, answer, parse_level3());
                op_id = get_operator_id(token);
            }
            return answer;
        }

        // Operadores condicionales:
        double parse_level3(void) {

            double answer = parse_level4();
            int op_id = get_operator_id(token);

            while((op_id == EQUAL) || (op_id == UNEQUAL) || (op_id == SMALLER) ||
				  (op_id == LARGER) || (op_id == SMALLEREQ) || (op_id == LARGEREQ)) {

                get_token_2();

                answer = eval_operator(op_id, answer, parse_level4());
                op_id = get_operator_id(token);
            }
            return answer;
        }

        /* Sumar o restar */
		double parse_level4(void) {

            double answer = parse_level5();
            int op_id = get_operator_id(token);

			while(op_id == PLUS || op_id == MINUS) {

				get_token_2();

				// XXX Eliminar si hay problemas!
				/*
					El siguiente trozo de código, evita que haya expresiones del tipo:
					1+-2
					1--2
				*/
				if(token[0] == '-') {
                    throw ParsingException(col() - 1, PARTE_NO_ESPERADA, token);
                }

                answer = eval_operator(op_id, answer, parse_level5());
                op_id = get_operator_id(token);
            }
            return answer;
        }

        double parse_level5(void) {

            double answer = parse_level6();
            int op_id = get_operator_id(token);

			while((op_id == MULTIPLY) || (op_id == DIVIDE) || (op_id == MODULUS) || (op_id == XOR)) {

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

        /* Factorial */
		/*double parse_level7(void) {

			double answer = parse_level8();
			int op_id = get_operator_id(token);

			while(op_id == FACTORIAL) {
				getToken();
				answer = eval_operator(op_id, answer, 0.0);
				op_id = get_operator_id(token);
			}
			return answer;
		}*/

        /* Menos unario: -1, -x, -ans */
        double parse_level8(void) {

            double answer;
            int op_id = get_operator_id(token);

			if(op_id == MINUS) {

				get_token_2();

				answer = parse_not();
                answer = -answer;
			} /*else if(op_id == NOT) {
				getToken();
				answer = parse_level2();
				answer = !answer;
			}*/ else {
					answer = parse_not();
				}

            return answer;
        }

		double parse_not(void) {
            double answer;
            int op = get_operator_id(token);

			if(op == NOT) {

				get_token_2();

                answer = parse_level9();
                answer = !(answer);
            } else {
                answer = parse_level9();
            }
            return answer;
        }

        double parse_level9(void) throw (ParsingException) {

            char fn_name[MAX_TOKEN_ID + 1];
            double answer;

			if(tipoTokenActual == FUNCION) {

                // Copiamos el nombre de la función:
                strcpy(fn_name, token);

				if(KeyWords::is_function(fn_name) == false) {
					 //showError();
					 if(show_error_flag) {
						 showError();
                     }
                     throw ParsingException(col(), FUNCION_DESCONOCIDA, fn_name);
                }

                if(KeyWords::is_function_double(fn_name)) {
					// Avanzar al siguiente token, avanzar el delimitador '(':

                    get_token_2();
                    // Avanzamos a la expresion:

                    get_token_2();

                    double expresion_1 = parse_level2();
                    // cout << "Tipo de token: " << tipoTokenActual << endl;

                    get_token_2();
                    double expresion_2 = parse_level2();
                    get_token_2();

                    answer = eval_function_double(fn_name, expresion_1, expresion_2);

                } else {
					get_token_2();

					double expresionFunction = parse_level10();
                    answer = eval_function(fn_name, expresionFunction);
                }
			} else if(tipoTokenActual == ARRAY) {

				if(user_arrays.exists(token) == false) {
                    throw ParsingException(col(), ARRAY_DESCONOCIDO, token);
			    }

			    char array_name[MAX_TOKEN_ID + 1];
			    strcpy(array_name, token);

                get_token_2();

			    get_token_2();

			    double index_array_value = parse_level2();

			    size_t index_array = user_arrays.get_index(array_name);

                size_t size_array = user_arrays.get_array_list()[index_array].array_values.size();
                if((index_array_value >= size_array) || ((int)index_array_value < 0)) {
                    throw ParsingException(col(), ARRAY_INDEX_OUT, (int)index_array_value);
			    }

			    answer = user_arrays.get_array_list()[index_array][index_array_value];

                if(token[0] != ']') {
                    throw ParsingException(col(), CORCHETE_FALTANTE);
                }

			    get_token_2();

			} else if(tipoTokenActual == VARIABLE) {
				// Hacer la comprobación si la variable es una función:
				if(KeyWords::is_function(token)) {
                    // Copiar el token actual:
					char *e_now = pExpr;
					TOKEN_TYPE token_type_now = tipoTokenActual;
					char token_now[MAX_TOKEN_ID + 1];
					strcpy(token_now, token);

					get_token_2();

					if(!(strcmp(token, "(") == 0)) {
						throw ParsingException(col(), PARENTESIS_FALTANTE);
					} else {
						// Sino es una asignación entonces recuperamos el token anterior:
                    	// Volver todo a la normalidad.
						pExpr = e_now;
						tipoTokenActual = token_type_now;
						strcpy(token, token_now);
					}
                }
				answer = parse_level10();
			}
			// Comprobar si la variable es una palabra reservada y que
			else {
				answer = parse_level10();
			}
			return answer;
        }

        /* Expresión parentizada o valor */
        double parse_level10(void) {
            // Verificar si la expresión es parentizada:
			if(tipoTokenActual == DELIMITADOR) {

                // std::cout << "Delim[" << token[0] << "]" << std::endl;

                // Entonces se trata efectivamente de una expresión parentizada:
				if(token[0] == '(' && token[1] == '\0') {
                    // Avanzamos al siguiente token para llegar a la expresión:

                    get_token_2();

                    // Nos traemos la expresión:
                    double answer = parse_level2();
					if(tipoTokenActual != DELIMITADOR || token[0] != ')' || token[1] || '\0') {
						if(show_error_flag) {
							showError();
                        }
                        throw ParsingException(col(), PARENTESIS_FALTANTE);
                    }

                    get_token_2();

                    return answer;
                }
            }
            return parse_number();
        }

        double parse_number(void) {

            double answer = 0.0;
            switch(tipoTokenActual) {
				case NUMERO:
                    answer = std::strtod(token, NULL);

                    get_token_2();

                    break;

				case VARIABLE:
                    answer = eval_variable(token);

                    get_token_2();
                    break;

                default:
                    // Error de sintáxis o expresión inesperada:
					if(token[0] == '\0') {
						if(show_error_flag) {
							showError();
						}
						throw ParsingException(col() - 1, FIN_INESPERADO_EXPRESION);
					} else {
						if(show_error_flag) {
							showError();
                        }
						throw ParsingException(col() - 1, VALOR_ESPERADO);
                    }
                    break;
            }
            return answer;
        }

        /**
           Función que regresa un valor según el operador dado.
         */
        int get_operator_id(const char op_name[]) const {

			// Nivel 2
            if (!strcmp(op_name, "&&")) return AND;
            if (!strcmp(op_name, "||")) return OR;
            /*if (!strcmp(op_name, "<<")) return BITSHIFTLEFT;*/
            /*if (!strcmp(op_name, ">>")) return BITSHIFTRIGHT;*/

            // Nivel 3
            // XXX: Pendiente ...
            if (strcmp(op_name, "==") == 0) return EQUAL;
            if (!strcmp(op_name, "!=")) return UNEQUAL;
            if (!strcmp(op_name, "<")) return SMALLER;
            if (!strcmp(op_name, ">")) return LARGER;
            if (!strcmp(op_name, "<=")) return SMALLEREQ;
            if (!strcmp(op_name, ">=")) return LARGEREQ;

            // Nivel 4
            if (!strcmp(op_name, "+")) return PLUS;
            if (!strcmp(op_name, "-")) return MINUS;

            // Nivel 5
            if (!strcmp(op_name, "*")) return MULTIPLY;
            if (!strcmp(op_name, "/")) return DIVIDE;
            if (!strcmp(op_name, "%")) return MODULUS;
            //if (!strcmp(op_name, "||")) return XOR;

            // Nivel 6
            if (!strcmp(op_name, "^")) return POW;

            // Nivel 7
            // if (!strcmp(op_name, "!")) return FACTORIAL;

            if (!strcmp(op_name, "!"))
			   return NOT;
			return -1;
        }

		double eval_operator(const int op_id, const double &lhs, const double &rhs) {

			if(MathFunctions::evaluate)
            	return 1.0;
			switch (op_id) {
                // level 2
                case AND:
					return static_cast<int>(lhs) && static_cast<int>(rhs);

                case OR:
					return static_cast<int>(lhs) || static_cast<int>(rhs);

				/*case BITSHIFTLEFT:
					return static_cast<int>(lhs) << static_cast<int>(rhs);

				case BITSHIFTRIGHT:
					return static_cast<int>(lhs) >> static_cast<int>(rhs);*/

                // level 3
                case EQUAL:
                    return lhs == rhs;

                case UNEQUAL:
                    return lhs != rhs;

                case SMALLER:
                    return lhs < rhs;

                case LARGER:
                    return lhs > rhs;

                case SMALLEREQ:
                    return lhs <= rhs;

                case LARGEREQ:
                    return lhs >= rhs;
                // level 4
                case PLUS:
                    return lhs + rhs;

                case MINUS:
                    return lhs - rhs;

                // level 5
                case MULTIPLY:
                    return lhs * rhs;

				case DIVIDE:
					/* Verificar que no se divida entre 0, si se divide lanzamos
					 una excepción */
					if(fabs(rhs - 0.0) < std::numeric_limits<double>::epsilon()) {
						throw ParsingException(col(), DIVISION_POR_CERO);
		  			}

					return lhs / rhs;

				case MODULUS:
					return static_cast<int>(lhs) % static_cast<int>(rhs);

                case XOR:
					return static_cast<int>(lhs) ^ static_cast<int>(rhs);

                // Nivel 6
                case POW:
                    return pow(lhs, rhs);

                // Nivel 7
                case FACTORIAL:
                    return MathFunctions::factorial(lhs);

                default:
                        assert(false);
            }

            throw ParsingException(col(), 104, op_id);
            return 0;
        }

		double eval_function_double(const char fn_name[], double param_left, double param_right) {
            try {

				if(strcmp(fn_name, "power") == 0) {
					return pow(param_left, param_right);
				}
				if(strcmp(fn_name, "max") == 0) {
					return std::max(param_left, param_right);
				}
				if(strcmp(fn_name, "min") == 0) {
					return std::min(param_left, param_right);
				}
				if(strcmp(fn_name, "mod") == 0) {
					return /*std::*/fmod(param_left, param_right);
				}
				if(strcmp(fn_name, "rand") == 0) {
					return MathFunctions::rand_int_between(static_cast<int>(param_left),
						static_cast<int>(param_right));
				}
			} catch(ParsingException error) {
				throw ParsingException(col(), col(), error.get_id(), error.get_msg());
			}

            // Función desconocida:
			throw ParsingException(col(), FUNCION_DESCONOCIDA, fn_name);
            return 0.0;
        }

        double eval_function(const char fn_name[], const double &value) {
            try {

                // Aritmética:
				if (strcmp(fn_name, "abs") == 0) {
					return abs(value);
				}
				if (strcmp(fn_name, "exp") == 0) {
					return exp(value);
				}
				if (strcmp(fn_name, "sign") == 0) {
					return MathFunctions::sign(value);
                }
				if ((strcmp(fn_name, "sqrt") == 0) || (strcmp(fn_name, "raiz") == 0)) {
					//return sqrt(value);
					/*try {
						return MathFunctions::raiz(value);
					} catch (NanOrInfinity ex) {
						return -1.0;
					}*/
					return MathFunctions::math_sqrt(value);
				}

				if ((strcmp(fn_name, "log") == 0) || (strcmp(fn_name, "ln") == 0)) {
					return MathFunctions::math_log(value);
                }
				if (strcmp(fn_name, "log10") == 0) {
					return MathFunctions::math_log10(value);/*log10(value);*/
				}
				if (strcmp(fn_name, "log2") == 0) {
					return MathFunctions::math_log2(value);/*log10(value);*/
                }
				// Funciones trigonométricas:
				if (strcmp(fn_name, "sin") == 0) {
					return MathFunctions::math_sin_test(value);
				}
				if (strcmp(fn_name, "cos") == 0) {
					return cos(value);
                }
				if (strcmp(fn_name, "tan") == 0) {
					return MathFunctions::math_tan(value);/*tan(value);*/
				}
				if (strcmp(fn_name, "asin") == 0) {
					return MathFunctions::math_asin(value);/*asin(value);*/
				}
				if (strcmp(fn_name, "acos") == 0) {
					return MathFunctions::math_acos(value);
                }
				if(strcmp(fn_name, "asec") == 0) {
					return MathFunctions::math_asec(value);/*acos(1.0 / value);*/
				}
				if(strcmp(fn_name, "cot") == 0) {
					return MathFunctions::math_cot(value);/*1.0/tan(value);*/
                }
				if(strcmp(fn_name, "sec") == 0) {
					return MathFunctions::math_sec(value);/*1.0/cos(value);*/
                }
				if(strcmp(fn_name, "csc") == 0) {
					return MathFunctions::math_csc(value);/*1.0/sin(value);*/
				}
				if (strcmp(fn_name, "atan") == 0) {
					return MathFunctions::math_atan(value);
                }
				if(strcmp(fn_name, "sinh") == 0) {
                    return sinh(value);
                }
				if(strcmp(fn_name, "asinh") == 0) {
                    return MathFunctions::math_asinh(value);
                }

				if(strcmp(fn_name, "acosh") == 0) {
					return MathFunctions::math_acosh(value);  /*log(value + sqrt((value * value) - 1.0));*/
                }
				if(strcmp(fn_name, "asech") == 0) {
					/*try {
						return MathFunctions::math_asech(value);
					} catch (EInvalidOp& ex) {
					  return -1.0L;
					} catch(NanOrInfinity ex) {
					  return -1.0L;
					}*/
					return MathFunctions::math_asech(value);
                }
				if(strcmp(fn_name, "cosh") == 0) {
					return cosh(value);
				}
				if(strcmp(fn_name, "tanh") == 0) {
					return tanh(value);
				}
				if(strcmp(fn_name, "coth") == 0) {
					return MathFunctions::math_coth(value);/*(1.0 / tanh(value));*/
                }
				if(strcmp(fn_name, "sech") == 0) {
					return MathFunctions::math_sech(value);/*(1.0 / cosh(value));*/
				}
				if(strcmp(fn_name, "csch") == 0) {
					return MathFunctions::math_csch(value);/*(1.0 / sinh(value));*/
				}
				if(strcmp(fn_name, "acsch") == 0) return MathFunctions::math_acsch(value);

				if(strcmp(fn_name, "atanh") == 0) {
					/*try {

					} catch (NanOrInfinity ex) {
						throw ParsingException(col(), FUNCION_DESCONOCIDA, token);
					}*/
					return MathFunctions::math_atanh(value);
				}
				if(strcmp(fn_name, "acot") == 0) {
					return MathFunctions::math_acot(value);
				}

				if(strcmp(fn_name, "acoth") == 0) {
					return MathFunctions::math_acoth(value);
				}

				if(strcmp(fn_name, "acsc") == 0) {
					return MathFunctions::math_acsc(value);
				}
				if (strcmp(fn_name, "factorial") == 0) {
					return MathFunctions::factorial(value);
				}
				if(strcmp(fn_name, "rand") == 0) {
					return MathFunctions::rand_0_to_1();
                }

            } catch (ParsingException err) {
				throw ParsingException(col(), col(), err.get_id(), err.get_msg());
			} catch(NanOrInfinity ex) {
            	// Relanzamos la excepción, indicando que hubo un error
            	throw ParsingException(col(), FUERA_DOMINIO, ex.getWrongNumber());
            }

            // Función desconocida:
            throw ParsingException(col(), FUNCION_DESCONOCIDA, fn_name);
            return 0.0;
        }

		/*
			Evaluar una variable

			Se pasa el nombre de una variable, si ésa existe entonces se devuelve
			su valor, sino se genera una excepción.

			*/
        double eval_variable(const char var_name[]) {

			/* Verificar si la variable es una constante: */
			if (strcmp(var_name, "e") == 0) {
				return 2.7182818284590452353602874713527;
			} else if (strcmp(var_name, "pi") == 0) {
			   return 3.1415926535897932384626433832795;
			} else if(strcmp(var_name, "g") == 0) {
				// TODO: ó 9.81?
				return 9.80665;
			} else if(strcmp(var_name, "random") == 0) {
				// srand((unsigned)time(NULL));
				return (double)std::rand();
            }

			// Verificar por variables definidas por el usuario:
			/*
				Si se está reconociendo una expresión entonces
				solo regresamos un 1.0.
			*/
			if(MathFunctions::evaluate) {
                return 1.0;
            }

			/* Comprobar si la variable existe, si existe regresamos su valor */
			if(user_var.exists(var_name)) {
				return user_var.get_value(var_name);
			}

            // Variable desconocida:
			if(show_error_flag) {
				showError();
			}

			throw ParsingException(col() - 1, VARIABLE_DESCONOCIDA, var_name);
            return 0;
        }

		inline void showError(void) {
			for (int j = 0; j <= col(); j++) {
				std::cout << '~';
			}
			std::cout << '^';
            std::cout << std::endl;
		}
};

#endif


