# Dont' need Qt libs
QT -= core
QT -= gui


# Binary name
TARGET = part_006
# Console app
CONFIG += console
# Puts the executable into a bundle
CONFIG -= app_bundle
# This is an applications
TEMPLATE = app


# Create directories for temporrary files
OBJECTS_DIR     = tmp
MOC_DIR         = tmp

# Binaries will be placed in the bin directory
DESTDIR         = bin

LIBS += -lsfml-audio
LIBS += -lsfml-graphics
LIBS += -lsfml-network
LIBS += -lsfml-window
LIBS += -lsfml-system

# Sources files
SOURCES += main.cpp

DISTFILES += example_001.frag \
    example_005.frag
DISTFILES += example_002.frag
DISTFILES += example_003.frag
DISTFILES += example_004.frag




