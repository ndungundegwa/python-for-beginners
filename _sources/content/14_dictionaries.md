# Dictionaries

A list lets you find things by their **position**: item 0, item 1, item 2. But often you want to find things by a **name** instead: a phone number by a person's name, a price by a product, a headquarters by a county. For that, Python has the **dictionary**.

## Lists versus dictionaries

Imagine storing facts about a student in a list:

```python
student = ["S1023", "Wanjiru", 19, "Nyeri"]
print(student[1])
```

```text
Wanjiru
```

It works, but you have to *remember* that index 1 means "name" and index 3 means "county". A **dictionary** (or **dict**) lets you look things up by a meaningful **key** — very often a string — instead of a number. You write a dictionary with curly braces, as pairs of **key: value**:

```python
student = {"id": "S1023", "name": "Wanjiru", "age": 19}

print(student["name"])
print(student["age"])

student["county"] = "Nyeri"
print(student["county"])
print(student)
```

```text
Wanjiru
19
Nyeri
{'id': 'S1023', 'name': 'Wanjiru', 'age': 19, 'county': 'Nyeri'}
```

- Each **key** (`"id"`, `"name"`, …) is linked to a **value** (`"S1023"`, `"Wanjiru"`, …).
- `student["name"]` looks up the value for the key `"name"`.
- `student["county"] = "Nyeri"` adds a new pair — or replaces the value if the key already exists.

Keys must be unique: a dictionary can't have two `"name"` keys. Values can be anything, including lists and other dictionaries.

## Removing, checking and safe lookups

Continue in a new cell, using the same `student` dictionary:

```python
print(student.pop("county"))    # remove a key and return its value
print("age" in student)         # is this key in the dictionary?
print("Wanjiru" in student)     # 'in' checks keys, not values
print(len(student))
```

```text
Nyeri
True
False
3
```

Looking up a key that isn't there is an error:

```python
student["phone"]
```

```text
KeyError: 'phone'
```

The `get` method avoids the error: it returns the value if the key exists, or a default value if it doesn't:

```python
print(student.get("phone", "unknown"))
print(student.get("name", "unknown"))
```

```text
unknown
Wanjiru
```

## A dictionary example: students, subjects and teachers

This program uses **two** dictionaries: one links each student to their favourite subject, and the other links each subject to its teacher. Type it into a new cell and study it carefully.

```python
favourite_subject = {
    "Amina": "Maths",
    "Brian": "Biology",
    "Chebet": "Chemistry",
}

teacher = {
    "Maths": "Mr. Kamau",
    "Biology": "Mrs. Otieno",
}

# add more pairs after creating the dictionaries
favourite_subject["Daudi"] = "Maths"
teacher["Chemistry"] = "Ms. Wairimu"

# simple look-ups
print("Amina likes", favourite_subject["Amina"])
print("Biology is taught by", teacher["Biology"])

# one look-up inside another
print("Chebet's favourite teacher is", teacher[favourite_subject["Chebet"]])

# go through every pair
print("-" * 20)
for name, subject in favourite_subject.items():
    print(f"{name} likes {subject}, taught by {teacher[subject]}")

# safe look-ups for keys that might not be there
print("-" * 20)
subject = favourite_subject.get("Esther")

if subject == None:
    print("We don't know Esther's favourite subject yet.")

print("Physics teacher:", teacher.get("Physics", "not assigned yet"))
```

### What you should see

```text
Amina likes Maths
Biology is taught by Mrs. Otieno
Chebet's favourite teacher is Ms. Wairimu
--------------------
Amina likes Maths, taught by Mr. Kamau
Brian likes Biology, taught by Mrs. Otieno
Chebet likes Chemistry, taught by Ms. Wairimu
Daudi likes Maths, taught by Mr. Kamau
--------------------
We don't know Esther's favourite subject yet.
Physics teacher: not assigned yet
```

Look closely at `teacher[favourite_subject["Chebet"]]`. Python works from the inside out: `favourite_subject["Chebet"]` is `"Chemistry"`, so this becomes `teacher["Chemistry"]`, which is `"Ms. Wairimu"`.

`favourite_subject.get("Esther")` with no default gives back `None` when the key is missing — the same "nothing" value you met in Topic 6.

## Looping over a dictionary

There are three ways to go through a dictionary:

```python
prices = {"bread": 65, "milk": 60, "eggs": 15}

for item in prices:                 # the keys
    print(item)

for price in prices.values():       # the values
    print(price)

for item, price in prices.items():  # key and value together
    print(f"{item} costs {price} shillings")
```

```text
bread
milk
eggs
65
60
15
bread costs 65 shillings
milk costs 60 shillings
eggs costs 15 shillings
```

Dictionaries remember the order in which you added the keys, so the loops go through them in that order.

## Counting with a dictionary

One of the most common uses of a dictionary is **counting** how many times things appear. This pattern is worth memorising:

```python
sold = "mango banana mango orange banana mango".split()

counts = {}
for fruit in sold:
    counts[fruit] = counts.get(fruit, 0) + 1

print(counts)
```

```text
{'mango': 3, 'banana': 2, 'orange': 1}
```

The first time a fruit appears, `counts.get(fruit, 0)` gives 0, so its count becomes 1. Each later time, the count goes up by one.

## Records: dictionaries in a list

A dictionary keeps the facts about **one thing** together, with a name for each fact — like the `student` dictionary at the start of this topic. A **list of dictionaries** then holds many such records:

```python
students = [
    {"name": "Amina", "mark": 78},
    {"name": "Brian", "mark": 64},
    {"name": "Chebet", "mark": 91},
]

for student in students:
    print(f"{student['name']}: {student['mark']}")
```

```text
Amina: 78
Brian: 64
Chebet: 91
```

Notice the quotes: the f-string uses double quotes, so the keys inside it use single quotes, `student['name']`.

## When to use a dictionary

- Use a **list** for things in order that you look up by position.
- Use a **dictionary** when you have one value and want to **look up** another value by it. You could call dictionaries "look-up tables".

## Exercises

### Exercise: counties and their headquarters

Create a dictionary linking some Kenyan counties to their county headquarters (for example `"Uasin Gishu": "Eldoret"`), add two more pairs after creating it, then print every pair with a `for` loop. Finally, use `get` to look up a county that isn't in your dictionary.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
headquarters = {
    "Nairobi": "Nairobi",
    "Mombasa": "Mombasa",
    "Uasin Gishu": "Eldoret",
}

headquarters["Nyeri"] = "Nyeri"
headquarters["Kakamega"] = "Kakamega"

for county, town in headquarters.items():
    print(f"The headquarters of {county} County is {town}.")

print(headquarters.get("Turkana", "Not in the dictionary yet"))
```
````

### Exercise: a phone book

Write a program with a dictionary of names and phone numbers. Ask the user for a name, and print the number, or `Sorry, I don't know <name>` if the name isn't in the phone book.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
phone_book = {
    "Amina": "0712 345 678",
    "Brian": "0723 456 789",
    "Chebet": "0734 567 890",
}

name = input("Whose number? ")

if name in phone_book:
    print(f"{name}: {phone_book[name]}")
else:
    print(f"Sorry, I don't know {name}")
```
Checking with `in` first avoids a `KeyError`.
````

### Exercise: letter counter

Write a function `letter_counts(text)` that returns a dictionary counting how many times each letter appears in a string, ignoring spaces. `letter_counts("banana")` should give `{'b': 1, 'a': 3, 'n': 2}`.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def letter_counts(text):
    counts = {}
    for letter in text:
        if letter != " ":
            counts[letter] = counts.get(letter, 0) + 1
    return counts

print(letter_counts("banana"))   # {'b': 1, 'a': 3, 'n': 2}
```
````

### Exercise: the class average

Using the `students` list of dictionaries from this topic, write a program that prints the average mark and the name of the student with the highest mark.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
students = [
    {"name": "Amina", "mark": 78},
    {"name": "Brian", "mark": 64},
    {"name": "Chebet", "mark": 91},
]

total = 0
best = students[0]
for student in students:
    total = total + student["mark"]
    if student["mark"] > best["mark"]:
        best = student

average = total / len(students)
print(f"Average mark: {average:.1f}")
print(f"Top student: {best['name']} with {best['mark']}")
```
This prints an average of `77.7` and `Chebet` as the top student.
````

### Exercise: a shop inventory

A shop's stock is `stock = {"pens": 40, "books": 12, "rulers": 25}`. Write a function `sell(stock, item, quantity)` that reduces the stock of `item` by `quantity` and returns `True`, or prints a message and returns `False` if the item doesn't exist or there isn't enough of it.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def sell(stock, item, quantity):
    if item not in stock:
        print(f"We don't sell {item}.")
        return False
    if stock[item] < quantity:
        print(f"Only {stock[item]} {item} left.")
        return False
    stock[item] = stock[item] - quantity
    return True

stock = {"pens": 40, "books": 12, "rulers": 25}
sell(stock, "books", 5)
sell(stock, "books", 10)     # Only 7 books left.
sell(stock, "erasers", 1)    # We don't sell erasers.
print(stock)                 # {'pens': 40, 'books': 7, 'rulers': 25}
```
Notice that the function changes the dictionary it was given: the caller's `stock` really is updated.

In a notebook, remember that the last line of a cell is displayed: a cell ending with `sell(stock, "books", 5)` would also show `True` below it.
````
