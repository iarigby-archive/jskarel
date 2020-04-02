const World = require('./world')
const C = require('./coordinates')

const Directions = [
    [1, 0], // east
    [0, 1], // north
    [-1, 0], // west
    [0, -1], // south
]

module.exports = class {
    constructor(opts = {}) {
        this.world = new World(opts.world)
        this.direction = opts.direction || 0
        if (opts.position) {
            this.position = opts.position.set ? opts.position : C.fromArray(opts.position)
        } else {
            this.position = new C(1, 1)
        }
    }
    setPosition(x, y) {
        this.position.set(x, y)
        return this
    }
    leftDirection() {
        return (this.direction + 1) % (Directions.length)
    }
    turnLeft() {
        this.direction = this.leftDirection()
    }
    move() {
        const direction = Directions[this.direction]
        if (this.frontIsClear()) {
            this.position.move(...direction)
        } else {
            throw "there is a wall in front of Karel"
        }
    }
    nextCorner(direction) {
        return this.position.getNext(...direction)
    }
    pickBeeper() {
        this.world.removeBeeper(this.position)
    }
    putBeeper() {
        this.world.addBeepers(this.position)
    }
    toString() {
        return `Karel is on position ${this.position}, coordinates of beepers: ${this.world.beepers}`
    }
    frontIsClear(directionIndex = this.direction) {
        const direction = Directions[directionIndex]
        return !this.world.existsWall(this.position, this.nextCorner(direction))
    }
    beepersPresent() {
        return this.world.beepersPresent(this.position) > -1
    }
    noBeepersPresent() {
        return !this.beepersPresent()
    }
    frontIsBlocked() {
        return !this.frontIsClear()
    }
    leftIsClear() {
        return this.frontIsClear(this.leftDirection())
    }
}