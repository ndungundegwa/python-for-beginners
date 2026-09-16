# Strings, Tuples and Slices

Lists are not the only sequences in Python. In this topic you'll see that a **string** is also a sequence of items (characters), meet the **tuple**, a list that can't be changed, and learn **slicing** — a powerful way to take out part of any sequence. You'll also collect the string methods you'll use most often.

## A string is a sequence of characters

Everything you learned about indexing lists works on strings too. Type this into a new cell:

```python
word = "Python"

print(word[0])
print(word[-1])
print(len(word))
print("th" in word)
```

```text
P
n
6
True
```

A single character is just a string of length 1, and `in` checks whether one piece of text appears inside another.

There is one big difference from lists: strings **cannot be changed**. We say they are **immutable**.

```python
word[0] = "J"
```

```text
TypeError: 'str' object does not support item assignment
```

To "change" a string, you build a new one, for example `"J" + word[1:]` gives `"Jython"`.

## Slicing

A **slice** takes out a part of a sequence. You write `sequence[start:stop]`: the slice begins at index `start` and stops **before** index `stop` — the same rule as `range`.

These examples all use the alphabet. Run each block in its own cell:

```python
c = "abcdefghijklmnopqrstuvwxyz"

print(c[0:10])     # the first 10 characters
print(c[:2])       # leave out start: from the beginning
print(c[2:])       # leave out stop: to the end
print(c[-5:])      # the last 5 characters
```

```text
abcdefghij
ab
cdefghijklmnopqrstuvwxyz
vwxyz
```

You can add a third number, the **step**:

```python
print(c[::2])      # every second character
print(c[::-1])     # a step of -1 goes backwards: the reversed string
```

```text
acegikmoqsuwy
zyxwvutsrqponmlkjihgfedcba
```

Slices work exactly the same way on lists: `[10, 20, 30, 40, 50][1:3]` is `[20, 30]`.

```{note}
Asking for a single index that doesn't exist is an error, but a slice that goes past the end is not: `c[20:100]` simply gives `'uvwxyz'`.
```

```{tip}
A notebook cell displays the value of its **last line**, so for quick experiments you can type just `c[::-1]` in a cell. Strings displayed this way appear with quotes, `'zyxw...'`, while `print` shows them without quotes.
```

## Useful string methods

Strings have many built-in methods. Because strings are immutable, these methods never change the original string; they **return a new one**.

**Changing case**

```python
print("hello".upper())
print("HELLO".lower())
print("hello world".capitalize())
print("hello world".title())
```

```text
HELLO
hello
Hello world
Hello World
```

**Cleaning and cutting**

```python
print("   hello   ".strip())             # remove spaces at both ends
print("mango,banana,pawpaw".split(","))
print("-".join(["2026", "09", "15"]))
print("I like tea".replace("tea", "chai"))
```

```text
hello
['mango', 'banana', 'pawpaw']
2026-09-15
I like chai
```

**Searching**

```python
text = "Karibu Nairobi! Karibu Kenya!"

print(text.find("Nairobi"))     # index of the first occurrence (-1 if absent)
print(text.count("Karibu"))     # how many times it appears
print(text.startswith("Karibu"))
```

```text
7
2
True
```

**Testing what a string contains**

```python
print("2026".isdigit())
print("Kenya".isalpha())
print("Kenya2026".isalpha())
```

```text
True
True
False
```

## Tuples

A **tuple** is like a list that can't be changed. You write it with **parentheses** instead of square brackets:

```python
point = (3, 4)
colours = ("black", "red", "green")
```

You get items out with indices and slices, just like a list:

```python
print(colours[0])
print(len(colours))
print(colours[1:])
```

```text
black
3
('red', 'green')
```

But you can't change them:

```python
colours[0] = "white"
```

```text
TypeError: 'tuple' object does not support item assignment
```

Why use a tuple instead of a list? Because it **protects** data that should stay together and unchanged: a date, a pair of coordinates, the RGB values of a colour.

You've actually used tuples already. When a function returns several values, Python packs them into a tuple, and you **unpack** it into variables:

```python
def min_and_max(numbers):
    return min(numbers), max(numbers)

result = min_and_max([4, 9, 2, 7])
print(result)            # (2, 9)

low, high = min_and_max([4, 9, 2, 7])
print(low, high)         # 2 9
```

The swap trick `a, b = b, a` from Topic 3 also works by building and unpacking a tuple.

```{warning}
A tuple with a single item needs a comma: `(5,)` is a tuple, but `(5)` is just the number 5 in parentheses.
```

## Exercises

### Exercise: slicing practice

Using `s = "abcdefghijklmnopqrstuvwxyz"`, write a slice for each of these, then check in a cell:

1. The first 5 characters.
2. The last 5 characters.
3. The second and third characters.
4. Every second character, starting from the first.
5. The whole string reversed.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
s = "abcdefghijklmnopqrstuvwxyz"
print(s[:5])     # abcde
print(s[-5:])    # vwxyz
print(s[1:3])    # bc
print(s[::2])    # acegikmoqsuwy
print(s[::-1])   # zyxwvutsrqponmlkjihgfedcba
```
````

### Exercise: palindromes

A **palindrome** reads the same forwards and backwards, like `madam` or `racecar`. Write a function `is_palindrome(word)` that returns `True` or `False`. Then improve it so that capital letters don't matter (`"Racecar"` should count).

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def is_palindrome(word):
    word = word.lower()
    return word == word[::-1]

print(is_palindrome("racecar"))   # True
print(is_palindrome("Racecar"))   # True
print(is_palindrome("python"))    # False
```
````

### Exercise: initials

Write a function `initials(full_name)` that returns the initials of a name in capitals, separated by dots. `initials("wangari muta maathai")` should return `"W.M.M."`. Unlike the version in Topic 7, it should work for names with any number of words.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def initials(full_name):
    result = ""
    for name in full_name.split():
        result = result + name[0].upper() + "."
    return result

print(initials("wangari muta maathai"))   # W.M.M.
```
`split()` with no argument splits on any spaces, even several in a row.
````

### Exercise: clean up an email address

Users type emails carelessly: `"  Amina.Otieno@EXAMPLE.com "`. Write a function `clean_email(email)` that removes surrounding spaces and makes everything lowercase. Then write `domain(email)` that returns the part after the `@`.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def clean_email(email):
    return email.strip().lower()

def domain(email):
    at = email.find("@")
    return email[at + 1:]

e = clean_email("  Amina.Otieno@EXAMPLE.com ")
print(e)            # amina.otieno@example.com
print(domain(e))    # example.com
```
`find("@")` gives the position of the `@`, and the slice `email[at + 1:]` takes everything after it. (`email.split("@")[1]` works too.)
````

### Exercise: what changes and what doesn't?

For each line, say whether it works or gives an error, and what the result is. Then check by running the lines one at a time.

```python
t = (1, 2, 3)
s = "cat"
lst = [1, 2, 3]

lst[0] = 10
t[0] = 10
s[0] = "b"
s = "b" + s[1:]
t = t + (4,)
print(lst, t, s)
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
- `lst[0] = 10` works: lists can be changed. `lst` is `[10, 2, 3]`.
- `t[0] = 10` → `TypeError`: tuples can't be changed.
- `s[0] = "b"` → `TypeError`: strings can't be changed.
- `s = "b" + s[1:]` works: it builds a **new** string `"bat"` and gives it the name `s`.
- `t = t + (4,)` works: it builds a **new** tuple `(1, 2, 3, 4)`.

If you skip the two error lines, the last line prints `[10, 2, 3] (1, 2, 3, 4) bat`.

If you run the whole block in one cell, it stops at the first error (`t[0] = 10`), and the lines after it never run.
````
