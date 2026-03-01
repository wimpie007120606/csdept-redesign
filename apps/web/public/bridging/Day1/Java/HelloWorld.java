/**
 * Day 1 – Hello World (Java)
 * Prints a message, uses variables, and reads basic input.
 * Compile: javac HelloWorld.java
 * Run:     java HelloWorld
 */
public class HelloWorld {

    public static void main(String[] args) {
        // 1. Print a simple message to the console
        System.out.println("Hello, World!");

        // 2. Variables: declare and assign
        String name = "Student";
        int age = 20;
        System.out.println("Name: " + name + ", Age: " + age);

        // 3. Basic input (using Scanner – uncomment to try)
        // java.util.Scanner scanner = new java.util.Scanner(System.in);
        // System.out.print("Enter your name: ");
        // String input = scanner.nextLine();
        // System.out.println("You said: " + input);
        // scanner.close();
    }
}
