def line_to_num(line: str):
    left, right = '', ''
    for l in range(len(line)):
        if line[l].isnumeric():
            left = line[l]
            break
    for r in range(len(line)-1, -1, -1):
        if line[r].isnumeric():
            right = line[r]
            break
    return int(left+right)


def calculate_sum():
    answer = 0
    with open('input.txt') as file:
        for line in file:
            answer += line_to_num(line)
    return answer


def main():
    ans = calculate_sum()
    print(ans)


if __name__ == '__main__':
    main()
