
/**
 * Returns random element of an Array
 * @param {Array<any>} matrix 
 * @returns 
 */
export function randomElement(matrix)
{
    if(matrix.length == 0) {
        return [];
    };
    let x = Math.floor(Math.random() * matrix.length);
    return matrix[x];
}