fa = require('../tools/file-access');

const fileName = 'day3/trees.txt';

const trajectory = (error, data) => {
    if (error) {
        return console.log(error);
    }

    let map = new Map(data);
    let position = new Position();
    // Part 1
    const slope = new Slope(3, 1);

    // Toboggan path
    const et = map.toboggan(position, slope);

    // results
    console.log(et);

    // Part 2
    map.reset();

    const slope1 = new Slope(1, 1);
    const slope2 = new Slope(5, 1);
    const slope3 = new Slope(7, 1);
    const slope4 = new Slope(1, 2);

    const et1 = map.toboggan(position, slope1);
    map.reset();
    const et2 = map.toboggan(position, slope2);
    map.reset();
    const et3 = map.toboggan(position, slope3);
    map.reset();
    const et4 = map.toboggan(position, slope4);
    console.log(et1);
    console.log(et2);
    console.log(et3);
    console.log(et4);
    console.log('answer: ' + et * et1 * et2 * et3 * et4);
}

class Map {
    constructor (rawContent) {
        this.rawContent = rawContent;
        this.tree = '#';
        this.open = '.';
        this.treeMark = 'X';
        this.openMark = 'O';
        this.encounteredTrees = 0;

        this.initGrid();

        this.limits = {
            lx: this.grid[0].length,
            ly: this.grid.length
        }
    }

    mark (position) {
        const square = this.grid[position.y][position.x];

        if (square === this.tree) {
            this.grid[position.y][position.x] = this.treeMark;
            this.encounteredTrees++;
            return true;
        } else if (square === this.open) {
            this.grid[position.y][position.x] = this.openMark;
            return true;
        } else {
            return false;
        }
    }

    toboggan (position, slope) {
        let it = true;
        while (it === true) {
            position.move(this, slope);
            if (position.isAtBottom(this)) {
                this.mark(position);
                it = false;
            }
        }

        position.reset();
        return this.encounteredTrees;
    }

    toString () {
        let result = "";
        this.grid.forEach(item => {
            if (Array.isArray(item)) {
                result += item.join('');
                result += '\n';
            }
        });
        return result;
    }

    initGrid () {
        this.grid = [];
        let rowMap = this.rawContent.split('\n');

        rowMap.forEach(item => {
            if (item !== '') {
                this.grid.push(item.split(''));
            }
        })
    }

    reset () {
        this.encounteredTrees = 0;
        this.initGrid();
    }
}

class Position {
    constructor () {
        this.init();
    }

    move (map, slope) {
        map.mark(this);
        this.x = (this.x + slope.dx) % map.limits.lx;
        this.y = Math.min(this.y + slope.dy, map.limits.ly - 1);
    }

    isAtBottom (map) {
        return this.y === map.limits.ly - 1;
    }

    init () {
        this.x = 0;
        this.y = 0;
    }

    reset() {
        this.init();
    }
}

class Slope {
    constructor (dx, dy) {
        this.dx = dx;
        this.dy = dy;
    }
}

fa.readFile(fileName, trajectory);
