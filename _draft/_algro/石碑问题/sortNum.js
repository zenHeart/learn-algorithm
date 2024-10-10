function countCombination(list) {
    let res = 0;
    let len = list.length;
    let i = 0;
    let j = 0;
    while (i < len) {
        j = i + 1;
        while (j < len) {
        if (list[i] > list[j]) {
            res++;
        }
        j++;
        }
        i++;
    }
    return res;
}


console.log(countCombination([1,2,3]))