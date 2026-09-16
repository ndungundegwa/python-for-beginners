# Classes and Objects

Python is an **object-oriented** language. You've actually been using objects all along: strings, lists, dictionaries and files are all objects, which is why you can write things like `stops.append("Kitale")` and `f.read()`. In this topic you'll learn to create your own kinds of objects using **classes**.

Object-oriented programming can feel strange at first. We'll approach it slowly, starting from things you already know: dictionaries and modules.

## Getting things from things

You already know two ways to "get something out of something".

**From a dictionary**, with square brackets and a key:

```python
school = {"motto": "Strive to excel"}
print(school["motto"])
```

**From a module**, with a dot. Create a small module with `%%writefile`:

```python
%%writefile school.py
def ring_bell():
    print("RING! Time for class.")

# this is just a variable
motto = "Strive to excel"
```

Then, in another cell, use it:

```python
import school

school.ring_bell()
print(school.motto)
```

```text
RING! Time for class.
Strive to excel
```

Both follow the same pattern: take a container of named things, and get one out by its name. A dictionary uses `["name"]`; a module uses `.name`.

## Classes are like modules you can copy

A **class** is another container of functions and data that you access with a dot. Here is a class that works like the `school` module:

```python
class School:

    def __init__(self, motto):
        self.motto = motto

    def ring_bell(self):
        print("RING! Time for class.")
```

Why not just use a module? Because a module exists **once** in your program, while a class is a **blueprint** you can use to create as many independent **objects** as you like — each with its own data.

Creating an object from a class is called **instantiating** it, and you do it by calling the class as if it were a function:

```python
riverside = School("Strive to excel")
hilltop = School("Knowledge is light")

riverside.ring_bell()
print(riverside.motto)
print(hilltop.motto)
```

```text
RING! Time for class.
Strive to excel
Knowledge is light
```

When Python runs `riverside = School("Strive to excel")`:

1. It sees that `School` is a class.
2. It creates a new, empty object based on that class.
3. It looks for a special method called `__init__` and calls it to **initialise** the new object, passing along `"Strive to excel"` as `motto`.
4. Inside `__init__`, the parameter `self` **is that new object**, so `self.motto = motto` stores the motto on it.
5. Finally, the new object is given the name `riverside`.

`hilltop` went through the same steps, but got its own motto. Two objects, one blueprint.

So now there are three ways to get things from things:

```python
# dictionary style
school_dict = {"motto": "Strive to excel"}
print(school_dict["motto"])

# module style
school.ring_bell()
print(school.motto)

# class style
riverside = School("Strive to excel")
riverside.ring_bell()
print(riverside.motto)
```

## A first real class

Type this into a new code cell:

```python
class Proverb:

    def __init__(self, swahili, english):
        self.swahili = swahili
        self.english = english

    def share(self):
        print(self.swahili)
        print("   It means:", self.english)


patience = Proverb("Haraka haraka haina baraka.",
                   "Hurrying brings no blessing.")

teamwork = Proverb("Kidole kimoja hakivunji chawa.",
                   "One finger cannot crush a louse.")

patience.share()
teamwork.share()
```

### What you should see

```text
Haraka haraka haina baraka.
   It means: Hurrying brings no blessing.
Kidole kimoja hakivunji chawa.
   It means: One finger cannot crush a louse.
```

- `Proverb("Haraka haraka haina baraka.", "Hurrying brings no blessing.")` creates a new proverb object and passes the two strings to `__init__`, where they're stored as `self.swahili` and `self.english`.
- `patience` and `teamwork` are two **separate** objects made from the same class, each with its own text.
- `patience.share()` calls the method on `patience`. Python automatically passes `patience` as `self`, so the method prints *that* proverb.

```{admonition} Classes in notebooks
:class: tip
Put each class in its own cell and create objects in the cells below it. If you **change** the class, run its cell again **and** run the cells that create the objects again: objects made before the change still follow the old blueprint.
```

## Why self?

Every method in a class has `self` as its first parameter. It stands for "the object this method is working on". Without it, a line like `english = english` inside `__init__` would just create a temporary local variable that disappears when `__init__` ends. `self.english = english` makes it clear that you mean the **object's** `english`, which it keeps.

When you call `patience.share()`, Python quietly turns it into `Proverb.share(patience)`. That's where `self` comes from.

## Give every object the same attributes

The data stored on an object (like `self.swahili`) are called its **attributes**. The functions inside the class (like `share`) are called its **methods**.

Always create an object's attributes in `__init__`. This example shows what goes wrong otherwise: if you add attributes to objects one by one, a small spelling difference breaks everything.

```python
class Person:
    pass

someone = Person()
someone.first_name = "Juma"

someone_else = Person()
someone_else.name = "Achieng"      # oops: 'name' instead of 'first_name'

print(someone_else.first_name)
```

```text
AttributeError: 'Person' object has no attribute 'first_name'
```

With `__init__`, every person is guaranteed to have the same attributes:

```python
class Person:
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

    def greeting(self):
        print(f"Hello, my name is {self.first_name} {self.last_name}.")

someone = Person("Juma", "Mwangi")
someone_else = Person("Achieng", "Odhiambo")
someone.greeting()
someone_else.greeting()
```

```text
Hello, my name is Juma Mwangi.
Hello, my name is Achieng Odhiambo.
```

## Printing objects nicely

If you `print` an object, you get something unhelpful like `<__main__.Person object at 0x7f3a2c1d>`. Add a special method called `__str__` that returns a string, and `print` will use it:

```python
class Person:
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

print(Person("Wangari", "Maathai"))
```

```text
Wangari Maathai
```

## The words of object-oriented programming

These words appear everywhere classes are discussed. You don't need to memorise them today, but come back to this table whenever you meet one:

| Word | Meaning | Example |
|---|---|---|
| **class** | a blueprint for a new type of thing | `class Proverb:` |
| **object** / **instance** | one thing made from a class | `patience` |
| **instantiate** | make an object from a class | `Proverb("...", "...")` |
| **attribute** | a value stored on an object | `patience.english` |
| **method** | a function defined inside a class | `patience.share()` |
| **self** | inside a method, the object being worked on | `self.swahili` |
| **`__init__`** | the method that sets up each new object | `def __init__(self, swahili, english):` |
| **inheritance** | a class that starts from another class and adds to it (Topic 18) | `class Student(Person):` |
| **composition** | an object that has other objects as parts (Topic 18) | a phone *has a* camera |

A useful habit is to **read class code aloud** in plain English:

- `class School:` — "define a new kind of thing called School".
- `hilltop = School("Knowledge is light")` — "make a new School with this motto, and call it hilltop".
- `hilltop.ring_bell()` — "ask hilltop to ring its bell".
- `hilltop.motto = "Aim high"` — "change hilltop's motto to 'Aim high'".

## Exercises

### Exercise: more proverbs

Using the `Proverb` class, create a proverb of your own. **Store the two texts in separate variables first**, then create the object and make it share. Then add a method `word_count(self)` that returns how many words the Swahili version has.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
class Proverb:

    def __init__(self, swahili, english):
        self.swahili = swahili
        self.english = english

    def share(self):
        print(self.swahili)
        print("   It means:", self.english)

    def word_count(self):
        return len(self.swahili.split())


saying = "Haba na haba hujaza kibaba."
meaning = "Little by little fills the pot."

little = Proverb(saying, meaning)
little.share()
print(little.word_count())   # 5
```
````

### Exercise: read it aloud

Say each line in plain English, in the style of "read class code aloud" above.

```python
class Matatu:
bus = Matatu("KDA 123A")
bus.pick_up(14)
bus.route = "Thika Road"
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
1. "Define a new kind of thing called Matatu."
2. "Make a new Matatu with the number plate KDA 123A, and call it bus."
3. "Ask bus to pick up 14 (passengers)."
4. "Change bus's route to 'Thika Road'."
````

### Exercise: a bank account

Write a class `BankAccount` with:
- `__init__(self, owner)`, which stores the owner's name and starts the balance at 0;
- `deposit(self, amount)`, which adds to the balance;
- `withdraw(self, amount)`, which subtracts from the balance, but prints `Insufficient funds` instead if there isn't enough money;
- `__str__(self)`, which returns something like `Amina: 1500 shillings`.

Create two accounts and show that they keep separate balances.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
class BankAccount:
    def __init__(self, owner):
        self.owner = owner
        self.balance = 0

    def deposit(self, amount):
        self.balance = self.balance + amount

    def withdraw(self, amount):
        if amount > self.balance:
            print("Insufficient funds")
        else:
            self.balance = self.balance - amount

    def __str__(self):
        return f"{self.owner}: {self.balance} shillings"

amina = BankAccount("Amina")
brian = BankAccount("Brian")

amina.deposit(2000)
amina.withdraw(500)
brian.deposit(300)
brian.withdraw(1000)     # Insufficient funds

print(amina)             # Amina: 1500 shillings
print(brian)             # Brian: 300 shillings
```
Each object has its **own** `balance` attribute, so changing one account never affects the other.
````

### Exercise: find the four bugs

This class should print `Hello, my name is Grace Hopper.` Find and fix the four mistakes.

```python
class Person:
    def __init__(first_name, last_name):
        self.first_name = first_name
        last_name = last_name

    def greeting(self):
        print(f"Hello, my name is {self.first_name} {self.last_name}.")

p = Person("Grace", "Hopper")
p.greeting
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
1. `__init__` is missing `self` as its first parameter. Python passes the new object automatically, so it would complain that it received 3 arguments instead of 2.
2. `last_name = last_name` doesn't store anything on the object; it needs `self.`.
3. Without fix 2, `greeting` would fail with `AttributeError: 'Person' object has no attribute 'last_name'`.
4. `p.greeting` has no parentheses, so the method is never called and nothing is printed. (In a notebook, if it's the last line of the cell, Colab shows something like `<bound method Person.greeting ...>` — a sign you forgot the brackets.)

```python
class Person:
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

    def greeting(self):
        print(f"Hello, my name is {self.first_name} {self.last_name}.")

p = Person("Grace", "Hopper")
p.greeting()
```
````

### Exercise: a student with marks

Write a class `Student` whose `__init__` takes a name and starts with an empty list of marks. Add `add_mark(self, mark)` and `average(self)` (which returns 0 if there are no marks yet). Create a student, add three marks and print the average.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
class Student:
    def __init__(self, name):
        self.name = name
        self.marks = []

    def add_mark(self, mark):
        self.marks.append(mark)

    def average(self):
        if len(self.marks) == 0:
            return 0
        return sum(self.marks) / len(self.marks)

s = Student("Chebet")
s.add_mark(78)
s.add_mark(91)
s.add_mark(64)
print(f"{s.name}: {s.average():.1f}")   # Chebet: 77.7
```
````
