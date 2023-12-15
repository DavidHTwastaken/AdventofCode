def read_data(filename):
    elves = []
    with open(filename, 'r') as file:
        data = file.read().split('\n')
        elf = []
        for num in data:
            if num == '':
                elves.append(elf.copy())
                elf.clear()
            else:
                elf.append(int(num))
    return elves

def find_max_of_2d(data):
    return max([sum(elf) for elf in data])

def find_sum_top_three(data):
    sums = [sum(elf) for elf in data]
    sums.sort(reverse=True)
    return sum(sums[:3])

def main():
    data = read_data('./Day1/data.txt')
    print(find_sum_top_three(data))

if __name__ == '__main__':
    main()