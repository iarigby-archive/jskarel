class C {
    static fromArray(arr) {
        return new C(...arr)
    }
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    set(x, y) {
        if (y) {
            this.x = x
            this.y = y
        } else {
            this.x = x.x
            this.y = x.y
        }
    }
    move(x, y) {
        this.set(this.getNext(x, y))
    }
    getNext(x, y) {
        return new C(this.x + x, this.y + y)
    }
    equal(c) {
        return this.x == c.x && this.y == c.y
    }
    toString() {
        return `(${this.x},${this.y})`
    }
}

module.exports = C