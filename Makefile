#Kagerou Project Fangame : makefile for debug only
#make a release -DNDEBUG
#minimum std version : C++11 but compiling under the c++17 for linux only, using sfml 2.4.2 (in windows)
#adapt the makefile with your system !! (windows/linux)

#Note : if you are using windows and the compiler says "to_string" or "stoi" is not a member of std even if you're using a c++11 or later,
#use this patch : http://tehsausage.com/mingw-to-string - this is a known bug of mingw !
EXEC=fangame.exe

ifeq ($(OS),Windows_NT)
	CFLAGS=-Wall -g -IC:\SFML-2.4.2\include -std=c++11
	LDFLAGS=-LC:\SFML-2.4.2\bin -LC:\SFML-2.4.2\lib -lsfml-graphics-d -lsfml-window-d -lsfml-system-d -lsfml-audio-d -lsfml-network-d -std=c++11 -Og
else
	CFLAGS=-Wall -g -I/usr/local/include/SFML/ -std=c++17
	LDFLAGS=-L/usr/local/lib/ -lopenal /usr/local/lib/libsfml-graphics.so /usr/local/lib/libsfml-window.so /usr/local/lib/libsfml-system.so /usr/local/lib/libsfml-audio.so /usr/local/lib/)libsfml-network.so -std=c++17 -Og
	EXEC=fangame
endif

CXX=g++
objOut=obj/
buildOut=./



fangame : button.o game.o main.o novel.o easing.o
		$(CXX) -o $(buildOut)fangame $(objOut)button.o $(objOut)game.o $(objOut)novel.o $(objOut)easing.o $(objOut)main.o $(LDFLAGS)

button.o : button.cpp
		$(CXX) $(CFLAGS) -c button.cpp -o $(objOut)button.o

game.o : game.cpp
		$(CXX) $(CFLAGS) -c game.cpp -o $(objOut)game.o

novel.o : novel.cpp
		$(CXX) $(CFLAGS) -c novel.cpp -o $(objOut)novel.o
		
easing.o : easing.cpp
		$(CXX) $(CFLAGS) -c easing.cpp -o $(objOut)easing.o -w

main.o : main.cpp button.cpp game.cpp
		$(CXX) $(CFLAGS) -c main.cpp -o $(objOut)main.o

clean:
		rm -rf $(objOut)*.o
		mkdir -p $(objOut)
		mkdir -p $(buildOut)

mrproper: clean
		rm -rf $(buildOut)fangame
