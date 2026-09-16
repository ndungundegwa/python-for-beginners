# Project: DNA Sequences

In this project you'll write a small toolkit for working with DNA sequences. It's a great way to practise functions, decisions, loops and strings — and at the end, all your functions combine into one complete program.

**You will need:** functions (Topic 6), decisions (Topic 9), loops (Topic 10) and strings (Topic 13).

**How to work:** do the steps in order. After each function, test it with the examples given **before** moving on. Keep the function names exactly as written, because later steps reuse them.

## What is a DNA sequence?

DNA is made of small building blocks called **bases**. There are four of them: adenine (`A`), cytosine (`C`), guanine (`G`) and thymine (`T`). In a living cell, DNA has two strands twisted into a double helix, and the bases pair up in a fixed way:

- `A` always pairs with `T`,
- `G` always pairs with `C`.

So if one strand is `CGTA`, the strand facing it must be `GCAT`. We'll represent a strand as a string such as `"CGTAGTTTCGA"`.

## Step 1: the complementary base

Write a function `complement(base)` that takes one base (a one-character string) and returns its partner. For anything that isn't a valid base, return `"?"`.

```python
print(complement("A"))   # T
print(complement("G"))   # C
print(complement("X"))   # ?
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def complement(base):
    if base == "A":
        return "T"
    elif base == "T":
        return "A"
    elif base == "G":
        return "C"
    elif base == "C":
        return "G"
    else:
        return "?"
```
````

## Step 2: the complementary strand

Write `complement_strand(dna)` that returns the whole facing strand. Use a `for` loop over the characters and your `complement` function.

```python
print(complement_strand("CGTA"))          # GCAT
print(complement_strand("CGTAGTTTCGA"))   # GCATCAAAGCT
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def complement_strand(dna):
    result = ""
    for base in dna:
        result = result + complement(base)
    return result
```
Strings can't be changed, so we build a **new** string by adding one character at a time.
````

## Step 3: displaying the double strand

Write `hstring(dna)` that returns a **three-line string**: the strand, a row of `|` characters (one per base), and the complementary strand.

```python
print(hstring("CGTAGTTTCGA"))
```

```text
CGTAGTTTCGA
|||||||||||
GCATCAAAGCT
```

Then write `vstring(dna)` that shows the pairs vertically, one pair per line:

```python
print(vstring("CGTA"))
```

```text
C-G
G-C
T-A
A-T
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def hstring(dna):
    return dna + "\n" + "|" * len(dna) + "\n" + complement_strand(dna)

def vstring(dna):
    lines = []
    for base in dna:
        lines.append(base + "-" + complement(base))
    return "\n".join(lines)
```
`"|" * len(dna)` repeats the bar once per base. In `vstring`, we collect the lines in a list and glue them with `"\n".join(...)`, which puts a new line **between** lines (so there's no extra empty line at the end).
````

## Step 4: checking a sequence

Write `is_dna(sequence)` that returns `True` only if the string is not empty and contains nothing but the letters `A`, `C`, `G` and `T` (upper case).

```python
print(is_dna("CGTAGTTTCGA"))    # True
print(is_dna("CGTXAGTTTCGA"))   # False
print(is_dna(""))               # False
```

Then write `input_dna()` that keeps asking the user for a sequence until a valid one is typed, and returns it. Let the user type in lower case too, by converting their answer with `.upper()`.

```text
Enter a DNA sequence: acgtcf
That is not a DNA sequence (only A, C, G, T). Try again.
Enter a DNA sequence: acgtcgaagcg
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def is_dna(sequence):
    if len(sequence) == 0:
        return False
    for letter in sequence:
        if letter not in "ACGT":
            return False
    return True

def input_dna():
    sequence = input("Enter a DNA sequence: ").upper()
    while not is_dna(sequence):
        print("That is not a DNA sequence (only A, C, G, T). Try again.")
        sequence = input("Enter a DNA sequence: ").upper()
    return sequence
```
`is_dna` returns `False` as soon as it finds one bad letter; only if the loop finishes without finding one does it return `True`.
````

## Step 5: molar mass

Each base has a different mass:

| Base | Mass (g/mol) |
|---|---|
| A | 135 |
| C | 111 |
| G | 151 |
| T | 126 |

Write `base_mass(base)` that returns the mass of one base. Then write `mass(dna)` that returns the mass of the **double** strand: for each base, add its own mass **and** the mass of its complement.

```python
print(mass("CGTA"))          # 1046
print(mass("CGTAGTTTCGA"))   # 2876
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def base_mass(base):
    if base == "A":
        return 135
    elif base == "C":
        return 111
    elif base == "G":
        return 151
    elif base == "T":
        return 126
    else:
        return 0

def mass(dna):
    total = 0
    for base in dna:
        total = total + base_mass(base) + base_mass(complement(base))
    return total
```
Each A–T pair weighs 135 + 126 = 261 and each C–G pair weighs 111 + 151 = 262. `"CGTA"` has two of each: 2 × 262 + 2 × 261 = 1046.
````

## Step 6: GC content

Biologists often want the **GC content**: the percentage of bases that are `G` or `C`. Write `gc_content(dna)` that returns this percentage.

```python
print(gc_content("CGTA"))          # 50.0
print(gc_content("CGTAGTTTCGA"))   # about 45.45
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def gc_content(dna):
    count = 0
    for base in dna:
        if base == "G" or base == "C":
            count = count + 1
    return count / len(dna) * 100
```
`"CGTAGTTTCGA"` has 5 G/C bases out of 11: 5 / 11 × 100 ≈ 45.45.
````

## Step 7: finding a pattern

Write `count_pattern(dna, pattern)` that returns how many times `pattern` appears in `dna`, **including overlapping** appearances. Hint: try every starting position `i`, and compare the slice `dna[i:i + len(pattern)]` with the pattern.

```python
print(count_pattern("CGTCGT", "CGT"))    # 2
print(count_pattern("CCCCCCC", "C"))     # 7
print(count_pattern("AAAA", "AA"))       # 3  (overlapping!)
print(count_pattern("CCCCCCC", "A"))     # 0
```

````{admonition} Solution - Click the button to reveal!
:class: dropdown
```python
def count_pattern(dna, pattern):
    count = 0
    for i in range(len(dna) - len(pattern) + 1):
        if dna[i:i + len(pattern)] == pattern:
            count = count + 1
    return count
```
The last position where the pattern can still fit is `len(dna) - len(pattern)`, so the `range` stops just after it. (Python's own `dna.count(pattern)` does **not** count overlapping matches: `"AAAA".count("AA")` is 2.)
````

## Step 8: putting it all together

Tidy up your notebook: put all the function definitions together in one cell (without the test lines) and run it. Then, in a new cell below, add this `main` function and run it:

```python
def main():
    dna = input_dna()
    print("Now the pattern to search for.")
    pattern = input_dna()
    print()
    print("-" * 40)
    print("DNA REPORT")
    print(hstring(dna))
    print(f"Molar mass: {mass(dna)} g/mol")
    print(f"GC content: {gc_content(dna):.1f}%")
    print(f"The pattern {pattern} appears {count_pattern(dna, pattern)} time(s).")
    print("-" * 40)

main()
```

If every function is correct, you should see something like:

```text
Enter a DNA sequence: cgtcgt
Now the pattern to search for.
Enter a DNA sequence: cgt

----------------------------------------
DNA REPORT
CGTCGT
||||||
GCAGCA
Molar mass: 1570 g/mol
GC content: 66.7%
The pattern CGT appears 2 time(s).
----------------------------------------
```

## Going further

- Add a function `reverse_complement(dna)` that returns the complementary strand **read backwards** (biologists use this a lot). Hint: slicing with `[::-1]`.
- Rewrite `complement` and `base_mass` using **dictionaries** (Topic 14). How much shorter do they become?
- Let the user analyse several sequences in a row, until they type `quit`.
