# Modules: Using and Sharing Code

Nobody writes every piece of a program from scratch. Python comes with a huge collection of ready-made functions, grouped into **modules**, and you can make your own modules to reuse your code. In this topic you'll import modules, create one of your own in Colab, and read their built-in documentation.

## Importing a module

A **module** is a Python file full of useful functions and variables. To use one, you **import** it. The `math` module, for example, contains mathematical functions and constants:

```python
import math

print(math.sqrt(81))
print(math.pi)
print(math.floor(7.8))
```

```text
9.0
3.141592653589793
7
```

After `import math`, you get things out of the module with a dot: `math.sqrt` means "the `sqrt` function from the `math` module". The dot is how Python says "get this *from* that".

You can also import just the things you need. Then you use them without the module name:

```python
from random import randint

dice = randint(1, 6)
print(f"You rolled a {dice}")
```

`randint(1, 6)` gives a random whole number from 1 to 6, **both included**. Run the cell several times — you'll get different results.

```{note}
Put your `import` lines at the **top** of your program — in a notebook, often in the very first cell. Anyone reading your code can then see immediately which modules it uses. Remember that the import cell must have **run** before other cells can use the module.
```

Some modules you'll meet in this course:

| Module | Useful for |
|---|---|
| `math` | square roots, π, rounding down/up |
| `random` | random numbers (`randint`), random choices (`choice`), shuffling |
| `sys` | information about the running program, such as command-line arguments |
| `os` | working with folders and files |
| `secrets` | secure random choices, for passwords |

## Making your own module

Any `.py` file is a module. In Colab, you can create a `.py` file straight from a cell with the special command `%%writefile`. Type this into a new cell — `%%writefile wordtools.py` must be the **very first line**:

```python
%%writefile wordtools.py
"""Small helper functions for working with sentences."""

def split_words(sentence):
    """Return a list of the words in a sentence."""
    return sentence.split(" ")

def alphabetical(words):
    """Return a new list with the words in alphabetical order."""
    return sorted(words)

def count_words(sentence):
    """Return how many words a sentence has."""
    return len(split_words(sentence))

def first_and_last(sentence):
    """Return the first and the last word of a sentence."""
    words = split_words(sentence)
    return words[0], words[-1]

def shout(sentence):
    """Return the sentence in capital letters with an exclamation mark."""
    return sentence.upper() + "!"
```

When you run this cell, nothing is calculated. Colab simply saves the cell's contents in a file and replies:

```text
Writing wordtools.py
```

Click the **folder icon** on the left of Colab to see `wordtools.py` in the list of files. Now, in a **new** cell, import your module and use it:

```python
import wordtools

sentence = "Many hands make light work"

words = wordtools.split_words(sentence)
print(words)
print(wordtools.alphabetical(words))
print(wordtools.count_words(sentence))

first, last = wordtools.first_and_last(sentence)
print(first, last)

print(wordtools.shout(sentence))
```

```text
['Many', 'hands', 'make', 'light', 'work']
['Many', 'hands', 'light', 'make', 'work']
5
Many work
MANY HANDS MAKE LIGHT WORK!
```

A few new things appeared:

- `sentence.split(" ")` cuts a string into a **list** of words wherever there's a space. A list is written with square brackets `[...]`; you'll study lists properly in Topic 11.
- `sorted(words)` gives a new list in alphabetical order. (Capital letters come before lowercase ones, which is why `'Many'` is first.)
- `words[0]` is the **first** item of a list and `words[-1]` is the **last**.
- `.upper()` gives a copy of a string in capital letters.
- Inside the module, `count_words` and `first_and_last` call `split_words`: functions in a module can use each other.

```{warning}
Type `import wordtools`, not `import wordtools.py`.
```

```{admonition} Changing your module
:class: tip
If you edit the `%%writefile` cell and run it again, Colab replies `Overwriting wordtools.py` — but a notebook that has already imported the module **keeps the old version**, even if you run `import` again. Choose **Runtime → Restart session**, then run the `%%writefile` cell and the import cell again.

Files you create in Colab are **temporary**: they disappear when the session ends. Just run the `%%writefile` cell again next time.
```

Why bother with a module, when you could simply define the functions in a cell? Because a file can be **shared**: other notebooks, other programs and other people can import it without copying the code.

## Documentation comments

The strings in triple quotes just below each `def` line — and at the top of the file — are called **docstrings**. They document what a function does, and Python can show them to you:

```python
help(wordtools.count_words)
```

```text
Help on function count_words in module wordtools:

count_words(sentence)
    Return how many words a sentence has.
```

`help(wordtools)` shows the documentation for the whole module. Get into the habit of writing a one-line docstring for every function you write — your future self will thank you.

## Arguments from the command line

Programmers often run Python programs from a **terminal** (the command line) by typing the file name, sometimes followed by extra words. The `sys` module gives the program those words in a list called `argv` (the *argument variable*).

Save this program to a file with `%%writefile`:

```python
%%writefile hello_args.py
from sys import argv

script, name, county = argv

print("This program is called:", script)
print("Hello,", name)
print("Greetings to everyone in", county)
```

Then, in a new cell, run it with **two extra words** after the file name, using `%run`:

```python
%run hello_args.py Otieno Kisumu
```

```text
This program is called: hello_args.py
Hello, Otieno
Greetings to everyone in Kisumu
```

The line `script, name, county = argv` **unpacks** the values into three variables, just like `trays, loose = pack_eggs(...)` in Topic 6. The first value is always the program's own name. If you don't give exactly two words, Python complains: `ValueError: not enough values to unpack (expected 3, got 2)`.

Use `input()` when you want to ask the user something *while* the program runs; use `argv` when the user should give the information *when starting* the program. Like `input`, everything in `argv` is a string.

```{note}
`%%writefile` and `%run` are **notebook commands** (called *magics*), not Python. On your own computer, you would save the file in an editor and run `python3 hello_args.py Otieno Kisumu` in a terminal. See [Using Google Colab](appendix/google_colab.md) for more.
```

## Exercises

### Exercise: roll the dice

In a new cell, import `randint` and simulate rolling **two** dice. Print each die and their total. Run the cell several times.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
from random import randint

die1 = randint(1, 6)
die2 = randint(1, 6)

print(f"You rolled {die1} and {die2}.")
print(f"Total: {die1 + die2}")
```
````

### Exercise: circle calculator

Using `math.pi`, write a function `circle_area(radius)` that returns the area of a circle (π × r²), and a function `circumference(radius)` that returns 2 × π × r. Ask the user for a radius and print both, rounded to two decimal places.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
import math

def circle_area(radius):
    """Return the area of a circle."""
    return math.pi * radius ** 2

def circumference(radius):
    """Return the circumference of a circle."""
    return 2 * math.pi * radius

r = float(input("Radius: "))
print(f"Area: {circle_area(r):.2f}")
print(f"Circumference: {circumference(r):.2f}")
```
For a radius of 3, the area is `28.27` and the circumference `18.85`.
````

### Exercise: your own module

Use `%%writefile` to create a module `money.py` containing two functions with docstrings: `add_tax(price)`, which returns the price plus 16% VAT, and `discount(price, percent)`, which returns the price reduced by the given percentage. In a **separate** cell, import your module and use both functions to print the final price of a 2500-shilling item with a 10% discount and VAT added.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
First cell:
```python
%%writefile money.py
"""Helper functions for prices."""

def add_tax(price):
    """Return the price with 16% VAT added."""
    return price * 1.16

def discount(price, percent):
    """Return the price reduced by the given percentage."""
    return price * (100 - percent) / 100
```
Second cell:
```python
import money

price = 2500
reduced = money.discount(price, 10)
final = money.add_tax(reduced)
print(f"Final price: {final:.2f} shillings")
```
This prints `Final price: 2610.00 shillings`: 10% off gives 2250, and 16% VAT on 2250 gives 2610.
````

### Exercise: what does pop do?

Lists have a method `pop` that **removes** an item and gives it back: `pop(0)` removes the first item and `pop(-1)` the last. Predict what is printed, then check in a cell.

```python
words = "one two three four".split(" ")
first = words.pop(0)
last = words.pop(-1)
print(first, last)
print(words)
print(len(words))
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```text
one four
['two', 'three']
2
```
`split` makes the list `['one', 'two', 'three', 'four']`. `pop(0)` removes and returns `'one'`, and `pop(-1)` removes and returns `'four'`, leaving two words in the list. Unlike `words[0]`, which only *looks* at an item, `pop` changes the list.
````

### Exercise: add to your module

Add a function `initials(full_name)` to `wordtools.py` that returns the first letter of each word in capitals, for example `initials("grace wambui njeri")` returns `"GWN"`. Remember to restart the session before importing the new version. (Hint: `word[0]` is the first letter of a word, and you can join letters with `+`. You'll need a loop from Topic 10 for any number of words — for now, assume exactly three.)

````{admonition} Solution - Click the button to reveal!
:class: dropdown
Add this to the end of the `%%writefile wordtools.py` cell and run it:
```python
def initials(full_name):
    """Return the capitalised initials of a three-word name."""
    first, middle, last = split_words(full_name)
    return (first[0] + middle[0] + last[0]).upper()
```
Then **Runtime → Restart session**, and in a new cell:
```python
import wordtools
print(wordtools.initials("grace wambui njeri"))
```
```text
GWN
```
````
