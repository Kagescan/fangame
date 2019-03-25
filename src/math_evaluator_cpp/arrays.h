#ifndef ARRAYS_H
#define ARRAYS_H

#include <vector>
#include <algorithm>
#include <cstring>
#include "constantes.h"

class Arrays {

    private:

		struct Array {
			public:
				char array_name[MAX_TOKEN_ID];
                std::vector<double> array_values;
                char description[MAX_TOKEN_ID];
				// Métodos:
                inline double& operator[](size_t index) {
                    return array_values[index];
                }
        };

        struct sort_key_var {
            inline bool operator() (const Array& a_1, const Array& a_2) {
                return (std::string(a_1.array_name).compare(a_2.array_name) < 0);
			}
		};

        std::vector<Array> array_list;

    public:

        ~Arrays() {
        }

        std::vector<Array> &get_array_list(void) {
            return array_list;
        }

		inline void sort(void) {
			std::sort(array_list.begin(), array_list.end(), sort_key_var());
		}

		inline Array& operator[](size_t index) {
            return array_list[index];
        }

        friend std::ostream& operator<<(std::ostream& out, const Arrays& arr_list) {
            out << std::endl;
            for(unsigned int i = 0; i < arr_list.array_list.size(); i++) {

                out << "Array{name{" << arr_list.array_list[i].array_name << "}, values{";

                for(size_t vi = 0; vi < arr_list.array_list[i].array_values.size(); vi++) {
                    out << arr_list.array_list[i].array_values[vi] << " ";
                }
                out << "}, Desc{"
                << arr_list.array_list[i].description
                << "}}"
                << std::endl;
            }
            return out;
        }

        inline int get_index(const char* name) const {
            for(size_t i = 0; i < array_list.size(); i++) {
                if(strcmp(name, array_list[i].array_name) == 0) {
                    return i;
                }
            }
            return -1;
        }

        inline bool exists(const char* name) const {
			for(size_t i = 0; i < array_list.size(); i++) {
				if(strcmp(name, array_list[i].array_name) == 0) {
					return true;
				}
			}
            return false;
		}

        inline bool add(const char* name, std::vector<double> array_values) {
			// Crear la variable e inicializarla:
			Array new_array;

			strncpy(new_array.array_name, name, MAX_TOKEN_ID);
			strcpy(new_array.description, "");

            // Copiar valores al array:
			for(size_t i = 0; i < array_values.size(); i++) {
                // std::cout << "Copiando[" << array_values[i] << "]" << std::endl;
                new_array.array_values.push_back(array_values[i]);
			}
			// La variable no existe, crearla.
			if(exists(name) == false) {
				array_list.push_back(new_array);
			} else {    // La variable sí existe, crearla
				int index = get_index(name);
				array_list[index] = new_array;
			}
			return true;
		}

        inline void clear_arrays(void) {
            array_list.clear();
        }

        inline int array_count(void) const {
            return array_list.size();
        }

		inline size_t size(void) const {
            return array_list.size();
        }

        inline bool change_name(const char* old_name, const char* new_name) {
            if(exists(old_name)) {
                int index = get_index(old_name);
                strcpy(array_list[index].array_name, new_name);
                return true;
            }
            return false;
        }

        inline bool del(const char* name) {
            if(exists(name)) {
                array_list.erase(array_list.begin() + get_index(name));
                return true;
			}
            return false;
        }

        inline bool change_description(const char* name, const char* new_description) {
            if(exists(name)) {
                int index = get_index(name);
                strcpy(array_list[index].description, new_description);
                return true;
            }
            return false;
        }

        inline bool create(const char* name) {
            if(exists(name)) {
                return false;
            } else {
                Array new_array;
                strncpy(new_array.array_name, name, MAX_TOKEN_ID);
                strcpy(new_array.description, "");
                array_list.push_back(new_array);
                return true;
            }
        }

		inline bool add_element(const char* name, double value) {
			// Si existe se agrega el valor al array y se regresa true
			if(exists(name)) {
				size_t index = get_index(name);
				array_list[index].array_values.push_back(value);
				return true;
			}
            return false;
        }

};

#endif
