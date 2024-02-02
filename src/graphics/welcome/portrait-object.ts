import { GraphicsObject } from "../graphics-object.ts";
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import * as THREE from 'three'

import brickwallVert from './shaders/brickwall.vert'
import brickwallFrag from './shaders/brickwall.frag'
import profilePic from '/models/brickwall_low_masked.png'
import profilePicGlow from '/models/brickwall_low_glow.png'
import noiseTexture from '/models/noise.png'
import { SimpleMouse } from "../../utilities/simple-mouse.ts";
import { GraphicsScene } from "../graphics-scene.ts";

export class PortraitObject extends GraphicsObject {

    material : THREE.RawShaderMaterial;

    pfpModelPosition : THREE.Vector3;
    pfpModelScale : number;
    portf! : THREE.Object3D;

    anchor : HTMLDivElement;

    cursorSizeMultiplier : number = 0.3;
    cursorSize : number;

    innerWidth : number;
    innerHeight : number;

    powerLevel : number;
    powerLevelVelocity : number;


    constructor(scene : GraphicsScene){

        super();
        this.powerLevel = 0;
        this.powerLevelVelocity = 0;

        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;

        
        this.anchor = document.querySelector<HTMLDivElement>('#portrait-anchor')!
        

        const loadedNoiseTexture = new THREE.TextureLoader().load(noiseTexture)
        loadedNoiseTexture.wrapS = THREE.RepeatWrapping;
        loadedNoiseTexture.wrapT = THREE.RepeatWrapping;

        this.cursorSize = Math.min(this.innerWidth, this.innerHeight) * this.cursorSizeMultiplier;

        this.material = new THREE.RawShaderMaterial({
            uniforms: {
                time: { value: 1.0 },
                resolution: { value: new THREE.Vector2() },
                colorTexture: {value: new THREE.TextureLoader().load(profilePic)},
                glowTexture: {value: new THREE.TextureLoader().load(profilePicGlow)},
                noiseTexture: {value: loadedNoiseTexture},
                cursorSize: { value: this.cursorSize },
                powerLevel: { value: this.powerLevel },
            },
            blending: THREE.NormalBlending,
            depthTest: false,
            transparent: true,
            vertexShader: brickwallVert,
            fragmentShader: brickwallFrag
        });

        const rect = this.anchor.getBoundingClientRect();
        this.pfpModelScale = Math.min(this.innerHeight, this.innerWidth) * 0.0036;
        this.pfpModelPosition = new THREE.Vector3(-this.innerWidth * 0.5 + rect.left, -this.innerHeight * 0.5 + (this.innerHeight - rect.y), 0);


        const loader = new FBXLoader();
        loader.load( './models/portfolio_brickwall.fbx',  ( object ) => {
            this.portf = object;
            
            this.portf.rotation.set(0,0,0);
            this.portf.rotateX(Math.PI / 2);
            this.Reposition();
            this.threeObject = this.portf;
            
            object.traverse((child) => {
                if(child instanceof THREE.Mesh){
                child.material = this.material;
                }
            });
            scene.Add(this);



            addEventListener("scroll", () => {this.OnScroll()});
        });

    }


    private Reposition(){
        const rect = this.anchor.getBoundingClientRect();
        this.pfpModelScale = Math.min(this.innerHeight, this.innerWidth) * 0.0036;
        this.pfpModelPosition = new THREE.Vector3(-this.innerWidth * 0.5 + rect.left, -this.innerHeight * 0.5 + (this.innerHeight - rect.y), 0);
        this.portf.position.set(this.pfpModelPosition.x,this.pfpModelPosition.y,this.pfpModelPosition.z);
        this.portf.scale.set(this.pfpModelScale,this.pfpModelScale,this.pfpModelScale);
    }

    Animate(animationTime: number, animationDelta : number, mouse : SimpleMouse): void {

        const mouseVector = new THREE.Vector2(mouse.x, mouse.y);
        this.material.uniforms.time = { value: animationTime }
        this.material.uniforms.cursorPosition = { value: mouseVector }

        const velocityMultiplier = 5.0;
        const dampenMultiplier = 4.0;
        const unpowerMultiplier = 1.0;
        const powerLevelTarget = 1.0;
        const controlledAnimationDelta = Math.min(0.5, animationDelta);
        if(mouseVector.distanceTo(new THREE.Vector2(this.pfpModelPosition.x, this.pfpModelPosition.y)) < this.cursorSize * 0.5){
            
            this.powerLevelVelocity += (powerLevelTarget - this.powerLevel) * controlledAnimationDelta * velocityMultiplier;
        }else{
            this.powerLevel -= this.powerLevel * controlledAnimationDelta * unpowerMultiplier;
            this.powerLevelVelocity -= this.powerLevelVelocity * controlledAnimationDelta * unpowerMultiplier;
        }

        this.powerLevel += this.powerLevelVelocity * controlledAnimationDelta * velocityMultiplier;
        this.powerLevelVelocity -= this.powerLevelVelocity * controlledAnimationDelta * dampenMultiplier;

        this.material.uniforms.powerLevel = { value: this.powerLevel };
    }

    private OnScroll(){
        this.Reposition();
    }


    UpdateWindowSize(newWidth: number, newHeight: number): void {
        this.innerWidth = newWidth;
        this.innerHeight = newHeight;
        this.cursorSize = Math.min(this.innerWidth, this.innerHeight) * this.cursorSizeMultiplier;
        if(this.portf != null){
            this.Reposition();
            this.material.uniforms.cursorSize = { value: this.cursorSize };
        }
    }
}