# Functions

As your programs grow, you'll notice the same few lines appearing again and again. **Functions** let you give a name to a piece of code and then run it whenever you like, as many times as you like. You've already used functions others wrote — `print`, `input`, `len`, `int`. In this topic you'll write your own.

## What functions do

Functions do three things:

1. They **name a piece of code**, the way variables name numbers and strings.
2. They **take arguments** — values you hand to them each time you use them.
3. Using 1 and 2, they let you make your own **mini-programs** or new commands.

You create a function with the keyword `def` (short for *define*). Imagine a small café. Type this into a new code cell:

```python
# this function takes two arguments
def order(drink, snack):
    print(f"One {drink} and one {snack}, please.")

# this one takes one argument
def welcome(name):
    print(f"Karibu, {name}!")

# this one takes no arguments
def closing_time():
    print("Sorry, the café is closed.")


order("chai", "mandazi")
welcome("Baraka")
closing_time()
```

### What you should see

```text
One chai and one mandazi, please.
Karibu, Baraka!
Sorry, the café is closed.
```

Let's break down `order`:

1. `def` tells Python you are **defining** a function.
2. `order` is the function's **name**. Pick a short name that says what it does.
3. `(drink, snack)` are the **parameters**: names for the values the function will receive.
4. The line ends with a **colon** `:`.
5. The lines after it are **indented** by four spaces. Every indented line belongs to the function; this is the function's **body**. Colab indents automatically after a colon.

Defining a function doesn't run it. The body only runs when you **call** the function by writing its name followed by parentheses: `order("chai", "mandazi")`. The values in the parentheses are called **arguments**.

```{note}
"Run", "call" and "use" a function all mean the same thing.
```

```{admonition} Functions in notebooks
:class: tip
Once a cell that defines a function has run, you can call the function from **any** cell below it. A common pattern is one cell for your function definitions and separate cells to try them out. If you **change** a function, run its cell again — otherwise Python keeps using the old version.
```

## The function checklist

Write these checks on a card and keep them next to you for the next few topics.

**When you define a function:**

1. Did you start with `def`?
2. Does the name use only letters, digits and `_` (and not start with a digit)?
3. Is there an opening `(` right after the name?
4. Are the parameters separated by commas, each with a different name?
5. Did you finish the line with `):`?
6. Is every line of the body indented by four spaces — no more, no less?
7. Did you "end" the function by going back to no indentation?

**When you call a function:**

1. Did you type its name exactly?
2. Did you put `(` after the name?
3. Did you put the arguments inside, separated by commas?
4. Did you finish with `)`?

## Arguments can be anything

The values you pass to a function can be numbers, variables, calculations, or a mixture:

```python
def harvest_report(sacks_of_maize, crates_of_tomatoes):
    print(f"We harvested {sacks_of_maize} sacks of maize.")
    print(f"We harvested {crates_of_tomatoes} crates of tomatoes.")
    print("Time to take them to the market!\n")


print("Plain numbers:")
harvest_report(12, 30)

print("Variables:")
maize = 8
tomatoes = 25
harvest_report(maize, tomatoes)

print("Calculations:")
harvest_report(4 + 6, 5 * 3)

print("Variables and calculations together:")
harvest_report(maize * 2, tomatoes + 10)
```

```text
Plain numbers:
We harvested 12 sacks of maize.
We harvested 30 crates of tomatoes.
Time to take them to the market!

Variables:
We harvested 8 sacks of maize.
We harvested 25 crates of tomatoes.
Time to take them to the market!

Calculations:
We harvested 10 sacks of maize.
We harvested 15 crates of tomatoes.
Time to take them to the market!

Variables and calculations together:
We harvested 16 sacks of maize.
We harvested 35 crates of tomatoes.
Time to take them to the market!

```

When you call `harvest_report(maize, tomatoes)`, Python makes the parameter `sacks_of_maize` refer to the value `8` for the duration of the call. The parameters are **not connected** to the variables outside the function: they are temporary names made just for that call.

## Functions can return something

The functions above print things, but they don't *give anything back*. The keyword `return` lets a function hand a value back to whoever called it, so you can store it in a variable:

```python
def add(a, b):
    print(f"ADDING {a} + {b}")
    return a + b

def subtract(a, b):
    print(f"SUBTRACTING {a} - {b}")
    return a - b

def multiply(a, b):
    print(f"MULTIPLYING {a} * {b}")
    return a * b

def divide(a, b):
    print(f"DIVIDING {a} / {b}")
    return a / b


print("Working out a week's budget with functions:")

bus_fare = add(50, 30)
lunch = subtract(150, 30)
rent = multiply(250, 7)
savings = divide(1000, 4)

print(f"Bus fare: {bus_fare}, Lunch: {lunch}, Rent: {rent}, Savings: {savings}")


# A puzzle. Type it in anyway, then solve it by hand in the exercises.
print("Here is a puzzle.")

puzzle = add(bus_fare, subtract(rent, multiply(lunch, divide(savings, 50))))

print("The puzzle gives:", puzzle)
```

```text
Working out a week's budget with functions:
ADDING 50 + 30
SUBTRACTING 150 - 30
MULTIPLYING 250 * 7
DIVIDING 1000 / 4
Bus fare: 80, Lunch: 120, Rent: 1750, Savings: 250.0
Here is a puzzle.
DIVIDING 250.0 / 50
MULTIPLYING 120 * 5.0
SUBTRACTING 1750 - 600.0
ADDING 80 + 1150.0
The puzzle gives: 1230.0
```

When Python runs `bus_fare = add(50, 30)`:

1. It calls `add` with `a` set to `50` and `b` set to `30`.
2. The body prints `ADDING 50 + 30`.
3. `return a + b` works out `80` and sends it back. The function stops here.
4. The value `80` **replaces the call**, so the line becomes `bus_fare = 80`.

In the puzzle, calls are nested inside calls. Python works **from the inside out**: first `divide(savings, 50)`, then `multiply(...)` with that result, and so on — as the printed messages show.

## print is not return

This is one of the most common beginner confusions. `print` shows something on the screen for a human to read. `return` gives a value back to the program so it can keep using it.

A function without `return` still gives something back: the special value `None`, which means "nothing".

```python
def double_print(x):
    print(x * 2)

def double_return(x):
    return x * 2

a = double_print(4)    # shows 8 on the screen
b = double_return(4)   # shows nothing
print(a)               # None
print(b)               # 8
```

```text
8
None
8
```

```{warning}
If you see `None` printed where you expected a value, you've almost certainly forgotten a `return` in one of your functions.
```

## Returning several values

A function can return more than one value by separating them with commas. The caller can then unpack them into several variables:

```python
def pack_eggs(eggs):
    full_trays = eggs // 30
    left_over = eggs % 30
    return full_trays, left_over


collected = 1000
trays, loose = pack_eggs(collected)

print(f"The farm collected {collected} eggs.")
print(f"That fills {trays} trays, with {loose} eggs left over.")
```

```text
The farm collected 1000 eggs.
That fills 33 trays, with 10 eggs left over.
```

Notice that inside the function the values are called `full_trays` and `left_over`, while outside they're `trays` and `loose`. The names inside the function are temporary; `return` sends the **values** out, and you can give them any names you like.

## Variables inside functions stay inside

Variables created inside a function are **local**: they exist only while the function is running. Once it returns, they disappear.

```python
def cube(x):
    result = x * x * x
    return result

cube(10)
print(result)
```

```text
NameError: name 'result' is not defined
```

If you want the result outside, **return** it and store it: `answer = cube(10)`.

```{tip}
In a notebook, a variable called `result` created in an **earlier cell** would be printed here instead of an error — which can hide mistakes. If a notebook behaves strangely, choose **Runtime → Restart session and run all**.
```

Variables created outside any function are **global** and can be read inside functions. It's best to use global variables only for values that never change, called **constants**. By convention their names are written in capital letters:

```python
SHILLINGS_PER_DOLLAR = 129

def to_shillings(dollars):
    return dollars * SHILLINGS_PER_DOLLAR

print(to_shillings(20))
```

```text
2580
```

*(The exchange rate here is only an example.)*

## Exercises

### Exercise: solve the puzzle by hand

Write out the puzzle from the budget program as a normal formula, then calculate it by hand, step by step. Check that you get `1230.0`.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
The line is `add(bus_fare, subtract(rent, multiply(lunch, divide(savings, 50))))`. As a formula:

bus_fare + (rent − (lunch × (savings ÷ 50)))

With bus_fare = 80, lunch = 120, rent = 1750 and savings = 250.0:

1. savings ÷ 50 = 5.0
2. lunch × 5.0 = 600.0
3. rent − 600.0 = 1150.0
4. bus_fare + 1150.0 = **1230.0**
````

### Exercise: your own function, many ways

Write a function `greet(name, times)` that prints `Hello, <name>!` the given number of times on one line (hint: string repetition). Then call it in at least five different ways: with plain values, with variables, with a calculation, with the answer from `input`, and with the result of another function.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def greet(name, times):
    print(f"Hello, {name}! " * times)

greet("Amina", 2)                          # plain values

friend = "Otieno"
count = 3
greet(friend, count)                       # variables

greet("Class", 1 + 1)                      # a calculation

typed_name = input("Your name? ")
greet(typed_name, 1)                       # the result of input

greet("Python".upper(), len("abc"))        # results of other functions
```
````

### Exercise: return, not print

The function below is meant to compute the area of a rectangle so that the program can print twice the area. It doesn't work. What does the program print, and why? Fix it.

```python
def rectangle_area(width, height):
    print(width * height)

area = rectangle_area(3, 4)
print("Twice the area is", area * 2)
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
It prints `12`, then crashes with `TypeError: unsupported operand type(s) for *: 'NoneType' and 'int'`. The function **prints** the area but doesn't **return** it, so `rectangle_area(3, 4)` gives back `None`, and `None * 2` is impossible.
```python
def rectangle_area(width, height):
    return width * height

area = rectangle_area(3, 4)
print("Twice the area is", area * 2)   # Twice the area is 24
```
````

### Exercise: check your checklist

Use the function checklist to find the four mistakes in this code.

```python
def show_total price, tax
print(f"Total: {price + tax}")

show_total(100 16)
Show_total(100, 16)
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
1. The definition is missing the parentheses and colon: it should be `def show_total(price, tax):`.
2. The body isn't indented.
3. The first call is missing the comma between the arguments: `show_total(100, 16)`.
4. The second call spells the name with a capital S; Python names are case-sensitive.
```python
def show_total(price, tax):
    print(f"Total: {price + tax}")

show_total(100, 16)
```
````

### Exercise: BMI as a function

Turn the body mass index calculation from Topic 5 into a function `bmi(weight, height)` that **returns** the BMI. Put the function in one cell. In a second cell, ask the user for their weight and height and print the result using your function.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def bmi(weight, height):
    return weight / height ** 2
```
```python
weight = float(input("Weight in kg: "))
height = float(input("Height in metres: "))
print(f"Your BMI is {bmi(weight, height):.1f}")
```
Because `bmi` returns a number instead of printing it, you could also use it in other ways, for example `if bmi(w, h) > 25:` once you learn about decisions in Topic 9.
````
