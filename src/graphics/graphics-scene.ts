
import * as THREE from 'three'
import { GraphicsObject } from './graphics-object.ts';
import { SimpleMouse } from '../utilities/simple-mouse.ts';

export class GraphicsScene {
    animationTime : number;
    scene : THREE.Scene;

    innerWidth : number = window.innerWidth; 
    innerHeight : number = window.innerHeight;

    clock : THREE.Clock;

    renderer : THREE.WebGLRenderer;

    camera : THREE.OrthographicCamera;

    mouse : SimpleMouse;

    canvas : HTMLCanvasElement;

    graphicsObjects : GraphicsObject[];

    constructor(canvas : HTMLCanvasElement) {
        this.animationTime = 100;
        this.scene = new THREE.Scene();
        this.canvas = canvas;
        this.clock = new THREE.Clock();
        this.mouse = new SimpleMouse();

        this.graphicsObjects = [];

        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
        this.camera = new THREE.OrthographicCamera(-this.innerWidth/2, this.innerWidth/2, this.innerHeight/2, -this.innerHeight/2, -1000, 1000 );

        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
        });
        
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.innerWidth, this.innerHeight);
        
        this.camera.position.setZ(30);
        this.camera.rotation.set(0,0,0);
        this.renderer.render(this.scene, this.camera);

        this.Animate(this);
    }

    Add(graphicsObject : GraphicsObject){
        this.graphicsObjects.push(graphicsObject);
        this.scene.add(graphicsObject.threeObject!);
    }
 
    private Animate(graphicsScene : GraphicsScene){
        const delta = this.clock.getDelta() * 5.0;
        this.animationTime += delta;

        if(this.innerWidth != window.innerWidth || this.innerHeight != window.innerHeight){
            this.UpdateWindowSize();
        }

        this.graphicsObjects.forEach(graphicsObject => {
            graphicsObject.Animate(this.animationTime, delta, this.mouse);
        });

        requestAnimationFrame(() => {this.Animate(graphicsScene);});
        this.renderer.render(this.scene, this.camera);
    }

    UpdateWindowSize(){
        
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;

        this.canvas.style.width = innerWidth.toString() + "px";
        this.canvas.style.height = innerHeight.toString() + "px";

        this.graphicsObjects.forEach(graphicsObject => {
            graphicsObject.UpdateWindowSize(this.innerWidth, this.innerHeight);
        });

        this.camera.left = -this.innerWidth/2;
        this.camera.right = this.innerWidth/2;
        this.camera.top = this.innerHeight/2;
        this.camera.bottom = -this.innerHeight/2;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.innerWidth, this.innerHeight);

        this.camera.updateProjectionMatrix();
        
    }

}