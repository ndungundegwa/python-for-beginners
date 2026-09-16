# Project: Tic Tac Toe

In this final project you'll build the classic game of Tic Tac Toe (noughts and crosses) for two players, and then teach the computer to play against you. It brings together almost everything in the course.

**You will need:** functions (Topic 6), decisions and loops (Topics 9–10), lists and lists of lists (Topic 11) and modules (Topic 7).

## The grid

We'll store the 3 × 3 grid as a **list of three rows**, each row a list of three cells. An empty cell is a space `" "`, and the players use `"X"` and `"O"`:

```python
grid = [
    ["X", "O", " "],
    [" ", "X", " "],
    ["O", " ", "X"],
]
```

`grid[row][col]` gives a cell; `grid[1][1]` is the centre.

## Step 1: a new, empty grid

Write `new_grid()` that returns an empty 3 × 3 grid. Be careful: the tempting `[[" "] * 3] * 3` looks right but puts the **same** row in the grid three times, so changing one row would change all of them. Build each row separately.

```python
g = new_grid()
g[0][0] = "X"
print(g)   # [['X', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def new_grid():
    grid = []
    for row in range(3):
        grid.append([" ", " ", " "])
    return grid
```
Each time round the loop, `[" ", " ", " "]` creates a brand-new list, so the three rows are independent. (A list comprehension works too: `[[" "] * 3 for row in range(3)]`.)
````

## Step 2: show the grid

Write `print_grid(grid)` that displays the grid with row and column numbers, like this:

```text
    1   2   3
1   X | O |  
   ---+---+---
2     | X |  
   ---+---+---
3   O |   | X
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def print_grid(grid):
    print("    1   2   3")
    for i in range(3):
        row = grid[i]
        print(f"{i + 1}   {row[0]} | {row[1]} | {row[2]}")
        if i < 2:
            print("   ---+---+---")
```
````

## Step 3: is there a winner?

A player wins with three of their symbol in a row, a column or a diagonal. Write `winner(grid)` that returns `"X"` or `"O"` if that player has won, or `None` if nobody has.

Hint: build a list of all eight **lines** (3 rows, 3 columns, 2 diagonals), each line being a list of three cells, then check each line.

```python
print(winner(new_grid()))                                          # None
print(winner([["X", "X", "X"], [" ", "O", " "], ["O", " ", " "]]))  # X
print(winner([["O", "X", " "], ["O", "X", " "], ["O", " ", "X"]]))  # O
print(winner([["X", "O", " "], [" ", "X", "O"], [" ", " ", "X"]]))  # X
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def winner(grid):
    lines = []
    for i in range(3):
        lines.append(grid[i])                                  # row i
        lines.append([grid[0][i], grid[1][i], grid[2][i]])     # column i
    lines.append([grid[0][0], grid[1][1], grid[2][2]])         # diagonal
    lines.append([grid[0][2], grid[1][1], grid[2][0]])         # other diagonal

    for line in lines:
        if line[0] != " " and line[0] == line[1] == line[2]:
            return line[0]
    return None
```
The check `line[0] != " "` matters: without it, a line of three empty cells would count as a "win" for `" "`.
````

## Step 4: is the grid full?

Write `is_full(grid)` that returns `True` if no empty cell is left (the game is a draw if nobody has won).

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def is_full(grid):
    for row in grid:
        if " " in row:
            return False
    return True
```
````

## Step 5: asking for a move

Write `ask_move(grid, player)`. It asks the player to type a row and a column, like `2 3`, and keeps asking until the answer is two numbers from 1 to 3 pointing at an **empty** cell. It returns the position as a tuple `(row, col)` counted **from 0**, ready to use as indices.

```text
Player X, your move (row col): 2 2
Player O, your move (row col): 2 2
That cell is taken.
Player O, your move (row col): five
Please type two numbers from 1 to 3, like: 2 3
Player O, your move (row col): 1 3
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def ask_move(grid, player):
    while True:
        parts = input(f"Player {player}, your move (row col): ").split()
        if len(parts) != 2 or not parts[0].isdigit() or not parts[1].isdigit():
            print("Please type two numbers from 1 to 3, like: 2 3")
            continue
        row = int(parts[0]) - 1
        col = int(parts[1]) - 1
        if row < 0 or row > 2 or col < 0 or col > 2:
            print("Please type two numbers from 1 to 3, like: 2 3")
        elif grid[row][col] != " ":
            print("That cell is taken.")
        else:
            return row, col
```
People count rows from 1, but lists count from 0, so we subtract 1 in one place and the rest of the program only ever uses 0-based positions.
````

## Step 6: the game

Write `main()` for two human players. Start with `"X"`, and in a loop: show the grid, ask for a move, place the symbol, check for a winner or a full grid, then switch player.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def main():
    grid = new_grid()
    player = "X"

    while True:
        print_grid(grid)
        row, col = ask_move(grid, player)
        grid[row][col] = player

        if winner(grid) is not None:
            print_grid(grid)
            print(f"Player {player} wins!")
            break
        if is_full(grid):
            print_grid(grid)
            print("It's a draw.")
            break

        if player == "X":
            player = "O"
        else:
            player = "X"

main()
```
````

## Step 7: play against the computer

Now let the computer play `"O"`. The simplest computer player picks a **random** empty cell.

First write `empty_cells(grid)`, which returns a list of `(row, col)` tuples for every empty cell. Then write `computer_move(grid)`, which uses `random.choice` to pick one. Finally, change `main` so that the computer makes the moves for `"O"`.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
import random

def empty_cells(grid):
    cells = []
    for row in range(3):
        for col in range(3):
            if grid[row][col] == " ":
                cells.append((row, col))
    return cells

def computer_move(grid):
    return random.choice(empty_cells(grid))
```
In `main`, replace the line that asks for a move with:
```python
        if player == "X":
            row, col = ask_move(grid, player)
        else:
            row, col = computer_move(grid)
            print(f"The computer plays {row + 1} {col + 1}")
```
````

## Going further

- **A smarter computer.** Before choosing at random, make the computer check whether it can **win** in one move (try each empty cell, see if `winner` would return `"O"`), and if not, whether it must **block** the human from winning. You'll need to undo each trial move by putting `" "` back.
- **Best of five.** Keep score over several games and announce the overall champion.
- **Who goes first?** Let the players choose, or pick at random.
