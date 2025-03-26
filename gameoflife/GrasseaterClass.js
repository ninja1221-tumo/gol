class Grasseater extends Animal {
    static staticList = [];
    constructor(x, y) {
        super(x, y, 2, 5, 5);
    }
    multiply() {
        super.multiply(Grasseater);
    }
    die() {
        super.die(Grasseater);
    }
    eat() {
        super.eat([1],[Grass]);
    }

}