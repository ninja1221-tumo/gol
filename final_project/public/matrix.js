export let matrix = getRandomMatrix(40, 40);

export function getRandomMatrix(hoehe, breite) {
    let anzahlGenerierterKreaturen = 5;
    
    let square = [];
    for (let y = 0; y < breite; y++) {
        square[y] = [];  // or square.push([])
        for (let x = 0; x < hoehe; x++) {
            square[y][x] = Math.floor(Math.random(0, anzahlGenerierterKreaturen))
        }
    }
    return square
}

export function createmoreCreatures() {
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
};