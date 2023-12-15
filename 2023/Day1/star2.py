nums = {'one': '1', 'two': '2', 'three': '3', 'four': '4',
        'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'}


def line_to_num(line: str) -> int:
    digits = ''
    for i in range(len(line)):
        char = line[i]
        if char.isnumeric():
            digits += char
            continue
        matches = [num for num in nums.keys() if num[0] == char]
        for match in matches:
            if len(line) >= i + len(match) and line[i:i+len(match)] == match:
                digits += nums[match]
    return int(digits[0]+digits[-1])


def calculate_sum():
    answer = 0
    with open('input.txt') as file:
        for line in file:
            answer += line_to_num(line)
    return answer


def main():
    print(line_to_num('threighteneona2four'))
    print(line_to_num('bk1sevenjbmncfiveninejp'))
    print(line_to_num('zone'))
    ans = calculate_sum()
    print(ans)


if __name__ == '__main__':
    main()
