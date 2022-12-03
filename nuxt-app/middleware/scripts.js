export default {
    arrayIntersection(arrA, arrB) {
        return arrA.filter(value => arrB.includes(value))
    },
    listToArray(withListString) {
        return withListString.split(', ')
    },
    isStringANumber(withString) {
        return !isNaN(withString)
    },
    numberIfNumber(withString) {
        // the `+` turns it into a Number... probably
        return this.isStringANumber(withString) ? +withString : withString
    },
}