#!/bin/bash


if g++ main.cpp script.cpp --std=c++17; then 
	./a.out
else 
	echo "Failure"; 
fi

echo -e "\n\nended"
read
