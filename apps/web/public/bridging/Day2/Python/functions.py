# Day 2 – Functions (Python)
# Defining and calling functions with parameters and return values.
# Run: python functions.py

def add(a, b):
    """Returns the sum of two numbers."""
    return a + b

def greet(name):
    """Prints a greeting."""
    print("Hello, " + name + "!")

# Call the functions
print("add(10, 20) =", add(10, 20))
greet("Student")
