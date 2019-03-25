#ifndef NAN_OR_INFINITY_H
#define NAN_OR_INFINITY_H

#include <exception>
/**
 * Excepci�n personalizada que es lanzada cuando se da un resultado de NAN o Infinito.

	Se lanza cuando se intenta evaluar una funci�n y se sale de su rango de
	dominio.

 */
 /* NAN significa Not a Number.
	Valores NAN son usados para identificar elementos de punto flotante
	que est�n indefinidos o que no son representables, por ejemplo la ra�z
	de un n�mero negativo, o 0/0 */
class NanOrInfinity : public std::exception {

        public:

			NanOrInfinity(const char* mensaje) : mensaje(mensaje) {}

            NanOrInfinity(const char* mensaje, double wrongNumber) :
                mensaje(mensaje),
                wrongNumber(wrongNumber) {
			}

            inline const char* what() const throw () {
				return mensaje;
			}

			inline const double getWrongNumber(void) const {
                return wrongNumber;
            }

		private:

			const char* mensaje;
            double wrongNumber;
};

#endif

