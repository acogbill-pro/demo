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
      if (typeof withString !== 'string') return withString
        switch(withString) {
            case 'true':
              return true;
              // no break because returns
            case 'false':
              return false;
              // no break because returns
            case 'null':
              return null;
              // no break because returns
            default:
                // the `+` turns it into a Number... probably
                if (this.isStringANumber(withString)) return +withString

                const asDate = new Date(withString)
        
                if (this.isDateValid(asDate)) return asDate.toISOString()

                const asCalendarDate = new Date(...withString.split('/'))

                if (this.isDateValid(asCalendarDate)) return asCalendarDate.toISOString()
        
                return withString
          }
    },
}