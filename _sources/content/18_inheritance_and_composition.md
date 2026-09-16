# Is-a, Has-a: Inheritance and Composition

Once you start writing classes, you'll notice that some classes are **special kinds** of others (a student *is a* person), and some classes are **made of** others (a smartphone *has a* camera). Python gives you two tools for these relationships: **inheritance** and **composition**. This final topic shows you both, and when to choose which.

## Is-a and has-a

Two short phrases describe how classes relate:

- **is-a** — "a student *is a* person". The student is a special kind of person, so a `Student` gets everything a `Person` has. In code, this is **inheritance**.
- **has-a** — "a classroom *has a* teacher". The teacher is a part of the classroom. In code, this is **composition**: one object stored as an attribute of another.

Study this code. The comments that start with `##` describe each relationship. (Don't worry about the `super().__init__(name)` lines yet; they're explained further down.)

```python
## Person is a class of its own
class Person:
    def __init__(self, name):
        ## Person has-a name
        self.name = name

## Student is-a Person
class Student(Person):
    def __init__(self, name, form):
        super().__init__(name)
        ## Student has-a form (year of study)
        self.form = form

## Teacher is-a Person
class Teacher(Person):
    def __init__(self, name, subject):
        super().__init__(name)
        ## Teacher has-a subject
        self.subject = subject

## Classroom is a class of its own
class Classroom:
    def __init__(self, name, teacher):
        ## Classroom has-a name
        self.name = name
        ## Classroom has-a teacher (a Teacher object)
        self.teacher = teacher
        ## Classroom has-a list of students
        self.students = []


## kamau is-a Teacher
kamau = Teacher("Mr. Kamau", "Maths")

## amina and brian are Students
amina = Student("Amina", 3)
brian = Student("Brian", 3)

## room is-a Classroom, and has-a teacher: kamau
room = Classroom("Form 3 East", kamau)

## room has students: amina and brian
room.students.append(amina)
room.students.append(brian)

print(room.name, "is taught by", room.teacher.name)
for student in room.students:
    print(student.name, "is in Form", student.form)

print(isinstance(amina, Person))
```

### What you should see

```text
Form 3 East is taught by Mr. Kamau
Amina is in Form 3
Brian is in Form 3
True
```

Writing `class Student(Person):` means "make a class named Student that is-a Person". `Person` is called the **parent** class (or superclass) and `Student` is the **child** class (or subclass). `isinstance(amina, Person)` confirms it: every student is a person.

Look at `room.teacher.name`: the classroom *has* a teacher, and the teacher *has* a name, so we follow the dots from one object to the next.

## Three ways a child uses its parent

When a child class inherits from a parent, there are three ways they can work together. We'll see all three with mobile phones. Type both classes into one cell:

```python
class Phone:

    def call(self, number):
        print(f"Calling {number}...")

    def ring(self):
        print("Ring ring!")

    def charge(self):
        print("Charging the battery.")


class SmartPhone(Phone):

    def ring(self):
        print("Playing your favourite song...")

    def charge(self):
        print("Checking the cable is safe.")
        super().charge()
        print("Battery full. Screen on.")
```

Then try each of the following in its own cell.

### 1. Implicit: the child just uses the parent's method

`SmartPhone` has no `call` method of its own, so it uses the one from `Phone` automatically:

```python
basic = Phone()
smart = SmartPhone()

basic.call("0712 345 678")
smart.call("0712 345 678")
```

```text
Calling 0712 345 678...
Calling 0712 345 678...
```

Put shared code in a parent class, and every child gets it for free.

### 2. Override: the child replaces the parent's method

`SmartPhone` defines a method with the **same name**, `ring`, so its version is used instead:

```python
basic.ring()
smart.ring()
```

```text
Ring ring!
Playing your favourite song...
```

### 3. Alter: the child adds to the parent's method

Sometimes the child wants to do something extra **before or after** the parent's version. It overrides the method, then calls the parent's version with `super()`:

```python
basic.charge()
print("---")
smart.charge()
```

```text
Charging the battery.
---
Checking the cable is safe.
Charging the battery.
Battery full. Screen on.
```

`super().charge()` means "call the `charge` method of my parent class".

## super() in __init__

The most common place to use `super()` is inside `__init__`, so that the parent can set up its attributes before the child adds its own. You saw this in `Student` and `Teacher` above. Here is the same idea again:

```python
class Person:
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

    def greeting(self):
        print(f"Hello, my name is {self.first_name} {self.last_name}.")

class Worker(Person):
    def __init__(self, first_name, last_name, worker_id):
        super().__init__(first_name, last_name)   # let Person set the names
        self.worker_id = worker_id

    def greeting(self):
        print(f"Hello, my name is {self.first_name} {self.last_name}, my id is {self.worker_id}.")

Person("Ada", "Lovelace").greeting()
Worker("Alan", "Turing", 42).greeting()
```

```text
Hello, my name is Ada Lovelace.
Hello, my name is Alan Turing, my id is 42.
```

If `Worker.__init__` forgot the `super().__init__(...)` line, a worker would have a `worker_id` but no names, and `greeting` would crash with an `AttributeError`.

## One call, many behaviours

Because each child can override a method, you can treat different kinds of objects the same way and let each one respond in its own manner. This is called **polymorphism**:

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def sound(self):
        return "..."

class Cow(Animal):
    def sound(self):
        return "Moo!"

class Rooster(Animal):
    def sound(self):
        return "Cock-a-doodle-doo!"

farm = [Cow("Pendo"), Rooster("Jogoo"), Animal("Mystery")]
for animal in farm:
    print(f"{animal.name} says {animal.sound()}")
```

```text
Pendo says Moo!
Jogoo says Cock-a-doodle-doo!
Mystery says ...
```

The loop never checks what kind of animal it has; it simply calls `sound()`, and the right method runs.

## Composition: using other objects as parts

Inheritance isn't the only way to reuse code. Often it's simpler for a class to **have** another object and ask it to do the work. A camera phone *is a* phone, but it *has a* camera:

```python
class Camera:
    def __init__(self, megapixels):
        self.megapixels = megapixels

    def take_photo(self, subject):
        print(f"Click! A {self.megapixels} MP photo of {subject}.")


class CameraPhone(Phone):            # is-a Phone
    def __init__(self, owner):
        self.owner = owner
        self.camera = Camera(50)     # has-a Camera

    def photo(self, subject):
        self.camera.take_photo(subject)

    def selfie(self):
        print(f"{self.owner} smiles at the screen...")
        self.camera.take_photo(self.owner)


phone = CameraPhone("Wanjiku")
phone.call("0722 000 111")
phone.photo("Mount Kenya")
phone.selfie()
```

```text
Calling 0722 000 111...
Click! A 50 MP photo of Mount Kenya.
Wanjiku smiles at the screen...
Click! A 50 MP photo of Wanjiku.
```

(This cell uses the `Phone` class from earlier, so run that cell first.)

`CameraPhone` uses **both** tools: it inherits `call` from `Phone`, and it **passes work** to the `Camera` object stored in `self.camera`. A phone is not a kind of camera, so inheriting from `Camera` would be wrong. The camera is a *part*.

## When to use inheritance or composition

Both solve the same problem — avoiding duplicated code — in different ways. Some guidelines:

1. Use **inheritance** only when there's a clear **is-a** relationship: a `Student` really is a `Person`, a `SmartPhone` really is a `Phone`.
2. Use **composition** when one thing is a **part** of another, or when you want to reuse code in many unrelated places: a `Classroom` has a `Teacher`; a `CameraPhone` has a `Camera`; a game has a board.
3. When in doubt, prefer composition. It keeps classes simpler and more independent.
4. Avoid inheriting from several classes at once ("multiple inheritance") while you're learning; it quickly becomes confusing.

## Exercises

### Exercise: predict the output

Without running it, write down exactly what this prints. Then check in a cell.

```python
class Bell:

    def test(self):
        print("Testing the bell")

    def ring(self):
        print("DING")

    def stop(self):
        print("The bell stops")

class SchoolBell(Bell):

    def ring(self):
        print("DING DING DING - time for class!")

    def stop(self):
        print("Last ring of the day")
        super().stop()
        print("Everyone goes home")

old = Bell()
school = SchoolBell()

old.test()
school.test()

old.ring()
school.ring()

old.stop()
school.stop()
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```text
Testing the bell
Testing the bell
DING
DING DING DING - time for class!
The bell stops
Last ring of the day
The bell stops
Everyone goes home
```
`school.test()` is **implicit** (inherited), `school.ring()` is **overridden**, and `school.stop()` **alters** the parent's version by calling it through `super()`.
````

### Exercise: is-a or has-a?

For each pair, say whether the relationship is **is-a** (inheritance) or **has-a** (composition).

1. Laptop and Computer
2. Laptop and Keyboard
3. Matatu and Vehicle
4. Matatu and Driver
5. Teacher and Person
6. School and Teacher

````{admonition} Solution - Click the button to reveal!
:class: dropdown
1. A laptop **is a** computer → inheritance.
2. A laptop **has a** keyboard → composition.
3. A matatu **is a** vehicle → inheritance.
4. A matatu **has a** driver → composition.
5. A teacher **is a** person → inheritance.
6. A school **has** teachers (many!) → composition, for example a list of `Teacher` objects stored in the school.
````

### Exercise: vehicles

Write a parent class `Vehicle` with `__init__(self, name, wheels)` and a method `describe(self)` that returns `"<name> has <wheels> wheels"`. Write two child classes: `Bicycle`, whose `__init__` takes only a name and always has 2 wheels, and `Car`, whose `__init__` takes a name and an extra `seats` attribute and which **alters** `describe` to add `" and <seats> seats"`.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
class Vehicle:
    def __init__(self, name, wheels):
        self.name = name
        self.wheels = wheels

    def describe(self):
        return f"{self.name} has {self.wheels} wheels"

class Bicycle(Vehicle):
    def __init__(self, name):
        super().__init__(name, 2)

class Car(Vehicle):
    def __init__(self, name, seats):
        super().__init__(name, 4)
        self.seats = seats

    def describe(self):
        return super().describe() + f" and {self.seats} seats"

print(Bicycle("My bike").describe())    # My bike has 2 wheels
print(Car("Family car", 7).describe())  # Family car has 4 wheels and 7 seats
```
````

### Exercise: a car has an engine

Use **composition**: write a class `Engine` with a method `start(self)` that prints `Engine starting... vroom!`, and a class `Car` whose `__init__` creates an `Engine` and stores it as `self.engine`. Give `Car` a method `drive(self)` that starts the engine and then prints `The car is moving.`

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
class Engine:
    def start(self):
        print("Engine starting... vroom!")

class Car:
    def __init__(self):
        self.engine = Engine()

    def drive(self):
        self.engine.start()
        print("The car is moving.")

Car().drive()
```
A car is not a kind of engine, so inheritance would be wrong here. The car **has** an engine and asks it to start.
````

### Exercise: the class register

Extend the school example from the start of this topic:

1. Give `Person` a method `introduce(self)` that returns `"I am <name>"`.
2. **Override** it in `Student` to return `"I am <name>, in Form <form>"`, and in `Teacher` to **alter** it by adding `" and I teach <subject>"` to the parent's version.
3. Give `Classroom` a method `register(self)` that prints the classroom's name, then the teacher's introduction, then each student's introduction.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
class Person:
    def __init__(self, name):
        self.name = name

    def introduce(self):
        return f"I am {self.name}"

class Student(Person):
    def __init__(self, name, form):
        super().__init__(name)
        self.form = form

    def introduce(self):                       # override
        return f"I am {self.name}, in Form {self.form}"

class Teacher(Person):
    def __init__(self, name, subject):
        super().__init__(name)
        self.subject = subject

    def introduce(self):                       # alter
        return super().introduce() + f" and I teach {self.subject}"

class Classroom:
    def __init__(self, name, teacher):
        self.name = name
        self.teacher = teacher
        self.students = []

    def register(self):
        print(self.name)
        print(" ", self.teacher.introduce())
        for student in self.students:
            print(" ", student.introduce())

room = Classroom("Form 3 East", Teacher("Mr. Kamau", "Maths"))
room.students.append(Student("Amina", 3))
room.students.append(Student("Brian", 3))
room.register()
```
```text
Form 3 East
  I am Mr. Kamau and I teach Maths
  I am Amina, in Form 3
  I am Brian, in Form 3
```
`register` doesn't care whether it's talking to a teacher or a student: it calls `introduce()` on each, and the right version runs — polymorphism again.
````
