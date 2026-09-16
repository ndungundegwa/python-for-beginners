# Loops: Doing Things Again and Again

Computers never get bored. They can repeat the same work thousands of times without a mistake — as long as you tell them how. In this topic you'll learn the two kinds of **loops** in Python, `for` and `while`, and meet your first **lists** along the way.

## A first look at lists

Before we can loop over things, we need somewhere to keep several things together. A **list** is exactly what its name says: a collection of items in order. You write a list with square brackets, separating the items with commas:

```python
counties = ["Nairobi", "Kisumu", "Nakuru"]
scores = [65, 78, 92]
```

That's all you need for now; Topic 11 is all about lists.

## The for loop

Type this into a new code cell and run it:

```python
scores = [65, 78, 92, 54]
counties = ["Nairobi", "Kisumu", "Nakuru", "Mombasa"]
student = ["Amina", 17, "Form 3", True]

# go through a list of numbers
for score in scores:
    print(f"Score: {score}")

# go through a list of strings
for county in counties:
    print(f"Hello from {county}!")

# a list can hold different kinds of values
for item in student:
    print(f"Item: {item}")

# build a new list, starting with an empty one
squares = []

for n in range(1, 6):
    print(f"Adding {n * n} to the list.")
    squares.append(n * n)    # append adds an item to the end of a list

print("The squares are:", squares)
```

### What you should see

```text
Score: 65
Score: 78
Score: 92
Score: 54
Hello from Nairobi!
Hello from Kisumu!
Hello from Nakuru!
Hello from Mombasa!
Item: Amina
Item: 17
Item: Form 3
Item: True
Adding 1 to the list.
Adding 4 to the list.
Adding 9 to the list.
Adding 16 to the list.
Adding 25 to the list.
The squares are: [1, 4, 9, 16, 25]
```

Read `for county in counties:` as "**for each** county in the list of counties, do the indented block". Python takes the first item, puts it in the variable `county`, runs the block, then takes the next item, and so on until the list is used up. You choose the variable's name; it's created by the loop itself.

A `for` loop works on any sequence, including strings — it then goes through the characters one by one:

```python
for letter in "Jambo":
    print(letter)
```

```text
J
a
m
b
o
```

## Counting with range

`range` produces a sequence of whole numbers for a loop to walk through:

- `range(5)` gives 0, 1, 2, 3, 4 — it starts at 0 and **stops before** 5.
- `range(1, 6)` gives 1, 2, 3, 4, 5.
- `range(0, 20, 5)` gives 0, 5, 10, 15 — the third number is the step.
- `range(10, 0, -1)` counts down: 10, 9, …, 1.

```python
for i in range(1, 4):
    print(f"{i} x 7 = {i * 7}")
```

```text
1 x 7 = 7
2 x 7 = 14
3 x 7 = 21
```

```{note}
Why does `range(1, 3)` only give 1 and 2? `range` always stops **before** its end number. This feels odd at first, but it means `range(n)` gives exactly `n` numbers, which turns out to be very convenient.
```

## Adding things up in a loop

A very common pattern is to keep a **running total**: start a variable at 0 before the loop, and add to it each time around.

```python
scores = [65, 78, 92, 54]

total = 0
for score in scores:
    total = total + score
    print(f"Added {score}, total is now {total}")

print("Average score:", total / len(scores))
```

```text
Added 65, total is now 65
Added 78, total is now 143
Added 92, total is now 235
Added 54, total is now 289
Average score: 72.25
```

## The while loop

A `while` loop keeps running its block **as long as** a Boolean expression is `True`. It checks the condition, runs the block, jumps back to the top, checks again, and so on.

Suppose you save 150 shillings every week, and you want to know how long it takes to save 1000:

```python
target = 1000
savings = 0
week = 0

while savings < target:
    week = week + 1
    savings = savings + 150
    print(f"Week {week}: you have saved {savings} shillings")

print(f"You reached {target} shillings after {week} weeks!")
```

```text
Week 1: you have saved 150 shillings
Week 2: you have saved 300 shillings
Week 3: you have saved 450 shillings
Week 4: you have saved 600 shillings
Week 5: you have saved 750 shillings
Week 6: you have saved 900 shillings
Week 7: you have saved 1050 shillings
You reached 1000 shillings after 7 weeks!
```

At the start of week 7 `savings` is 900, which is still less than 1000, so the block runs once more. Then `savings` is 1050, the condition `savings < target` becomes `False`, and the loop stops.

## for or while?

- Use a **`for` loop** when you're going through a collection of things, or when you know how many times to repeat. This is most of the time.
- Use a **`while` loop** when you must keep going **until something happens** and you can't know in advance how many repetitions that will take — like the savings above, or "keep asking until the user types a valid answer".

Here's another good use of `while`: finding the integer square root of a number — the biggest whole number whose square isn't larger than it. We can't know in advance how many steps that takes:

```python
x = int(input("Number: "))
i = 0
while (i + 1) * (i + 1) <= x:
    i = i + 1
print(f"The integer square root of {x} is {i}")
```

For 30 it prints 5, because 5 × 5 = 25 is at most 30, but 6 × 6 = 36 is too big.

## Loops that never stop

A `while` loop only stops when its condition becomes `False`. If nothing in the block ever changes that, you get an **infinite loop**: the cell keeps running and the output grows and grows. In Colab, click the **stop** button (■) next to the cell, or choose **Runtime → Interrupt execution**.

```python
count = 10
while count != 0:
    print(count)
    count = count - 3    # 10, 7, 4, 1, -2, -5 ... never exactly 0!
```

The count jumps straight past zero, so `count != 0` stays `True` forever. A safer condition is `while count > 0:`.

Whenever you write a `while` loop, ask yourself two questions:

1. What makes the condition become `False`?
2. Is that **guaranteed** to happen?

```{tip}
If a loop behaves strangely, add `print` calls inside the loop body to show the values of your variables each time around, as the savings program does. Watching the numbers change is the fastest way to understand a loop.
```

## Leaving a loop early: break

Sometimes the natural place to decide "stop now" is in the middle of the loop. The `break` statement exits a loop immediately:

```python
while True:
    answer = input("Type 'quit' to stop: ")
    if answer == "quit":
        break
    print(f"You typed {answer}")

print("Bye!")
```

`while True:` would loop forever on its own; the `break` is what ends it.

## Exercises

### Exercise: multiplication table

Ask the user for a number and use a `for` loop with `range` to print its multiplication table from 1 to 10, like `7 x 1 = 7` … `7 x 10 = 70`.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
n = int(input("Which table? "))

for i in range(1, 11):
    print(f"{n} x {i} = {n * i}")
```
`range(1, 11)` is needed to include 10.
````

### Exercise: add up the numbers

Write a function `sum_to(n)` that returns 1 + 2 + … + n. Write it **twice**: once with a `for` loop and once with a `while` loop. Check that `sum_to(10)` is 55 and `sum_to(100)` is 5050.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def sum_to(n):
    total = 0
    for i in range(1, n + 1):
        total = total + i
    return total

def sum_to_while(n):
    total = 0
    i = 1
    while i <= n:
        total = total + i
        i = i + 1
    return total

print(sum_to(10), sum_to_while(10))     # 55 55
print(sum_to(100), sum_to_while(100))   # 5050 5050
```
The `for` version is shorter and can't accidentally loop forever, because it has no counter for you to forget to update.
````

### Exercise: savings as a function

Turn the savings program into a function `weeks_to_save(target, per_week)` that **returns** the number of weeks needed, without printing anything. Check that `weeks_to_save(1000, 150)` is 7 and `weeks_to_save(500, 100)` is 5. What happens if `per_week` is 0, and how could you protect against it?

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def weeks_to_save(target, per_week):
    savings = 0
    weeks = 0
    while savings < target:
        savings = savings + per_week
        weeks = weeks + 1
    return weeks

print(weeks_to_save(1000, 150))   # 7
print(weeks_to_save(500, 100))    # 5
```
If `per_week` is 0, `savings` never grows, so `savings < target` stays `True` and the loop **never stops** — stop the cell with ■. One protection is to check first:
```python
    if per_week <= 0:
        return None
```
at the start of the function. Always ask: *is the condition guaranteed to become False?*
````

### Exercise: countdown

Write a program that counts down from 10 to 1, one number per line, then prints `Lift off!`. Do it once with `for` and `range`, and once with `while`.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
for i in range(10, 0, -1):
    print(i)
print("Lift off!")

count = 10
while count > 0:
    print(count)
    count = count - 1
print("Lift off!")
```
````

### Exercise: the password guard

Write a program with a secret password stored in a variable. Keep asking the user for the password until they type it correctly, then print `Access granted`. Count the attempts and print how many were needed.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
SECRET = "karibu123"

attempts = 1
guess = input("Password: ")

while guess != SECRET:
    print("Wrong password, try again.")
    guess = input("Password: ")
    attempts = attempts + 1

print(f"Access granted after {attempts} attempt(s).")
```
A `while` loop is the right choice here, because we can't know how many attempts the user will need.
````

### Exercise: count the vowels

Write a function `count_vowels(text)` that returns how many vowels (a, e, i, o, u, upper or lower case) a string contains. Hint: loop over the characters, and use `letter in "aeiouAEIOU"` to test each one.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def count_vowels(text):
    count = 0
    for letter in text:
        if letter in "aeiouAEIOU":
            count = count + 1
    return count

print(count_vowels("Learning Python is fun"))   # 6
```
The `in` operator also works on strings: `"e" in "aeiou"` is `True`.
````
