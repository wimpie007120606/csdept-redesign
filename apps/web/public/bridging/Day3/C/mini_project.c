/*
 * Day 3 – Mini project: simple menu program (C)
 * Menu: add, subtract, or exit.
 * Compile: gcc -o mini_project mini_project.c
 * Run:     ./mini_project
 */
#include <stdio.h>

int main(void) {
    int choice;
    int running = 1;

    while (running) {
        printf("\n--- Simple Calculator ---\n");
        printf("1. Add two numbers\n");
        printf("2. Subtract two numbers\n");
        printf("3. Exit\n");
        printf("Choice (1-3): ");
        scanf("%d", &choice);

        if (choice == 1) {
            int a, b;
            printf("First number: ");
            scanf("%d", &a);
            printf("Second number: ");
            scanf("%d", &b);
            printf("Result: %d\n", a + b);
        } else if (choice == 2) {
            int a, b;
            printf("First number: ");
            scanf("%d", &a);
            printf("Second number: ");
            scanf("%d", &b);
            printf("Result: %d\n", a - b);
        } else if (choice == 3) {
            printf("Bye!\n");
            running = 0;
        } else {
            printf("Invalid choice.\n");
        }
    }

    return 0;
}
