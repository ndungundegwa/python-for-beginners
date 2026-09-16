# Numbers and Math

Every programming language can do arithmetic. In this topic you'll use Python as a calculator, learn the names and meanings of the math symbols, and discover that Python has two different kinds of numbers.

Don't worry if you think you're "bad at maths". Programming uses very little mathematics beyond what you did in primary school — and the computer does the actual calculating.

## The math symbols

Before you type the next program, learn the names of these symbols. Say each name out loud as you type it.

| Symbol | Name | What it does |
|---|---|---|
| `+` | plus | addition |
| `-` | minus | subtraction |
| `*` | asterisk | multiplication |
| `/` | slash | division |
| `//` | double slash | whole-number (floor) division |
| `%` | percent | remainder after division (modulus) |
| `**` | double asterisk | power (`2 ** 3` is 8) |
| `<` | less-than | is the left smaller? |
| `>` | greater-than | is the left bigger? |
| `<=` | less-than-or-equal | smaller or equal? |
| `>=` | greater-than-or-equal | bigger or equal? |

## A fruit stall calculator

Imagine you run a fruit stall. Type this into a new code cell and run it:

```python
print("Fruit stall calculator")

print("Mangoes in 3 full crates plus 5 loose ones:", 3 * 24 + 5)
print("Price of 7 mangoes at 25 shillings each:", 7 * 25)

print("Sharing 100 oranges between 8 customers:", 100 / 8)
print("Whole oranges each customer gets:", 100 // 8)
print("Oranges left over:", 100 % 8)

print("Order of operations:", 10 + 20 / 5 * 2)
print("With brackets:", (10 + 20) / 5 * 2)
print("2 to the power 10 is", 2 ** 10)

print("Are there more than 75 mangoes?", 3 * 24 + 5 > 75)
print("Is 175 shillings at most 150 shillings?", 7 * 25 <= 150)
```

### What you should see

```text
Fruit stall calculator
Mangoes in 3 full crates plus 5 loose ones: 77
Price of 7 mangoes at 25 shillings each: 175
Sharing 100 oranges between 8 customers: 12.5
Whole oranges each customer gets: 12
Oranges left over: 4
Order of operations: 18.0
With brackets: 12.0
2 to the power 10 is 1024
Are there more than 75 mangoes? True
Is 175 shillings at most 150 shillings? False
```

Notice that `print` can take several things separated by commas — a string and a calculation, for example — and prints them with a space in between.

## Order of operations

Why is `10 + 20 / 5 * 2` equal to 18.0 and not 12.0? Because Python, like mathematics, does some operations before others:

1. **P**arentheses (brackets) first,
2. then **E**xponents (`**`),
3. then **M**ultiplication and **D**ivision (including `//` and `%`), together, from left to right,
4. then **A**ddition and **S**ubtraction, together, from left to right.

This is often remembered as **PEMDAS** (or BODMAS) — but remember that multiplication and division are done *together*, left to right, and so are addition and subtraction. So `10 + 20 / 5 * 2` is `10 + (20 / 5) * 2`, which is `10 + 4.0 * 2`, which is `10 + 8.0`, which is `18.0`.

When you want a different order, use brackets: `(10 + 20) / 5 * 2` is `30 / 5 * 2`, which is `12.0`.

## Remainders: the % operator

`%` has nothing to do with percentages in Python. It gives the **remainder** of a division. When 100 oranges are shared between 8 customers, each gets 12 whole oranges and **4** are left over:

```python
print(100 // 8)   # how many whole times does 8 go into 100?
print(100 % 8)    # what is left over?
```

```text
12
4
```

The pair `//` and `%` is surprisingly useful. For example, `n % 2` is `0` exactly when `n` is even — a trick you'll use again and again.

## Two kinds of numbers

Look again at the output: some results are written `77` and some `12.5` or `18.0`. Python has two kinds of numbers:

- **Integers** (`int`): whole numbers like `77`, `-2`, `0`, `4876587659`. Python integers can be as large as you like.
- **Floating-point numbers** (`float`): numbers with a decimal point like `12.5`, `18.0`, `3.14`.

The slash `/` **always** gives a float, even when the answer is a whole number:

```python
print(8 / 2)
print(8 // 2)
```

```text
4.0
4
```

When you mix an int and a float in one calculation, the result is a float: `3 + 1.0` is `4.0`.

You can ask Python what kind of value something is with the `type` function:

```python
print(type(77))
print(type(12.5))
```

```text
<class 'int'>
<class 'float'>
```

```{note}
Floats are stored in a way that can't represent every decimal exactly. Run `0.1 + 0.2` in a cell — you'll get `0.30000000000000004`. This isn't a bug in Python; every language behaves like this. For now, just don't be surprised when you see it.
```

## True and False

The last two lines printed `True` and `False`. The comparison symbols `<`, `>`, `<=` and `>=` don't calculate a number; they answer a **yes/no question**. The answer is a special value: `True` or `False`. We'll use these a lot from Topic 8 onwards.

## Python as a calculator

A notebook cell shows the value of its **last line** automatically, so for quick calculations you don't even need `print`. Try each of these in its own cell:

```python
365 * 24
```

```text
8760
```

```python
1500 * 12 * 0.16
```

```text
2880.0
```

```python
2 ** 10
```

```text
1024
```

```{warning}
Only the **last** line of a cell is shown automatically. If a cell contains `2 + 2` on one line and `3 + 3` on the next, you'll only see `6`. Use `print` when you want to see several results.
```

## Exercises

### Exercise: explain each line

Above every line of the fruit stall program, write a comment (using `#`) explaining in plain English what the line calculates. For example: `# 3 crates of 24 mangoes, plus 5 loose mangoes`.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
A few example comments:
```python
# 3 * 24 is done first (72 mangoes in crates), then + 5 gives 77
print("Mangoes in 3 full crates plus 5 loose ones:", 3 * 24 + 5)
# 100 divided by 8 is 12.5, a float, because / always gives a float
print("Sharing 100 oranges between 8 customers:", 100 / 8)
# 100 % 8 is what is left after taking out 12 * 8 = 96: that's 4
print("Oranges left over:", 100 % 8)
# 20 / 5 is 4.0, times 2 is 8.0, and 10 + 8.0 is 18.0
print("Order of operations:", 10 + 20 / 5 * 2)
# 7 * 25 is 175, and 175 <= 150 is False
print("Is 175 shillings at most 150 shillings?", 7 * 25 <= 150)
```
````

### Exercise: predict, then check

Without running Python, write down the result of each expression. Then check your answers, one per cell.

1. `10 - 2 * 3`
2. `(10 - 2) * 3`
3. `20 / 4`
4. `20 // 6`
5. `20 % 6`
6. `2 ** 3 + 1`
7. `7 > 3`
8. `4 + 4 <= 7`

````{admonition} Solution - Click the button to reveal!
:class: dropdown
1. `4` — multiplication first: `10 - 6`.
2. `24` — brackets first: `8 * 3`.
3. `5.0` — `/` always gives a float.
4. `3` — 6 goes into 20 three whole times.
5. `2` — `20 - 3 * 6` leaves 2.
6. `9` — the power first: `8 + 1`.
7. `True`.
8. `False` — `4 + 4` is 8, and 8 is not less than or equal to 7.
````

### Exercise: seconds in a day, a week, a year

In a new cell, print how many seconds there are in a minute, an hour, a day, a week and a (non-leap) year. Use calculations, not numbers worked out on paper.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
print("Seconds in a minute:", 60)
print("Seconds in an hour:", 60 * 60)
print("Seconds in a day:", 60 * 60 * 24)
print("Seconds in a week:", 60 * 60 * 24 * 7)
print("Seconds in a year:", 60 * 60 * 24 * 365)
```
The year has `31536000` seconds. Letting Python do the multiplication avoids arithmetic mistakes — and in Topic 3 you'll give these numbers names so the program is even clearer.
````

### Exercise: even or odd?

Use the `%` and `//` operators to find out whether 1234567 is even or odd, and how many whole weeks and leftover days there are in 100 days.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
print(1234567 % 2)
print(100 // 7)
print(100 % 7)
```
```text
1
14
2
```
The remainder of dividing by 2 is 1, so 1234567 is **odd**. 100 days is **14 weeks and 2 days**.
````
