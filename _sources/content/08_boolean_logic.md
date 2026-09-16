# True or False: Boolean Logic

Until now your programs have run in a straight line, from the first instruction to the last. To make programs that *decide* — "if the password is correct, let the user in" — you first need to be comfortable with **logic**: expressions whose answer is simply `True` or `False`. This topic gives you that foundation.

## The truth terms

In Python, these words and symbols are used to decide whether something is `True` or `False`:

| Term | Meaning |
|---|---|
| `and` | both sides must be true |
| `or` | at least one side must be true |
| `not` | flips true to false and false to true |
| `==` | equal to |
| `!=` | not equal to |
| `<`, `>` | less than, greater than |
| `<=`, `>=` | less than or equal, greater than or equal |
| `True`, `False` | the two Boolean values |

These values and expressions are called **Boolean**, after the mathematician George Boole.

```{warning}
`=` and `==` are different. A single `=` **assigns** a value to a variable (`x = 5`). A double `==` **asks a question**: is the left equal to the right? (`x == 5` is `True` or `False`.)
```

Notebooks are perfect for practising logic: type one expression into a cell and run it, and the answer appears below — no `print` needed.

```python
7 > 3
```

```text
True
```

## Truth tables

A **truth table** lists every possible combination of inputs and the result. With two Boolean values `A` and `B` there are only four combinations, so the whole of `and`, `or` and `not` fits in one table:

| `A` | `B` | `A and B` | `A or B` | `not A` | `not (A and B)` | `not (A or B)` |
|---|---|---|---|---|---|---|
| `True` | `True` | `True` | `True` | `False` | `False` | `False` |
| `True` | `False` | `False` | `True` | `False` | `True` | `False` |
| `False` | `True` | `False` | `True` | `True` | `True` | `False` |
| `False` | `False` | `False` | `False` | `True` | `True` | `True` |

Two rules are enough to rebuild the whole table from memory:

- `and` is `True` **only when both** sides are `True`.
- `or` is `False` **only when both** sides are `False`.

Comparisons produce Booleans too. Here is the same idea for equality, using two variables `x` and `y`:

| `x` | `y` | `x == y` | `x != y` |
|---|---|---|---|
| `5` | `5` | `True` | `False` |
| `5` | `8` | `False` | `True` |
| `"chai"` | `"chai"` | `True` | `False` |
| `"chai"` | `"Chai"` | `False` | `True` |

```{tip}
Make flash cards with an expression such as `False or True` on one side and the answer on the other. A few minutes a day for a week and you'll answer instantly — which will make the next topic much easier.
```

## Solving long expressions step by step

Long expressions can look scary, but you can always shrink them one small piece at a time:

1. Work out every **comparison** (`==`, `!=`, `<`, …) and write `True` or `False` in its place.
2. Work out anything **inside brackets**, innermost first.
3. Apply each `not` to the value right after it.
4. Work out the remaining `and`s, then the remaining `or`s.

Keep rewriting the expression until a single `True` or `False` is left. Let's solve this one:

```python
5 > 2 and not ("mango" == "Mango" or 10 != 10)
```

1. Comparisons: `5 > 2` is `True`; `"mango" == "Mango"` is `False` (a capital M is a different character); `10 != 10` is `False`. We now have `True and not (False or False)`.
2. Brackets: `(False or False)` is `False`. We now have `True and not False`.
3. `not False` is `True`. We now have `True and True`.
4. `True and True` is **`True`**.

Run the expression in a cell to check.

```{note}
If you're not sure which part Python works out first, **add brackets**. Brackets never hurt, and they make your intention clear to people reading the code.
```

## Comparing strings

You can compare strings too. `==` is `True` only if the two strings are **exactly** the same, character for character — including capital letters and spaces:

```python
print("Nairobi" == "Nairobi")
print("Nairobi" == "nairobi")
print("Nairobi " == "Nairobi")
print("5" == 5)
```

```text
True
False
False
False
```

`"5"` (a string) and `5` (a number) are never equal — remember this when you compare the result of `input()` with a number.

`<` and `>` compare strings in alphabetical ("dictionary") order: `"apple" < "banana"` is `True`.

## Booleans in variables

The result of a comparison is a value like any other, so you can store it in a variable with a good name. This makes later decisions much easier to read:

```python
age = 16
has_ticket = True

is_teenager = age >= 13 and age <= 19
can_enter = has_ticket and not is_teenager

print(is_teenager)
print(can_enter)
```

```text
True
False
```

Python also lets you chain comparisons the way you would in maths: `13 <= age <= 19` means the same as `age >= 13 and age <= 19`.

```{tip}
**Shortcuts:** in an `and` expression, as soon as one side is `False`, the whole thing is `False`. In an `or` expression, as soon as one side is `True`, the whole thing is `True`. Python stops checking at that point.
```

## Exercises

### Exercise: Boolean practice

For each expression, write down `True` or `False` **before** running it. Then check your answers, one cell at a time, and count how many you got right.

1. `True or False`
2. `False and False`
3. `2 + 2 == 4 and 3 > 5`
4. `"chai" == "chai"`
5. `"Chai" == "chai"`
6. `10 >= 10 or 1 == 2`
7. `not (5 < 3)`
8. `False or 7 != 7`
9. `"Nairobi" != "Mombasa"`
10. `3 == "3"`
11. `not True or 4 > 1`
12. `1 < 2 and 2 < 3 and 3 < 4`
13. `not (True or False)`
14. `not (0 == 1 and 5 == 5)`
15. `100 % 2 == 0 and 7 % 2 == 0`
16. `not ("maize" == "maize" and "beans" != "beans")`
17. `(4 > 9 or "a" < "b") and not False`
18. `len("Kenya") == 5 and not (2 ** 3 == 8)`
19. `not (18 >= 21 or "Kisumu" == "kisumu")`
20. `10 // 3 == 3 and not (10 % 3 == 1 or 1 == 0)`

````{admonition} Solution - Click the button to reveal!
:class: dropdown
1. True  2. False  3. False  4. True  5. False
6. True  7. True  8. False  9. True  10. False
11. True  12. True  13. False  14. True  15. False
16. True  17. True  18. False  19. True  20. False

Worked examples of the hardest ones:
- **11:** `not` applies only to `True`, not to the whole line: `not True` is False, `4 > 1` is True, and `False or True` is **True**.
- **16:** `"maize" == "maize"` is True and `"beans" != "beans"` is False; `(True and False)` is False; `not False` is **True**.
- **17:** `4 > 9` is False and `"a" < "b"` is True, so the brackets give True; `not False` is True; `True and True` is **True**.
- **18:** `len("Kenya")` is 5, so the left is True; `2 ** 3 == 8` is True and `not True` is False; `True and False` is **False**.
- **20:** `10 // 3` is 3, so the left is True; `10 % 3 == 1` is True, so the brackets give True; `not True` is False; `True and False` is **False**.
````

### Exercise: name the operators

Write the English name of each operator: `==`, `!=`, `<`, `>=`, `and`, `not`. Then give one example of each whose result is `True`.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
| Operator | Name | True example |
|---|---|---|
| `==` | equal to | `2 + 2 == 4` |
| `!=` | not equal to | `"cat" != "dog"` |
| `<` | less than | `3 < 10` |
| `>=` | greater than or equal to | `5 >= 5` |
| `and` | and | `1 < 2 and 2 < 3` |
| `not` | not | `not False` |
````

### Exercise: write the conditions

Given variables `age`, `score` and `country`, write a Boolean expression for each description.

1. `age` is at least 18.
2. `score` is between 50 and 100, inclusive.
3. `country` is either `"Kenya"` or `"Uganda"`.
4. `age` is under 13 **or** over 65.
5. `score` is **not** equal to 0 and `age` is at least 16.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
1. `age >= 18`
2. `score >= 50 and score <= 100` (or `50 <= score <= 100`)
3. `country == "Kenya" or country == "Uganda"`
4. `age < 13 or age > 65`
5. `score != 0 and age >= 16`

A common mistake for number 3 is `country == "Kenya" or "Uganda"`. That doesn't do what it looks like: Python reads it as `(country == "Kenya") or ("Uganda")`, and a non-empty string counts as true, so the whole expression is always truthy. Each side of `or` must be a complete comparison.
````

### Exercise: is it a leap year?

A year is a leap year if it is divisible by 4, **except** that years divisible by 100 are not leap years, **unless** they are also divisible by 400. Write a single Boolean expression using the variable `year`, `%`, `==`, `and`, `or` and `not`. Test it with 2024 (leap), 1900 (not leap), 2000 (leap) and 2023 (not leap).

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
year = 1900
is_leap = (year % 4 == 0 and year % 100 != 0) or year % 400 == 0
print(is_leap)
```
- 2024: divisible by 4 and not by 100 → **True**.
- 1900: divisible by 100 but not by 400 → **False**.
- 2000: divisible by 400 → **True**.
- 2023: not divisible by 4 → **False**.
````
