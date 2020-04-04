import { World } from './world'
import { WorldOpts } from './world'
import { C } from './coordinates'

const Directions: [number, number][] = [
    [1, 0], // east
    [0, 1], // north
    [-1, 0], // west
    [0, -1], // south
]

interface KarelOpts {
    world?: WorldOpts
    direction?: number
    position?: any
}

export class Karel {
    public world: World
    public direction: number
    public position: C
    constructor(opts: KarelOpts = {}) {
        this.world = new World(opts.world)
        this.direction = opts.direction || 0
        if (opts.position) {
            this.position = opts.position[0] ? C.fromArray(opts.position) : opts.position
        } else {
            this.position = new C(1, 1)
        }
    }
    setPosition(x: number, y: number) {
        this.position.set(x, y)
        return this
    }
    leftDirection(): number {
        return (this.direction + 1) % (Directions.length)
    }
    turnLeft(): void {
        this.direction = this.leftDirection()
    }
    move(): void {
        const direction = Directions[this.direction]
        if (this.frontIsClear()) {
            this.position.move(...direction)
        } else {
            throw "there is a wall in front of Karel"
        }
    }
    nextCorner(direction: [number, number]): C {
        return this.position.getNext(...direction)
    }
    pickBeeper(): void {
        this.world.removeBeeper(this.position)
    }
    putBeeper(): void {
        this.world.addBeeper(this.position)
    }
    toString() {
        return `Karel is on position ${this.position}, coordinates of beepers: ${this.world.beepers}`
    }
    frontIsClear(directionIndex = this.direction): boolean {
        const direction = Directions[directionIndex]
        return !this.world.existsWall(this.position, this.nextCorner(direction))
    }
    beepersPresent(): boolean {
        return this.world.beepersPresent(this.position) > -1
    }
    noBeepersPresent(): boolean {
        return !this.beepersPresent()
    }
    frontIsBlocked(): boolean {
        return !this.frontIsClear()
    }
    leftIsClear(): boolean {
        return this.frontIsClear(this.leftDirection())
    }
}