# Making Decisions: if, elif and else

Now that you can write `True`/`False` expressions, you can make your programs **choose** what to do. In this topic you'll learn the `if` statement, its partners `elif` and `else`, and how to put decisions inside decisions to build a small adventure game.

## What if?

Type this into a new code cell and run it:

```python
temperature = 31
is_raining = False
money = 150

if temperature > 30:
    print("It's hot. Drink plenty of water.")

if temperature < 15:
    print("It's cold. Wear a sweater.")

if is_raining:
    print("Take an umbrella.")

if money >= 100:
    print("You can afford a soda and a mandazi.")

money = money - 120

if money < 50:
    print("Careful, you're running low on money.")

if money == 30:
    print("You have exactly 30 shillings left.")
```

### What you should see

```text
It's hot. Drink plenty of water.
You can afford a soda and a mandazi.
Careful, you're running low on money.
You have exactly 30 shillings left.
```

An `if` statement creates a **branch** in your program: *if this Boolean expression is `True`, run the code under it; otherwise, skip it.* Only some of the `print` lines ran, depending on the values of the variables.

Notice `if is_raining:`. The variable already holds `True` or `False`, so there's no need to write `if is_raining == True:`.

Change the three values at the top — try `temperature = 12`, `is_raining = True` and `money = 80` — and run the cell again. Which lines are printed now, and why?

## Blocks and indentation

Look at the shape of an `if` statement:

```python
if temperature > 30:
    print("It's hot. Drink plenty of water.")
```

- The line ends with a **colon** `:`. The colon tells Python "a new block of code starts here".
- The lines of the block are **indented** by four spaces. That's how Python knows which lines belong to the `if`. Colab adds the indentation for you when you press Enter after a colon.
- The block ends when the indentation goes back to where the `if` started.

This is exactly the same rule you used for function bodies in Topic 6. If you forget to indent, Python stops with `IndentationError: expected an indented block`.

## else and elif

Often you want to do one thing if a condition is true and **something else** otherwise. That's what `else` is for. And when there are more than two possibilities, `elif` (short for *else if*) lets you check another condition.

A group of friends is planning a trip:

```python
travellers = 12
bus_seats = 14
taxi_seats = 4

if bus_seats > travellers:
    print("Everyone fits in the bus.")
elif bus_seats < travellers:
    print("The bus is too small.")
else:
    print("The bus is exactly full.")

if taxi_seats >= travellers:
    print("Everyone fits in one taxi.")
elif taxi_seats * 3 >= travellers:
    print("We need up to three taxis.")
else:
    print("Taxis won't work for this group.")

if travellers > 10:
    print("Let's book the bus.")
else:
    print("Let's take taxis.")
```

```text
Everyone fits in the bus.
We need up to three taxis.
Let's book the bus.
```

The general form is:

```python
if condition_1:
    # runs when condition_1 is True
elif condition_2:
    # runs when condition_1 is False and condition_2 is True
elif condition_3:
    # ... as many elif blocks as you need
else:
    # runs when none of the conditions were True
```

Only `if` is required. You can have any number of `elif` blocks and at most one `else`, which always comes last.

```{warning}
In an `if`/`elif`/`else` chain, Python runs **only the first block whose condition is `True`**, then skips the rest of the chain — even if later conditions are also true.
```

## Order matters

Because only the first true branch runs, the **order** of your conditions matters. This grading program looks reasonable, but has a serious bug:

```python
score = 95

if score >= 50:
    print("Grade: D")
elif score >= 60:
    print("Grade: C")
elif score >= 70:
    print("Grade: B")
elif score >= 80:
    print("Grade: A")
else:
    print("Grade: E")
```

```text
Grade: D
```

95 is greater than or equal to 50, so the very first branch runs and the others are never checked. There's no error message — the program just gives the wrong answer. Always test the **most demanding** condition first:

```python
if score >= 80:
    print("Grade: A")
elif score >= 70:
    print("Grade: B")
elif score >= 60:
    print("Grade: C")
elif score >= 50:
    print("Grade: D")
else:
    print("Grade: E")
```

## Decisions with user input

Decisions become really useful when they depend on what the user types. Here's an example:

```python
age = int(input("Enter your age: "))

if age < 18:
    print("You cannot vote yet.")
elif age > 18:
    print("You can vote.")
else:
    print("You can vote. Bravo, it must be your first time!")
```

Run the cell three times, answering `15`, `40` and `18`, so that every branch runs at least once. Testing each branch is a good habit.

## Decisions inside decisions

An `if` block can contain another `if`. This lets one choice lead to further choices — perfect for a text adventure game:

```python
print("""You are on a safari in the Maasai Mara.
The jeep stops where the road splits in two.
Do you go towards the river (1) or towards the hills (2)?""")

road = input("> ")

if road == "1":
    print("At the river, a hippo is resting in the water.")
    print("What do you do?")
    print("1. Take a photo from the jeep.")
    print("2. Walk closer for a better look.")

    hippo = input("> ")

    if hippo == "1":
        print("What a photo! The hippo yawns for the camera.")
    elif hippo == "2":
        print("The hippo charges! You run back to the jeep just in time.")
    else:
        print(f"You decide to {hippo}. The hippo ignores you and sleeps.")

elif road == "2":
    print("On the hills, you spot a pride of lions.")
    print("1. Stay very quiet.")
    print("2. Switch off the engine.")
    print("3. Get out and wave.")

    lions = input("> ")

    if lions == "1" or lions == "2":
        print("The lions stroll past the jeep. An unforgettable day!")
    else:
        print("The guide pulls you back in. Rule one: never leave the jeep!")

else:
    print("You couldn't decide, and the jeep got stuck in the mud. Time to push!")
```

```text
You are on a safari in the Maasai Mara.
The jeep stops where the road splits in two.
Do you go towards the river (1) or towards the hills (2)?
> 1
At the river, a hippo is resting in the water.
What do you do?
1. Take a photo from the jeep.
2. Walk closer for a better look.
> 2
The hippo charges! You run back to the jeep just in time.
```

Notice that the program compares `road == "1"` with the **string** `"1"`, not the number `1`, because `input` always returns a string.

In Colab, each `input` opens a new text box below the output, so you can play the whole game inside one cell. Run the cell again to play again.

```{tip}
Don't nest `if` statements more than two levels deep. If your code starts drifting far to the right, it's time to split it into functions — you'll do exactly that in Topic 12.
```

## The pass statement

A block must contain at least one instruction. If you need a branch that deliberately does nothing — for example while you're still writing your program — use `pass`:

```python
if temperature > 30:
    pass    # TODO: warn the user later
else:
    print("Nice weather.")
```

## Exercises

### Exercise: positive, negative or zero

Write a program that asks the user for a whole number and prints whether it is positive, negative, or zero.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
number = int(input("Enter a whole number: "))

if number > 0:
    print(f"{number} is positive.")
elif number < 0:
    print(f"{number} is negative.")
else:
    print("The number is zero.")
```
````

### Exercise: even or odd

Write a function `even_or_odd(n)` that **returns** the string `"even"` or `"odd"`. Use it to print the result for a number the user types.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def even_or_odd(n):
    if n % 2 == 0:
        return "even"
    else:
        return "odd"

n = int(input("Number: "))
print(f"{n} is {even_or_odd(n)}.")
```
````

### Exercise: trace the branches

In the trip program, change the first line to `travellers = 14`. **Before running it**, write down what will be printed. Then run the cell to check.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```text
The bus is exactly full.
Taxis won't work for this group.
Let's book the bus.
```
- `bus_seats > travellers` and `bus_seats < travellers` are both False (14 and 14 are equal), so the `else` runs.
- `taxi_seats >= travellers` (4 >= 14) is False, and `taxi_seats * 3 >= travellers` (12 >= 14) is also False, so the `else` runs.
- `travellers > 10` (14 > 10) is True.
````

### Exercise: grade calculator

Write a function `grade(score)` that returns `"A"` for 70–100, `"B"` for 60–69, `"C"` for 50–59, `"D"` for 40–49 and `"E"` below 40. Test it with 100, 70, 69, 40 and 0.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def grade(score):
    if score >= 70:
        return "A"
    elif score >= 60:
        return "B"
    elif score >= 50:
        return "C"
    elif score >= 40:
        return "D"
    else:
        return "E"

print(grade(100), grade(70), grade(69), grade(40), grade(0))
```
This prints `A A B D E`. Because the conditions are tested from highest to lowest, each `elif` only needs a lower bound: by the time `score >= 60` is checked, we already know the score is below 70.
````

### Exercise: extend the safari

Add a third road to the safari game. It leads to a Maasai village, where the player must choose between two activities, each with its own ending. Make sure an unexpected answer is also handled.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
Add this `elif` **before** the final `else` of the outer decision:
```python
elif road == "3":
    print("You visit a Maasai village. The elders welcome you.")
    print("1. Join the jumping dance.")
    print("2. Learn how beadwork is made.")

    activity = input("> ")

    if activity == "1":
        print("You jump surprisingly high. Everyone cheers!")
    elif activity == "2":
        print("You make your own bracelet to take home.")
    else:
        print("You sit under a tree and listen to stories instead.")
```
Also change the first question so the player knows road 3 exists, for example `Do you go towards the river (1), the hills (2) or the village (3)?`
````
