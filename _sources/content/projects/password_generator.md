# Project: Strong Passwords

Choosing a strong password is one of the most important things you can do to protect your email, your bank account and your phone. In this project you'll measure how strong a password is, check whether it meets the usual rules, and write two different password generators.

**You will need:** modules (Topic 7), loops (Topic 10), strings (Topic 13) and, for Part 2, files (Topic 15).

## Part 1: random passwords

### How strong is a password?

A password's strength measures how hard it would be to guess by trying every possible combination. If a password of length **L** is chosen at random from an alphabet of **N** different characters, its strength in *bits* is:

$$F = L \times \log_2 N$$

The usual scale is:

| Strength F | Rating |
|---|---|
| less than 64 | very weak |
| 64 to 79 | weak |
| 80 to 99 | moderate |
| 100 or more | strong |

### Step 1: calculate the strength

Using `log2` from the `math` module, write `strength(length, alphabet_size)` that returns F, and `rating(bits)` that returns the rating as a string. Then find the **shortest length** that reaches "moderate" for each of these alphabets:

1. digits only (N = 10),
2. lowercase letters only (N = 26),
3. lowercase + uppercase + digits + 15 punctuation symbols (N = 77).

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
from math import log2

def strength(length, alphabet_size):
    return length * log2(alphabet_size)

def rating(bits):
    if bits < 64:
        return "very weak"
    elif bits < 80:
        return "weak"
    elif bits < 100:
        return "moderate"
    else:
        return "strong"

for alphabet_size in [10, 26, 77]:
    length = 1
    while strength(length, alphabet_size) < 80:
        length = length + 1
    print(f"N = {alphabet_size}: at least {length} characters")
```
```text
N = 10: at least 25 characters
N = 26: at least 18 characters
N = 77: at least 13 characters
```
A bigger alphabet means a much shorter password for the same strength.
````

### Step 2: does it follow the rules?

Most websites require at least one lowercase letter, one uppercase letter, one digit and one punctuation symbol. We'll also require **at least 13 characters**, so that a random password is at least moderate. We'll use these punctuation symbols:

```python
PUNCTUATION = ".:;!?/()&#@_-*%"
```

Write `is_strong_enough(password)`. Hint: the string methods `islower()`, `isupper()` and `isdigit()` work on single characters too.

```python
print(is_strong_enough("tT1;"))                 # False (too short)
print(is_strong_enough("fjhkqsgdfhqgsdhfgq"))   # False (no upper, digit or symbol)
print(is_strong_enough("fjhkqsgdfhqgsX2;"))     # True
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
PUNCTUATION = ".:;!?/()&#@_-*%"

def is_strong_enough(password):
    if len(password) < 13:
        return False
    has_lower = False
    has_upper = False
    has_digit = False
    has_symbol = False
    for character in password:
        if character.islower():
            has_lower = True
        elif character.isupper():
            has_upper = True
        elif character.isdigit():
            has_digit = True
        elif character in PUNCTUATION:
            has_symbol = True
    return has_lower and has_upper and has_digit and has_symbol
```
````

### Step 3: generate a random password

Computers can't produce truly random numbers; they use clever formulas that *look* random. The `random` module is fine for games, but for passwords you should use the `secrets` module, which is designed to be unpredictable. `secrets.choice(sequence)` picks one random item.

The `string` module also gives you ready-made strings: `string.ascii_letters` (all letters) and `string.digits`.

Write `generate_password(size)` that builds a random password of `size` characters from letters, digits and `PUNCTUATION`, and keeps generating new ones until `is_strong_enough` is satisfied.

```python
print(generate_password(13))   # for example: pBq51YXM83X!S
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
import secrets
import string

def generate_password(size):
    alphabet = string.ascii_letters + string.digits + PUNCTUATION
    while True:
        password = ""
        for i in range(size):
            password = password + secrets.choice(alphabet)
        if is_strong_enough(password):
            return password

print(generate_password(13))
```
Generating again until the rules are met keeps the password completely random. If `size` is less than 13 this would loop forever — can you add a check that prevents that?
````

## Part 2: passphrases you can remember

Random passwords are strong but almost impossible to remember. The **Diceware** method builds a *passphrase* instead: several words picked at random from a long list. With a list of 8000 words, each word adds about 13 bits of strength, so **six** words give about 78 bits — and something like `FinishFrustratedWarnedTranslatorRunningInfiltrate` is far easier to remember than `pBq51YXM83X!S`.

For this part you need a word list: a text file with one word per line. Download {download}`starwars_8k_2018.txt <../../data/starwars_8k_2018.txt>`, a list of 8000 words from the Star Wars universe published by the Electronic Frontier Foundation (EFF).

```{admonition} Getting the word list into Colab
:class: tip
Download the file to your device using the link above, then open the **Files** panel in Colab (folder icon) and **upload** it. Remember that uploaded files are deleted when the session ends, so upload it again next time — or keep it in your Google Drive, as shown in [Using Google Colab](../appendix/google_colab.md).
```

### Step 4: read the word list

Write `read_words(filename)` that returns a list of all the words in the file, without the `"\n"` at the end of each line.

```python
words = read_words("starwars_8k_2018.txt")
print(len(words))   # 8000
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def read_words(filename):
    words = []
    with open(filename, encoding="utf-8") as f:
        for line in f:
            word = line.strip()
            if word != "":
                words.append(word)
    return words
```
````

### Step 5: build a passphrase

Write `passphrase(words, count)` that picks `count` random words with `secrets.choice`, starts each one with a capital letter, and joins them together.

```python
print(passphrase(words, 6))   # for example: SpeechlessReprogrammedDismayAskingLedListens
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def passphrase(words, count):
    chosen = []
    for i in range(count):
        chosen.append(secrets.choice(words).capitalize())
    return "".join(chosen)
```
````

### Step 6: satisfy picky websites

Many websites reject passphrases because they contain no digits or symbols. Write `alter(password)` that replaces some letters with look-alike characters: `a` → `4`, `e` → `3`, `i` → `!`, `o` → `()`, `y` → `'/`. Then write `strong_passphrase(words, count)` that keeps generating altered passphrases until one passes `is_strong_enough`.

```python
print(alter("Testy"))   # T3st'/
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def alter(password):
    password = password.replace("a", "4")
    password = password.replace("e", "3")
    password = password.replace("i", "!")
    password = password.replace("o", "()")
    password = password.replace("y", "'/")
    return password

def strong_passphrase(words, count):
    while True:
        candidate = alter(passphrase(words, count))
        if is_strong_enough(candidate):
            return candidate

print(strong_passphrase(words, 6))
```
Only lowercase letters are replaced, so the capital letter at the start of each word survives and the passphrase keeps its uppercase characters.
````

## Going further

- Add a small menu that lets the user choose between a random password and a passphrase, and choose the length.
- Show the strength rating of each generated password using your functions from Step 1.
- Create your own word list (for example, Swahili words) and use it for passphrases. How many words does your list need so that 6 words give at least 80 bits?
