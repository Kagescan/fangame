# Dont' need Qt libs
QT -= core
QT -= gui


# Binary name
TARGET = part_005
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

DISTFILES += ../shaders/example_001.frag \
    ../shaders/example_002.frag \
    ../shaders/example_003.frag \
    ../shaders/example_004.frag \
    ../shaders/example_005.frag \
    example_001.frag \
    example_002.frag \
    example_003.frag \
    example_004.frag \
    example_005.frag \
    example_006.frag \
    example_007.frag
DISTFILES +=




