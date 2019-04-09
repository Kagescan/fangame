# Retaining's Memories (v2.1)
Retaining's Memories : A kagerou project fangame.
This is a remake of a fangame that I made with my community.
The version 1 was written in Python but in this remake, the entire code is in C++.

### status
**The game inside this branch is not finished : even if the code is inside the master branch, you can't play. You can just try some features.**  
Because of that, there is not builds of this code.

To do : 
- conditions
- varfiles
- mapfiles
- ...

Done :
- loads script and parse the commands and the arguments
- loads entities (sprites, characters, sounds...)
- display a visual novel (speechs, sounds, choices, waiting, animations, goto/labels...)

### compiling

Written in linux (Xubuntu 18.04 LTS), not tested in Windows.
The commands are for unix systems, adapt this if you're running windows.

1. This code needs the library SFML [http://sfml-dev.org] and uses cpp17 features. You need to compile it, or using builds.
2. Open a terminal inside the root of this repository. 
3. Type this code to build the project (inline compilation, i will add a cmake script later):  
  ```bash
    # Adapt this command with the path of sfml lib (/usr/local/lib, /usr/local/include/SFML ...)
    $ g++ src/main.cpp src/easing.cpp src/game.cpp src/script.cpp \
        -o build/kagepro2 -Wall -g --std=c++17\
        -L/usr/local/lib/ -lsfml-graphics -lsfml-window -lsfml-system -lsfml-audio -lsfml-network \
        -I/usr/local/include/SFML/
  ```
4. If g++ finished his job nicely (without throwing an error), you can run the code !
  ```bash
    $ cd build
    $ ./kagepro2
  ```


### project main page

__For this version, there is not a project page.__  
For the first version (written in python), it is this page : [http://kagescan.legtux.org/fangame]

### contributing
Please contact me before : <kagescan@legtux.org>