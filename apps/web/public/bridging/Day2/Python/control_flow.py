# Day 2 – Control flow (Python)
# if/else and loops (for, while).
# Run: python control_flow.py

# --- if / else ---
score = 75
if score >= 80:
    print("Grade: A")
elif score >= 60:
    print("Grade: B")
else:
    print("Grade: C or below")

# --- for loop ---
print("Count 1 to 5:", end=" ")
for i in range(1, 6):
    print(i, end=" ")
print()

# --- while loop ---
n = 3
while n > 0:
    print("Countdown:", n)
    n -= 1
