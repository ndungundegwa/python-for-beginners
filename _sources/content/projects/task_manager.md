# Project: A Task Manager

In this project you'll build a to-do list program that you could actually use: add tasks, see them, complete them, give them priorities, and finally save them to a file so they're still there tomorrow.

**You will need:** lists (Topic 11), strings and tuples (Topic 13) and, for the last part, files (Topic 15).

## Part 1: a list of tasks

For now, a task is just a string, and the task list is a list of strings. New tasks go at the **end** of the list, so the oldest task is always first.

### Step 1: add and show tasks

Write `add_task(tasks, task)`, which adds a task to the end of the list, and `print_tasks(tasks)`, which prints the tasks numbered from 1. If the list is empty, it should print `Nothing to do! \o/`.

```python
tasks = ["Learn the while loop", "Learn the list"]
add_task(tasks, "Learn the for loop")
print_tasks(tasks)
print_tasks([])
```

```text
TO DO:
1. Learn the while loop
2. Learn the list
3. Learn the for loop
TO DO:
Nothing to do! \o/
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def add_task(tasks, task):
    tasks.append(task)

def print_tasks(tasks):
    print("TO DO:")
    if len(tasks) == 0:
        print("Nothing to do! \\o/")
    for number, task in enumerate(tasks, start=1):
        print(f"{number}. {task}")
```
`enumerate(tasks, start=1)` counts from 1 instead of 0. In the string, `\\o/` is needed to print a single backslash.
````

### Step 2: complete the oldest task

Write `complete_oldest(tasks)`, which removes the oldest task and **returns** it. If there are no tasks, it should return `None` instead of crashing.

```python
tasks = ["Learn the while loop", "Learn the list"]
print(complete_oldest(tasks))   # Learn the while loop
print(tasks)                    # ['Learn the list']
print(complete_oldest([]))      # None
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def complete_oldest(tasks):
    if len(tasks) == 0:
        return None
    return tasks.pop(0)
```
Without the check, `pop(0)` on an empty list raises `IndexError: pop from empty list`.
````

### Step 3: search

Write `search_tasks(tasks, word)` that returns a **new** list containing only the tasks that include `word`. The original list must not change. Make the search ignore upper/lower case.

```python
tasks = ["Learn the while loop", "Buy bread", "Learn the for loop"]
print(search_tasks(tasks, "learn"))
# ['Learn the while loop', 'Learn the for loop']
print(tasks)
# ['Learn the while loop', 'Buy bread', 'Learn the for loop']
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def search_tasks(tasks, word):
    found = []
    for task in tasks:
        if word.lower() in task.lower():
            found.append(task)
    return found
```
````

### Step 4: a menu

Write a `main` function that shows a menu in a loop, reads the user's choice and calls your functions, until the user chooses to quit.

```text
1. Show tasks   2. Add a task   3. Complete oldest   4. Search   5. Quit
> 2
New task: Revise for the test
> 1
TO DO:
1. Revise for the test
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def main():
    tasks = []
    while True:
        print("\n1. Show tasks   2. Add a task   3. Complete oldest   4. Search   5. Quit")
        choice = input("> ")

        if choice == "1":
            print_tasks(tasks)
        elif choice == "2":
            add_task(tasks, input("New task: "))
        elif choice == "3":
            done = complete_oldest(tasks)
            if done is None:
                print("There is nothing to complete.")
            else:
                print(f"Well done! Completed: {done}")
        elif choice == "4":
            print_tasks(search_tasks(tasks, input("Search for: ")))
        elif choice == "5":
            print("Goodbye!")
            break
        else:
            print("Please choose a number from 1 to 5.")

main()
```
````

## Part 2: priorities

Now each task gets a **priority**: 1 (urgent), 2 (normal) or 3 (whenever). A task becomes a **tuple** `(priority, text)`, such as `(1, "Pay school fees")`.

### Step 5: add and print by priority

Change `add_task` to `add_task(tasks, text, priority)`, storing the tuple. Change `print_tasks` so it shows the tasks **sorted by priority**, without changing the order of the list itself.

```python
tasks = []
add_task(tasks, "Read a novel", 3)
add_task(tasks, "Pay school fees", 1)
add_task(tasks, "Wash clothes", 2)
print_tasks(tasks)
```

```text
TO DO:
[1] Pay school fees
[2] Wash clothes
[3] Read a novel
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def add_task(tasks, text, priority):
    tasks.append((priority, text))

def print_tasks(tasks):
    print("TO DO:")
    if len(tasks) == 0:
        print("Nothing to do! \\o/")
    for priority, text in sorted(tasks):
        print(f"[{priority}] {text}")
```
`sorted` compares tuples item by item: first by priority, and if two priorities are equal, by text. It returns a **new** sorted list, so `tasks` keeps its original order.
````

### Step 6: remove all tasks of one priority

A classmate wrote this function to remove every task with a given priority:

```python
def remove_priority(tasks, priority):
    for i in range(len(tasks)):
        if tasks[i][0] == priority:
            tasks.pop(i)
```

Try it with `[(1, "a"), (3, "b"), (2, "c"), (3, "d")]` and priority 3. It crashes with `IndexError`. Explain why, and write a version that works by **returning a new list** of the tasks to keep.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
`range(len(tasks))` is worked out **once**, at the start, as `range(4)`. But every `pop` makes the list shorter. After removing `(3, "b")` and `(3, "d")`, the list has only 2 items, yet the loop still tries `tasks[3]` — which no longer exists. (Removing items also shifts the others to the left, so the loop can skip over some.)

Building a new list avoids both problems:
```python
def remove_priority(tasks, priority):
    kept = []
    for task in tasks:
        if task[0] != priority:
            kept.append(task)
    return kept

tasks = [(1, "a"), (3, "b"), (2, "c"), (3, "d")]
tasks = remove_priority(tasks, 3)
print(tasks)   # [(1, 'a'), (2, 'c')]
```
The rule to remember: **don't remove items from a list while you're looping over its positions.** Build a new list instead.
````

## Part 3: saving to a file

### Step 7: save and load

Write `save_tasks(tasks, filename)`, which writes one task per line as `priority;text`, and `load_tasks(filename)`, which reads them back into a list of tuples. If the file doesn't exist yet, `load_tasks` should return an empty list.

```python
tasks = [(1, "Pay school fees"), (2, "Wash clothes")]
save_tasks(tasks, "tasks.txt")
print(load_tasks("tasks.txt"))     # [(1, 'Pay school fees'), (2, 'Wash clothes')]
print(load_tasks("missing.txt"))   # []
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def save_tasks(tasks, filename):
    with open(filename, "w", encoding="utf-8") as f:
        for priority, text in tasks:
            f.write(f"{priority};{text}\n")

def load_tasks(filename):
    tasks = []
    try:
        with open(filename, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line == "":
                    continue
                priority, text = line.split(";", 1)
                tasks.append((int(priority), text))
    except FileNotFoundError:
        pass
    return tasks
```
`split(";", 1)` splits only at the **first** semicolon, so a task text that itself contains `;` is kept whole. The priority read from the file is a string, so we convert it with `int`.
````

## Going further

- Load the tasks when the menu program starts and save them when the user quits, so your list survives between runs. (In Colab, files in the Files panel disappear when the session ends: to keep your tasks for real, connect Google Drive and use a file name like `/content/drive/MyDrive/tasks.txt`.)
- Add a menu option to change a task's priority.
- Add a due date to each task and show overdue tasks first.
