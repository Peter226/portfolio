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

    constructor(scene : GraphicsScene){

        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;

        super();
        this.anchor = document.querySelector<HTMLDivElement>('#portrait-anchor')!
        

        const loadedNoiseTexture = new THREE.TextureLoader().load(noiseTexture)
        loadedNoiseTexture.wrapS = THREE.RepeatWrapping;
        loadedNoiseTexture.wrapT = THREE.RepeatWrapping;

        this.material = new THREE.RawShaderMaterial({
            uniforms: {
                    time: { value: 1.0 },
                    resolution: { value: new THREE.Vector2() },
                colorTexture: {value: new THREE.TextureLoader().load(profilePic)},
                glowTexture: {value: new THREE.TextureLoader().load(profilePicGlow)},
                noiseTexture: {value: loadedNoiseTexture},
                cursorSize: { value: Math.min(innerWidth, innerHeight) * 0.3 },
                },
            blending: THREE.NormalBlending,
            depthTest: false,
            transparent: true,
            vertexShader: brickwallVert,
            fragmentShader: brickwallFrag
        });

        const rect = this.anchor.getBoundingClientRect();
        this.pfpModelScale = Math.min(innerHeight, innerWidth) * 0.0036;
        this.pfpModelPosition = new THREE.Vector3(-innerWidth * 0.5 + rect.left, -innerHeight * 0.5 + (innerHeight - rect.y), 0);


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
        this.pfpModelScale = Math.min(innerHeight, innerWidth) * 0.0036;
        this.pfpModelPosition = new THREE.Vector3(-innerWidth * 0.5 + rect.left, -innerHeight * 0.5 + (innerHeight - rect.y), 0);
        this.portf.position.set(this.pfpModelPosition.x,this.pfpModelPosition.y,this.pfpModelPosition.z);
        this.portf.scale.set(this.pfpModelScale,this.pfpModelScale,this.pfpModelScale);
    }

    Animate(animationTime: number, mouse : SimpleMouse): void {
        this.material.uniforms.time = { value: animationTime }
        this.material.uniforms.cursorPosition = { value: new THREE.Vector2(mouse.x, mouse.y) }
    }

    private OnScroll(){
        this.Reposition();
    }


    UpdateWindowSize(newWidth: number, newHeight: number): void {
        if(this.portf != null){
            this.Reposition();
            this.material.uniforms.cursorSize = { value: Math.min(newWidth, newHeight) * 0.3 };
        }
    }
}