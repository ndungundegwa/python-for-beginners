# Your First Program

In this topic you will find out what a program is, set up your notebook, write your first Python program, and learn to read the error messages Python gives you when something goes wrong. Everything else in the course builds on these first steps.

## What is a program?

A computer is extremely fast and extremely obedient, but it has no common sense. It does **exactly** what it is told — nothing more, nothing less. A **program** is a list of instructions written in a language the computer can follow.

Before we write any Python, think about everyday instructions. Here is a recipe for a cup of tea:

1. Fill the kettle with water.
2. Boil the water.
3. Put a tea bag in a cup.
4. Pour the boiling water into the cup.
5. Wait three minutes, then remove the tea bag.

A precise list of steps like this is called an **algorithm**. The computer scientist Donald Knuth describes an algorithm as *a finite and unambiguous sequence of instructions that solves a class of problems*:

- **Finite** — it must stop at some point.
- **Unambiguous** — every step is so clear that anyone (or anything) could follow it without guessing.
- **A class of problems** — it works for many cases, not just one (any cup of tea, not only *this* cup).

Programming is the craft of writing algorithms so precisely that a computer can carry them out. Python is the language we'll use to write them.

```{note}
"Boil the water" is fine for a person, but a robot would ask: *how long? until what temperature?* Computers are the most literal robots of all. Much of learning to program is learning to leave nothing unclear.
```

## Setting up your notebook

In this course you'll write Python in **Google Colab**, which runs in your web browser. Nothing needs to be installed.

1. Open [colab.research.google.com](https://colab.research.google.com) and sign in with your Google account.
2. Click **New notebook**.
3. Click the notebook's name at the top (something like `Untitled0.ipynb`) and rename it `Topic 01 - First program`.
4. Click inside the grey box. This box is a **code cell**: it's where you type Python.
5. Type `2 + 3` and press **Shift + Enter** (or click the **▶** button on the left of the cell).

Python answers `5` just below the cell. Congratulations — you just ran your first line of Python!

A few things to know about notebooks:

- **Each cell is a small program.** Running a cell runs all the lines in it, from top to bottom, and shows the output underneath.
- **Add a new cell** with the **+ Code** button. In this course, type each example and each exercise into its own cell.
- **A cell shows the value of its last line.** That's why `2 + 3` displayed `5` without you asking. To display anything else, use `print`, which you'll meet in a moment.
- **Your work is saved** automatically in your Google Drive.

```{admonition} Working on your own computer instead?
:class: tip
Install **Thonny** from [thonny.org](https://thonny.org) (it includes Python). Type each example into the editor, save it as a file ending in `.py` — for example `hello.py` — and press the green **Run** button. The output appears in the Shell at the bottom. Everything else in this course works the same way.
```

## A good first program

In a new code cell, type the following. Type it **exactly** — every quote, every bracket.

```python
print("Hello, Kenya!")
print("Karibu to Python.")
print("I am learning to code.")
print("Every expert was once a beginner.")
print('Typing code builds skill.')
print("I'd rather type it myself.")
print('My teacher said "practise every day."')
```

Run the cell.

### What you should see

```text
Hello, Kenya!
Karibu to Python.
I am learning to code.
Every expert was once a beginner.
Typing code builds skill.
I'd rather type it myself.
My teacher said "practise every day."
```

Each line of the program is an **instruction**, and Python runs them one after another, from top to bottom. `print(...)` is a **function** that displays whatever you put between its parentheses. The text inside the quotes is called a **string**.

Look carefully at the last two lines. A string can start and end with double quotes `"..."` or single quotes `'...'`. If you want a single quote *inside* the string (as in `I'd`), surround the string with double quotes — and if you want double quotes inside, surround the string with single quotes.

```{warning}
"Exactly" means exactly. `Print` with a capital P, a missing quote, or a missing bracket will all stop your program. The colours in the cell don't matter; the characters do.
```

## When things go wrong: reading error messages

Everyone makes mistakes, including professional programmers — constantly. What separates beginners from experienced programmers is not making fewer mistakes, but **reading the error message** instead of panicking.

Suppose you forget the closing quote on line 3:

```python
print("Hello, Kenya!")
print("Karibu to Python.")
print("I am learning to code.)
```

Python refuses to run the cell and prints something like:

```text
  File "<ipython-input-1>", line 3
    print("I am learning to code.)
          ^
SyntaxError: unterminated string literal (detected at line 3)
```

Read it piece by piece:

1. `line 3` — the problem is on **line 3** of the cell. (The first line looks a little different depending on where you run Python; in a `.py` file it shows the file's name.)
2. The line itself is shown, with a `^` (caret) pointing at where Python got confused.
3. `SyntaxError` means you broke the grammar rules of Python; the message after the colon says which rule: a string was started but never finished.

```{tip}
In Colab, you can switch on line numbers with **Tools → Settings → Editor → Show line numbers**. They make error messages much easier to follow.
```

If an error message is confusing, copy its last line (for example `SyntaxError: unterminated string literal`) into a search engine. Thousands of people have had the same error before you. The appendix *Common Errors* also explains the most frequent ones.

## Comments

Sometimes you want to write notes to yourself — or to other people who read your code — that Python should ignore. These are **comments**. In Python, everything after a `#` character on a line is a comment.

```python
# This is a comment: Python ignores it.
# Comments explain your code to the people who read it.

print("Comments are for humans.")  # a comment can follow code on the same line

# Put a # in front of a line to switch it off:
# print("This line will not run.")

print("This line will run.")
```

### What you should see

```text
Comments are for humans.
This line will run.
```

Comments have two uses: **explaining** code in plain language, and temporarily **switching off** a line without deleting it. Note that a `#` *inside* a string is just a character, not a comment: `print("Room # 12")` prints `Room # 12`.

```{tip}
In Colab, select some lines and press **Ctrl + /** (or **Cmd + /** on a Mac) to comment them all out at once. Press it again to switch them back on.
```

The `#` character has many names: hash, pound sign, number sign, octothorpe. Use whichever you like.

## Good habits from day one

These habits will save you hours of frustration:

- **Compare line by line.** When your output doesn't match, go through your code one line at a time against the example, starting from the **last** line. Working backwards stops your brain from "seeing what it expects".
- **Say the symbols out loud** as you check: "print, open bracket, double quote, Hello, comma, Kenya, exclamation mark, double quote, close bracket".
- **Run often.** Type a line or two, run the cell, check. Don't type fifty lines before running anything.
- **Break it on purpose.** Remove a quote, change a letter, delete a bracket — then read the error. You'll recognise it instantly next time.
- **Start fresh when confused.** If a notebook behaves strangely, choose **Runtime → Restart session and run all** to run every cell again from the top.

## Exercises

### Exercise: print more, print less

Change your first program so that it prints one extra line of your choice at the end. Then change it again so that it prints **only** the line `Karibu to Python.` — without deleting any of the other lines.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
Adding a line is simply one more `print`. To print only one line without deleting the others, **comment out** the rest:
```python
# print("Hello, Kenya!")
print("Karibu to Python.")
# print("I am learning to code.")
# print("Every expert was once a beginner.")
# print('Typing code builds skill.')
# print("I'd rather type it myself.")
# print('My teacher said "practise every day."')
```
````

### Exercise: fix the program

This program has **three** mistakes. Type it into a cell, then find and fix them, running the cell after each fix. For each mistake, write down the error message Python gave you.

```python
print("Karibu!")
Print("Welcome to Python.")
print("Programming is fun."
print('Don't give up.')
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
Python shows the errors **one at a time**, in this order:

1. Line 4: the string starts with a single quote but contains an apostrophe, so Python thinks the string ends after `Don`: `SyntaxError: unterminated string literal (detected at line 4)`. Use double quotes around it.
2. Line 3 is missing its closing bracket: `SyntaxError: '(' was never closed`.
3. Line 2: `Print` has a capital P. Python is **case-sensitive**, so `Print` is a different name from `print`: `NameError: name 'Print' is not defined` (Python may add *Did you mean: 'print'?*).

Python checks the grammar of the **whole cell** before running anything, so the two syntax errors appear first, even though they are further down. The `NameError` only appears once the code actually runs and reaches line 2 — notice that `Karibu!` is printed just before it.

```python
print("Karibu!")
print("Welcome to Python.")
print("Programming is fun.")
print("Don't give up.")
```
````

### Exercise: an algorithm for chai

Write a precise algorithm, as a numbered list of steps, for making a cup of chai (tea with milk and sugar). You can write it in a **text cell** in your notebook (the **+ Text** button). Then swap with a classmate: they must follow your steps **literally**. Did they find any step that was unclear?

````{admonition} Solution - Click the button to reveal!
:class: dropdown
There are many good answers. Here is one that tries hard to be unambiguous:

1. Pour 1 cup of water and 1 cup of milk into a small pan.
2. Put the pan on the stove and turn the heat to high.
3. When the liquid starts to bubble, add 2 teaspoons of tea leaves and 2 teaspoons of sugar.
4. Turn the heat to low and wait 3 minutes.
5. Turn off the heat.
6. Pour the liquid through a strainer into a cup.

Notice the quantities ("1 cup", "2 teaspoons") and the clear conditions ("when the liquid starts to bubble"). A step like "add some sugar" is ambiguous — how much is *some*?
````

### Exercise: your name in a box

In a new cell, use several `print` calls to draw your name inside a box made of `*` characters, like this:

```text
***********
*  Amina  *
***********
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
print("***********")
print("*  Amina  *")
print("***********")
```
The lengths must match by hand for now. In Topic 4 you'll learn how to make Python repeat characters for you, so the box adjusts to any name.
````
