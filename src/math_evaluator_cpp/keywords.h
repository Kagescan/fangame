// Contiene funciones relacionadas con el tratamiento de las palabras reservadas.

#ifndef KEYWORDS_H
#define KEYWORDS_H

// Convierte una cadena a mayúsculas:
void to_upper_case(char toUpperStr[], const char str[]) {
	int i = -1;
	do {
		i++;
		toUpperStr[i] = std::toupper(str[i]);
	} while (str[i] != '\0');
}

namespace KeyWords {
	// Regresa true si es una función que necesita de dos parámetros.
	// Por ejemplo: power(1+2, 3+5), min(a, b), mod(a, b).
	bool is_function_double(const char fn_name[]) {
    	// Primero convertimos el parámetro a mayúscula y luego verificamos:
		char fnU[MAX_TOKEN_ID + 1];
		to_upper_case(fnU, fn_name);
		fnU[strlen(fn_name)] = '\0';

		// Comprobar:
		return((strcmp(fnU, "POWER") == 0) || (strcmp(fnU, "SUMA") == 0)   ||
			   (strcmp(fnU, "MIN") == 0)   || (strcmp(fnU, "MAX") == 0)    ||
			   (strcmp(fnU, "MOD") == 0) || (strcmp(fnU, "RAND") == 0));
	}

	// Regresa true si es una función conocida por el parser:
	bool is_function(const char functionName[]) {
		char fnU[MAX_TOKEN_ID + 1];
		to_upper_case(fnU, functionName);
		fnU[strlen(functionName)] = '\0';

		return (strcmp(fnU, "ABS") == 0)       ||
				(strcmp(fnU, "EXP") == 0)       ||
				(strcmp(fnU, "SIGN") == 0)      ||
				(strcmp(fnU, "SQRT") == 0)      ||
				(strcmp(fnU, "RAIZ") == 0)      ||
				(strcmp(fnU, "LOG") == 0)       ||
				(strcmp(fnU, "LN") == 0)        ||
				(strcmp(fnU, "LOG10") == 0)     ||
				(strcmp(fnU, "SIN") == 0)       ||
				(strcmp(fnU, "COS") == 0)       ||
				(strcmp(fnU, "TAN") == 0)       ||
				(strcmp(fnU, "ASIN") == 0)      ||
				(strcmp(fnU, "ACOS") == 0)      ||
				(strcmp(fnU, "ATAN") == 0)      ||
				(strcmp(fnU, "FACTORIAL") == 0)  ||
				(strcmp(fnU, "COT") == 0)       ||
				(strcmp(fnU, "SEC") == 0)       ||
				(strcmp(fnU, "CSC") == 0)       ||
				(strcmp(fnU, "SINH") == 0)      ||
				(strcmp(fnU, "COSH") == 0)      ||
				(strcmp(fnU, "TANH") == 0)      ||
				(strcmp(fnU, "COTH") == 0)      ||
				(strcmp(fnU, "SECH") == 0)      ||
				(strcmp(fnU, "CSCH") == 0)      ||
				(strcmp(fnU, "ACSC") == 0)      ||
				(strcmp(fnU, "ASEC") == 0)      ||
				(strcmp(fnU, "ASINH") == 0)     ||
				(strcmp(fnU, "ACOSH") == 0)     ||
				(strcmp(fnU, "ACSCH") == 0)     ||
				(strcmp(fnU, "ATANH") == 0)     ||
				(strcmp(fnU, "POWER") == 0)     ||
				(strcmp(fnU, "MAX") == 0)       ||
				(strcmp(fnU, "MIN") == 0)       ||
				(strcmp(fnU, "MOD") == 0)       ||
				(strcmp(fnU, "ACOT") == 0) 	   ||
				(strcmp(fnU, "ACOTH") == 0)	   ||
				(strcmp(fnU, "LOG2") == 0)  	||
				(strcmp(fnU, "RAND") == 0)      ||
				(strcmp(fnU, "ASECH") == 0);
	}

}
#endif


