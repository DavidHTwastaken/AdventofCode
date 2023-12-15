import pandas as pd


def find_outcome(row):
    diff = row['elf'] - row['me']
    if diff in {-1, 2}:
        return 6
    elif diff == 0:
        return 3
    else:
        return 0


def part1(filename):
    data = pd.read_csv(filename, names=['elf', 'me'], sep=' ')
    data = data.replace({'A': 1, 'B': 2, 'C': 3, 'X': 1, 'Y': 2, 'Z': 3})
    data['outcome'] = data.apply(lambda row: find_outcome(row), axis=1)
    return sum(data['me'] + data['outcome'])


def find_move(row):
    outcome = row['outcome']
    elf = row['elf']
    if outcome == 6:
        return elf % 3 + 1
    elif outcome == 3:
        return elf
    else:
        return elf - 1 if elf - 1 != 0 else 3


def part2(filename):
    data = pd.read_csv(filename, names=['elf', 'outcome'], sep=' ').replace(
        {'A': 1, 'B': 2, 'C': 3, 'X': 0, 'Y': 3, 'Z': 6}
    )
    data['me'] = data.apply(lambda row: find_move(row), axis=1)
    return sum(data['me'] + data['outcome'])


def main():
    filename = './Day2/data.txt'
    print(part2(filename))


if __name__ == '__main__':
    main()
