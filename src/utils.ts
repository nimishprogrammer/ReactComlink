const bigTask = (int: number) => {
    const sum = new Array(int)
        .fill(0)
        .map((el, index) => el + index)
        .reduce((sum, el) => sum + el, 0);
    console.log("SUM:  ", sum);
};

export function runBigTask(int: number) {
    bigTask(int);
    return "Done";
}

export async function runBigTaskAsync(int: number) {
    bigTask(int);
    return "Completed / Done";
}
