# Strings and Printing

You have been writing strings since your very first program. In this topic you'll learn what strings really are, how to put variables inside them, how to glue and repeat them, and how to write special characters such as tabs and new lines.

## What is a string?

A **string** is a piece of text: letters, digits, spaces, punctuation — any characters at all. You make a string by putting text between quotes, either double `"..."` or single `'...'`. Programs use strings to show messages to people, to store names and addresses, to save text in files, and much more.

Type this into a new code cell and run it:

```python
students = 45
greeting = f"There are {students} students in this class."

language = "Python"
feeling = "can't wait"
plan = f"We are learning {language} and we {feeling} to start."

print(greeting)
print(plan)

print(f"The teacher said: {greeting}")
print(f"Then she added: '{plan}'")

is_raining = True
weather_question = "Do we need an umbrella today? {}"

print(weather_question.format(is_raining))

first_half = "Haba na haba "
second_half = "hujaza kibaba."

print(first_half + second_half)
```

### What you should see

```text
There are 45 students in this class.
We are learning Python and we can't wait to start.
The teacher said: There are 45 students in this class.
Then she added: 'We are learning Python and we can't wait to start.'
Do we need an umbrella today? True
Haba na haba hujaza kibaba.
```

*Haba na haba hujaza kibaba* — "little by little fills the pot" — is a good motto for learning to program.

## Putting values inside strings

There are two common ways to build a string that contains values.

**f-strings.** Put an `f` right before the opening quote, and put any variable — or even a calculation — inside `{}`:

```python
name = "Wanjiru"
age = 19
print(f"{name} is {age} years old.")
print(f"Next year she will be {age + 1}.")
```

```text
Wanjiru is 19 years old.
Next year she will be 20.
```

**The `format` method.** Write a string with empty `{}` placeholders, then call `.format(...)` on it with the values to put in, in order:

```python
row = "{} | {} | {}"

print(row.format("Name", "County", "Score"))
print(row.format("Amina", "Mombasa", 88))
print(row.format("Kiprop", "Uasin Gishu", 92))
print(row.format(True, False, 3.5))
```

```text
Name | County | Score
Amina | Mombasa | 88
Kiprop | Uasin Gishu | 92
True | False | 3.5
```

`.format` is useful when the string with placeholders already exists, like `row` or `weather_question` above, and you want to fill it in many times. Most of the time, f-strings are shorter and easier to read.

You can also control how numbers look. `:.2f` means "two digits after the decimal point":

```python
price = 1234.5678
print(f"Total: {price:.2f} shillings")
```

```text
Total: 1234.57 shillings
```

## Joining and repeating strings

Two operators work on strings as well as numbers, but they mean something different:

- `+` **joins** (concatenates) two strings: `"Hello " + "World"` is `"Hello World"`.
- `*` **repeats** a string: `"-" * 10` is `"----------"`.

```python
print("Shopping list")
print("-" * 13)
print("Unga, " + "sukari, " + "majani ya chai.")
print("Ha" * 3 + "!")

# watch end=" " below. Try removing it to see what happens
print("Jambo", end=" ")
print("rafiki!")

print("Jambo")
print("rafiki!")
```

```text
Shopping list
-------------
Unga, sukari, majani ya chai.
HaHaHa!
Jambo rafiki!
Jambo
rafiki!
```

Normally `print` moves to a new line after printing. Adding `end=" "` tells it to finish with a space instead, so the next `print` continues on the same line.

```{warning}
You can't add a string and a number: `"Age: " + 19` gives `TypeError: can only concatenate str (not "int") to str`. Either use an f-string, `f"Age: {19}"`, or convert the number to text first with `str(19)`.
```

## Special characters: escape sequences

Some characters are hard to type inside a string. How do you put a new line in the middle of a string, or a double quote inside a string that starts with a double quote? You use a **backslash** `\` followed by a code. This is called an **escape sequence**.

```python
seasons = "Long rains, short rains, dry season"
long_rains = "March\nApril\nMay"

print("Kenya's seasons:", seasons)
print("The long rains usually fall in:", long_rains)
```

```text
Kenya's seasons: Long rains, short rains, dry season
The long rains usually fall in: March
April
May
```

Every `\n` became a new line. Here are the escape sequences you'll actually use:

| Escape | Meaning |
|---|---|
| `\n` | new line |
| `\t` | tab (a wide space, useful for lining things up) |
| `\\` | one backslash character |
| `\"` | a double quote inside a `"..."` string |
| `\'` | a single quote inside a `'...'` string |

```python
indented = "\tThis line starts with a tab."
two_lines = "This string is split\ninto two lines."
folder = "C:\\Users\\Amina\\notes"
sign = "The sign said \"No entry\"."

market_list = """
Market list:
\t* Tomatoes
\t* Onions
\t* Sukuma wiki\n\t* Avocados
"""

print(indented)
print(two_lines)
print(folder)
print(sign)
print(market_list)
```

```text
	This line starts with a tab.
This string is split
into two lines.
C:\Users\Amina\notes
The sign said "No entry".

Market list:
	* Tomatoes
	* Onions
	* Sukuma wiki
	* Avocados

```

## Strings over several lines

The `market_list` string above starts and ends with **three** double quotes `"""`. A triple-quoted string can run over as many lines as you like, and the line breaks become part of the string. Three single quotes `'''` work the same way.

```python
print("""
Roses are red,
Sukuma is green,
Python is the friendliest
language I've seen.
""")
```

```{tip}
Don't put spaces between the quotes: `" " "` is three separate strings, not a triple quote.
```

## How long is a string?

The built-in function `len` tells you how many characters a string has — spaces and punctuation included:

```python
print(len("Hello"))
print(len("Hello, World!"))
```

```text
5
13
```

Remember that a notebook cell also shows the value of its **last line**, so a cell containing only `len("Hello")` displays `5` without `print`.

## Exercises

### Exercise: strings inside strings

In the first program of this topic, find every place where a value is put inside a string, or strings are combined. How many are there? (Hint: there are more than four.)

````{admonition} Solution - Click the button to reveal!
:class: dropdown
1. `{students}` inside `greeting` — strictly a number converted to text.
2. `{language}` inside `plan`.
3. `{feeling}` inside `plan`.
4. `{greeting}` inside `f"The teacher said: {greeting}"`.
5. `{plan}` inside `f"Then she added: '{plan}'"`.
6. `is_raining` put into `weather_question` with `.format`.
7. `first_half + second_half` joins two strings into a new, longer one.

The lesson: strings can be built out of other strings in many ways.
````

### Exercise: predict the output

Write down exactly what each line prints, then check.

```python
print("ha" * 3)
print("5" + "5")
print(5 + 5)
print(len("Karibu Kenya"))
print(f"{10 / 4:.1f}")
print("A\tB\nC")
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```text
hahaha
55
10
12
2.5
A	B
C
```
`"5" + "5"` joins two strings, while `5 + 5` adds two numbers. `len` counts the space too: "Karibu" (6) + space (1) + "Kenya" (5) = 12. `10 / 4` is `2.5`, shown with one decimal. `\t` is a tab and `\n` starts a new line.
````

### Exercise: fix the quotes

Each line below causes an error or prints the wrong thing. Fix each one **without changing the text that should be displayed**. Try them one at a time, in separate cells.

```python
print('It's a sunny day.')
print("She said "hello" to me.")
print("Total: " + 250)
print("C:\new_folder")
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
print("It's a sunny day.")          # use the other kind of quote
print("She said \"hello\" to me.")  # escape the inner double quotes
print("Total: " + str(250))         # or: print(f"Total: {250}")
print("C:\\new_folder")             # \n would become a new line!
```
The last one is sneaky: it doesn't crash, but `\n` in `"C:\new_folder"` is read as a new line, so it prints `C:` and `ew_folder` on two lines.
````

### Exercise: a receipt

In a new cell, store an item name, a quantity and a unit price in variables, and print a neat receipt like the one below. Use `"=" * 30` for the lines, spaces to line things up, and `:.2f` for money.

```text
==============================
Item:        Exercise book
Quantity:    4
Unit price:  45.50
Total:       182.00
==============================
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
item = "Exercise book"
quantity = 4
unit_price = 45.5

total = quantity * unit_price

print("=" * 30)
print(f"Item:        {item}")
print(f"Quantity:    {quantity}")
print(f"Unit price:  {unit_price:.2f}")
print(f"Total:       {total:.2f}")
print("=" * 30)
```
````

### Exercise: a box that fits any name

In Topic 1 you drew your name in a box by counting stars by hand. Now let Python do the counting: store a name in a variable, and use `len` and `*` to print a box that always fits, with two spaces on each side of the name.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
name = "Amina"

border = "*" * (len(name) + 6)

print(border)
print("*  " + name + "  *")
print(border)
```
The middle line has 1 star + 2 spaces + the name + 2 spaces + 1 star, so the border needs `len(name) + 6` stars. Change `name` to `"Nyambura"` and run the cell again: the box grows to fit.
````
