From github math_evaluator_cpp, edited by ShinProg (Logan Tann|Kagescan Community)

A tiny c++ math library for evaluate and recognize expressions.
===============

Example:
--------------

    try {
        Calc evaluator;
        char expression[] = "1.0e0 + 2 * 3 - 123^2.0";
        evaluator.parse(expression);
        double result = evaluator.get_numeric_answer();
        cout << "Ans: " << result << endl;
    } catch(ParsingException ex) {
        cout << "Error: " << ex.get_msg() << ", at " << ex.get_col() << endl;
    }


**Features:**
--------------

**Operators and priority:**

    && ||
    == != < > <= >=
    + -
    * / %
    ^
    !
    Scientific notation (e)