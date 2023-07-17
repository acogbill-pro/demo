export const useHelpers = () => {
    return {
        arrayDifference: (arr1, arr2) => arr1.filter(x => !arr2.includes(x)),
        arrayIntersection: (arr1, arr2) => arr1.filter(x => arr2.includes(x)),
    }
}