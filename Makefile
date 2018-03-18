CXX=g++
CFLAGS=-Wall -g -I/usr/local/include/SFML/ -I/usr/include/AL -std=c++11
LDFLAGS=-L/usr/local/lib/ -lopenal /usr/local/lib/libsfml-graphics.so /usr/local/lib/libsfml-window.so /usr/local/lib/libsfml-system.so /usr/local/lib/libsfml-audio.so /usr/local/lib/libsfml-network.so -std=c++11
EXEC=fangame
objOut=obj/
buildOut=./


fangame : button.o game.o main.o novel.o easing.o
		$(CXX) -o $(buildOut)fangame $(objOut)button.o $(objOut)game.o $(objOut)novel.o $(objOut)easing.o $(objOut)main.o $(LDFLAGS)

button.o : button.cpp
		mkdir -p $(objOut)
		mkdir -p $(buildOut)
		$(CXX) $(CFLAGS) -c button.cpp -o $(objOut)button.o

game.o : game.cpp
		$(CXX) $(CFLAGS) -c game.cpp -o $(objOut)game.o

novel.o : novel.cpp
		$(CXX) $(CFLAGS) -c novel.cpp -o $(objOut)novel.o
		
easing.o : easing.cpp
		$(CXX) $(CFLAGS) -c easing.cpp -o $(objOut)easing.o

main.o : main.cpp button.cpp game.cpp
		$(CXX) $(CFLAGS) -c main.cpp -o $(objOut)main.o

clean:
		rm -rf $(objOut)*.o

mrproper: clean
		rm -rf $(buildOut)fangame
