# Python for Complete Beginners

Welcome! This course teaches you to program in Python 3 **from zero**. You don't need to know anything about computers or code to start — only how to type, how to read carefully, and how to keep going when something doesn't work the first time.

All you need is a web browser: the whole course runs in **Google Colab** notebooks, so you can follow it on a laptop, a lab or cybercafé computer, a tablet or even a phone.

## What is Python?

**Python** is a programming language: a way of writing instructions that a computer can carry out. It was created by the Dutch programmer **Guido van Rossum** and first released in **1991**. Its name has nothing to do with snakes — it comes from the British comedy group *Monty Python's Flying Circus*.

Python was designed to be **easy to read and write**. A Python program often looks almost like plain English:

```python
names = ["Amina", "Brian", "Chen"]
for name in names:
    print(f"Hello, {name}!")
```

A few words you will hear about Python:

- **High-level** — you describe *what* you want in human-friendly terms; Python takes care of the low-level details such as memory.
- **Interpreted** — you can run a program straight away, without a separate "compile" step. A program called the **interpreter** reads your code and carries it out line by line.
- **Dynamically typed** — you don't have to declare whether a variable holds a number or text; Python works it out.
- **General-purpose** — it isn't limited to one kind of task. The same language is used for websites, science, games, automation and artificial intelligence.
- **Free and open source** — anyone can download, use and share it, managed by the non-profit Python Software Foundation.

```{note}
This course uses **Python 3**. An older version, Python 2, stopped being supported in 2020. If you find old examples online where `print` is written without brackets (`print "hello"`), they are Python 2 and won't work as written.
```

Python even has a short philosophy built in. Run `import this` in a notebook cell and you'll see *The Zen of Python*, which includes lines such as *"Beautiful is better than ugly"*, *"Simple is better than complex"* and *"Readability counts."*

## Why learn Python?

- **It's beginner-friendly.** Clean, readable syntax lets you focus on *thinking like a programmer* instead of fighting punctuation.
- **It's everywhere.** Python is consistently ranked among the most popular programming languages in the world, in rankings such as the TIOBE index and the Stack Overflow developer survey.
- **It opens many doors.** The skills you learn here carry straight into data science, artificial intelligence, web development, research and automation.
- **It saves time at work.** Even if you never become a professional programmer, a short Python script can rename a thousand files, clean a spreadsheet or analyse survey results in seconds.
- **Huge community and free libraries.** Hundreds of thousands of ready-made packages are available from the Python Package Index (PyPI), and almost any question you have has already been answered online.
- **It's the language of science and AI.** Most machine-learning and data tools — and the department's AI, Machine Learning and Deep Learning courses — use Python.

### What people build with Python

| Area | Examples of what Python is used for | Popular tools |
|---|---|---|
| Data science and statistics | cleaning data, charts, reports | pandas, NumPy, matplotlib |
| Artificial intelligence | machine learning, image and speech recognition | scikit-learn, PyTorch, TensorFlow |
| Web development | the "back end" of websites and apps | Django, Flask, FastAPI |
| Science and engineering | simulations, physics, astronomy, bioinformatics | SciPy, Astropy, Biopython |
| Automation and scripting | processing files, sending emails, testing software | the standard library |
| Education | teaching programming and algorithms | Jupyter, Colab, Thonny |
| Games and graphics | small games, simulations, animations | pygame |
| Hardware and electronics | robots and sensors on small computers | Raspberry Pi, MicroPython |

### Python's limitations

No language is perfect for everything. It's good to know Python's weak points too:

- **Speed:** Python code usually runs slower than C, C++ or Java. For most tasks this doesn't matter, and the heavy-lifting libraries are written in fast languages underneath.
- **Mobile apps and web browsers:** apps for phones are usually written in Kotlin, Java or Swift, and code that runs *inside* a web browser is written in JavaScript.
- **Errors appear at run time:** because types aren't declared, some mistakes only show up when the program runs. Good testing habits (which this course teaches) help a lot.

## How does Python compare with other languages?

Here is the classic first program — printing "Hello, World!" — in four languages.

**C**

```c
#include <stdio.h>

int main(void) {
    printf("Hello, World!\n");
    return 0;
}
```

**Java**

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

**JavaScript**

```javascript
console.log("Hello, World!");
```

**Python**

```python
print("Hello, World!")
```

All four do the same thing. Python needs the least "ceremony", which is why it's such a good first language.

| Language | Typically used for | Compared with Python |
|---|---|---|
| **C** | operating systems, devices, embedded electronics | much faster, but you manage memory yourself and write a lot more code |
| **C++** | game engines, high-performance software | fast and powerful, but much harder to learn |
| **Java** | large business systems, Android apps | more verbose; types must be declared; compiled before running |
| **JavaScript** | interactive websites (runs in the browser) | the language of the web browser; Python is more common for data and science |
| **R** | statistics and data analysis | excellent for statistics, but less general-purpose |
| **MATLAB** | engineering and numerical computing | requires a paid licence; Python with NumPy and SciPy does similar work for free |

A few terms used in the table:

- A **compiled** language (C, C++, Java) is translated into machine instructions *before* it runs. An **interpreted** language (Python, JavaScript) is run directly by an interpreter. Compiled programs are usually faster; interpreted ones are quicker to write and test.
- A **statically typed** language makes you declare types (`int count = 0;`). In a **dynamically typed** language like Python, you just write `count = 0`.

```{tip}
The concepts you learn in this course — variables, decisions, loops, functions, lists, objects — exist in almost every language. Once you know them in Python, learning a second language is much easier.
```

## Tools for writing Python

You write Python in a **notebook**, a **text editor** or an **IDE** (Integrated Development Environment — an editor with extra tools such as a "Run" button and a debugger). Here are the most common choices:

| Tool | What it is | Good for | Cost |
|---|---|---|---|
| **Google Colab** | Jupyter notebooks running in your web browser | **this course** — nothing to install, works on any device | free |
| **Jupyter Notebook / JupyterLab** | notebooks on your own computer | data analysis, science, working offline | free |
| **Thonny** | a beginner IDE that includes Python | writing `.py` programs offline on your own computer | free |
| **IDLE** | the simple editor that comes with Python | quick experiments | free |
| **Visual Studio Code** | a powerful general-purpose editor (with the Python extension) | larger projects | free |
| **PyCharm** | a full professional Python IDE | big projects, professional work | free Community edition |
| **Spyder** | a scientific IDE, similar to MATLAB (comes with Anaconda) | science and engineering | free |

**In this course we use Google Colab.** A notebook is made of **cells**: you type code into a cell, run it, and the result appears right underneath. That makes it easy to try things, change them and try again. If you have your own computer and want to work offline, Thonny or Jupyter work too — the Python is exactly the same.

```{tip}
**Python Tutor** (pythontutor.com) is a free website that draws pictures of your program as it runs, showing every variable. It's excellent for understanding loops, lists and functions.
```

### Programs with windows and buttons (GUIs)

In this course, your programs talk to the user through text: the output appears under the notebook cell, and questions are answered in a small text box. That's how almost everyone learns, because it lets you concentrate on the logic. Later, you can give programs a **graphical user interface (GUI)** — windows, buttons and menus — using a GUI library:

| Library | Notes |
|---|---|
| **Tkinter** | included with Python; simple windows and forms |
| **PyQt / PySide** | professional-looking desktop applications |
| **Kivy** | apps that also run on touch screens and phones |
| **pygame** | games and animations |

Here's a taste — a complete Tkinter program that opens a small window:

```python
import tkinter as tk

window = tk.Tk()
window.title("My first window")
tk.Label(window, text="Hello, World!").pack(padx=40, pady=20)
window.mainloop()
```

Programs like this open a window on the screen, so they need Python installed on a computer — they don't run in Colab. You don't need to understand this yet; by the end of the course (after Topic 17), code like this will make sense.

## Getting started with Google Colab

**Google Colab** ([colab.research.google.com](https://colab.research.google.com)) runs Python in your web browser, on Google's computers. It's free and needs no installation — only a browser, an internet connection and a free Google account. You can use it on:

- your own laptop,
- a school, university or library computer,
- a cybercafé computer,
- a tablet or a smartphone (turn it sideways for more room).

Your notebooks are saved automatically in your Google Drive, so you can start in the computer lab and continue on your phone.

**Quick start:**

1. Go to [colab.research.google.com](https://colab.research.google.com) and sign in with your Google account.
2. Click **New notebook**.
3. Type `print("Hello World!")` in the grey cell.
4. Press the **▶ play button** (or **Shift + Enter**). The output appears under the cell.

Topic 1 walks you through this step by step, and the appendix page **[Using Google Colab](content/appendix/google_colab.md)** explains everything else you'll need: saving files, uploading data, and more.

### Working on your own computer (optional)

If you'd rather work offline on your own computer, install **Thonny** from [thonny.org](https://thonny.org): it comes with Python included. Type each example into Thonny's editor, save it as a `.py` file, and press the green **Run** button. Everything in the course works the same way, except for the few Colab-only commands that start with `%` (Topic 1 and the Colab appendix explain the Thonny equivalents).

## Learning outcomes

By the end of this course, you will be able to:

1. **Explain** what a program and an algorithm are, and **write, run and save** Python programs in Colab notebooks (or an editor on your own computer). *(Topic 1)*
2. **Use** numbers, arithmetic, variables, strings and keyboard input to write short interactive programs. *(Topics 2–5)*
3. **Write and call functions** with parameters and return values, and **use modules** from Python's standard library. *(Topics 6–7)*
4. **Build Boolean conditions** and control the flow of a program with `if`/`elif`/`else`, `for` loops and `while` loops. *(Topics 8–10)*
5. **Store and process data** using lists, strings, tuples and dictionaries. *(Topics 11, 13 and 14)*
6. **Plan a program** with pseudocode and **build it step by step** from small, tested functions. *(Topic 12 and the projects)*
7. **Read from and write to text files.** *(Topic 15)*
8. **Read error messages and tracebacks**, find and fix bugs, and **handle exceptions** so programs don't crash on bad input. *(Topic 16)*
9. **Create classes and objects**, and **use inheritance and composition** to organise larger programs. *(Topics 17–18)*
10. **Combine all these skills** to complete multi-step projects such as a DNA analysis toolkit, a password generator and a Tic Tac Toe game. *(Practice Projects)*

## Who this course is for

- Complete beginners who have **never programmed** before.
- Students preparing for courses that use Python, such as Artificial Intelligence, Machine Learning, Deep Learning, data analysis or computational science.
- Anyone who wants to automate boring tasks with a computer.

**Prerequisites:** none, apart from basic computer use (opening a web browser, typing) and primary-school arithmetic.

## How the course is organised

| Part | Topics | What you'll learn |
|---|---|---|
| Getting started | 1–5 | printing, numbers, variables, text and asking the user questions |
| Reusing code | 6–7 | writing functions and using modules |
| Decisions and repetition | 8–12 | logic, `if` statements, loops, lists, and building a small game |
| Organising data | 13–16 | strings, tuples, dictionaries, files, and handling errors |
| Objects | 17–18 | classes, objects, inheritance and composition |
| Practice projects | 19–24 | bigger guided programs that combine everything |
| Appendix | — | using Google Colab, symbols and keywords, common errors, glossary |

Each topic builds on the ones before it, so **work through them in order**. A good habit is to make **one Colab notebook per topic**, for example `Topic 03 - Variables`.

## How to use this course

Every topic follows the same rhythm:

1. **Type the example into a code cell.** Type it yourself, exactly, character by character. Do **not** copy and paste — typing is how your fingers and brain learn.
2. **Run the cell and compare.** Check the output under the cell against **"What you should see"**. If they differ, find the difference.
3. **Break it.** Change something on purpose, run the cell again, and see what happens. Then fix it.
4. **Do the exercises.** Each topic has exercises embedded in the text. Try every one in its own cell *before* opening its solution.

```{warning}
From a certain perspective, programming is a craft. A carpenter cannot learn to make a chair by watching videos of other carpenters, and you cannot learn to program by reading, sitting in class, or watching your neighbour type. **Be active. Type, run, break, fix.**
```

Solutions are hidden in boxes like the one below. Open them only after you have honestly tried.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
Well done for trying first! Every solution in this course looks like this.
```python
print("I tried it myself first.")
```
````

## Getting help

- **Read the error message**, starting with its last line. The appendix *Common Errors* explains the most frequent ones.
- **Use `help()`** in a cell, for example `help(print)` or `help(str)`, to read Python's built-in documentation.
- **Search online** for the last line of an error message. Someone has almost certainly had the same problem.
- **The official documentation** at [docs.python.org](https://docs.python.org/3/) — especially *The Python Tutorial* — is the reference for exact details.
- **Ask a classmate or your instructor**, and show them your code *and* the full error message. In Colab you can share a notebook with the **Share** button.

## About this course

The hands-on approach of this course — type every example yourself, compare the output, then break it and fix it — is inspired by Zed A. Shaw's book *Learn Python the Hard Way*. All the examples, explanations and exercises have been written for this course and ordered for complete beginners.

If you'd like a book to read alongside the course, Allen B. Downey's *Think Python* is free to read online and very gentle.
