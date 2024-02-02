import * as THREE from 'three'
import { SimpleMouse } from '../utilities/simple-mouse.ts';

export abstract class GraphicsObject {

    private _threeObject? : THREE.Object3D;

    get threeObject(){
        return this._threeObject;
    }

    protected set threeObject(value){
        this._threeObject = value;
    }

    constructor(){
        
    }

    abstract Animate(animationTime : number, animationDelta : number, mouse : SimpleMouse) : void;
    abstract UpdateWindowSize(newWidth : number, newHeight : number) : void;
}