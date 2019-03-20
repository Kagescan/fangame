#A cmake test...

cmake_minimum_required(VERSION 3.10)

project(kagepro2)
set(lib "test")
add_definitions(-Wall -g --std=c++17 )
find_library(lib sfml-graphics)
message( "${lib}")
# /usr/local/include/SFML/
#-L/usr/local/lib/ -lsfml-graphics -lsfml-window -lsfml-system -lsfml-audio -lsfml-network)

add_executable(kagepro2 src/main.cpp src/easing.cpp src/game.cpp src/script.cpp src/main.cpp)