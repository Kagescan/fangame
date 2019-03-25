#ifndef VARFROMFILE_H
#define VARFROMFILE_H

#include <string>

class VarFromFile {

	public:

		VarFromFile(std::string variable_name) : var_name(variable_name) {}

		~VarFromFile() {}

        inline std::string& get_var_name(void) {
            return var_name;
        }

        inline std::vector<std::string>& get_list_values(void) {
            return list_values;
        }

		friend std::ostream& operator<<(std::ostream& out, const VarFromFile& var_file) {
			out << "'" << var_file.var_name << "' {" << std::endl;
			for(std::vector<std::string>::const_iterator it = var_file.list_values.begin();
					it != var_file.list_values.end(); ++it) {
				out << '\t' << *it << std::endl;
			}
			out << '}' << std::endl;
			return out;
        }

		inline std::string& operator[](unsigned int index) {
			return list_values[index];
        }

	private:

		std::string var_name;					// Nombre de la variable
        std::vector<std::string> list_values;	// Lista de valores
};

#endif
