/**
 * Day 2 – Functions / methods (Java)
 * Defining and calling methods with parameters and return values.
 * Compile: javac Functions.java
 * Run:     java Functions
 */
public class Functions {

    /** Returns the sum of two integers */
    static int add(int a, int b) {
        return a + b;
    }

    /** Prints a greeting */
    static void greet(String name) {
        System.out.println("Hello, " + name + "!");
    }

    public static void main(String[] args) {
        int x = 10;
        int y = 20;
        System.out.println("add(10, 20) = " + add(x, y));

        greet("Student");
    }
}
