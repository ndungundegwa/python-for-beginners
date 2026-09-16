# Variables and Names

Printing and calculating is a good start, but real programs need to *remember* things: a price, a name, a score. In this topic you'll learn to give names to values using **variables**, and you'll discover that the `=` sign in Python doesn't mean what it means in mathematics.

## A variable is a name for a value

A **variable** is simply a name that refers to a value, the same way your name refers to you. Programmers use variables so their code reads almost like English — and because nobody can remember what `420 / 35` was supposed to mean three weeks later.

Imagine you manage the matatus at a busy stage. Type this into a new cell and run it:

```python
matatus = 50
seats_per_matatu = 14.0
drivers = 35
passengers = 420

matatus_not_used = matatus - drivers
matatus_used = drivers
seats_available = matatus_used * seats_per_matatu
average_passengers = passengers / matatus_used

print("There are", matatus, "matatus at the stage.")
print("Only", drivers, "drivers came to work today.")
print(matatus_not_used, "matatus will stay parked.")
print("We can carry", seats_available, "passengers today.")
print("There are", passengers, "passengers waiting.")
print("That is about", average_passengers, "passengers per matatu.")
```

### What you should see

```text
There are 50 matatus at the stage.
Only 35 drivers came to work today.
15 matatus will stay parked.
We can carry 490.0 passengers today.
There are 420 passengers waiting.
That is about 12.0 passengers per matatu.
```

The line `matatus = 50` **creates** a variable called `matatus` and makes it refer to the value `50`. From then on, wherever you write `matatus`, Python uses `50`. Later lines can use earlier variables in calculations: `matatus_not_used = matatus - drivers` works out `50 - 35` and names the result.

```{note}
In a notebook, variables **stay alive after the cell has run**. If you add a new cell below and run `print(seats_available)`, it prints `490.0`, because the first cell already created that variable. If you restart the session (**Runtime → Restart session**), all variables are forgotten until you run the cells again.
```

```{warning}
The `_` in `seats_per_matatu` is an **underscore**. Spaces aren't allowed inside variable names, so we use underscores to separate words. Find out how to type it on your keyboard (or phone) if you don't know already.
```

## Assignment is not equality

The `=` sign is called the **assignment operator**. It does *not* say "these two things are equal". It is an instruction with two steps:

1. First, work out the value on the **right**.
2. Then, make the name on the **left** refer to that value.

That's why this is perfectly valid Python, even though it would be nonsense in a maths lesson:

```python
score = 10
score = score + 5
print(score)
```

```text
15
```

Python first works out `score + 5` (which is `15`), then makes `score` refer to `15`. The old value `10` is forgotten.

This pattern — "add something to a variable" — is so common that Python has a shortcut:

```python
score += 5    # the same as: score = score + 5
```

There are matching shortcuts for the other operators: `-=`, `*=`, `/=`.

## Putting variables inside text

Here's another program. It stores facts about a person and prints them using a new kind of string called an **f-string**: put an `f` before the opening quote, then write variable names inside curly braces `{}`.

```python
name = "Wanjiku Kamau"
age = 24
height = 165          # centimetres
weight = 58           # kilograms
home_county = "Murang'a"
favourite_food = "githeri"

print(f"Let me introduce {name}.")
print(f"She is {age} years old and {height} cm tall.")
print(f"She weighs {weight} kg.")
print(f"She comes from {home_county} County.")
print(f"Her favourite food is {favourite_food}.")

total = age + height + weight
print(f"Adding {age}, {height} and {weight} gives {total}.")
```

### What you should see

```text
Let me introduce Wanjiku Kamau.
She is 24 years old and 165 cm tall.
She weighs 58 kg.
She comes from Murang'a County.
Her favourite food is githeri.
Adding 24, 165 and 58 gives 247.
```

When Python sees `f"... {name} ..."`, it replaces `{name}` with the variable's value. Topic 4 explores f-strings further.

## Rules for naming variables

- A name can contain **letters, digits and underscores**, but it **cannot start with a digit**. `crate1` is fine; `1crate` is not.
- Names are **case-sensitive**: `Score`, `score` and `SCORE` are three different variables.
- You can't use Python's **keywords** such as `if`, `for`, `while`, `def` or `class` as names. Names of built-in functions such as `print`, `input` or `len` are technically allowed, but using them hides the function — so avoid them too.
- Choose names that **say what the value means**: `average_passengers` is longer than `a`, but you'll never wonder what it holds. `a`, `x2` and `thing` tell you nothing.

## Using a name before creating it

If you use a variable that doesn't exist yet — or that you spelled differently — Python stops with a `NameError`. Suppose one line of the matatu program had a small typing mistake:

```python
print("We can carry", seat_available, "passengers today.")
```

```text
NameError: name 'seat_available' is not defined
```

Read the last line: the name `seat_available` is not defined. The variable was created as `seats_available`, with an **s**. To Python, those are completely different names. (Python sometimes adds a helpful hint such as *Did you mean: 'seats_available'?*)

```{tip}
In a notebook, a `NameError` can also mean you simply **haven't run** the cell that creates the variable yet — for example after restarting the session. Run the earlier cells first.
```

## Swapping two values

Python lets you assign several variables on one line, with the names on the left and the values on the right, separated by commas:

```python
a, b, c = 10, 254.2, 2
```

This gives a neat way to **swap** two variables:

```python
a, b = b, a
```

Python works out the right side first (the values of `b` and `a`), then assigns them to `a` and `b`.

## Exercises

### Exercise: what does 14.0 change?

In the matatu program, `seats_per_matatu` is `14.0`. Change it to `14` and run the cell again. Which output line changes, and why?

````{admonition} Solution - Click the button to reveal!
:class: dropdown
The line `We can carry 490.0 passengers today.` becomes `We can carry 490 passengers today.` Multiplying two **ints** (`35 * 14`) gives an int, while multiplying by a **float** (`35 * 14.0`) gives a float. The last line still prints `12.0`, because `/` always gives a float.
````

### Exercise: convert the measurements

Add variables to the Wanjiku program that convert her height from centimetres to **inches** (divide by 2.54) and her weight from kilograms to **pounds** (multiply by 2.2046). Print the results with f-strings, rounded to one decimal place with `round(value, 1)`. Don't work out the numbers yourself — let Python do the maths.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
height = 165   # centimetres
weight = 58    # kilograms

height_inches = height / 2.54
weight_pounds = weight * 2.2046

print(f"She is {round(height_inches, 1)} inches tall.")
print(f"She weighs {round(weight_pounds, 1)} pounds.")
```
This prints `65.0` inches and `127.9` pounds.
````

### Exercise: trace the variables

Without running it, write down the value of each variable after every line. Then check by adding `print` calls.

```python
x = 5
y = x + 2
x = x * 3
y += x
x, y = y, x
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
| After line | `x` | `y` |
|---|---|---|
| `x = 5` | 5 | — |
| `y = x + 2` | 5 | 7 |
| `x = x * 3` | 15 | 7 |
| `y += x` | 15 | 22 |
| `x, y = y, x` | 22 | 15 |

Notice that changing `x` on line 3 does **not** change `y`: `y` was given the value `7` on line 2, and it keeps that value until it is assigned again.
````

### Exercise: a shopping bill

In a new cell, create variables for the price of bread (65 shillings), milk (60 shillings) and eggs (15 shillings each). Buy 2 loaves, 3 packets of milk and 12 eggs. Calculate and print the total, and how much change you get from a 1000-shilling note.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
bread_price = 65
milk_price = 60
egg_price = 15

loaves = 2
milk_packets = 3
eggs = 12

total = bread_price * loaves + milk_price * milk_packets + egg_price * eggs
change = 1000 - total

print(f"Total: {total} shillings")
print(f"Change from 1000: {change} shillings")
```
The total is `490` shillings and the change is `510`. Because every price has a name, changing the price of milk later means editing a single line.
````
