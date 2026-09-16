# Using Google Colab (No Laptop Needed)

You don't need your own laptop to follow this course. **Google Colab** is a free service that runs Python on Google's computers and shows the results in your **web browser**. All you need is:

- a device with a web browser — a school or library computer, a cybercafé computer, a tablet, or even a phone;
- an internet connection;
- a free **Google account** (the same one you use for Gmail).

Nothing has to be installed, and your work is saved automatically in your Google Drive, so you can start on a lab computer and continue on a phone later.

```{tip}
Colab works on a phone, but the screen is small. Turn the phone sideways (landscape), and use a tablet or a computer whenever you can.
```

## Getting started

1. Open **[colab.research.google.com](https://colab.research.google.com)** in your browser and sign in with your Google account.
2. Click **New notebook** (or choose **File → New notebook in Drive**).
3. Click the notebook's name at the top (something like `Untitled0.ipynb`) and rename it, for example `Topic 01 - First program`.
4. Click in the grey box, called a **cell**, and type:

   ```python
   print("Hello, Kenya!")
   ```

5. Run the cell by clicking the **▶ play button** on its left, or by pressing **Shift + Enter**.
6. The output appears just below the cell:

   ```text
   Hello, Kenya!
   ```

The first time you run a cell it may take a few seconds while Colab connects to a computer for you.

## Notebooks and cells

A Colab file is called a **notebook**. Instead of one long program, a notebook is made of **cells**:

- **Code cells** hold Python. Add one with the **+ Code** button.
- **Text cells** hold notes and headings. Add one with **+ Text** — useful for writing the exercise title or your own explanations.

Some things to know:

- **A cell shows the value of its last line.** A cell containing just `len("Kenya")` displays `5`. To show anything else, use `print`.
- **Cells remember each other.** A variable, function or class created in one cell can be used in any cell you run afterwards.
- **Order matters.** What counts is the order in which you *ran* cells, not their position on the page. If things get confusing, choose **Runtime → Restart session and run all**, which forgets everything and runs every cell again from the top.
- **Edited a cell? Run it again.** Changing the code in a cell does nothing until you run it. If you change a function or class, also re-run the cells that use it.
- **The session ends after a while.** If you leave the notebook idle for some time, Colab disconnects. Your notebook (the code) is kept, but variables and any files you created are forgotten — just run the cells again.

## Typing the course examples

For every example in this course, type the code into a new code cell and run it. The **"What you should see"** output will appear below the cell. Type the examples yourself rather than copying and pasting: typing is how your fingers and eyes learn the details.

Where an example continues an earlier one (for example, it uses a variable created before), run the earlier cell first.

## Programs that ask questions (input)

`input()` works in Colab. When a program asks a question, a **text box** appears below the cell. Click in it, type your answer, and press **Enter**.

```python
name = input("What is your name? ")
print(f"Hello, {name}!")
```

```{warning}
While a cell is waiting for your answer, other cells can't run. If a program seems stuck, look for an empty input box below the running cell — or click the stop button (■) next to it.
```

## Stopping a program that never ends

If you write an infinite loop (Topic 10), the cell keeps running and its play button turns into a spinning **stop** button. Click it, or choose **Runtime → Interrupt execution**, to stop the program.

## Notebook commands: %%writefile and %run

Colab understands a few special commands that are **not Python**. They start with `%` and are called *magics*. Two are used in this course.

### Saving a cell as a file

Put `%%writefile` and a file name on the **very first line** of a cell:

```python
%%writefile greeting.py
print("Habari!")
print("This program lives in a file.")
```

Running this cell doesn't run the code — it **saves** it, and Colab replies `Writing greeting.py`. You can see the file by clicking the **folder icon** (Files) in the left-hand sidebar. `%%writefile` works for any text file, not just Python: Topic 15 uses it to create `.txt` files.

### Running a .py file

To run a saved program, use `%run` in another cell:

```python
%run greeting.py
```

```text
Habari!
This program lives in a file.
```

`%run` is the notebook version of typing `python3 greeting.py` in a terminal, and programs that use `input()` work normally with it. To change the program, edit the `%%writefile` cell, run it again (Colab says `Overwriting greeting.py`), then run `%run greeting.py` again.

## Your own modules (Topic 7)

Save the module with `%%writefile`, then import it in another cell:

```python
%%writefile wordtools.py
def count_words(sentence):
    """Return how many words a sentence has."""
    return len(sentence.split(" "))
```

```python
import wordtools
wordtools.count_words("Many hands make light work")
```

```text
5
```

```{warning}
If you change `wordtools.py` after importing it, running `import wordtools` again does **not** load the new version. Choose **Runtime → Restart session**, then run the `%%writefile` cell and the `import` cell again.
```

## Command-line arguments (Topic 7)

Programs that use `argv` expect extra words after the file name. Save the program with `%%writefile hello_args.py`, then give the words to `%run`:

```python
%run hello_args.py Otieno Kisumu
```

```text
This program is called: hello_args.py
Hello, Otieno
Greetings to everyone in Kisumu
```

## Files (Topic 15)

There are three ways to get a file into Colab:

1. **Create it with `%%writefile`**:

   ```python
   %%writefile market_day.txt
   Tomatoes were cheap at the market today.
   Mama Njeri sold all her sukuma wiki by noon.
   It rained in the afternoon, so we went home early.
   ```

2. **Upload it** from your device: open the **Files** panel (folder icon), click the **upload** button, and choose the file. This is how to get the word list for the *Strong Passwords* project into Colab.
3. **Use a file from your Google Drive** (see below).

To **download** a file your program created, right-click it in the Files panel and choose **Download**.

```{warning}
Files in the Files panel are **temporary**. They are deleted when the Colab session ends. Download anything you want to keep, or save it in Google Drive.
```

### Keeping files in Google Drive

Run this once in a session to connect your Google Drive (Colab will ask for permission):

```python
from google.colab import drive
drive.mount('/content/drive')
```

Your Drive then appears in the Files panel, and your files can be opened with paths starting with `/content/drive/MyDrive/`, for example:

```python
with open("/content/drive/MyDrive/python_course/marks.txt") as f:
    print(f.read())
```

Files saved there stay in your Drive after the session ends.

## Programs that call exit()

Some Python programs you find online end with `exit()` or `sys.exit()`. In Colab, this shows a message like:

```text
An exception has occurred, use %tb to see the full traceback.

SystemExit: 0
```

That's normal: it just means the program has finished. In a notebook it's usually tidier to end a program by letting its functions finish, or with `return` or `break`, as the games in this course do.

## What works and what doesn't

**Everything in the course topics and practice projects works in Colab**, including `input()`, files, modules, classes, `random`, and charts drawn with `matplotlib` (they appear below the cell).

A few things don't:

- **Programs that open their own windows**, such as Tkinter or pygame programs. Colab runs on a computer far away, so it has no screen to open a window on. (This course doesn't need them.)
- **Terminal commands**, like `python3 greeting.py` or `cd`, can't be typed into a cell directly. Use `%run greeting.py` instead. (You *can* run terminal commands by starting a line with `!`, such as `!ls` to list files, but `%run` is the right choice for programs that ask questions.)

## Working offline on your own computer

If you have a computer and want to work without internet, install **Thonny** from [thonny.org](https://thonny.org) (Python is included). The Python is exactly the same; only the notebook commands differ:

| In Colab | In Thonny |
|---|---|
| type code into a cell and run it | type code into the editor, save as a `.py` file, press **Run** |
| `%%writefile wordtools.py` | save the editor contents as `wordtools.py` |
| `%run hello_args.py Otieno Kisumu` | in the Shell, type `%Run hello_args.py Otieno Kisumu` |
| the Files panel | the folder where you saved your `.py` file |
| last line of a cell is displayed | use `print`, or type the expression in the Shell |

```{note}
**No computer and no internet?** On an Android phone or tablet, you can install an app that runs Python offline, such as **Pydroid 3**. It has an editor and a Run button, and most of this course's examples work in it.
```

## Good habits in Colab

- Make **one notebook per topic**, named clearly, like `Topic 06 - Functions`.
- Start each exercise with a **text cell** holding the exercise title, so you can find your work later.
- Before sharing work, choose **Runtime → Restart session and run all** to check that everything runs from top to bottom.
- To show your work to your instructor, click **Share** (top right) and add their email address.

## Exercise: your first Colab notebook

Create a notebook called `Colab practice` and do the following:

1. In a cell, print your name and your favourite food.
2. In a new cell, ask the user for a number with `input`, and print double that number.
3. Save a two-line program as `hello.py` with `%%writefile`, then run it with `%run`.
4. Open the Files panel and check that `hello.py` is there.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
Cell 1:
```python
print("My name is Amina")
print("My favourite food is pilau")
```
Cell 2:
```python
number = int(input("Type a number: "))
print(number * 2)
```
Cell 3:
```python
%%writefile hello.py
print("Hello from a file!")
print("Colab can run .py files too.")
```
Cell 4:
```python
%run hello.py
```
```text
Hello from a file!
Colab can run .py files too.
```
`hello.py` appears in the Files panel (click the refresh button if you don't see it straight away).
````
