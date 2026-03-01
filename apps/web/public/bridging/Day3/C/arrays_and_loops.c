/*
 * Day 3 – Arrays and loops (C)
 * Creating arrays, iterating with for loop.
 * Compile: gcc -o arrays_and_loops arrays_and_loops.c
 * Run:     ./arrays_and_loops
 */
#include <stdio.h>

int main(void) {
    int numbers[] = { 10, 20, 30, 40, 50 };
    int n = sizeof(numbers) / sizeof(numbers[0]);

    printf("Numbers: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\n");

    const char *names[] = { "Alice", "Bob", "Carol" };
    int num_names = 3;
    for (int i = 0; i < num_names; i++) {
        printf("Hello, %s\n", names[i]);
    }

    return 0;
}
