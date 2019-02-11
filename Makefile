CXX=g++
CFLAGS=-Wall -g -I/usr/local/include/SFML/ -I/usr/include/AL
LDFLAGS=-L/usr/local/lib/ -lsfml-graphics -lsfml-window -lsfml-system -lsfml-audio -lsfml-network --std=c++17
EXEC=fangame
objOut=obj/
buildOut=./

fangame : button.o game.o easing.o script.o main.o
		$(CXX) -o $(buildOut)fangame $(objOut)button.o $(objOut)game.o $(objOut)easing.o $(objOut)script.o $(objOut)main.o $(LDFLAGS)

button.o : button.cpp
		mkdir -p $(objOut)
		mkdir -p $(buildOut)
		$(CXX) $(CFLAGS) -c button.cpp -o $(objOut)button.o

game.o : game.cpp
		$(CXX) $(CFLAGS) -c game.cpp -o $(objOut)game.o

easing.o : easing.cpp
		$(CXX) $(CFLAGS) -c easing.cpp -o $(objOut)easing.o -w

script.o : script.cpp
		$(CXX) $(CFLAGS) -c script.cpp -o $(objOut)script.o

main.o : main.cpp button.cpp game.cpp
		$(CXX) $(CFLAGS) -c main.cpp -o $(objOut)main.o

clean:
		rm -rf $(objOut)*.o

mrproper: clean
		rm -rf $(buildOut)fangame