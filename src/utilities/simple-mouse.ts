

export class SimpleMouse {
    private _x:number = 0;
    private _y:number = 0;

    get x () {
        return this._x;
    }
    private set x (value) {
        this._x = value;
    }
    get y () {
        return this._y;
    }
    private set y (value) {
        this._y = value;
    }

    constructor(){
        addEventListener("mousemove", (event) => {
            this.x = (event.clientX - window.innerWidth * 0.5);
            this.y = - (event.clientY - window.innerHeight * 0.5);
          })
    }
}