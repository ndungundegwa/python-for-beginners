# Glossary

Short definitions of the words used in this course, in alphabetical order. The topic number in brackets shows where each idea is introduced.

Algorithm
: A finite, unambiguous sequence of steps that solves a class of problems. (Topic 1)

Append
: To add an item at the end of a list, with `list.append(item)`. (Topic 10)

Argument
: A value you give to a function when you call it, such as `5` in `double(5)`. (Topic 6)

Assignment
: Giving a name to a value with `=`, as in `score = 10`. The right side is worked out first, then stored under the name on the left. (Topic 3)

Attribute
: A value stored on an object, such as `self.name`. (Topic 17)

Block
: A group of lines indented under a line ending with `:` — the body of an `if`, a loop, a function or a class. (Topic 9)

Boolean
: A value that is either `True` or `False`. (Topic 8)

Bug
: A mistake in a program that makes it crash or give wrong results.

Call
: To run a function by writing its name followed by parentheses, such as `print_none()`. (Topic 6)

Class
: A blueprint for creating objects, defined with `class`. (Topic 17)

Comment
: Text after `#` that Python ignores, used to explain code. (Topic 1)

Composition
: Building a class out of other objects stored as attributes — a **has-a** relationship. (Topic 18)

Concatenation
: Joining strings together with `+`. (Topic 4)

Condition
: A Boolean expression that decides whether an `if` block runs or a `while` loop continues. (Topic 9)

Constant
: A variable whose value never changes, written in capitals by convention, such as `MAX_VALUE`. (Topic 6)

Debugging
: Finding and fixing bugs. (Topic 16)

Dictionary
: A collection of key–value pairs, used to look up a value by its key: `{"milk": 60}`. (Topic 14)

Docstring
: A string in triple quotes just under a `def` line, documenting what the function does. (Topic 7)

Escape sequence
: A backslash code that stands for a special character inside a string, such as `\n` for a new line. (Topic 4)

Exception
: An error that happens while a program is running, such as `ValueError`. (Topic 16)

Expression
: A piece of code that has a value, such as `3 + 4` or `age >= 18`.

f-string
: A string starting with `f` in which `{...}` parts are replaced by values: `f"Hi {name}"`. (Topic 4)

File object
: What `open` gives you: an object you can read from or write to. (Topic 15)

Float
: A number with a decimal point, such as `3.14`. (Topic 2)

Function
: A named, reusable piece of code, defined with `def`. (Topic 6)

Import
: Loading a module so you can use its functions, with `import` or `from ... import`. (Topic 7)

Index
: The position of an item in a sequence, counting from 0. (Topic 11)

Infinite loop
: A loop whose condition never becomes false, so it never ends. (Topic 10)

Inheritance
: Creating a class that gets the attributes and methods of another class — an **is-a** relationship. (Topic 18)

Input
: Data given to a program, for example typed by the user and read with `input()`. (Topic 5)

Instance
: An object created from a class. (Topic 17)

Integer
: A whole number, such as `42`. Its type is `int`. (Topic 2)

Interpreter
: The program that reads and runs Python code. In Colab it runs on Google's computers and shows the results below each cell; on your own computer, its interactive shell shows the `>>>` prompt. (Topic 1)

Keyword
: A word with a special meaning in Python, such as `if`, `for` or `def`, which can't be used as a name. (Appendix)

List
: An ordered, changeable collection of items: `[1, 2, 3]`. (Topics 10–11)

Local variable
: A variable created inside a function, which only exists while the function runs. (Topic 6)

Loop
: Code that repeats: a `for` loop or a `while` loop. (Topic 10)

Method
: A function that belongs to an object or class, called with a dot: `words.append("x")`. (Topics 11 and 17)

Module
: A Python file whose functions and variables can be imported by other programs. (Topic 7)

None
: The special value meaning "nothing", returned by functions that don't use `return`. (Topic 6)

Object
: A value that bundles data (attributes) and behaviour (methods). Everything in Python is an object. (Topic 17)

Parameter
: A name listed in a function definition, which receives an argument when the function is called. (Topic 6)

Polymorphism
: Different kinds of objects responding to the same method call in their own way. (Topic 18)

Program
: A list of instructions that a computer can run. (Topic 1)

Prompt
: The text shown to the user by `input("...")`, such as `"What is your name? "`. (Topic 5)

Pseudocode
: A plan for a program written in plain language before writing the real code. (Topic 12)

Return value
: The value a function sends back with `return`. (Topic 6)

Script
: A Python program saved in a `.py` file. (Topic 1)

Self
: The first parameter of a method, standing for the object the method is working on. (Topic 17)

Slice
: Part of a sequence taken with `sequence[start:stop:step]`. (Topic 13)

String
: A piece of text, written between quotes. Its type is `str`. (Topic 4)

Syntax error
: A mistake in the grammar of the code that stops Python from running it at all. (Topics 1 and 16)

Traceback
: The report Python prints when a program crashes, showing where and why. Read it from the bottom up. (Topic 16)

Tuple
: An ordered collection that can't be changed: `(3, 4)`. (Topic 13)

Type
: The kind of a value — `int`, `float`, `str`, `bool`, `list`, and so on. Check it with `type(x)`. (Topic 5)

Variable
: A name that refers to a value. (Topic 3)
