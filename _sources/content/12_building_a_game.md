# Building a Game: Branches and Functions

You now know variables, functions, decisions, loops and lists. That's enough to build real programs! In this topic you'll study a small text adventure made of functions that call each other, learn some habits that keep your code out of trouble, and then build a **secret-number game** step by step, the way programmers build larger programs.

## A game made of rooms

In this adventure, each room of the game is a function. Moving to another room simply means calling another function. The whole game fits in one code cell — it's long, so type one function, run the cell to check for typing mistakes, then type the next.

```python
def game_over(reason):
    print(reason, "GAME OVER.")


def reading_room():
    print("You are in the reading room. A sleepy librarian sits at the desk.")
    print("\"How many books do you want to borrow?\" she asks.")

    how_many = int(input("> "))

    if how_many <= 5:
        print("She stamps your books and unlocks the front door. You win!")
    else:
        game_over("\"That's far too many!\" She sends you away with nothing.")


def computer_lab():
    print("You enter the computer lab. One computer is still switched on.")
    print("The screen says: TYPE THE PASSWORD TO OPEN THE DOOR.")
    print("There is a sticky note under the keyboard.")
    read_note = False

    while True:
        choice = input("> ")

        if choice == "read note" and not read_note:
            print("The note says: the password is the answer to 6 * 7.")
            read_note = True
        elif choice == "read note" and read_note:
            print("You read it again. It still says 6 * 7.")
        elif choice == "42" and read_note:
            print("The door clicks open.")
            reading_room()
            return
        elif choice == "switch off":
            game_over("The screen goes dark and you can't find the door.")
            return
        else:
            print("Nothing happens. Maybe look around?")


def storeroom():
    print("You are in a dusty storeroom. Something moves behind the boxes.")
    print("Do you look behind the boxes, or go back?")

    choice = input("> ")

    if "back" in choice:
        start()
    elif "look" in choice:
        game_over("The school cat jumps out and the boxes fall on you.")
    else:
        storeroom()


def start():
    print("You fell asleep in the school library. Now it's dark and locked.")
    print("There is a door marked LAB on the left and STORE on the right.")
    print("Which one do you take?")

    choice = input("> ")

    if choice == "left":
        computer_lab()
    elif choice == "right":
        storeroom()
    else:
        game_over("You wait in the dark until the guard finds you in the morning.")


start()
```

### What you should see

```text
You fell asleep in the school library. Now it's dark and locked.
There is a door marked LAB on the left and STORE on the right.
Which one do you take?
> left
You enter the computer lab. One computer is still switched on.
The screen says: TYPE THE PASSWORD TO OPEN THE DOOR.
There is a sticky note under the keyboard.
> 42
Nothing happens. Maybe look around?
> read note
The note says: the password is the answer to 6 * 7.
> 42
The door clicks open.
You are in the reading room. A sleepy librarian sits at the desk.
"How many books do you want to borrow?" she asks.
> 3
She stamps your books and unlocks the front door. You win!
```

In Colab, every `input` opens a text box under the output, so the whole game is played inside the cell. To play again, run the cell again.

### How it works

- **Nothing happens until the last line.** All the `def` blocks only *define* rooms. The final `start()` call begins the game.
- **Rooms call rooms.** `start` calls `computer_lab` or `storeroom`; `computer_lab` calls `reading_room`; `storeroom` may even call `start` again, or call *itself* to ask the question once more.
- **The game ends when the functions run out.** An ending simply prints a message and doesn't call another room. Each function then finishes and hands control back to the one that called it, until `start()` itself has finished.
- **`while True:` in `computer_lab`** keeps asking until the player finds a way out. `return` ends the function straight away — and with it the loop.
- **`read_note` is a flag**: a Boolean variable that remembers whether something has happened. Typing `42` only works once the player has read the note.
- `"back" in choice` is `True` if the text `back` appears anywhere in what the player typed, so `go back` also works.

```{tip}
Before reading code like this, **draw a map**: a box for each room and an arrow for each way to move between them. Programs made of functions calling functions become easy to follow on paper.
```

## Habits that keep you out of trouble

While you are learning, these habits will help you write clearer, safer code.

**Decisions**

1. End each `if`/`elif` chain with an `else` that handles "anything else", even if it only prints a message. The `else` catches the cases you didn't think of — like a player typing `LEFT` in capital letters.
2. Keep decisions at most two levels deep. When they grow deeper, move the inner decision into its own function, as each room above does.
3. Give each `if`/`elif`/`else` group some space: a blank line before and after makes it easy to see where it starts and stops.
4. If a condition is long, work it out first and store it in a variable with a clear name, such as `is_valid_age`, then write `if is_valid_age:`.

**Loops**

1. Reach for a `for` loop first: for going through a list, a string or a range of numbers.
2. Use `while` when you must repeat **until something happens**, and check that it really will happen.

**Finding mistakes**

1. Read the error message, especially its last line, before changing anything.
2. Use `print` to show the values of your variables at important points. Seeing the values is the quickest way to find where things go wrong.
3. Build in small pieces: **type a little, run a little, fix a little.** Notebooks make this easy — test each function in its own cell before combining them.

## Building a program step by step: the secret number game

Big programs are not written in one go. Let's build a game the way programmers really work: plan first, then add one small tested piece at a time. Use a new cell for each step.

The game: the computer picks a secret number between 0 and 100. The player guesses. After each wrong guess, the program says "Too low!" or "Too high!". When the player finds the number, the program congratulates them and says how many tries they needed.

### Step 1: plan with comments

Write the plan first, in plain language, as comments. This is called **pseudocode**:

```python
# 1. Choose a random secret number
# 2. Ask the player for a guess
# 3. While the guess is not the secret number:
#        say whether it was too low or too high
#        ask for another guess
# 4. Congratulate the player
```

Every line of this plan is something you already know how to write.

### Step 2: the secret number, with constants

```python
from random import randint

MIN_VALUE = 0
MAX_VALUE = 100

secret_number = randint(MIN_VALUE, MAX_VALUE)
print(secret_number)   # temporary, for testing — remove it later!
```

We could write `randint(0, 100)`, but 0 and 100 will appear in several places. If we later want 0 to 1000, we'd have to find and change every one. Named **constants** mean one change is enough.

Run the cell a few times. It should print a different number each time.

### Step 3: reading a valid guess

The guess must be a whole number in the range, so we write a function that keeps asking until it gets one:

```python
def get_guess():
    guess = input(f"Guess a number between {MIN_VALUE} and {MAX_VALUE}: ")
    while not guess.isdigit() or int(guess) > MAX_VALUE:
        print("That's not a valid number, try again.")
        guess = input(f"Guess a number between {MIN_VALUE} and {MAX_VALUE}: ")
    return int(guess)
```

`guess.isdigit()` is `True` only if the text contains nothing but digits, so `"abc"`, `"-5"` and `"4.5"` are all rejected before we try to convert them. Because of the `or`, Python only calls `int(guess)` when `isdigit()` was `True`, so the conversion is always safe.

Test the function on its own: in a new cell, run `print(get_guess())`, type some bad answers, and check that it keeps asking.

### Step 4: the hint

```python
def print_hint(guess, secret):
    if guess < secret:
        print("Too low!")
    else:
        print("Too high!")
```

Test it too: `print_hint(10, 50)` should print `Too low!`.

### Step 5: the game loop, in a main function

Finally, put the steps together in a function called `main`, and call it at the bottom. Here is the complete program in one cell:

```python
from random import randint

MIN_VALUE = 0
MAX_VALUE = 100


def get_guess():
    guess = input(f"Guess a number between {MIN_VALUE} and {MAX_VALUE}: ")
    while not guess.isdigit() or int(guess) > MAX_VALUE:
        print("That's not a valid number, try again.")
        guess = input(f"Guess a number between {MIN_VALUE} and {MAX_VALUE}: ")
    return int(guess)


def print_hint(guess, secret):
    if guess < secret:
        print("Too low!")
    else:
        print("Too high!")


def main():
    secret_number = randint(MIN_VALUE, MAX_VALUE)
    tries = 1
    guess = get_guess()

    while guess != secret_number:
        print_hint(guess, secret_number)
        guess = get_guess()
        tries += 1

    print(f"Bravo! You found it in {tries} tries!")


main()
```

```text
Guess a number between 0 and 100: 50
Too high!
Guess a number between 0 and 100: 25
Too low!
Guess a number between 0 and 100: 37
Bravo! You found it in 3 tries!
```

Notice the layout, which you should use for every program from now on: **imports first, then constants, then functions, then a single call to `main()`**. And notice that each piece could be run and tested long before the program was finished.

## Exercises

### Exercise: fix the reading room

In the library game, what happens if the player types `three` or `3 books` in the reading room? Explain the problem, then write a better `reading_room` that uses `isdigit()` and gives the player a polite ending instead of crashing.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
`int("three")` and `int("3 books")` can't be converted, so the game crashes with `ValueError: invalid literal for int() with base 10`. The player sees a red error box instead of an ending.

A better version checks the text **before** converting it:
```python
def reading_room():
    print("You are in the reading room. A sleepy librarian sits at the desk.")
    print("\"How many books do you want to borrow?\" she asks.")

    choice = input("> ")

    if not choice.isdigit():
        game_over("\"Please answer with a number,\" she yawns, and falls asleep.")
    elif int(choice) <= 5:
        print("She stamps your books and unlocks the front door. You win!")
    else:
        game_over("\"That's far too many!\" She sends you away with nothing.")
```
````

### Exercise: draw the map

Draw a map of the library game: a box for each room function and an arrow for every possible move, labelled with what the player types. Which room can send the player back to the start?

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```text
start ──"left"──▶ computer_lab ──"42" (after "read note")──▶ reading_room ──▶ win or game over
  │                   │
  │                   ├──"switch off"──▶ game over
  │                   └──anything else──▶ asks again (while loop)
  │
  ├──"right"──▶ storeroom ──"back"──▶ start   (back to the beginning!)
  │                 ├──"look"──▶ game over
  │                 └──anything else──▶ storeroom (asks again)
  │
  └──anything else──▶ game over
```
`storeroom` sends the player back to `start` when they type something containing "back".
````

### Exercise: a limited number of tries

Change the secret number game so the player has at most `MAX_TRIES = 7` tries. If they run out, print the secret number and a "Game over" message.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
Add the constant `MAX_TRIES = 7` at the top, then change `main`:
```python
def main():
    secret_number = randint(MIN_VALUE, MAX_VALUE)
    tries = 1
    guess = get_guess()

    while guess != secret_number and tries < MAX_TRIES:
        print_hint(guess, secret_number)
        guess = get_guess()
        tries += 1

    if guess == secret_number:
        print(f"Bravo! You found it in {tries} tries!")
    else:
        print(f"Game over! The secret number was {secret_number}.")
```
The loop now stops for **either** reason, so after the loop we check which one it was.
````

### Exercise: the computer guesses

Reverse the game: **you** think of a number between 0 and 100, and the computer guesses. After each guess, you type `+` (higher), `-` (lower) or `=` (correct). The smart strategy is to always guess the middle of the numbers still possible. How many guesses does the computer need at most?

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def main():
    low = 0
    high = 100
    tries = 0

    while True:
        guess = (low + high) // 2
        tries += 1
        answer = input(f"Is it {guess}? (+, - or =): ")

        if answer == "=":
            print(f"I found it in {tries} guesses!")
            break
        elif answer == "+":
            low = guess + 1
        elif answer == "-":
            high = guess - 1
        else:
            print("Please type +, - or =.")
            tries -= 1   # don't count this guess

        if low > high:
            print("Hmm, your answers don't add up!")
            break

main()
```
Each guess throws away about half of the remaining numbers, so the computer needs **at most 7 guesses** for the 101 numbers from 0 to 100.
````
