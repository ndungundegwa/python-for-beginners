# Symbols and Keywords Review

Learning to program is a little like learning a language: before you can read comfortably, you need to know the "alphabet" of symbols and the most important words. Use this page to review everything you've met in the course.

```{tip}
Don't just read this page. For each entry: cover the description, say what you think it does, then check. Write the ones you get wrong on flash cards, and use each one in a tiny program of your own. Fifteen minutes at a time is plenty.
```

## Keywords

Keywords are words with a special meaning in Python. You can't use them as variable names.

| Keyword | What it does | Example |
|---|---|---|
| `True`, `False` | the two Boolean values | `is_ready = True` |
| `None` | "no value" | `pet = None` |
| `and` | True only if both sides are true | `age >= 13 and age <= 19` |
| `or` | True if at least one side is true | `day == "Sat" or day == "Sun"` |
| `not` | reverses True and False | `not finished` |
| `if` | runs a block only if a condition is true | `if x > 0:` |
| `elif` | another condition, checked if the previous ones were false | `elif x < 0:` |
| `else` | runs if none of the conditions were true | `else:` |
| `for` | repeats a block for each item of a sequence | `for fruit in fruits:` |
| `in` | membership test; also used in `for` loops | `"a" in "cat"` |
| `while` | repeats a block while a condition is true | `while count > 0:` |
| `break` | leaves a loop immediately | `if answer == "quit": break` |
| `continue` | skips to the next round of a loop | `if line == "": continue` |
| `pass` | does nothing; a placeholder | `def todo(): pass` |
| `def` | defines a function | `def add(a, b):` |
| `return` | sends a value back from a function | `return a + b` |
| `import` | loads a module | `import math` |
| `from` | imports specific names from a module | `from random import randint` |
| `as` | gives something a local name | `with open("f.txt") as f:` |
| `with` | opens something and tidies up afterwards | `with open("f.txt") as f:` |
| `class` | defines a class | `class Song:` |
| `try` | runs code that might raise an exception | `try:` |
| `except` | handles an exception | `except ValueError:` |
| `finally` | runs whether or not there was an exception | `finally:` |
| `raise` | raises an exception yourself | `raise ValueError("too big")` |
| `is` | tests whether two things are the same object | `pet is None` |
| `del` | deletes a variable or an item | `del prices["milk"]` |
| `global` | lets a function change a global variable | `global counter` |
| `assert` | stops with an error if a condition is false | `assert total >= 0` |
| `lambda` | makes a tiny unnamed function | `lambda x: x * 2` |

## Data types

| Type | Example values | Notes |
|---|---|---|
| `int` | `42`, `-7`, `0` | whole numbers |
| `float` | `3.14`, `2.0`, `-0.5` | numbers with a decimal point |
| `str` | `"hello"`, `'x'`, `"""long text"""` | text; can't be changed |
| `bool` | `True`, `False` | yes/no values |
| `None` | `None` | "nothing" |
| `list` | `[1, 2, 3]`, `[]` | ordered, changeable |
| `tuple` | `(1, 2)`, `("a",)` | ordered, can't be changed |
| `dict` | `{"name": "Amina"}`, `{}` | key → value look-ups |

## Operators

| Operator | Name | Example | Result |
|---|---|---|---|
| `+` | plus / join | `2 + 3`, `"a" + "b"` | `5`, `"ab"` |
| `-` | minus | `7 - 2` | `5` |
| `*` | times / repeat | `3 * 4`, `"ha" * 2` | `12`, `"haha"` |
| `/` | divide | `7 / 2` | `3.5` |
| `//` | floor divide | `7 // 2` | `3` |
| `%` | remainder (modulus) | `7 % 2` | `1` |
| `**` | power | `2 ** 5` | `32` |
| `==` | equal to | `3 == 3` | `True` |
| `!=` | not equal to | `3 != 4` | `True` |
| `<`, `>` | less than, greater than | `2 < 5` | `True` |
| `<=`, `>=` | less/greater than or equal | `5 >= 5` | `True` |
| `=` | assignment | `x = 10` | gives `x` the value 10 |
| `+=`, `-=`, `*=`, `/=` | update in place | `x += 1` | same as `x = x + 1` |

## Punctuation

| Symbol | Name | Used for |
|---|---|---|
| `( )` | parentheses | calling functions, grouping, tuples |
| `[ ]` | square brackets | lists, indexing, slicing |
| `{ }` | curly braces | dictionaries, placeholders in f-strings |
| `:` | colon | starting a block; slices; dictionary pairs |
| `,` | comma | separating arguments and items |
| `.` | dot | getting something from something: `words.append`, `math.pi` |
| `#` | hash / octothorpe | comments |
| `"` `'` | double / single quote | strings |
| `"""` `'''` | triple quotes | multi-line strings and docstrings |
| `\` | backslash | escape sequences |
| `_` | underscore | separating words in names: `total_price` |

## Escape sequences

| Escape | Meaning |
|---|---|
| `\n` | new line |
| `\t` | tab |
| `\\` | backslash |
| `\'` | single quote |
| `\"` | double quote |

## String formatting

| Code | Meaning | Example | Result |
|---|---|---|---|
| `f"{x}"` | insert a value | `f"{2 + 2}"` | `"4"` |
| `{x:.2f}` | two decimal places | `f"{3.14159:.2f}"` | `"3.14"` |
| `"{} {}".format(a, b)` | fill placeholders in order | `"{} {}".format("hi", 5)` | `"hi 5"` |

## Exercise: what do you know so far?

Without looking at this page, write down on paper every symbol and keyword you can remember, with its name and what it does. Then compare your list with the tables above. Mark the ones you missed or got wrong, and practise those — by the end of the week, try the whole list again from memory.

````{admonition} Solution - Click the button to reveal!
:class: dropdown
There's no single right answer: the point is to find the gaps in **your** memory. A good target is to be able to explain, from memory, every entry in the *Keywords* table up to `return`, all the *Operators*, and the *Punctuation* table — those are what you'll use every day.
````
