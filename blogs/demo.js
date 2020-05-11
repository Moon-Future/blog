function myNew(fn, ...arg) {
    let obj = Object.create(fn.prototype)
    let rst = fn.call(obj, ...arg)
    return typeof rst === 'object' ? ret : obj
}

function myInstanceof(left, right) {
    let proto = Object.getPrototypeOf(left)
    while(true) {
        if (proto === null) return false
        if (proto === right.prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
}

console.log(myInstanceof('a', String))