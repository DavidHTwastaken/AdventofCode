#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define WINNING_NUMS_START 10
#define WINNING_NUMS_END 38
#define MY_NUMS_START 42
#define MY_NUMS_END 115
#define WINNING_NUMS_AMOUNT 10
#define FILE_LENGTH 223

void printArray(long *arr)
{
    printf("Contents of array:\n");
    for (int i = 0; i < sizeof(arr) / sizeof(arr[0]); ++i)
    {
        printf("i: %d, val: %ld\n", i, arr[i]);
    }
}

int matchesFromLine(char *line)
{
    int matchesCount = 0;
    size_t myNumsLength = MY_NUMS_END - MY_NUMS_START + 2;
    char *myNumsStr = (char *)malloc(myNumsLength);
    strncpy(myNumsStr, line + MY_NUMS_START, myNumsLength);

    size_t winningNumsLength = WINNING_NUMS_END - WINNING_NUMS_START + 2;
    char *winningNumsStr = (char *)malloc(winningNumsLength);
    strncpy(winningNumsStr, line + WINNING_NUMS_START, winningNumsLength);

    // printf("My nums: %s\n", myNumsStr);
    // printf("Winning nums: %s\n", winningNumsStr);

    char delim[] = " ";
    long winningNums[WINNING_NUMS_AMOUNT];
    char *winPtr = strtok(winningNumsStr, delim);
    int j = 0;
    while (winPtr != NULL)
    {
        const long val = strtol(winPtr, NULL, 10);
        winningNums[j] = val;
        ++j;
        winPtr = strtok(NULL, delim);
    }

    char *myPtr = strtok(myNumsStr, delim);
    while (myPtr != NULL)
    {
        const long val = strtol(myPtr, NULL, 10);
        for (int i = 0; i < WINNING_NUMS_AMOUNT; ++i)
        {
            // printf("i: %d, winningNums[i]: %ld\n", i, winningNums[i]);
            if (val == winningNums[i])
            {
                // printf("i: %d, Val: %ld, winningNums[i]: %ld\n", i, val, winningNums[i]);
                matchesCount += 1;
                break;
            }
        }
        myPtr = strtok(NULL, delim);
    }

    free(myNumsStr);
    free(winningNumsStr);
    free(myPtr);
    free(winPtr);
    return matchesCount;
}

long scratchCardsFromFile()
{
    FILE *fptr;
    fptr = fopen("input.txt", "r");
    char *line = NULL;
    size_t size = 0;
    long sum = 0;
    long *copiesArr = (long *)calloc(FILE_LENGTH, sizeof(long));
    int i = 0;
    while (getline(&line, &size, fptr) != -1)
    {
        copiesArr[i] += 1;
        int matches = matchesFromLine(line);
        int start = i + 1;
        int end = i + matches < FILE_LENGTH - 1 ? i + matches : FILE_LENGTH - 1;
        for (int j = start; j <= end; ++j)
        {
            copiesArr[j] += copiesArr[i];
        }
        ++i;
    }
    for (int k = 0; k < FILE_LENGTH; ++k)
    {
        sum += copiesArr[k];
    }
    free(copiesArr);
    free(line);
    fclose(fptr);
    return sum;
}

void runTest()
{
    char line[] = "Card   1: 75 68 35 36 86 83 30 11 14 59 | 86 25 63 57 59 91 68 14 72 32 36 74 66 44 30 28 11 35 75 34 55 83 69 56 38";
    printf("%d\n", matchesFromLine(line));
}

int main()
{
    long sum = scratchCardsFromFile();
    printf("%ld\n", sum);
    // runTest();
}