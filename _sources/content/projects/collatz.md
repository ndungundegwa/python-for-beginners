# Project: The Collatz Conjecture

Here is a mathematical mystery you can explore with just a few lines of Python — one that no mathematician in the world has yet been able to solve.

**You will need:** functions (Topic 6), decisions (Topic 9), loops (Topic 10) and lists (Topic 11). The optional plot uses the `matplotlib` module.

## The rules of the game

Pick any positive whole number. Then repeat these two rules:

- If the number is **even**, divide it by 2.
- If the number is **odd**, multiply it by 3 and add 1.

Starting from 6, you get: 6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1.

The **Collatz conjecture** says that, whatever number you start with, you will **always** reach 1 eventually. It has been checked by computers for every starting number up to about 2.95 × 10²⁰ — but nobody has ever proved that it's true for *all* numbers. Let's explore it.

## Step 1: the next number

Write a function `next_term(n)` that returns the next number in the sequence. Make sure it returns a whole number (an `int`), not a float.

```python
print(next_term(6))    # 3
print(next_term(3))    # 10
print(next_term(16))   # 8
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def next_term(n):
    if n % 2 == 0:
        return n // 2
    else:
        return 3 * n + 1
```
We use `//` rather than `/`, because `6 / 2` would give the float `3.0`.
````

## Step 2: the whole sequence

Write `collatz(n)` that returns a **list** of all the numbers in the sequence starting from `n`, ending with 1.

```python
print(collatz(6))
# [6, 3, 10, 5, 16, 8, 4, 2, 1]
print(collatz(15))
# [15, 46, 23, 70, 35, 106, 53, 160, 80, 40, 20, 10, 5, 16, 8, 4, 2, 1]
```

Hint: we don't know in advance how long the sequence will be — which kind of loop does that suggest?

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def collatz(n):
    sequence = [n]
    while n != 1:
        n = next_term(n)
        sequence.append(n)
    return sequence
```
A `while` loop is right here, because we must keep going **until** we reach 1, however many steps that takes.
````

## Step 3: how many steps?

The number of steps needed to reach 1 is called the **total stopping time**. Write `steps(n)` that returns it. (Hint: it's one less than the length of the list.)

```python
print(steps(6))    # 8
print(steps(27))   # 111
```

Also write `highest(n)` that returns the largest number reached in the sequence. Starting from 27 is a famous example: the numbers climb surprisingly high before coming down.

```python
print(highest(6))    # 16
print(highest(27))   # 9232
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def steps(n):
    return len(collatz(n)) - 1

def highest(n):
    return max(collatz(n))
```
The list for 6 has 9 numbers, so there are 8 steps between them.
````

## Step 4: the longest journey

Which starting number from 1 to `n` takes the most steps to reach 1? Write `longest_up_to(n)` that returns that starting number.

```python
print(longest_up_to(10))    # 9   (19 steps)
print(longest_up_to(100))   # 97  (118 steps)
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def longest_up_to(n):
    best_start = 1
    best_steps = 0
    for start in range(1, n + 1):
        s = steps(start)
        if s > best_steps:
            best_steps = s
            best_start = start
    return best_start

best = longest_up_to(100)
print(f"{best} takes {steps(best)} steps")   # 97 takes 118 steps
```
This is the "find the biggest so far" pattern from Topic 11: remember the best result, and replace it whenever you find a better one.
````

## Step 5: the stopping time

The **stopping time** of `n` is the number of steps until the sequence first goes **below** its starting number. For 9, the sequence is 9, 28, 14, 7, … — it first drops below 9 at step 3 (the value 7).

Write `stopping_time(n)`. Use `enumerate` on the list, or count steps in a loop. For `n = 1`, return 0.

```python
print(stopping_time(9))    # 3
print(stopping_time(6))    # 1
print(stopping_time(27))   # 96
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def stopping_time(n):
    if n == 1:
        return 0
    sequence = collatz(n)
    for i, value in enumerate(sequence):
        if value < n:
            return i
```
`enumerate` gives both the position `i` and the value. As soon as a value is smaller than the start, its position is the stopping time. (Because every sequence reaches 1, this always happens for `n > 1`.)
````

## Step 6 (optional): draw the journey

If you have the `matplotlib` module (`pip install matplotlib`), you can draw the sequence as a graph. The flights of some numbers are so high that a logarithmic scale on the vertical axis makes them easier to see.

```python
import matplotlib.pyplot as plt

def plot(n):
    plt.plot(collatz(n))
    plt.yscale("log")
    plt.title(f"Collatz sequence of {n}")
    plt.xlabel("Step")
    plt.ylabel("Value")
    plt.show()

plot(27)
```

## Going further

- Print a small table showing, for every start from 1 to 20, the number of steps and the highest value reached.
- Which starting number below 1000 reaches the **highest** value? (Be patient — it's a lot of sequences, but Python is fast.)
- Make `collatz` safer: if someone calls it with 0 or a negative number, `raise` a `ValueError` (Topic 16) instead of looping forever.
