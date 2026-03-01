/**
 * Day 3 – Mini project: simple menu calculator (Java)
 * A small menu-driven program: add, subtract, or exit.
 * Compile: javac MiniProject.java
 * Run:     java MiniProject
 */
import java.util.Scanner;

public class MiniProject {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        boolean running = true;

        while (running) {
            System.out.println("\n--- Simple Calculator ---");
            System.out.println("1. Add two numbers");
            System.out.println("2. Subtract two numbers");
            System.out.println("3. Exit");
            System.out.print("Choice (1-3): ");
            int choice = sc.nextInt();

            if (choice == 1) {
                System.out.print("First number: ");
                int a = sc.nextInt();
                System.out.print("Second number: ");
                int b = sc.nextInt();
                System.out.println("Result: " + (a + b));
            } else if (choice == 2) {
                System.out.print("First number: ");
                int a = sc.nextInt();
                System.out.print("Second number: ");
                int b = sc.nextInt();
                System.out.println("Result: " + (a - b));
            } else if (choice == 3) {
                System.out.println("Bye!");
                running = false;
            } else {
                System.out.println("Invalid choice.");
            }
        }
        sc.close();
    }
}
