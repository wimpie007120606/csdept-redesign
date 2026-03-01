/**
 * Day 3 – Arrays and loops (Java)
 * Creating arrays, iterating with for-each and for loop.
 * Compile: javac ArraysAndLoops.java
 * Run:     java ArraysAndLoops
 */
public class ArraysAndLoops {

    public static void main(String[] args) {
        // Create an array of integers
        int[] numbers = { 10, 20, 30, 40, 50 };

        // Loop with index
        System.out.print("Numbers: ");
        for (int i = 0; i < numbers.length; i++) {
            System.out.print(numbers[i] + " ");
        }
        System.out.println();

        // For-each loop
        System.out.print("Again:   ");
        for (int n : numbers) {
            System.out.print(n + " ");
        }
        System.out.println();

        // String array
        String[] names = { "Alice", "Bob", "Carol" };
        for (String name : names) {
            System.out.println("Hello, " + name);
        }
    }
}
