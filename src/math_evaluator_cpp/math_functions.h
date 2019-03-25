#ifndef MATH_FUNCTIONS_H
#define MATH_FUNCTIONS_H

#define     MATH_EPSILON        0.00000000000001

#include <limits>
#include <cmath>
#include <math.h>
#include "nan_or_infinity.h"
#include <cstdlib>
#include <ctime>

namespace MathFunctions {

	/*
		Variable estática que si está en true, las funciones devuelven un 1.0.
		Por ejemplo, la expresión: (1+2)/sin(pi) está bien escrita, pero el parser
		arrojaría un error en tiempo de ejecución, debido a que sin(pi) = 0,
		hay una división entre 0.

		Esta variable estática nos permite evaluar una expresión sin caer en
		estos errores en tiempo de ejecución. SIEMPRE se devuelve un 1 en las
		evaluaciones de las funciones, por lo tanto así se evitan los errores.

		Por lo tanto quedaría así:
		(1+2)/1

		Lo cual no deriva en un error en tiempo de ejecución.
	*/
	static bool evaluate = false;

	//template<typename T>
	inline bool isinf_2(double value) {
		return value == std::numeric_limits<double>::infinity();
    }

	inline bool is_infinite(double x) {
        double y = x - x;
        return x == x && y != y;
    }

	inline bool isNan(double z) {
		return z != z;
    }
	/*
	 * Calcular el factorial de un valor:
	 */
	double factorial(double value) {
		if(evaluate) return 1.0;

		double res;
		int v = static_cast<int>(value);
		if (value != static_cast<double>(v) || (value < 0.0)) {
			throw ParsingException(-1, VALOR_ENTERO_ESPERADO_EN_FUNCION, "factorial");
		}

		res = v;
    	v--;
		while (v > 1) {
			res *= v;
			v--;
		}

		if (res == 0)
			res = 1.0;
		return res;
	}

	inline double log_expr(double x) throw (NanOrInfinity) {

		if(evaluate) return 1.0;

		long double result = log(x);
		if (!isinf_2(result) && !isNan(result) && !is_infinite(result)) {
				return result;
		} else {
			throw NanOrInfinity("Número fuera de dominio", x);
		}
	}

	inline long double math_acot(double x) {
		if(evaluate) return 1.0;
		return ((M_PI / 2.0) - abs(atan(x)));
	}

	inline long double math_acosh(double x) throw(NanOrInfinity) {

		if(evaluate) return 1.0;

		if(x >= 1.0) {
			long double result = log(x + sqrt((x * x) - 1.0));
			if (!isinf_2(result) && !isNan(result) && !is_infinite(result)) {
				return result;
			} else {
				throw NanOrInfinity("Fuera de dominio.", x);
			}
		} else {
			throw NanOrInfinity("Fuera de dominio.", x);
		}
	}
	/**
	   Calcula el signo de un valor dado(value)
	*/
	inline double sign(double value) {

		if(evaluate) return 1.0;

		if (value > 0)
			return 1;
		if (value < 0)
			return -1;
		return 0;
	}

	inline double raiz(double x) throw (NanOrInfinity) {

		if(evaluate) return 1.0;

        long double result = sqrt(x);
		if (!isinf_2(result) && !isNan(result) && !is_infinite(result)) {
			return result;
		} else {
			throw NanOrInfinity("Número fuera de dominio", x);
		}
	}

	inline long double math_acos(double x) throw (NanOrInfinity) {

		if(evaluate) return 1.0;

		if(x >= -1.0 && x <= 1.0) {
			long double result = acos(x);
			if (!isinf_2(result) && !isNan(result) && !is_infinite(result)) {
				return result;
			} else {
				throw NanOrInfinity("Fuera de dominio para la función 'acos'", x);
			}
		} else {
			throw NanOrInfinity("Fuera de dominio para la función 'acos'", x);
		}
	}

	inline long double math_asech(double x) {

		if(evaluate) return 1.0;

		// @antes: 0.00000000000001
		if(fabs(x) < MATH_EPSILON) {
			throw NanOrInfinity("Fuera de rango.", x);
		}
		if(x < 0.0) {
			throw NanOrInfinity("Fuera de rango.", x);
		}
		// @antes: 0.00000000000001
		if(x < MATH_EPSILON) {
			throw NanOrInfinity("Fuera de rango.", x);
		}

		return math_acosh(1.0 / x);
	}

	inline long double math_atan(double x) {

		if(evaluate) return 1.0;

		if(fabs(x - 0.0) < std::numeric_limits<double>::epsilon()) {
			// std::cout << "Iguales ... " << std::endl;
			return 0.0;
		}
		return atan(x);
	}

	inline long double math_asinh(double x) {

		if(evaluate) return 1.0;

		if(fabs(x - 0.0) < std::numeric_limits<double>::epsilon()) {
            return 0.0;
        }
		return log(x + sqrt((x * x) + 1.0));
	}

	inline long double math_atanh(double x) throw (NanOrInfinity) {

		if(evaluate) return 1.0;

		if(fabs(x - 0.0) < std::numeric_limits<double>::epsilon()) {
			return 0.0;
		}
		/*if((x == -1.0) || (x == 1.0)) {
			throw NanOrInfinity("Fuera de dominio", x);
		}*/
		if(fabs(x) >= 1.0) {
            throw NanOrInfinity("Fuera de dominio.", x);
		}
		long double y = (1.0 / 2.0) * log((1.0 + x) / (1.0 - x));
		if (!isinf_2(y) && !isNan(y) && !is_infinite(y)) {
            return y;
		} else {
            throw NanOrInfinity("Fuera de dominio.", x);
        }
	}

	inline long double math_acoth(double x) {

		if(evaluate) return 1.0;

		if(abs(x) < 1.0) {
			throw NanOrInfinity("Fuera de dominio para la función 'acoth'", x);
		}
		return 0.5 * (log((x + 1.0)/x) - log((x - 1.0)/x));
	}

	inline double math_asin(double x) throw (NanOrInfinity) {

		if(evaluate) return 1.0;

		if(fabs(x - 0.0) < std::numeric_limits<double>::epsilon()) {
			return 0.0L;
		}
		if(x < -1.0 || x > 1.0) {
			throw NanOrInfinity("Fuera de dominio para la función 'asinh'", x);
		}

		long double result = asin(x);
		if (!isinf_2(result) && !isNan(result) && !is_infinite(result)) {
			return result;
		} else {
			throw NanOrInfinity("Número fuera de dominio", x);
		}
	}

	inline long double math_acsc(double x) throw (NanOrInfinity) {

		if(evaluate) return 1.0;

		if(x <= 1.0 && x >= 1.0) {
			throw NanOrInfinity("Fuera de dominio para la función 'acoth'", x);
		}
		return math_asin(1.0 / x);
	}

	inline long double math_acsch(double x) throw (NanOrInfinity) {
		if(evaluate) return 1.0;
		  
		  if(fabs(x - 0.0) < std::numeric_limits<double>::epsilon()) {
			throw NanOrInfinity("Fuera de dominio.", x);
          }
		  return log(sqrt(1.0 + (1.0/(x * x))) + (1.0/x));
	}

	inline long double math_asec(double x) throw(NanOrInfinity) {

		if(evaluate) return 1.0;

		long double y = acos(1.0 / x);
		if (!isinf_2(y) && !isNan(y) && !is_infinite(y)) {
			return y;
		} else {
            throw NanOrInfinity("Valiendo asec", x);
        }
    	return y;
	}

	inline long double math_cot(double x) {

		if(evaluate) return 1.0;

		long double result = 0.0;

		try {

			double b = (cos(2.0 * x) - 1.0);

			if(b == 0.0) {
				throw NanOrInfinity("Fuera de rango.", x);
			} else {

			}
			result = -(sin(2 * x)/b);
			return result;

		} catch (...) {
			throw NanOrInfinity("Fuera de rango.", x);
		}
	}

	inline long double math_coth(double x) throw (NanOrInfinity) {

		if(evaluate) return 1.0;

		if(fabs(x - 0.0) < std::numeric_limits<double>::epsilon()) {
			throw NanOrInfinity("Fuera de rango.", x);
		} else {
			return (1.0 / tanh(x));
		}
	}

	inline long double math_csc(double x) {
		if(evaluate) return 1.0;

		if(fabs(fmod(fabs(x), M_PI) - 0.0) < std::numeric_limits<double>::epsilon()) {
			throw NanOrInfinity("Fuera de rango.", x);
		} else {
			return (1.0 / sin(x));
		}
	}

	inline long double math_csch(double x) {
		if(evaluate) return 1.0;
		 if((fabs(sinh(x) - 0.0) < std::numeric_limits<double>::epsilon()) ||
			(fabs(x - 0.0) < std::numeric_limits<double>::epsilon())) {
			 throw NanOrInfinity("Fuera de rango.", x);
		 } else {
			 return (1.0 / sinh(x));
		 }
	}

	inline double math_log(double x) {

		if(evaluate) return 1.0;

		if(fabs(x) < 0.0) {
            throw NanOrInfinity("Fuera de dominio.", x);
        }
		if(x > 0.0) {
			return log(x);
		} else {
            throw NanOrInfinity("Fuera de dominio.", x);
        }
	}

	inline long double math_log10(double x) {

		if(evaluate) return 1.0;

		if(x < 0.0) {
		   throw NanOrInfinity("Fuera de rango.", x);
		// @antes: 0.00000000000001
		} else if(x == 0.0 || fabs(x) < MATH_EPSILON) {
			throw NanOrInfinity("Fuera de rango.", x);
		} else {
			return log10(x);
        }
	}

	inline long double math_log2(double x) {

		if(evaluate) return 1.0;

		if(x < 0.0) {
		   throw NanOrInfinity("Fuera de rango.", x);
		} else if(x == 0.0 || fabs(x) < MATH_EPSILON) {
			throw NanOrInfinity("Fuera de rango.", x);
		} else {
			return log(x) / log(2.0);
		}
	}

	inline long double math_sec(double x) {

		if(evaluate) return 1.0;

		//return ((2.0 * cos(x)) / (cos(2.0 * x) + 1.0));
		// @antes: 0.00000000000001
		if(fabs(cos(x)) < MATH_EPSILON) {
			throw NanOrInfinity("Fuera de rango.", x);
		} else {
            return 1.0 / cos(x);
        }
	}

	inline long double math_sech(double x) {
		if(evaluate) return 1.0;
		return ((2.0 * cosh(x)) / (cosh(2.0 * x) + 1.0));
	}

	inline long double math_sqrt(double x) {

		if(evaluate) return 1.0;

		// @antes: 0.00000000000001
		if(fabs(x) < MATH_EPSILON) {
			return 0.0;
		}
		if(x > 0.0) {
			return sqrt(x);
		} else {
			throw NanOrInfinity("Fuera de rango.", x);
		}
	}

	/*
    	Regresa el valor tangende de x.
	*/
	inline long double math_tan(double x) {

		if(evaluate) return 1.0;

		if(fmod(x, M_PI) == M_PI_2) {
			throw NanOrInfinity("Fuera de rango.", x);
			// @antes: 0.00000000000001
		} else if(fabs(fmod(x, M_PI)) < MATH_EPSILON) {
			return 0.0;
		} else {
            return tan(x);
        }
    }

	// Función que devuelve un número aleatorio entre 0 y 1.
	// Se hace la suposición de que ya se está randomizado.
	inline double rand_0_to_1(void) {
		if(evaluate) return 1.0;
		return (double)std::rand() / (double)RAND_MAX;
	}

	/*
    	Regresa un número aleatorio entre dos límites (min - max)
	*/
	/*inline double rand_between(double min, double max) {
		if(evaluate) return 1.0;
		return ((double(std::rand()) / double(RAND_MAX)) * ((max + 1) - min)) + min;
	}*/

    /*
		Regresa un número aleatorio entre dos límites (min - max)
	*/
	inline int rand_int_between(int min, int max) {
		if(evaluate) return 1.0;
		return min + (std::rand() % (int)(max - min + 1));
	}

	inline double math_sin_test(double x) {

		if(evaluate) return 1.0;

		double temp = sin(x);
		if(fabs(temp - 0.0) < std::numeric_limits<double>::epsilon()) {
            return 0;
        }
    	return temp;
	}

}

#endif
