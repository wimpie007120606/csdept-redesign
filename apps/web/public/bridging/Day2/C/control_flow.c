/*
 * Day 2 – Control flow (C)
 * if/else and loops (for, while).
 * Compile: gcc -o control_flow control_flow.c
 * Run:     ./control_flow
 */
#include <stdio.h>

int main(void) {
    /* --- if / else --- */
    int score = 75;
    if (score >= 80) {
        printf("Grade: A\n");
    } else if (score >= 60) {
        printf("Grade: B\n");
    } else {
        printf("Grade: C or below\n");
    }

    /* --- for loop --- */
    printf("Count 1 to 5: ");
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\n");

    /* --- while loop --- */
    int n = 3;
    while (n > 0) {
        printf("Countdown: %d\n", n);
        n--;
    }

    return 0;
}
