#ifndef LEXEMA_H
#define LEXEMA_H

#include <iostream>
#include <ostream>

using std::ostream;

// Clase Lexema, almacena las secuencias de caracteres.
// "sin", "(", "abs" ...

// Clase Lexema, almacena información sobre cada trozo de cadena.
// El tipo, donde inicia, donde finaliza, y el string que representa.

class Lexema {
	public:
		Lexema(std::string lex, int i, int tipo) :
			lexema(lex), inicio(i), tipo(tipo) {
			final_pos = lex.size();
		}

		~Lexema() {
		}

		inline std::string get_lexema(void) const {
			return lexema;
		}
		inline int get_inicio(void) const {
			return inicio;
		}
		// Regresa la posición donde finaliza el token:
		inline int get_final_pos(void) const {
            return final_pos;
		}
		// Regresa el tipo del lexema
		inline int get_tipo(void) const {
            return tipo;
        }
		friend std::ostream& operator<<(ostream& out, const Lexema& lex) {
			out << '{' << lex.lexema << ", init(" << lex.inicio << "), tipo(";
			switch(lex.tipo) {
				case 0:
					out << "DELIMITADOR";
					break;
				case 1:
					out << "NUMERO";
					break;
				case 2:
					out << "VARIABLE";
					break;
				case 3:
					out << "FUNCION";
					break;
				case 4:
					out << "DESCONOCIDO";
					break;
				case 5:
					out << "OPERADOR";
					break;
			}
			out << ')' << '}';
			return out;
		}
	private:
		std::string lexema;
		int inicio;
		int final_pos;
		int tipo;
};

#endif
