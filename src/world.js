const C = require('./coordinates')
const Wall = require('./wall')
class World {
    constructor(opts) {
        this.width = opts.width || 10
        this.height = opts.height || 10
        this.walls = []
        const walls = opts.walls || []
        walls.forEach(wall => {
            if (wall.first && wall.second) {
                this.walls.push(wall)
            } else {
                const [ first, second ] = wall.map(C.fromArray)
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

    addBeepers(indices) {
        if (indices.length)
            indices.forEach(i => this.beepers.push(i))
        else
            this.beepers.push(indices)
        return this
    }

    addWall(wall) {
        this.walls.push(wall)
    }

    removeBeeper(c) {
        const index = this.beepersPresent(c) 
        if (index > -1) {
            this.beepers.splice(index, 1)
        } else {
            throw "no beepers on this corner"
        }
    }

    beepersPresent(c) {
        return this.beepers.map(x => x.equal(c)).indexOf(true)
    }

    existsWall(first, second) {
        const foundWalls = this.walls.filter(wall =>
            wall.same(first, second)
        )
        return foundWalls.length == 1
    }
}

module.exports = World