import { C } from './coordinates'
import { Wall } from './wall'

export interface WorldOpts {
    width?: number,
    height?: number,
    walls?: any
    beepers?: any
}
export class World {
    public width: number
    public height: number
    public walls: Wall[]
    public beepers: C[]
    constructor(opts: WorldOpts = {}) {
        this.width = opts.width || 10
        this.height = opts.height || 10
        this.walls = []
        const walls = opts.walls || []
        walls.forEach((wall: any) => {
            if (wall.first && wall.second) {
                this.walls.push(wall)
            } else {
                const [first, second] = wall.map(C.fromArray)
                this.walls.push(new Wall(first, second))
            }
        })
        const borders = Wall.borders(this.width, this.height)
        this.walls = this.walls
            .concat(borders)
        if (opts.beepers && opts.beepers.length) {
            if (opts.beepers[0].set) {
                this.beepers = opts.beepers
            } else {
                this.beepers = opts.beepers.map(C.fromArray)
            }
        } else {
            this.beepers = []
        }
    }

    addBeepers(indices: any): World {
        if (indices.length)
            indices.forEach((i: C) => this.beepers.push(i))
        else
            this.beepers.push(indices)
        return this
    }

    addWall(wall: Wall): void {
        this.walls.push(wall)
    }

    removeBeeper(c: C): void {
        const index = this.beepersPresent(c)
        if (index > -1) {
            this.beepers.splice(index, 1)
        } else {
            throw "no beepers on this corner"
        }
    }

    beepersPresent(c: C): number {
        return this.beepers.map(x => x.equal(c)).indexOf(true)
    }

    existsWall(first: C, second: C): boolean {
        const foundWalls = this.walls.filter(wall =>
            wall.same(first, second)
        )
        return foundWalls.length == 1
    }
}
