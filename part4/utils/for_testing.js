const palindrome = (string) => {
    return string.split('').reverse().join('')
}

const average = (Array) => {
    const reducer = (sum, item) => {
        return sum + item
    }
    return Array.length === 0
        ? 0 
        : Array.reduce(reducer, 0) / Array.length
}

module.exports = {
    palindrome,
    average,
}