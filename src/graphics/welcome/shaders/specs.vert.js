export default /* glsl */`


precision mediump float;
attribute vec3 position;
attribute vec2 uv;
attribute vec3 offset;
attribute vec3 color;
uniform float time;
uniform vec2 cursorPosition;
uniform float cursorSize;
uniform vec2 screenSize;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 texCoord;
varying vec3 vCol;
varying float vRan;
varying float vDist;
varying vec2 vPos;
void main() {
    vCol = color;
    vRan = offset.z; //random value
    texCoord = uv;
    vec2 movdir = vec2(cos(offset.z) - sin(offset.z), cos(offset.z) + sin(offset.z)); //random move direction

    vec2 timepos = movdir * time + offset.xy; //moved position
    vec2 clampedPos = timepos - floor((timepos + screenSize * 0.5) / screenSize) * screenSize; //clamped to screen

    vec2 difpos = cursorPosition - clampedPos;
    float len = length(difpos);
    vDist = len / cursorSize;

    //displace sphere
    float dispAmount = max(0.0,1.0 - len / cursorSize);
    vec2 displacement = (clampedPos - cursorPosition) * dispAmount; //displace amount
    vec2 displacedPosition = clampedPos + displacement; //displaced position

    float slowtime = time * 0.01 * offset.z; // slowed time
    vec2 rotLocalpos = vec2(cos(slowtime) * position.x - sin(slowtime) * position.y, cos(slowtime) * position.y + sin(slowtime) * position.x); //rotated animated local position
    vec2 scaledLocalPos = rotLocalpos * abs(sin(time * 0.003 * vRan)); // scale animated
    vec2 modelPos = scaledLocalPos + displacedPosition; //vertex local + instance position
    vec4 finalPos = projectionMatrix * modelViewMatrix * vec4(modelPos, 0.0, 1.0); //to screen space


    

  

    


   /*vec2 orbitcentered = newpos.xy - cursorPosition;
    orbitcentered.y /= yaspect;
    float maxrot = min(0.01,0.1 / len);
    maxrot *= time;
    orbitcentered = vec2(cos(maxrot) * orbitcentered.x - sin(maxrot) * orbitcentered.y, cos(maxrot) * orbitcentered.y + sin(maxrot) * orbitcentered.x);
    orbitcentered.y *= yaspect;
    orbitcentered += cursorPosition;

    vec4 forbit = vec4(orbitcentered,newpos.z,newpos.w);
    vec4 outp = newpos;
    outp.xy += (orbitcentered - newpos.xy) / len * 0.1;*/
    
    //outp.xy = newpos.xy * len + outp.xy * (1.0 - len);


    vPos = finalPos.xy;
    gl_Position = finalPos;
}
`