#include <math.h>
#include <stdio.h>
#include <stdlib.h>

int matchesToPoints(int matchesCount)
{
    return (int)pow((double)2, (double)matchesCount);
}

int winningsFromLine(char *line)
{
    int matchesCount = 0;
    return 0;
}

int main()
{
    FILE *fptr;
    fptr = fopen("input.txt", "r");
    char line[128];
    int sum = 0;
    char *newLine;
    int size;
    while (fgets(line, sizeof(line), fptr))
    {

        printf(newLine);
        sum += winningsFromLine(line);
    }
    printf("%d", sum);
    fclose(fptr);
}