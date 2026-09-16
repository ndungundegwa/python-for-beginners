# Reading and Writing Files

When a program ends, all its variables disappear. **Files** let your programs read information that already exists — a list of words, a class register, a book — and save results that you can use again later. In this topic you'll create, read and write text files in Colab.

```{warning}
Working with files is the easiest way to accidentally **erase your work**. Always practise on test files you've created for the purpose, never on important documents.
```

## Where files live in Colab

Click the **folder icon** on the left side of Colab to open the **Files** panel. It shows the files your notebook can use. There are three ways to get a file there:

1. **Create it from a cell** with `%%writefile`, which you met in Topic 7.
2. **Upload it**: click the upload button at the top of the Files panel, or drag a file from your computer onto it.
3. **Let your program write it**, as you'll do below.

```{admonition} Colab files are temporary
:class: warning
Files in the Files panel are **deleted when the session ends** (for example after you close the notebook for a while). To keep a file, right-click it and choose **Download**, or connect your Google Drive as shown in [Using Google Colab](appendix/google_colab.md). A `%%writefile` cell can simply be run again next time.
```

## Reading a file

First, create a small text file. Type this into a new cell and run it:

```python
%%writefile market_day.txt
Tomatoes were cheap at the market today.
Mama Njeri sold all her sukuma wiki by noon.
It rained in the afternoon, so we went home early.
```

```text
Writing market_day.txt
```

Now, in a **new** cell, read the file with Python:

```python
filename = "market_day.txt"

f = open(filename)
text = f.read()
f.close()

print(f"Here is {filename}:")
print(text)
```

### What you should see

```text
Here is market_day.txt:
Tomatoes were cheap at the market today.
Mama Njeri sold all her sukuma wiki by noon.
It rained in the afternoon, so we went home early.

```

- `open(filename)` doesn't give you the file's text. It gives you a **file object** — a connection to the file, ready to be used.
- `f.read()` is a command you give to the file object: "read everything". It returns the whole content as **one string**.
- `f.close()` tells Python you've finished with the file. Always close files when you're done.

We stored the file name in a variable, so that if we want to read a different file, there's only one line to change.

```{tip}
If you get `FileNotFoundError: [Errno 2] No such file or directory`, check the spelling of the name (capital letters count), and check in the Files panel that the file is really there. After a session ends, you need to create or upload it again.
```

## Writing a file

To write to a file, open it in **write mode** by passing `"w"` as a second argument. This program saves a class register:

```python
filename = "register.txt"

f = open(filename, "w")

for number in range(1, 4):
    name = input(f"Name of student {number}: ")
    f.write(name)
    f.write("\n")

f.close()
print(f"Saved the register in {filename}.")
```

```text
Name of student 1: Amina
Name of student 2: Brian
Name of student 3: Chebet
Saved the register in register.txt.
```

Now look in the Files panel: `register.txt` has appeared. Double-click it to see its contents, or read it back in a new cell:

```python
f = open("register.txt")
print(f.read())
f.close()
```

```text
Amina
Brian
Chebet

```

Two important points:

- **Opening a file with `"w"` empties it immediately**, even before you write anything. If the file doesn't exist yet, it's created. Run the register cell again and the old names are gone.
- `write` writes **exactly** the text you give it. Unlike `print`, it doesn't add a new line at the end — that's why we write `"\n"` ourselves.

## File modes

| Mode | Meaning |
|---|---|
| `"r"` | **read** (the default when you give no mode) |
| `"w"` | **write**: erases the file first, or creates it |
| `"a"` | **append**: adds to the end of the file, keeping what's there |

To add a late student without erasing the others, use `"a"`:

```python
f = open("register.txt", "a")
f.write("Daudi\n")
f.close()
```

Before writing, you can check whether a file already exists with `exists` from the `os.path` module. This lets a program warn the user before a file is destroyed:

```python
from os.path import exists

print(exists("register.txt"))
print(exists("homework.txt"))
```

```text
True
False
```

## Reading one line at a time

A file object remembers **where it is** in the file, like a bookmark. `readline()` reads one line and moves the bookmark forward; `seek(0)` moves it back to the beginning.

```python
f = open("market_day.txt")

first = f.readline()
second = f.readline()
print("Line 1:", first, end="")
print("Line 2:", second, end="")

f.seek(0)
print("Back to the start:", f.readline(), end="")

f.close()
```

```text
Line 1: Tomatoes were cheap at the market today.
Line 2: Mama Njeri sold all her sukuma wiki by noon.
Back to the start: Tomatoes were cheap at the market today.
```

Each line read from a file ends with its own `"\n"`. That's why we use `end=""` — otherwise `print` would add a second new line and you'd see blank lines in between.

## The modern way: with and for

Forgetting `close()` is easy. Python has a better way to open files, the **`with` statement**, which closes the file automatically when the indented block ends:

```python
with open("market_day.txt") as f:
    line_number = 1
    for line in f:
        print(line_number, line.strip())
        line_number = line_number + 1
```

```text
1 Tomatoes were cheap at the market today.
2 Mama Njeri sold all her sukuma wiki by noon.
3 It rained in the afternoon, so we went home early.
```

- `with open(...) as f:` opens the file and names it `f`.
- `for line in f:` goes through the file **one line at a time**.
- `line.strip()` removes the `"\n"` (and any spaces) at the ends of each line.

When the block ends, the file is closed for you — even if an error happens inside it. **Use `with` for all your files from now on.**

Writing works the same way:

```python
with open("names.txt", "w") as f:
    f.write("Amina\n")
    f.write("Brian\n")
```

```{note}
Text with accents or other alphabets (like `é`, `ñ` or `ü`) is safest when you say which **encoding** to use: `open("file.txt", encoding="utf-8")`. UTF-8 can store every character of every language.
```

## Exercises

### Exercise: a diary

Write a cell that asks the user for a sentence about their day and **adds** it to the end of `diary.txt`, on its own line, without erasing previous entries. Run the cell three times, then open the file from the Files panel to check.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
entry = input("How was your day? ")

with open("diary.txt", "a") as f:
    f.write(entry + "\n")

print("Saved.")
```
Mode `"a"` (append) keeps everything already in the file and adds the new line at the end. With `"w"`, each run would erase the previous entries.
````

### Exercise: count lines and words

Write a function `file_stats(filename)` that returns the number of lines and the number of words in a text file. Test it on `market_day.txt` (3 lines, 26 words).

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def file_stats(filename):
    lines = 0
    words = 0
    with open(filename) as f:
        for line in f:
            lines = lines + 1
            words = words + len(line.split())
    return lines, words

n_lines, n_words = file_stats("market_day.txt")
print(f"{n_lines} lines, {n_words} words")
```
`line.split()` breaks each line into words, and `len` counts them.
````

### Exercise: copy a file

Write a function `copy_file(from_file, to_file)` that copies the text of one file into another, using `with`. Use it to copy `market_day.txt` to `market_copy.txt`, and check the copy in the Files panel. How short can you make the function?

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def copy_file(from_file, to_file):
    with open(from_file) as source, open(to_file, "w") as target:
        target.write(source.read())

copy_file("market_day.txt", "market_copy.txt")
```
One `with` statement can open two files at once, separated by a comma. Both are closed automatically.
````

### Exercise: add up the numbers in a file

Use `%%writefile` to create a file `marks.txt` with one number per line (for example 56, 78, 43, 91, 67). In another cell, read the file and print the total and the average.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
%%writefile marks.txt
56
78
43
91
67
```
```python
total = 0
count = 0

with open("marks.txt") as f:
    for line in f:
        line = line.strip()
        if line != "":
            total = total + int(line)
            count = count + 1

print(f"Total: {total}")
print(f"Average: {total / count:.1f}")
```
For the example marks, the total is `335` and the average `67.0`. Remember that everything read from a file is a **string**, so each line must be converted with `int` before adding. Skipping empty lines protects against a blank line at the end of the file.
````

### Exercise: save and load a list

Write two functions: `save_list(items, filename)`, which writes each item of a list on its own line, and `load_list(filename)`, which reads the file and returns the list (without the `"\n"` characters). Check that `load_list` gives back exactly the list you saved.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def save_list(items, filename):
    with open(filename, "w") as f:
        for item in items:
            f.write(item + "\n")

def load_list(filename):
    items = []
    with open(filename) as f:
        for line in f:
            items.append(line.strip())
    return items

fruits = ["mango", "banana", "pawpaw"]
save_list(fruits, "fruits.txt")
print(load_list("fruits.txt") == fruits)   # True
```
````
