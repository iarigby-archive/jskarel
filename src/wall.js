const C = require('./coordinates')

class Wall {
    /**
     * 
     * @param {C} first 
     * @param {C} second 
     */
    constructor(first, second) {
        this.first = first
        this.second = second
    }

    same(first, second) {
        return this.equal(first, second) || this.equal(second, first)
    }

    equal(first, second) {
        return this.first.equal(first) && this.second.equal(second)
    }

    static horizontalLine(start, end) {
        const edges = []
        const y = start.y
        for (let x = start.x; x < end.x; x++) {
            const first = new C(x, y - 1)
            const second = new C(x, y)
            edges.push(new Wall(first, second))
        }
        return edges
    }

    static verticalLine(start, end) {
        const edges = []
        const x = start.x
        for (let y = start.y; y < end.y; y++) {
            const first = new C(x - 1, y)
            const second = new C(x, y)
            edges.push(new Wall(first, second))
        }
        return edges
    }

    static corners(width, height) {
        return [
            [1, 1], // lowerLeft
            [width + 1, 1], // lowerRight
            [1, height + 1], // topLeft
            [width + 1, height + 1] // topRight
        ]
    }

    static line(p1, p2) {
        if (p1.x == p2.x) {
            return Wall.verticalLine(p1, p2)
        } else if (p1.y == p2.y) {
            return Wall.horizontalLine(p1, p2)
        }
        return []
    }

    static borders(width, height) {
        const corners = this.corners(width, height).map(C.fromArray)
        return corners
            .map(p1 => corners.map(p2 => this.line(p1, p2)))
            .flat()
            .flat()
    }
}

module.exports = Wall