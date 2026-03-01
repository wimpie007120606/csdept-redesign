/**
 * Day 2 – Control flow (Java)
 * if/else and loops (for, while).
 * Compile: javac ControlFlow.java
 * Run:     java ControlFlow
 */
public class ControlFlow {

    public static void main(String[] args) {
        // --- if / else ---
        int score = 75;
        if (score >= 80) {
            System.out.println("Grade: A");
        } else if (score >= 60) {
            System.out.println("Grade: B");
        } else {
            System.out.println("Grade: C or below");
        }

        // --- for loop ---
        System.out.print("Count 1 to 5: ");
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();

        // --- while loop ---
        int n = 3;
        while (n > 0) {
            System.out.println("Countdown: " + n);
            n--;
        }
    }
}
