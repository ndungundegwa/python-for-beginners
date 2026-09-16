# Asking the User Questions

So far your programs have always done the same thing every time they run. Most useful software follows a different pattern:

1. **Take some input** from a person.
2. **Change it** or calculate something with it.
3. **Print** something to show the result.

In this topic you'll learn to get input from the keyboard, and to turn that input into numbers you can calculate with.

## input(): waiting for the user

Type this into a new code cell and run it:

```python
print("What is your name?")
name = input()
print("Which county are you from?")
county = input()
print("What is your favourite subject?")
subject = input()

print(f"So, {name}, you're from {county} and you enjoy {subject}.")
```

### What you should see

When the program reaches `input()`, it **pauses** and waits. In Colab, a small **text box** appears under the cell. Click inside it, type your answer and press **Enter**; the text you typed becomes the value of the variable.

```text
What is your name?
Achieng
Which county are you from?
Kisumu
What is your favourite subject?
Biology
So, Achieng, you're from Kisumu and you enjoy Biology.
```

(The answers `Achieng`, `Kisumu` and `Biology` were typed by the user. Yours will be different.)

```{warning}
While a cell is waiting for input, its run button keeps spinning and **no other cell can run**. If you get stuck, answer the question — or click the **stop** button (■) next to the cell to interrupt it.
```

## Prompting people

`input` can print the question for you. Put the question, as a string, inside the parentheses — this is called a **prompt**:

```python
name = input("What is your name? ")
county = input("Which county are you from? ")
subject = input("What is your favourite subject? ")

print(f"So, {name}, you're from {county} and you enjoy {subject}.")
```

```text
What is your name? Achieng
Which county are you from? Kisumu
What is your favourite subject? Biology
So, Achieng, you're from Kisumu and you enjoy Biology.
```

This does exactly the same as the previous program in fewer lines, and the answer now appears on the same line as the question. Leave a space at the end of the prompt so the answer doesn't stick to the question.

```{tip}
Want to know what a built-in function does? Run `help(input)` in a cell and the explanation is printed below it. In Colab you can also hover over a function name for a moment, or type `input?` in a cell and run it to open the documentation in a side panel.
```

## input always gives you a string

Here is a trap that catches every beginner. Try this program:

```python
a = input("First number: ")
b = input("Second number: ")
print("The sum is", a + b)
```

```text
First number: 12
Second number: 30
The sum is 1230
```

`12 + 30` is not `1230`! The problem is that **`input` always returns a string**, even when the user types digits. So `a` is the text `"12"` and `b` is the text `"30"`, and `+` on strings *joins* them.

To do maths, **convert** the text into a number:

- `int(...)` converts to a whole number: `int("12")` is `12`.
- `float(...)` converts to a decimal number: `float("1.75")` is `1.75`.
- `str(...)` converts anything back into text: `str(42)` is `"42"`.

```python
a = int(input("First number: "))
b = int(input("Second number: "))
print("The sum is", a + b)
```

```text
First number: 12
Second number: 30
The sum is 42
```

Read `int(input("First number: "))` from the inside out: first `input` asks the question and returns a string, then `int` turns that string into an integer.

## A first useful program: the mean of two numbers

Here is a small program that calculates the average (mean) of two numbers:

```python
print("Enter two values.")
a = float(input())
b = float(input())
print("The mean is:")
print((a + b) / 2)
```

```text
Enter two values.
12.5
16
The mean is:
14.25
```

Note the parentheses in `(a + b) / 2`. Without them, Python would divide `b` by 2 first and then add `a`.

## When conversion fails

What happens if the user types something that isn't a number? Run the sum program again and answer `twelve`. Python stops, prints a red error box, and its **last line** says:

```text
ValueError: invalid literal for int() with base 10: 'twelve'
```

A `ValueError` means the *kind* of value was right (a string) but its *content* couldn't be used. The same thing happens with `int("10.5")`: `"10.5"` is a perfectly good float, but not a whole number. Use `float` when decimals are allowed.

For now, just type sensible answers when you test. In Topic 10 you'll learn to keep asking until the answer is valid, and in Topic 16 to handle errors gracefully.

## A quick look at types

Every value in Python has a **type**. You've now met four of them, and `type` tells you which one a value is:

| Type | Example | What it is |
|---|---|---|
| `int` | `42` | whole number |
| `float` | `3.14` | number with a decimal point |
| `str` | `"hello"` | text |
| `bool` | `True` | yes/no value |

```python
answer = input("Type a number: ")
print(type(answer))
print(type(int(answer)))
```

```text
Type a number: 42
<class 'str'>
<class 'int'>
```

## Exercises

Put each exercise in its own code cell.

### Exercise: a short form

Write a program that asks the user for their name, their home town and their favourite food, then prints a sentence using all three answers.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
name = input("What is your name? ")
town = input("Where are you from? ")
food = input("What is your favourite food? ")

print(f"Hello {name} from {town}! I hear you love {food}.")
```
````

### Exercise: why is this wrong?

A student wants to know the user's age next year and writes:

```python
age = input("How old are you? ")
print("Next year you will be", age + 1)
```

What happens when it runs? Explain the error and fix the program.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
Python stops with `TypeError: can only concatenate str (not "int") to str`. `age` is a **string** (for example `"19"`), and you can't add the number `1` to a string. Convert the answer first:
```python
age = int(input("How old are you? "))
print("Next year you will be", age + 1)
```
````

### Exercise: temperature converter

Write a program that asks for a temperature in degrees Celsius (decimals allowed) and prints it in degrees Fahrenheit, using the formula F = C × 9 / 5 + 32. Show one decimal place.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
celsius = float(input("Temperature in Celsius: "))
fahrenheit = celsius * 9 / 5 + 32
print(f"{celsius} °C is {fahrenheit:.1f} °F")
```
For `25` this prints `25.0 °C is 77.0 °F`. We use `float` rather than `int` so that answers like `36.6` are accepted.
````

### Exercise: body mass index

Write a program that asks for a person's weight in kilograms and height in metres, then prints their body mass index, BMI = weight ÷ height², rounded to one decimal place.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
weight = float(input("Weight in kg: "))
height = float(input("Height in metres: "))

bmi = weight / height ** 2

print(f"Your BMI is {bmi:.1f}")
```
For a weight of 70 kg and a height of 1.75 m, the BMI is `22.9`. `height ** 2` is calculated before the division because `**` comes first in the order of operations.
````

### Exercise: splitting the bill

Ask for the total bill and the number of friends. Print how much each friend pays (two decimal places). Then, using `//` and `%`, work out how many whole 100-shilling notes each friend's share contains, and how many shillings are left over.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
total = int(input("Total bill (shillings): "))
friends = int(input("Number of friends: "))

share = total / friends
print(f"Each friend pays {share:.2f} shillings")

notes = int(share) // 100
leftover = int(share) % 100
print(f"That is {notes} 100-shilling notes and {leftover} shillings")
```
For a bill of 2350 shillings shared by 4 friends, each pays `587.50`, which is `5` notes of 100 and `87` shillings (plus the extra 50 cents). `int(share)` drops the decimal part so that `//` and `%` give whole numbers.
````
