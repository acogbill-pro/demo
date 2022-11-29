export default {
    arrayIntersection(arrA, arrB) {
        return arrA.filter(value => arrB.includes(value))
    },
    listToArray(withListString) {
        return withListString.split(', ')
    }
}