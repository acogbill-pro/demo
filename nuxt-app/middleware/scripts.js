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
    isDateValid(withDate) {
        if (
            typeof withDate === 'object' &&
            withDate !== null &&
            typeof withDate.getTime === 'function' &&
            !isNaN(withDate)
          ) {
            return true;
          }
        
          return false;
    },
    transformStringToType(withString) {
        if (withString === 'true') return true
        if (withString === 'false') return false
        if (withString === 'null') return null

        // the `+` turns it into a Number... probably
        if (this.isStringANumber(withString)) return +withString

        const asDate = new Date(withString)

        if (this.isDateValid(asDate)) return asDate.toISOString()

        return withString
    },
}