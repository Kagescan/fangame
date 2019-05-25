CXX ?= g++
CFLAGS  ?= -Wall --std=c++17 -I/usr/local/include/SFML/ -g
LDFLAGS ?= -L/usr/local/lib/
LDLIBS  ?= -lsfml-graphics -lsfml-window -lsfml-system -lsfml-audio -lsfml-network

#build/kagepro2 : src/main.cpp src/game.cpp src/script.cpp src/easing.cpp
#	$(CXX) src/obj/main.o src/obj/game.o src/obj/script.o src/obj/easing.o $(LDFLAGS) -o $@


# Reconnaître les extensions de nom de fichier *.c et *.o comme suffixes
SUFFIXES ?= .cpp .o 
.SUFFIXES: $(SUFFIXES) .

# Nom de l'exécutable
PROG = build/kagepro2 

# Liste de fichiers objets nécessaires pour le programme final
OBJS =  src/obj/easing.o src/obj/game.o src/obj/script.o src/obj/main.o

all: $(PROG)

# Étape de compilation et d'éditions de liens
# ATTENTION, les lignes suivantes contenant "$(CC)" commencent par un caractère TABULATION et non pas des espaces
$(PROG): $(OBJS)
	$(CXX) -o $(PROG) $(OBJS) $(LDFLAGS) $(LDLIBS) 

src/obj/main.o : src/main.cpp
	$(CXX) -c src/main.cpp -o src/obj/main.o $(CFLAGS)

src/obj/game.o : src/game.cpp
	$(CXX) -c src/game.cpp -o src/obj/game.o $(CFLAGS)

src/obj/script.o : src/script.cpp
	$(CXX) -c src/script.cpp -o src/obj/script.o $(CFLAGS)

src/obj/easing.o : src/easing.cpp
	$(CXX) -c src/easing.cpp -o src/obj/easing.o $(CFLAGS)
