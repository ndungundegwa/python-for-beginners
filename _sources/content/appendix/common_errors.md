# Common Errors

This page explains the error messages beginners meet most often: what they mean, a typical example, and how to fix them. When Python shows you an error (in Colab, a red box below the cell), **read the last line first**, then look for that error below.

## SyntaxError

**Meaning:** your code breaks Python's grammar rules, so Python can't even start running it.

**Typical examples:**

```python
print("Hello"                  # SyntaxError: '(' was never closed
print("I like typing this.)    # SyntaxError: unterminated string literal
if x > 3                       # SyntaxError: expected ':'
```

**How to fix:**
- Look at the line Python shows **and the line just above it**. A missing bracket or quote on one line is often only noticed on the next.
- Check that every `(`, `[`, `{` and quote is closed, and that `if`, `elif`, `else`, `for`, `while`, `def` and `class` lines end with `:`.
- In Colab, `%%writefile` must be the **very first line** of its cell. Anywhere else, Python tries to read it as code and reports a `SyntaxError`.

## IndentationError

**Meaning:** the indentation (spaces at the start of lines) is wrong.

**Typical examples:**

```python
def greet():
print("hi")        # IndentationError: expected an indented block after function definition

if x > 0:
    print("positive")
      print("big")  # IndentationError: unexpected indent
```

**How to fix:** indent every line of a block by exactly four spaces, and keep lines of the same block lined up. Don't mix tabs and spaces. Colab (and Thonny, if you use your own computer) inserts four spaces when you press Tab, and indents automatically after a line ending in `:`. To move several lines at once, select them and press Tab or Shift + Tab.

## NameError

**Meaning:** you used a name Python doesn't know: a variable that hasn't been created yet, a misspelt name, or a function you forgot to import.

**Typical examples:**

```python
print(total)          # NameError: name 'total' is not defined
Print("hi")           # NameError: name 'Print' is not defined. Did you mean: 'print'?
randint(1, 6)         # NameError, if you forgot: from random import randint
```

**How to fix:**
- Check the spelling, including capital letters: `Total` and `total` are different names.
- Make sure the variable is created **before** the line that uses it. In a notebook, make sure the cell that creates it has been **run** — after a restart, every variable is forgotten until you run its cell again.
- A variable created inside a function doesn't exist outside it: return the value instead.
- Add the missing `import`.

## TypeError

**Meaning:** you used an operation on a type of value that doesn't support it.

**Typical examples:**

```python
"Age: " + 19               # TypeError: can only concatenate str (not "int") to str
age = input("Age? ")
age + 1                    # TypeError: input() gives a string, not a number
len(5)                     # TypeError: object of type 'int' has no len()
greet("Amina", "Brian")    # TypeError: greet() takes 1 positional argument but 2 were given
None * 2                   # TypeError: unsupported operand type(s) for *: 'NoneType' and 'int'
```

**How to fix:**
- Check the types involved with `print(type(x))`.
- Convert where needed: `int(...)`, `float(...)`, `str(...)`, or use an f-string.
- Check that you call functions with the right number of arguments.
- `NoneType` in the message usually means a function forgot to `return` a value.

## ValueError

**Meaning:** the type of value is right, but the value itself can't be used.

**Typical examples:**

```python
int("twelve")                 # ValueError: invalid literal for int() with base 10: 'twelve'
int("3.5")                    # ValueError: use float("3.5") instead
a, b = [1, 2, 3]              # ValueError: too many values to unpack (expected 2)
```

**How to fix:** check the input before converting (for example with `.isdigit()`), use `float` when decimals are allowed, or catch the error with `try`/`except ValueError` and ask again. For unpacking, make sure there are exactly as many variables as values.

## IndexError

**Meaning:** you asked for a position that doesn't exist in a list, tuple or string.

**Typical examples:**

```python
animals = ["bear", "tiger", "penguin"]
animals[3]         # IndexError: list index out of range
[].pop()           # IndexError: pop from empty list
```

**How to fix:** remember that indices start at 0, so the last valid index is `len(animals) - 1`. Check that a list isn't empty before popping from it. And don't remove items from a list while looping over its positions.

## KeyError

**Meaning:** you looked up a key that isn't in a dictionary.

**Typical example:**

```python
prices = {"bread": 65, "milk": 60}
prices["eggs"]     # KeyError: 'eggs'
```

**How to fix:** check first with `if "eggs" in prices:`, or use `prices.get("eggs", 0)` to get a default value instead of an error. Also check spelling and capitals: `"Milk"` is not `"milk"`.

## AttributeError

**Meaning:** a value doesn't have the method or attribute you asked for.

**Typical examples:**

```python
"hello".uppper()               # AttributeError: 'str' object has no attribute 'uppper'
numbers = (1, 2, 3)
numbers.append(4)              # AttributeError: 'tuple' object has no attribute 'append'
```

**How to fix:** check the spelling of the method, and check the type of the value — tuples can't be changed, so they have no `append`. In your own classes, make sure every attribute is created with `self.` in `__init__`.

## ZeroDivisionError

**Meaning:** you divided by zero (or used `%` or `//` with zero).

**Typical example:**

```python
marks = []
average = sum(marks) / len(marks)   # ZeroDivisionError: division by zero
```

**How to fix:** check the divisor first (`if len(marks) > 0:`), or catch the error with `try`/`except ZeroDivisionError`.

## FileNotFoundError

**Meaning:** Python couldn't find the file you tried to open.

**Typical example:**

```python
open("marks.txt")   # FileNotFoundError: [Errno 2] No such file or directory: 'marks.txt'
```

**How to fix:**
- Check the file name and extension (`marks.txt` vs `Marks.txt` vs `marks.txt.txt`).
- In Colab, open the **Files** panel (folder icon) and check that the file is really there. Files there are deleted when the session ends, so you may need to upload it or run its `%%writefile` cell again.
- For a file in Google Drive, give the full path, such as `/content/drive/MyDrive/marks.txt`, and make sure Drive is connected.
- `ModuleNotFoundError: No module named '...'` is the same problem for a module you wrote: run its `%%writefile` cell first.

## My program prints None

**Meaning:** not an error message, but a very common surprise. A function that doesn't use `return` gives back `None`.

```python
def double(x):
    print(x * 2)

result = double(4)   # prints 8
print(result)        # None
```

**How to fix:** if the caller needs the value, use `return x * 2` instead of `print`.

## My program does nothing / never stops

- **Nothing happens:** you may have defined functions but never called them. Is there a `main()` (or other call) at the bottom of the cell?
- **It never stops:** you probably have an infinite `while` loop. Click the cell's stop button (■) or choose **Runtime → Interrupt execution**, then check that something inside the loop changes the condition — and that the condition can't skip past the value that ends it (use `> 0` rather than `!= 0`).
- **It's waiting:** a program paused at `input()` looks frozen until you type something in the text box below the cell and press Enter.
- **My change had no effect:** in a notebook, did you run the cell again after editing it? For a class or function, also re-run the cells that use it; for a module, restart the session.
