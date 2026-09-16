# Project: Your Own Text Adventure

In Topic 12 you played a small adventure made of functions. Now you'll design and build your own — but this time the map of the game will be stored in **dictionaries**, so you can add rooms without writing new functions.

**You will need:** functions (Topic 6), decisions and loops (Topics 9–10), lists (Topic 11), strings (Topic 13) and dictionaries (Topic 14).

## Step 1: draw your map first

Before writing any code, draw your game on paper: a box for each room, arrows for the exits (north, south, east, west), and notes about items and dangers. Programmers plan first and code second.

The example game in this project has four rooms:

```text
            +-----------+
            |  library  |  (a key is here)
            +-----------+
                  |
+-----------+   +-----------+   +-----------+
|           |   |   hall    |---|  kitchen  |  (a lamp is here)
|           |   |  (start)  |   +-----------+
+-----------+   +-----------+         |
                                +-----------+
                                |  garden   |  (a locked gate: the exit!)
                                +-----------+
```

To win, the player must find the **key** and use it at the garden gate.

## Step 2: store the map in a dictionary

Each room is a dictionary with a description, its exits and an optional item. All the rooms go into one big dictionary, keyed by the room's name:

```python
ROOMS = {
    "hall": {
        "description": "You are in a dusty hall. Doors lead north and east.",
        "exits": {"north": "library", "east": "kitchen"},
        "item": None,
    },
    "library": {
        "description": "Shelves of old books surround you. A door leads south.",
        "exits": {"south": "hall"},
        "item": "key",
    },
    "kitchen": {
        "description": "The kitchen smells of chai. Doors lead west and south.",
        "exits": {"west": "hall", "south": "garden"},
        "item": "lamp",
    },
    "garden": {
        "description": "A tall locked gate blocks the way out. The kitchen is north.",
        "exits": {"north": "kitchen"},
        "item": None,
    },
}
```

Run the `ROOMS` cell, then test it: put each of these lines in its own cell (the last line of a cell is displayed automatically). What do they give?

```python
ROOMS["hall"]["exits"]["east"]
ROOMS["library"]["item"]
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
`ROOMS["hall"]["exits"]["east"]` is `'kitchen'`: from the `"hall"` room, take its `"exits"` dictionary, and look up `"east"`.

`ROOMS["library"]["item"]` is `'key'`.

Reading nested dictionaries from left to right like this is the key skill of the whole project.
````

## Step 3: describe a room

Write `describe(room_name)` that prints the room's description and, if the room contains an item, `You see a <item> here.`

```python
describe("library")
```

```text
Shelves of old books surround you. A door leads south.
You see a key here.
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def describe(room_name):
    room = ROOMS[room_name]
    print(room["description"])
    if room["item"] is not None:
        print(f"You see a {room['item']} here.")
```
````

## Step 4: moving around

Write `move(room_name, direction)` that returns the name of the room in that direction, or prints `You can't go that way.` and returns the **same** room name if there's no exit that way.

```python
print(move("hall", "north"))   # library
print(move("hall", "west"))    # You can't go that way.  then: hall
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def move(room_name, direction):
    exits = ROOMS[room_name]["exits"]
    if direction in exits:
        return exits[direction]
    print("You can't go that way.")
    return room_name
```
````

## Step 5: picking things up

The player carries an **inventory**: a list of item names. Write `take(room_name, inventory)` that moves the room's item (if any) into the inventory and sets the room's item to `None`. If there's nothing to take, print `There is nothing here to take.`

```python
inventory = []
take("library", inventory)
print(inventory)                   # ['key']
print(ROOMS["library"]["item"])    # None
take("library", inventory)         # There is nothing here to take.
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def take(room_name, inventory):
    room = ROOMS[room_name]
    if room["item"] is None:
        print("There is nothing here to take.")
    else:
        inventory.append(room["item"])
        print(f"You take the {room['item']}.")
        room["item"] = None
```
Because dictionaries and lists can be changed, this function updates both the room and the inventory directly.
````

## Step 6: the game loop

Now write `main()`. The player starts in the hall. In a loop, read a command and act on it:

| Command | What happens |
|---|---|
| `look` | describe the current room |
| `go <direction>` | move, then describe the new room |
| `take` | pick up the item in the room |
| `inventory` | list what the player carries |
| `use key` | in the garden, with the key: the player escapes and wins |
| `quit` | end the game |

Hint: `command.split()` turns `"go north"` into `["go", "north"]`.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def main():
    current = "hall"
    inventory = []
    print("Welcome! Type look, go <direction>, take, inventory, use key or quit.")
    describe(current)

    while True:
        words = input("> ").lower().split()
        if len(words) == 0:
            continue

        if words[0] == "look":
            describe(current)
        elif words[0] == "go" and len(words) == 2:
            current = move(current, words[1])
            describe(current)
        elif words[0] == "take":
            take(current, inventory)
        elif words[0] == "inventory":
            if len(inventory) == 0:
                print("You are carrying nothing.")
            else:
                print("You carry: " + ", ".join(inventory))
        elif words == ["use", "key"]:
            if current == "garden" and "key" in inventory:
                print("The gate creaks open. You escape. You win!")
                break
            else:
                print("Nothing happens.")
        elif words[0] == "quit":
            print("Goodbye!")
            break
        else:
            print("I don't understand that.")

main()
```
```text
Welcome! Type look, go <direction>, take, inventory, use key or quit.
You are in a dusty hall. Doors lead north and east.
> go north
Shelves of old books surround you. A door leads south.
You see a key here.
> take
You take the key.
> go south
You are in a dusty hall. Doors lead north and east.
> go east
The kitchen smells of chai. Doors lead west and south.
You see a lamp here.
> go south
A tall locked gate blocks the way out. The kitchen is north.
> use key
The gate creaks open. You escape. You win!
```
````

## Step 7: make it yours

Now expand the game following your own paper map. Some ideas:

- Add at least three new rooms. Because the map is data, you only need to add entries to `ROOMS` and connect their exits — no new functions!
- Add a dark cellar where the player can only see the description if they carry the `lamp`.
- Add a counter of moves, and print how many moves the player needed to win.
- Add a danger: a room where going the wrong way ends the game.

```{tip}
Work the way Topic 12 recommends: make a to-do list of features, pick the easiest one, write a few lines, run the game, fix, and cross it off. Then pick the next one.
```
