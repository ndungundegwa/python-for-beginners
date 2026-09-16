# Lists

You met lists in Topic 10 as something to loop over. Lists are one of the most useful tools in all of programming, so this topic looks at them properly: how to get at a particular item, how to change a list, and the many things lists can do for you.

## Getting an item out of a list

To get a single item from a list, write the list's name followed by the item's position in square brackets. This position is called the **index**:

```python
fruits = ["mango", "banana", "pawpaw", "avocado"]
print(fruits[0])
print(fruits[2])
print(len(fruits))
```

```text
mango
pawpaw
4
```

Wait — the **first** fruit is at index **0**? Yes. Python counts positions from 0, not 1.

A helpful way to think about it: the index says **how many steps from the start** an item is. The first fruit is right at the start, 0 steps away. `"banana"` is 1 step along, `"pawpaw"` is 2 steps along. So whenever you think "I want the *third* fruit", subtract 1: the third fruit is at index **2**.

You can also count from the **end** of a list with negative indices: `fruits[-1]` is the last item (`"avocado"`), `fruits[-2]` the one before it (`"pawpaw"`).

If you ask for an index that doesn't exist, Python stops with an error:

```python
print(fruits[4])
```

```text
IndexError: list index out of range
```

A list of length 4 has indices 0, 1, 2 and 3. The last valid index is always `len(fruits) - 1`.

## Changing a list

Unlike strings, lists can be changed after you create them. You can replace an item by assigning to its index:

```python
fruits = ["mango", "banana", "pawpaw", "avocado"]
fruits[1] = "orange"
print(fruits)
```

```text
['mango', 'orange', 'pawpaw', 'avocado']
```

## Doing things to lists

Lists come with built-in **methods** — functions attached to the list that you call with a dot. Let's plan a bus route. Type this into a new code cell:

```python
stops = "Nairobi Naivasha Nakuru Eldoret".split(" ")
print("Route:", stops)

stops.append("Kitale")
print("After append:", stops)

stops.insert(1, "Limuru")
print("After insert:", stops)

stops.remove("Naivasha")
print("After remove:", stops)

last_stop = stops.pop()
print("Removed the last stop:", last_stop)

print("First stop:", stops[0])
print("Last stop:", stops[-1])
print("Number of stops:", len(stops))

print(" -> ".join(stops))
print(stops[1:3])
```

### What you should see

```text
Route: ['Nairobi', 'Naivasha', 'Nakuru', 'Eldoret']
After append: ['Nairobi', 'Naivasha', 'Nakuru', 'Eldoret', 'Kitale']
After insert: ['Nairobi', 'Limuru', 'Naivasha', 'Nakuru', 'Eldoret', 'Kitale']
After remove: ['Nairobi', 'Limuru', 'Nakuru', 'Eldoret', 'Kitale']
Removed the last stop: Kitale
First stop: Nairobi
Last stop: Eldoret
Number of stops: 4
Nairobi -> Limuru -> Nakuru -> Eldoret
['Limuru', 'Nakuru']
```

Let's go through the new pieces:

- `"...".split(" ")` cuts a string at every space and gives a list of words.
- `stops.append("Kitale")` **adds an item to the end** of the list.
- `stops.insert(1, "Limuru")` **puts an item at index 1**, moving the others along.
- `stops.remove("Naivasha")` **removes the first item equal to** `"Naivasha"`.
- `stops.pop()` **removes and returns the last** item, so we can still use it (`last_stop`).
- `" -> ".join(stops)` does the opposite of `split`: it glues the items of a list into one string, with `" -> "` between them.
- `stops[1:3]` is a **slice**: the items from index 1 up to, but not including, index 3. You'll learn more about slices in Topic 13.

When you write `stops.append(x)`, read it as "call `append` on `stops`, with `x`".

```{warning}
In a notebook, running the same cell twice runs `append`, `insert` and `pop` twice too — **unless** the cell also creates the list again from the start, as this one does on its first line. If a list suddenly has strange extra items, check whether you ran a cell more than once.
```

## The most useful list operations

| Operation | What it does | Example (starting from `nums = [3, 1, 2]`) |
|---|---|---|
| `nums.append(x)` | add `x` at the end | `nums.append(5)` → `[3, 1, 2, 5]` |
| `nums.insert(i, x)` | insert `x` at index `i` | `nums.insert(0, 9)` → `[9, 3, 1, 2]` |
| `nums.pop()` | remove and return the last item | returns `2`, leaves `[3, 1]` |
| `nums.pop(i)` | remove and return the item at index `i` | `nums.pop(0)` returns `3` |
| `nums.remove(x)` | remove the first item equal to `x` | `nums.remove(1)` → `[3, 2]` |
| `nums.sort()` | sort the list itself | → `[1, 2, 3]` |
| `nums.reverse()` | reverse the list itself | → `[2, 1, 3]` |
| `len(nums)` | number of items | `3` |
| `x in nums` | is `x` in the list? | `2 in nums` → `True` |
| `sum(nums)`, `min(nums)`, `max(nums)` | total, smallest, largest | `6`, `1`, `3` |
| `sorted(nums)` | a **new** sorted list; `nums` is unchanged | `[1, 2, 3]` |

## sort or sorted?

There are two ways to sort, and mixing them up is a classic bug:

- `nums.sort()` sorts **the list itself** and returns `None`.
- `sorted(nums)` leaves `nums` alone and **returns a new**, sorted list.

```python
scores = [50, 20, 40]
scores = scores.sort()
print(scores)
```

```text
None
```

The list was sorted, but then `scores` was replaced by what `sort()` returned — `None`. Write either `scores.sort()` on its own, or `scores = sorted(scores)`.

## Building lists quickly

Building a list with a loop is so common that Python offers a short form called a **list comprehension**. These two pieces of code make the same list:

```python
squares = []
for i in range(1, 6):
    squares.append(i * i)

squares = [i * i for i in range(1, 6)]
```

Both give `[1, 4, 9, 16, 25]`. Read the second one as "`i * i` for each `i` in `range(1, 6)`". Use whichever you find clearer — the loop is perfectly fine.

## Lists of lists

A list can contain other lists. This is a natural way to store a grid, such as a game board, with one inner list per row:

```python
board = [
    ["x", "o", " "],
    [" ", "x", " "],
    ["o", " ", "x"],
]

print(board[0])       # the first row: ['x', 'o', ' ']
print(board[2][0])    # row 2, column 0: 'o'
```

The first index picks the row, the second picks the column in that row. You'll use exactly this idea in the Tic Tac Toe project.

## When to use a list

Use a list when:

1. You need to **keep things in order**.
2. You want to get items **by their position** (index).
3. You want to go through the items **one after another** with a `for` loop.

A queue of customers, the stops on a bus route, the lines of a poem and a student's marks are all good examples.

## Exercises

### Exercise: which animal?

Using this list, write down which animal each description refers to. Remember: "first", "second", … describe an order, so subtract 1; "index 3" is a position, so use it directly. Check your answers in a cell afterwards.

```python
animals = ["lion", "elephant", "giraffe", "zebra", "rhino", "cheetah"]
```

1. `animals[2]`
2. The fourth (4th) animal.
3. `animals[-1]`
4. The first (1st) animal.
5. `animals[1]`
6. The fifth (5th) animal.
7. `animals[-3]`
8. The animal at index 5.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
1. `animals[2]` is the 3rd animal: **giraffe**.
2. The 4th animal is at index 3: **zebra**.
3. `animals[-1]` is the last animal: **cheetah**.
4. The 1st animal is at index 0: **lion**.
5. `animals[1]` is the 2nd animal: **elephant**.
6. The 5th animal is at index 4: **rhino**.
7. `animals[-3]` is third from the end: **zebra**.
8. Index 5 is the 6th animal: **cheetah**.
````

### Exercise: a shopping list

Write a program that starts with an empty list, keeps asking the user for items to add until they type `done`, and then prints the number of items and the list sorted alphabetically, one item per line.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
shopping = []

item = input("Add an item (or 'done'): ")
while item != "done":
    shopping.append(item)
    item = input("Add an item (or 'done'): ")

print(f"You have {len(shopping)} items:")
for thing in sorted(shopping):
    print(f"- {thing}")
```
````

### Exercise: the highest mark, by hand

Python has `max`, but writing it yourself is great practice. Write a function `highest(marks)` that returns the largest number in a non-empty list, **without** using `max` or `sort`.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def highest(marks):
    best = marks[0]
    for mark in marks:
        if mark > best:
            best = mark
    return best

print(highest([56, 78, 43, 91, 67]))   # 91
```
Start by assuming the first mark is the best, then replace it whenever you find a bigger one.
````

### Exercise: remove the duplicates

Write a function `unique(items)` that returns a **new** list with the duplicates removed, keeping the original order. `unique([1, 2, 2, 3, 1, 4])` should return `[1, 2, 3, 4]`.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def unique(items):
    result = []
    for item in items:
        if item not in result:
            result.append(item)
    return result

print(unique([1, 2, 2, 3, 1, 4]))   # [1, 2, 3, 4]
```
````

### Exercise: predict the list

Write down what is printed after each line, then check.

```python
nums = [5, 3, 8]
nums.append(1)
print(nums)
nums.insert(1, 7)
print(nums)
last = nums.pop()
print(last, nums)
nums.sort()
print(nums)
print(nums[-1], len(nums))
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```text
[5, 3, 8, 1]
[5, 7, 3, 8, 1]
1 [5, 7, 3, 8]
[3, 5, 7, 8]
8 4
```
````

### Exercise: the return journey

Using the `stops` list from the bus route program (`['Nairobi', 'Limuru', 'Nakuru', 'Eldoret']`), print the stops of the **return** journey, from Eldoret back to Nairobi, joined with `" -> "`. Do it twice: once with a `for` loop over the indices, counting down with `range`, and once using a list method. Make sure the original list is unchanged at the end.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
stops = ["Nairobi", "Limuru", "Nakuru", "Eldoret"]

# 1. a loop over the indices 3, 2, 1, 0
back = []
for i in range(len(stops) - 1, -1, -1):
    back.append(stops[i])
print(" -> ".join(back))

# 2. copy the list, then reverse the copy
back = stops.copy()
back.reverse()
print(" -> ".join(back))

print(stops)   # unchanged
```
```text
Eldoret -> Nakuru -> Limuru -> Nairobi
Eldoret -> Nakuru -> Limuru -> Nairobi
['Nairobi', 'Limuru', 'Nakuru', 'Eldoret']
```
`range(len(stops) - 1, -1, -1)` starts at the last index (3) and stops **before** -1, so it gives 3, 2, 1, 0. Calling `stops.reverse()` directly would have changed the original list, which is why we reverse a `copy()`. (In Topic 13 you'll meet an even shorter way: `stops[::-1]`.)
````
