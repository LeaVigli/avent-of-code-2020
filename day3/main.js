fa = require('../tools/file-access');

const fileName = 'day3/trees.txt';

const trajectory = (error, data) => {
    if (error) {
        return console.log(error);
    }

    let map = new Map(data);
    let position = new Position();
    const slope = new Slope(3, 1);

    // Toboggan path
    const encounteredTrees = map.toboggan(position, slope);

    // resulting grid
    console.log(map.toString());
    console.log(encounteredTrees);
}

class Map {
    constructor (rawContent) {
        this.rawContent = rawContent;
        this.tree = '#';
        this.open = '.';
        this.treeMark = 'X';
        this.openMark = 'O';
        this.encounteredTrees = 0;
        this.grid = [];

        let rowMap = this.rawContent.split('\n');

        rowMap.forEach(item => {
            if (item !== '') {
                this.grid.push(item.split(''));
            }
        })

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
}

class Position {
    constructor () {
        this.x = 0;
        this.y = 0;
    }

    move (map, slope) {
        map.mark(this);
        this.x = (this.x + slope.dx) % map.limits.lx;
        this.y = Math.min(this.y + slope.dy, map.limits.ly - 1);
    }

    isAtBottom (map) {
        return this.y === map.limits.ly - 1;
    }

}

class Slope {
    constructor (dx, dy) {
        this.dx = dx;
        this.dy = dy;
    }
}

fa.readFile(fileName, trajectory);
