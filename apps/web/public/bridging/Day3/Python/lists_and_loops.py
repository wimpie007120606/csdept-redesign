# Day 3 – Lists and loops (Python)
# Creating lists, iterating with for.
# Run: python lists_and_loops.py

# Create a list
numbers = [10, 20, 30, 40, 50]

# Loop by index
print("Numbers:", end=" ")
for i in range(len(numbers)):
    print(numbers[i], end=" ")
print()

# For-each style
print("Again:  ", end=" ")
for n in numbers:
    print(n, end=" ")
print()

# List of strings
names = ["Alice", "Bob", "Carol"]
for name in names:
    print("Hello,", name)
