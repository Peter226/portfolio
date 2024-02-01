
import { GraphicsScene } from './graphics/graphics-scene.ts'
import { PortraitObject } from './graphics/welcome/portrait-object.ts';
import { SpecsObject } from './graphics/welcome/specs-object.ts';

const canvas = document.querySelector<HTMLCanvasElement>('#background')! //find canvas
const graphicsScene = new GraphicsScene(canvas); //create graphics scene from canvas

new PortraitObject(graphicsScene);
new SpecsObject(graphicsScene);
