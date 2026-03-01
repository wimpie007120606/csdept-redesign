/*
 * Day 1 – Hello World (C)
 * Prints a message, uses variables, and reads basic input.
 * Compile: gcc -o hello_world hello_world.c
 * Run:     ./hello_world
 */
#include <stdio.h>

int main(void) {
    /* 1. Print a simple message */
    printf("Hello, World!\n");

    /* 2. Variables: declare and assign */
    char name[] = "Student";
    int age = 20;
    printf("Name: %s, Age: %d\n", name, age);

    /* 3. Basic input (uncomment to try) */
    /* printf("Enter your name: ");
     * scanf("%s", name);
     * printf("You said: %s\n", name);
     */

    return 0;
}
