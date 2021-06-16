var backgroundShaderVert = "";
var backgroundShaderFrag = "";
var sumDeltaMS = 0.0;
var elapsedFrames = 0
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    backgroundShaderVert = this.responseText;
    getFrag();
  }
};
xmlhttp.open("GET", "shaders/background.vsh", true);
xmlhttp.send();

function getFrag(){
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    backgroundShaderFrag = this.responseText;
    initBackground();
  }
};
xmlhttp.open("GET", "shaders/background.fsh", true);
xmlhttp.send();
}

function initBackground(){


const bcg = document.getElementById("background");
const app = new PIXI.Application(
{
view: bcg,
 resizeTo: bcg
}
);
app.ticker.maxFPS = 60;

const geometry = new PIXI.Geometry()
    .addAttribute('aVPos', [-2, -2, 2, -2, 2, 2, -2, 2]).addIndex([0, 1, 2, 0, 2, 3]);

    geometry.instanced = true;
    geometry.instanceCount = 1000;

    const positionSize = 3;
    const colorSize = 3;
    const buffer = new PIXI.Buffer(new Float32Array(geometry.instanceCount * (positionSize + colorSize)));

    geometry.addAttribute('aIPos', buffer, positionSize, false, PIXI.TYPES.FLOAT, 4 * (positionSize + colorSize), 0, true);
    geometry.addAttribute('aICol', buffer, colorSize, false, PIXI.TYPES.FLOAT, 4 * (positionSize + colorSize), 4 * positionSize, true);

    for (let i = 0; i < geometry.instanceCount; i++)
    {
        const instanceOffset = i * (positionSize + colorSize);

        buffer.data[instanceOffset + 0] = (Math.random() - 0.5) * 6000;
        buffer.data[instanceOffset + 1] = (Math.random() - 0.5) * 4000;
        buffer.data[instanceOffset + 2] = Math.random() * 6.0;
        const col = (Math.random() + 10.0) * 0.01;

        buffer.data[instanceOffset + 3] = col * (15.0 / 255.0);
        buffer.data[instanceOffset + 4] = col * (95.0 / 255.0);
        buffer.data[instanceOffset + 5] = col * (219.0 / 255.0);
    }




    let renderTexture = PIXI.RenderTexture.create(window.innerWidth, window.innerHeight);
    let sprite = PIXI.Sprite.from("img/Brush.png");
    sprite.anchor.set(0.5);


    const uniforms = {
        time: 0.5,
        yaspect : 0.0,
        mouse: new PIXI.Point(),
        uSampler2: renderTexture
    };

const shader = PIXI.Shader.from(backgroundShaderVert, backgroundShaderFrag, uniforms);


const triangles = new PIXI.Mesh(geometry, shader);

triangles.position.set(0, 0);

app.stage.addChild(triangles);






let i = 0;
let xlast = app.renderer.plugins.interaction.mouse.global.x;
let ylast = app.renderer.plugins.interaction.mouse.global.y;

app.ticker.add(function(delta){

  i++;
  let xmous = app.renderer.plugins.interaction.mouse.global.x;
  let ymous = app.renderer.plugins.interaction.mouse.global.y;
  sprite.position.x = (xmous) - window.innerWidth * 0.0;
  sprite.position.y = (-ymous) + window.innerHeight * 1.0;
  let xdiff = xmous - xlast;
  let ydiff = ymous - ylast;
  let scale = Math.sqrt(xdiff * xdiff + ydiff * ydiff);
  scale = Math.min(50.0,scale);
  sprite.scale.x = window.innerWidth * 0.0005;
  sprite.scale.y = window.innerWidth * 0.0005;
  xlast = xmous;
  ylast = ymous;
//  app.renderer.render(sprite, renderTexture, false);
    //triangles.rotation += 0.01;
    triangles.shader.uniforms.time+=delta * 1.2;
    var mpos = new PIXI.Point();
    mpos.copyFrom(app.renderer.plugins.interaction.mouse.global);
    mpos.x = (mpos.x / window.innerWidth - 0.5) * 4.0;
    mpos.y = -(mpos.y / window.innerHeight - 0.5) * 4.0;

    if(mpos.x < -3 || mpos.x > 3 || mpos.y< -3 || mpos.y > 3){
      mpos.x = 0;
      mpos.y = 0;
    }


    triangles.shader.uniforms.yaspect = window.innerWidth / window.innerHeight;
    triangles.shader.uniforms.mouse.copyFrom(mpos);



    sumDeltaMS += app.ticker.deltaMS;
    elapsedFrames++;
    if(sumDeltaMS / elapsedFrames > 24 && sumDeltaMS > 1000){
      console.warn("low performance detected (hardware acceleration is probably turned off), shutting down pixi");
      app.ticker.stop();
      app.stage.destroy(true);
      app.ticker.destroy(true);
      app.destroy(true);
    }


});
}
