RETAINING'S MEMORY - language DOCUMENTATION 2.1.02
=================================================

In contrary of most visual novel games, Retaining's Memory wasn't made with Renpy.  
Renpy is a really grat project, I have no objections. But I wanted to add "My touch" : add an attractive side with mini-game between some parts of the story !

As i said before, I didn't used Renpy... I literraly made my own visual novel engine !  
I agree this isn't as perfect as most other engines, but i wanted to add the DIY/ludic side in this project.

Then there is the documentation of this engine !

The scripting/parsing side of the engine is inside the script.cpp file, and the helpers are mostly inside game.cpp .
Notice that this game is firstly French. I intent to translate it after I will made a release version.

Actually, this language have no name... Examples inside this document aren't tested yet...

## Index

* [I.   This language and the general syntax](#I. This language and the general syntax)
* [II. Variables and math evaluations.](#II. Variables and math evaluations.)
  * A - Access and edit the value of a variable
  * B - Math evaluation
  * C - Entities
  * D - Special Variables
* [III. Statements](#III. Statements)
  * A - Labels and goto
  * B - Conditions
  * C - For loop
* [IV. The real documentation !](#IV. The real documentation !)
  * A - Language basics
  * B - Engine control
  * C - Rendering / Interactions

## I. This language and the general syntax

This language is mostly inspired from the batch (MS-DOS/Windows console's language). Batch isn't powerful but easy to learn and understand.

A script is a text file that contains sequence of instructions. Each line is an instruction to interpret.  
The first word is a command, and the rest of the line is the argument of the command.
If there is `::` in the beginning of the line, it will be ignored (this is a comment).

The program will make a copy of the source code without empty lines in the memory, and interpret it line by line inside the main loop. A script can call another script like if it were called alone, so the program will make one more copy and not free the old script's memory. Don't call too much scripts too many times in a row, and don't forget to end the script with the quit command or jump into the end of the file.

As you could see, instead of most other languages, this program will execute line by line the script without checking anything (syntax...) . If there is an error somewhere, you should produce the error to get a message !

```
:: example program
echo Hello
echo This is a test for the syntax

:: output :
:: >Hello
:: >This is a test for the syntax
```

## II. Variables and math evaluations.

### A - Access and edit the value of the variable

A variable is a entity of a programming language that can store a value. It is like a small letter recognized by it's name, that the program can access to its content.

Variables works like the batch language : they are all "strings" (character sequences) even if the value is only a number.

**To declare a variable or edit its value**, you will use the command `set`. The syntax is `set (<object>) varName = value`  
Don't worry with the `<object>`, it will be explained later.

Set will access (or define) the variable with the name before the `=` sign, and assign the value after the `=` into this variable.  
`<object>` is optional. For simple variables, is just another way to do this : `set varName.object = value`, but it isn't recommended, because it will be used later with the entity command.

**To access to the variable's value**, you should just write the name of the variable between the `%` character. Like the batch, `%(varName)%` will be replaced just before the argument of a command, so the value of a variable can be the entire argument of a command.

Instead of other programming languages, the NULL value is `none` (can be used directly in the set or the say/$ay command). You can use it to declare variables with empty values.

```
set test = Hello
set <name> test = Logan
set year = 2019
set emptyValue = none
set argument = %test% I'm "%test.name%". We are in %year%.

echo %argument% Empty Value : "%emptyValue%"

:: Output : 
:: >Hello I'm "Logan". We are in 2019. Empty Value : ""
```

### B - Math Evaluation

You can make calculus or test expressions using the math evaluation feature. The syntax is `${Evaluation}` and like the variables, `${Evaluation}` will be replaced with the return value of the evaluation.

__Supported operations :__  
Basic : `+, -, *, /` (Plus, Minus, Multiply, Divide)  
Other : `%, ^, ()`  (Modulus, Power, Parenthesis priorities)  
Conditions : `>, >=, <, <=, ==, !=` (Larger, Larger than, Less, Less than, Equal, Different)  
Logic : `&&, ||, !` (And, Or, Not)  
Note : 0 is interpreted as false and 1 as true.

```
set u0 = ${1+1}
echo u(n+1) = u(n) * (3 + n)
  set u1 = ${ %u0% * (3 + 1) }
  set u2 = ${ %u1% * (3 + 2) }
  set u3 = ${ %u2% * (3 + 3) }

echo u0 = %u0% u1 = %u1%  u2 = %u2%  u3 = %u3%

echo NOTE : 1 = true, 0 = false
echo is 1+1 = 2 ? Answer : ${1+1 == 2}
echo is 4 > 0 and 4 < 5 : ${4>0 && 4<5}
echo Modulus is the rest of the euclidian division. 6/4 = 1*4 + ${6%4}
echo So 6 is divisible by 2 : ${6%2}. And for 3, no : ${3%2}  
```

### C - Entities

Entities are special variable, you can for example import pictures, make characters, save variables into a file...  
The syntax for declaring an entity is like the `set` command with objects. You just have to declare the variable using the `entity` command, set his type using `<object>` and add his **value** (depends of the type of entity).

```
:: Like this : 
  entity <image> test = /res/foo/bar.png
  entity <character> baz = Hello World
  set <image> baz = test
  say baz "Hey guys !"

:: Will display "Hello world" : "Hey Guys !" with the sprite "/res/foo/bar.png"
```

Entities have default object to control them. To change their object, you need to use the `set` command.



__Here's a list of all entity types :__

__Image__ : Import a picture, to use with a character entity. 
  * Init value : the relative path of the targeted file.

__Music__ : Import a music file, to use with the `play` command. This will use a stream process : it is used for soundtracks and other large music files.
  * Init value : the relative path of the targeted file.

__Sound__ : Import a sound file, to use with the `play` command. This will load the entire file in the memory : it is used for sounds effects and other small music files.
  * Init value : the relative path of the targeted file.

__Character__ : a character entity, to use with the `say` command.
  * Init value : none
  * `<image>` : value : the variable name of the targeted image entity.
  * `<y>` : value : integer or "reload".
  * `<color>` : value : a hexadecimal color (See III.D for more informations).  
    Change the character's title (name that will be displayed when he will speak) color.
  * `<spriteColor>` : value : a hexadecimal color (See III.D for more informations).  
    Apply a color filter to the displayed sprite.
  * `<position>` : Animate the character's position. *Can only be used with the `animate` command.*
  * `<opacity>` : Animate the character's opacity. *Can only be used with the `animate` command.*
  * `<spritechange>` : Change the sprite of the character using a transition. *Can only be used with the `animate` command.*

__Save__ : Import a save file. To use with the `save` command.
  * value : the relative path of the targeted file.
  * `<any objects>` : objects are used to store a value, and can be loaded/saved between scripts using the `save` command.

### D - Special variables

There are default variables, defined when a script file is loaded.

* `__bar__` : actually, you can change his color using the `color` object.

## III. Statements

### A - Labels and goto

Labels and goto are acting like batch : you can drop a label inside a part of your code, and you can jump into the line of the label using goto

```
echo hello
goto label1

:label2
  echo hello2
  echo :)
goto end

:label1
  echo hello1
goto label2

:end
echo ending of the file
```
There are also special labels. They are mainly used in the choice command.

* **continue** : don't jump. It has the same effect of commenting the goto. 
* **begin** : jump to the first command of the file

### B - Conditions

Like all programing languages, you can use if/else if/else blocks like this : 

In a `if` statement, the condition is respected if and only if there is the number `1` inside the argument.  
You should close the statement with the `end if` command.

```
set test = 9
if ${1+1 == 3}
  echo Shouldn't display because 1+1 = 2 and not 3.
else if 0
  echo Shouldn't display because 0 = false.
else if ${1+1 == 2}
  echo Should display because 1+1 = 2
else
  echo Shouldn't display because the last condition is valid (returned 1).
end if
```
### C - For loop

The for syntax took inspiration from ECMA but has a really different system.  
The argument is split in 3 parts, separated with `,`.

* The first part is the initialization. You should declare a variable by entering his name and you could add its value by entering `:` and his value. The default value for a variable is `0`.
* The second part is a condition. The block will loop until the condition is not respected.
* the final part is the new variable value at the end of the loop.

```
for i, %i%<=5, %i%+1
  echo %i%
end for
:: End Loop

echo As you can see, the variable isn't local ! >>%i%<<

::it is like doing this : 

  set i=0
  :label_1
    echo %i%
    set i = %i%+1
    goto label_${%i%<=5}
  :label_0
    :: End loop.
```

### D - Other

* **Colors** : In some commands, you can change the color of something. Use a hexadecimal color code (#XXXXXX, search in google if you don't know what is it). You can add a transparency value too, by adding an additional hexadecimal value : #ff0000aa will make a transparent color of the value AA (= 1010 1010 in binary => 170(/255) in decimal). 

...

##  IV. The real documentation !

* `...` means that the argument can be repeated.
* `WORDS` in uppercase can be replaced with a specified value.
* `words` in lowercase cannot be replaced (pre-defined arguments...)
* An argument between `()` is optional.
* An argument between `[choice1 | choice2 | ...]` is an argument that can be `choice1`, or `choice2`, or `...`.
* A `variable string` is a string of characters that contains only `$`, `_`, `.`, and alpha-numerics characters (A->Z, a->z, 0->9)


### A - Language basics

**set** - Define and edit global variables. *See II.A for more informations*  
Syntax : `set (<OBJECT>) VARIABLE = VALUE`. 

* OBJECT (can be a `variable string`) : The object of the variable to edit. Optionnal.
* VARIABLE (can be a `variable string`) : The name of the variable to edit.
* VALUE (can be a string) : Will be the value of the variable. To define a variable (set an empty value), use `none` keyword as value.

**entity** - Define an entity. *See II.C for more informations*   
Syntax : `entity <TYPE> VARIABLE (= VALUE)`. 

* TYPE (can be a `variable string`) : The type of the entity to define.
* VARIABLE (can be a `variable string`) :  The name of the entity.
* VALUE (can be a string) : The argument of the initialization of the entity.

**for** - a for loop. *See III.C for more informations*  
Syntax :

```
for VARIABLE(:INT), BOOL, NEWVARVALUE
  BLOCK
end for
```

* VARIABLE (can be a `variable string`) :   A variable to define as initialization.
* INT (can be a number - optional - default value : 0) :  The value to define for the variable initialized.
* BOOL (can be a math evaluation). When the engine reach `end for`, if the evaluation return true, the engine will jump into the beginning of the block, else, it continue.
* NEWVARVALUE (can be anything) : When the engine reach `end for`, variable will take the value NEWVARVALUE.
* __Warning__ : Don't use the command goto or choice in this block.

**if else else if** - statements. *See III.B for more informations*  
Syntax :

```
if BOOL
  BLOCK
(else if BOOL
  BLOCK)
(else if BOOL
  BLOCK ...)
(else
  BLOCK)
end if
```
* BOOL : can be `0` or `1` (math evaluation) .
* BLOCK : can be a delimited and fixed block of code.
* __Warning__ : Don't use the command goto or choice in this block.

Note : using `goto` or `choice` inside a block may cause issues
In that case, you can use labels and mathematics evaluations !

```
echo Testing if 1+1 equal 2 
goto conditionA_${1+1==2}
  :conditionA_1
    echo test
    ::In a if block, this could make a bug !
    goto coolLabel

  :conditionA_0
    echo this is false ! Strange...
:endConditionA

quit fade

:coolLabel
  echo This is true ! 1+1 == 2
quit fade
```

**end** - End a block.  
Syntax : `end [for|if]`

**echo** - Output the argument given in the console.  
Syntax : `echo ANY`

* ANY : can be a string.

### B - Engine control

**playscript** - read another script file and continue when the script is ended. 
Syntax : `playscript PATH`

* PATH : relative path of a script file.
* Note : due to performance issues, don't call too much script recursively. Using this command will load a new engine instance and will quit until the script is explicitly ended.

**goto** - jump into a place of the code using label. *See III.A for more informations*  
Syntax : `goto LABEL`

* LABEL (can be a `variable string`) : Jump into the line of the label.

**save** - make variable saves.  
Syntax : `save [write|reload|log] ENTITYNAME`

* ENTITYNAME (can be a `variable string`) : It should be previously declared with the `entity` command.
* `write` : write the data into the file associated with ENTITYNAME.
* `reload` : update the data from the file associated with ENTITYNAME.
* `log` : output (in std::cout) the data associated with ENTITYNAME.

**quit** - quit the engine instance  
Syntax : `quit ANIMATION`

* ANIMATION : not implemented yet. So at the moment, can be anything.


### C - Rendering / Interactions
**animate** - animate things of entities  
Syntax : `animate <OBJECT> VARIABLE /OPTION VALUE (/OPTION VALUE...)`

1. OBJECT (can be a `variable string`) :  What to animate *(depends of the entity type of VARIABLE)*.
2. VARIABLE (can be a `variable string`) :  The reference of the entity to animate. *Actually, the entity type should only be a character.*
3. (pair of arguments + ...)
  * OPTION (can be a `from`, `to`, `ease`, `time`) : arguments to control the command.
  * VALUE : depends of the OPTION.

**music** - manage audio entities  
Syntax : `music ENTITYNAME [play|stop|pause]`

1. ENTITYNAME (can be a `variable string`) : the name of the audio entity to treat.
2. [play|stop|pause]
  * `play` : play the audio associated with ENTITYNAME .
  * `stop` : stop the audio associated with ENTITYNAME.
  * `pause` : pause the audio associated with ENTITYNAME.

**choice** - display a menu of choices and jump into an assigned label  
Syntax : `choice "TITLE" = LABEL "TITLE" = LABEL ("TITLE" = LABEL ...)`

1. (pair of arguments + ...)
  * TITLE (can be anything else `"`) : the text displayed as a choice.
  * LABEL (can be a `variable string`) : will do `goto LABEL` when TITLE is selected.

**say / $ay** - make a character speak  
Syntax : `[say|$ay] CHARACTER "LINE" ("LINE" ...)`

1. [say|$ay]
  * `say` : will wait the user input to continue
  * `$ay` : will not wait the user input to continue. It is usually associated with the `wait` command.
2. CHARACTER (can be a `variable string`) : The name of the character entity.
3. LINE (can be anything else `"`) : say a line in the first quotation, the second line in the second quotation....

**wait** - pause the script for a determinate time / user input  
Syntax : `wait [MILLISECONDS|pause]`

1. [MILLISECONDS|pause]
  * MILLISECONDS (can be an integer) : pause the script for ... milliseconds.
  * `pause` : wait the user input to continue : pause the script until the user press space or enter touch.