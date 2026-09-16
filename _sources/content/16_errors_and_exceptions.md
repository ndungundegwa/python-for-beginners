# When Things Go Wrong: Errors and Exceptions

By now you've seen plenty of error messages. That's normal: every programmer, at every level, sees errors all day long. In this topic you'll learn to read any error message calmly, recognise the most common ones, make your programs **survive** bad input instead of crashing, and track down bugs in someone else's code.

## Two kinds of errors

**Syntax errors** happen when your code breaks Python's grammar rules: a missing bracket, a missing colon, a string that never ends. Python finds them **before running anything**, and nothing runs until you fix them.

```python
print("Hello, world"
```

```text
SyntaxError: '(' was never closed
```

**Exceptions** happen **while the program is running**, when an instruction that is grammatically correct can't be carried out: dividing by zero, opening a file that doesn't exist, converting `"twelve"` into a number.

```python
x = 10 / 0
```

```text
ZeroDivisionError: division by zero
```

## Reading a traceback

When an exception isn't handled, Python stops and prints a **traceback**. Here's one from a program that calculates an average:

```text
Traceback (most recent call last):
  File "marks.py", line 5, in <module>
    print(average([]))
  File "marks.py", line 2, in average
    return sum(numbers) / len(numbers)
           ~~~~~~~~~~~~^~~~~~~~~~~~~~
ZeroDivisionError: division by zero
```

Read it **from the bottom up**:

1. The **last line** names the problem: a `ZeroDivisionError`, "division by zero".
2. The lines just above show **where** it happened: `marks.py`, line 2, inside the function `average`, on the line `return sum(numbers) / len(numbers)`.
3. Further up, you see **how the program got there**: line 5 called `average([])` with an empty list — whose length is 0.

So the bug isn't really in line 2; it's that the program asked for the average of an empty list.

## The errors you'll meet most often

| Error | What it usually means | Example |
|---|---|---|
| `SyntaxError` | the code breaks Python's grammar | missing `:`, `)` or quote |
| `IndentationError` | the indentation is wrong | a function body not indented |
| `NameError` | a name is used before it exists, or is misspelt | `pritn("hi")` |
| `TypeError` | an operation is used on the wrong type of value | `"Age: " + 19` |
| `ValueError` | the type is right but the value can't be used | `int("twelve")` |
| `IndexError` | a list or string index is too big | `[1, 2, 3][3]` |
| `KeyError` | a dictionary key doesn't exist | `{"a": 1}["b"]` |
| `ZeroDivisionError` | dividing by zero | `5 / 0` |
| `FileNotFoundError` | a file can't be found | `open("nothere.txt")` |
| `AttributeError` | a value doesn't have that method or attribute | `"hello".uppper()` |

The appendix *Common Errors* explains each of these in more detail, with fixes.

## Catching exceptions with try and except

Some errors aren't your fault as a programmer: a user types letters where a number is expected, or a file is missing. Instead of letting the program crash, you can **catch** the exception and deal with it.

Put the code that might fail inside a `try` block, and what to do if it fails inside an `except` block:

```python
try:
    age = int(input("How old are you? "))
    print(f"Next year you will be {age + 1}.")
except ValueError:
    print("That wasn't a whole number!")
```

```text
How old are you? nineteen
That wasn't a whole number!
```

If the code in `try` works, the `except` block is skipped. If a `ValueError` happens, Python jumps straight to the `except` block instead of crashing.

The most useful pattern combines this with a loop, to **keep asking until the answer is valid**:

```python
def ask_int(prompt):
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("Please type a whole number.")

age = ask_int("How old are you? ")
print(f"Next year you will be {age + 1}.")
```

```text
How old are you? nineteen
Please type a whole number.
How old are you? 19
Next year you will be 20.
```

`return` leaves the function — and therefore the loop — as soon as the conversion succeeds.

## Handling different errors differently

A `try` can have several `except` blocks, one for each kind of error:

```python
try:
    number = int(input("Enter a number: "))
    result = 100 / number
    print(f"100 divided by {number} is {result}")
except ValueError:
    print("Please enter a valid whole number.")
except ZeroDivisionError:
    print("You can't divide by zero!")
```

```{warning}
Always name the exception you expect, like `except ValueError:`. A bare `except:` catches **every** error, including typos in your own code, and hides real bugs behind a friendly message.
```

## else and finally

Two optional blocks complete the picture:

- `else` runs only if **no** exception happened in the `try` block.
- `finally` runs **no matter what** — useful for tidying up.

```python
try:
    f = open("marks.txt")
except FileNotFoundError:
    print("The file marks.txt is missing.")
else:
    print(f.read())
    f.close()
finally:
    print("Done trying to read marks.txt.")
```

## Raising your own exceptions

Your own functions can signal a problem with `raise`. This is better than printing a message and carrying on with a wrong value:

```python
def withdraw(balance, amount):
    if amount > balance:
        raise ValueError("Not enough money in the account")
    return balance - amount

try:
    new_balance = withdraw(500, 800)
except ValueError as error:
    print(f"Sorry: {error}")
```

```text
Sorry: Not enough money in the account
```

`except ValueError as error:` gives you the exception itself, so you can print its message.

## Debugging: finding bugs yourself

Error messages tell you where a program crashed. Many bugs don't crash at all — the program just gives a wrong answer. Here's how to hunt them down:

1. **Read the error message**, all of it, starting from the last line.
2. **Print the values** of your variables at key points. Most bugs become obvious once you see the actual values.
3. **Check your assumptions.** Is that variable really a number, or a string? `print(type(x))` will tell you.
4. **Work in small steps.** Code a little, run a little, fix a little.
5. **Explain the code out loud**, line by line, to a classmate — or to a rubber duck. You'll often spot the bug in the middle of a sentence.

## Exercises

### Exercise: name that error

Without running them, say which error each line causes. Then check your answers.

```python
print(undefined_variable)
"5" + 5
int("3.5")
[10, 20, 30][3]
{"name": "Amina"}["age"]
"hello".uppercase()
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
1. `NameError` — the variable was never created.
2. `TypeError` — you can't add a string and a number.
3. `ValueError` — `"3.5"` isn't a valid whole number (use `float`).
4. `IndexError` — a list of 3 items has indices 0, 1 and 2.
5. `KeyError` — the dictionary has no key `"age"`.
6. `AttributeError` — strings have an `upper` method, not `uppercase`.
````

### Exercise: a safe division calculator

Write a program that asks for two numbers (decimals allowed) and prints their division. It must not crash: print a friendly message if either input isn't a number, or if the second number is zero.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
try:
    a = float(input("First number: "))
    b = float(input("Second number: "))
    print(f"{a} / {b} = {a / b}")
except ValueError:
    print("Please type numbers only.")
except ZeroDivisionError:
    print("You can't divide by zero.")
```
````

### Exercise: ask until it's in range

Improve `ask_int` into `ask_int_between(prompt, low, high)`, which keeps asking until the user types a whole number between `low` and `high` (inclusive). Use it to ask for a mark between 0 and 100.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def ask_int_between(prompt, low, high):
    while True:
        try:
            value = int(input(prompt))
        except ValueError:
            print("Please type a whole number.")
            continue
        if low <= value <= high:
            return value
        print(f"Please type a number between {low} and {high}.")

mark = ask_int_between("Mark (0-100): ", 0, 100)
print(f"You entered {mark}.")
```
`continue` jumps straight back to the top of the loop, skipping the range check when the input wasn't a number.
````

### Exercise: fix someone else's code

A classmate wrote this program to print a student's average and grade, and says it's "perfect". Find and fix **every** mistake — some are syntax errors, some crash while running, and one gives a wrong answer without any error.

```python
def average(marks)
    total = 0
    for mark in marks:
        total = total + mark
    return total / len(mark)

def grade(avg):
    if avg >= 50:
        return "Pass"
    elif avg >= 80:
        return "Distinction"
    else:
        return "Fail"

marks = [85, 90, "78"]
avg = average(marks)
print("Average: " + avg)
print("Grade:", grade(avg))
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
1. **Syntax:** `def average(marks)` is missing its colon.
2. **Crash:** `"78"` is a string inside the list, so `total + mark` raises `TypeError`. It should be the number `78`.
3. **Crash:** `len(mark)` should be `len(marks)` — `mark` is a single number and has no length (`TypeError: object of type 'int' has no len()`).
4. **Crash:** `"Average: " + avg` adds a string and a float (`TypeError`). Use an f-string.
5. **Wrong answer, no error:** in `grade`, `avg >= 50` is checked first, so an average of 84.3 gets `"Pass"` instead of `"Distinction"`. Test the higher boundary first.

```python
def average(marks):
    total = 0
    for mark in marks:
        total = total + mark
    return total / len(marks)

def grade(avg):
    if avg >= 80:
        return "Distinction"
    elif avg >= 50:
        return "Pass"
    else:
        return "Fail"

marks = [85, 90, 78]
avg = average(marks)
print(f"Average: {avg:.1f}")
print("Grade:", grade(avg))
```
This prints `Average: 84.3` and `Grade: Distinction`.
````

### Exercise: raise an error for a bad value

Write a function `ticket_price(age)` that returns 0 for children under 5, 200 for ages 5 to 17 and 500 for adults. If `age` is negative, it must `raise` a `ValueError` with a helpful message. Show how a caller catches the error.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def ticket_price(age):
    if age < 0:
        raise ValueError(f"Age cannot be negative: {age}")
    if age < 5:
        return 0
    elif age < 18:
        return 200
    else:
        return 500

try:
    print(ticket_price(12))    # 200
    print(ticket_price(-3))
except ValueError as error:
    print(f"Problem: {error}")
```
The function **detects** the problem; the caller **decides** what to do about it.
````
