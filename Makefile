## OPTIONS TO ADAPT WITH YOUR SYSTEM (macros) ##

# Compiler (g++/clang/msvc/mingw64 ?)
CXX ?= g++
# Compilation Flags
CFLAGS  ?= -g -Wall --std=c++17
# Path to libs (for the linker)
LDFLAGS ?= -L/usr/local/lib/
# Include the SFML lib
LDLIBS  ?= -lsfml-graphics -lsfml-window -lsfml-system -lsfml-audio -lsfml-network
# Compile me this ...
OBJS ?=  src/obj/easing.o src/obj/game.o src/obj/script.o src/obj/main.o
# for making that executable :
PROG ?= build/kagepro2 


## STUFF THAT WILL WORK AS LONG AS MACROS ARE VALID : ##

all: $(PROG)

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
