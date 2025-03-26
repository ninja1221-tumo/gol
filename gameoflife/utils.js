let matrix = [
    [0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

function getRandommatrix(hoehe, breite) {
    let square = [];
    for (let y = 0; y < breite; y++) {
        square[y] = [];  // or square.push([])
        for (let x = 0; x < hoehe; x++) {
            square[y][x] = Math.floor(random(0, 5))
        }
    }
    return square
}

function createmoreCreatures() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[0].length; x++) {
            if (x == y && x % 2 == 0) {
                matrix[y][x] = 2;
            }
            if (x == y && x % 2 != 0) {
                matrix[y][x] = 3;
            }
            if (y == x - y && x % 4 == 2) {
                matrix[y][x] = 5;
            }
            if (y != x - y && y % 4 == 2) {
                matrix[y][x] = 4
            }
        }

    }
}

/**
 * Returns random element of an Array
 * @param {Array<any>} matrix 
 * @returns 
 */
function randomElement(matrix)
{
    if(matrix.length == 0) {
        return [];
    };
    let x = Math.floor(Math.random() * matrix.length);
    return matrix[x];
}