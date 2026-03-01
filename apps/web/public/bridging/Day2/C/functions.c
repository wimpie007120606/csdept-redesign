/*
 * Day 2 – Functions (C)
 * Defining and calling functions with parameters and return values.
 * Compile: gcc -o functions functions.c
 * Run:     ./functions
 */
#include <stdio.h>

/* Returns the sum of two integers */
int add(int a, int b) {
    return a + b;
}

/* Prints a greeting */
void greet(const char *name) {
    printf("Hello, %s!\n", name);
}

int main(void) {
    printf("add(10, 20) = %d\n", add(10, 20));
    greet("Student");
    return 0;
}
