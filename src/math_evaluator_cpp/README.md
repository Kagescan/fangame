A tiny c++ math library for evaluate and recognize expressions.
===============

Example:
--------------

    try {
        Parser evaluator;
        char expression[] = "1.0e0 + 2 * 3 - 123^2.0";
        evaluator.evaluate_expression_with_exception(expression);
        evaluator.parse(expression);

        double result = evaluator.get_numeric_answer();

        cout << "Ans: " << result << endl;

    } catch(ParsingException ex) {
        cout << "Error: " << ex.get_msg() << ", at " << ex.get_col() << endl;
    }


**Features:**
--------------

**Operators:**

    && ||
    == != < > <= >=
    + -
    * / %
    ^
    !
    Scientific notation

**Functions:**

    - factorial
    - log
    - acot
    - acosh
    - sign
    - acos
    - asech
    - atan
    - asinh
    - atanh
    - acoth
    - asin
    - acsc
    - acsch
    - asec
    - cot
    - coth
    - csc
    - csch
    - log10
    - log2
    - sec
    - sech
    - sqrt
    - tan
    - rand_0_to_1
    - sin
    - cos

**Numeric constants:**

    pi
    e
    g (gravity)
    random (random number)

**User defined variables:**

    char expression[] = "sin(pi + x)";        
    p.get_vars().add("x", 1.0);
    p.parse(expression);
    double result = p.get_numeric_answer();

**Recognition:**

    try {
        char expression[] = "pi^2.0 - sin(cos(tan(3.2e0)";
        p.evaluate_expression_with_exception(expression);
        cout << "Ok ... " << endl;
    } catch(ParsingException ex) {
        cout << "Error: " << ex.get_msg() << endl;
    }

**Evaluation:**

    try {
        char expression[] = "pi^2.0 - sin(cos(tan(3.2e0)))";
        p.evaluate_expression_with_exception(expression);
        p.parse(expression);
        double r = p.get_numeric_answer();
        cout << "Ok ... " << r << endl;
    } catch(ParsingException ex) {
        cout << "Error: " << ex.get_msg() << endl;
    }

**Arrays:**

    Parser p;
    p.get_arrays().create_array("a");
    
    for(int i = 1; i <= 10; i++) {
        p.get_arrays().add_element_to_array("a", (double)i);
    }

    try {
        char expression[] = "a[sin(pi) + 2]^3";
        p.parse(expression);
        double r = p.get_numeric_answer();
        cout << "Ok ... " << r << endl;
    } catch(ParsingException ex) {
        cout << "Error: " << ex.get_msg() << endl;
    }


**Tokenization:**

    try {
        char expression[] = "a[sin(pi) + 2]^3";
        Parser p;
        p.extract_tokens(expression);

        vector<Lexema> tokens = p.get_lexemas_positions();

        for(size_t i = 0; i < tokens.size(); i++) {
            cout << tokens[i] << endl;
        }

    } catch(ParsingException ex) {
        cout << "Error: " << ex.get_msg() << endl;
    }

Output:

    {a, init(0), tipo(OPERADOR)}
    {[, init(1), tipo(DELIMITADOR)}
    {sin, init(2), tipo(FUNCION)}
    {(, init(5), tipo(DELIMITADOR)}
    {pi, init(6), tipo(VARIABLE)}
    {), init(8), tipo(DELIMITADOR)}
    {+, init(10), tipo(DELIMITADOR)}
    {2, init(12), tipo(NUMERO)}
    {], init(13), tipo(DELIMITADOR)}
    {^, init(14), tipo(DELIMITADOR)}
    {3, init(15), tipo(NUMERO)}

**Function domain checking (trigonometric functions):**

    try {
        Parser p;
        char expression[] = "1 + asin(1.2)";
        p.evaluate_expression_with_exception(expression);
        p.parse(expression);
    } catch(ParsingException ex) {
        cout << "Error: " << ex.get_msg() << endl;
    }

Output:

    Error: out of domain for function '1.200000'
