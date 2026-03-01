# Day 3 – Mini project: simple grade analyzer (Python)
# Reads a list of scores and shows average and count.
# Run: python mini_project.py

def main():
    scores = []
    print("Enter scores (one per line). Type 'done' when finished.")
    while True:
        line = input("Score: ").strip()
        if line.lower() == "done":
            break
        try:
            scores.append(float(line))
        except ValueError:
            print("Not a number, try again.")

    if not scores:
        print("No scores entered.")
        return

    total = sum(scores)
    count = len(scores)
    average = total / count
    print(f"\nCount: {count}, Total: {total}, Average: {average:.2f}")

if __name__ == "__main__":
    main()
