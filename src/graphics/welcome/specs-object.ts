import { GraphicsObject } from "../graphics-object.ts";
import * as THREE from 'three'
import specsVert from './shaders/specs.vert'
import specsFrag from './shaders/specs.frag'
import specsTexture from '/models/spec.png'
import { SimpleMouse } from "../../utilities/simple-mouse.ts";
import { GraphicsScene } from "../graphics-scene.ts";

export class SpecsObject extends GraphicsObject {

    material : THREE.RawShaderMaterial;

    constructor(scene : GraphicsScene){
        super();

        const innerWidth = window.innerWidth;
        const innerHeight = window.innerHeight;

        const instanceCount = 1000;
        const positionSize = 3;
        const uvSize = 2;
        const offsetSize = 3;
        const colorSize = 3;
        const positionsAttributes = [];
        const uvAttributes = [];
        const indexes = [];
        const offsetsAttributes = new Float32Array(offsetSize * instanceCount);
        const colorsAttributes = new Float32Array(colorSize * instanceCount);

        const specSize = 2.5;
        positionsAttributes.push( -specSize, -specSize, 0 );
        positionsAttributes.push( specSize, -specSize, 0 );
        positionsAttributes.push( -specSize, specSize, 0 );
        positionsAttributes.push( specSize, specSize, 0 );

        uvAttributes.push( 0, 0 );
        uvAttributes.push( 1, 0 );
        uvAttributes.push( 0, 1 );
        uvAttributes.push( 1, 1 );

        indexes.push(0);
        indexes.push(1);
        indexes.push(2);
        indexes.push(1);
        indexes.push(3);
        indexes.push(2);

        for (let i = 0; i < instanceCount; i++)
        {
            const colorOffset = i * (colorSize);
            const offsetOffset = i * (offsetSize);

            offsetsAttributes[offsetOffset + 0] = (Math.random() - 0.5) * 6000;
            offsetsAttributes[offsetOffset + 1] = (Math.random() - 0.5) * 4000;
            offsetsAttributes[offsetOffset + 2] = Math.random() * 6.0;
            const col = (Math.random() + 10.0) * 0.09;

            colorsAttributes[colorOffset + 0] = col * 0.1;
            colorsAttributes[colorOffset + 1] = col * 0.6;
            colorsAttributes[colorOffset + 2] = col * 1;
        }


        const specs = new THREE.InstancedBufferGeometry();


        specs.index = new THREE.Uint32BufferAttribute(indexes, 1);

        specs.instanceCount = instanceCount;
        specs.setAttribute( 'position', new THREE.Float32BufferAttribute( positionsAttributes, positionSize ) );
        specs.setAttribute( 'uv', new THREE.Float32BufferAttribute( uvAttributes, uvSize ) );
        specs.setAttribute( 'offset', new THREE.InstancedBufferAttribute( new Float32Array( offsetsAttributes ), offsetSize ) );
        specs.setAttribute( 'color', new THREE.InstancedBufferAttribute( new Float32Array( colorsAttributes ), colorSize ) );

        this.material = new THREE.RawShaderMaterial({
        uniforms: {
                time: { value: 1.0 },
            mouse: { value: new THREE.Vector2(1.0,1.0) },
            cursorSize: { value: Math.min(innerWidth, innerHeight) * 0.3 },
            screenSize: { value: new THREE.Vector2(innerWidth, innerHeight) },
            specTexture: { value: new THREE.TextureLoader().load(specsTexture) },
            },
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        vertexShader: specsVert,
        fragmentShader: specsFrag,
        });


        const specsMesh = new THREE.Mesh( specs, this.material );

        this.threeObject = specsMesh;

        scene.Add(this);
    }


    Animate(animationTime: number, _animationDelta : number, mouse : SimpleMouse): void {
        this.material.uniforms.time = { value: animationTime * 2.0 }
        this.material.uniforms.cursorPosition = { value: new THREE.Vector2(mouse.x, mouse.y) }
    }

    UpdateWindowSize(newWidth: number, newHeight: number): void {
        this.material.uniforms.cursorSize = { value: Math.min(newWidth, newHeight) * 0.3 };
        this.material.uniforms.screenSize = { value: new THREE.Vector2(newWidth, newHeight) };
    }
}