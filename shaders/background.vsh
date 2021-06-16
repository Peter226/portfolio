


precision mediump float;
attribute vec2 aVPos;
attribute vec3 aIPos;
attribute vec3 aICol;
uniform float time;
uniform vec2 mouse;
uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;
uniform float yaspect;

varying vec3 vCol;
varying float vRan;
varying float vDist;
varying vec2 vPos;
void main() {
    vCol = aICol;
    vRan = aIPos.z;

    vec2 movdir = vec2(cos(aIPos.z) - sin(aIPos.z), cos(aIPos.z) + sin(aIPos.z));
    float tim = time * 0.5;
    vec2 timepos = movdir * tim + aIPos.xy;

    vec4 newpos = vec4((projectionMatrix * translationMatrix * vec3(timepos, 1.0)).xy, 0.0, 1.0);


    float slowtime = time * 0.01 * aIPos.z;

    vec2 rotpos = vec2(cos(slowtime) * aVPos.x - sin(slowtime) * aVPos.y, cos(slowtime) * aVPos.y + sin(slowtime) * aVPos.x);



    vec4 ownpos = vec4((projectionMatrix * translationMatrix * vec3(rotpos * abs(sin(time * 0.003 * vRan)) * 1.5,0.0)).xy, 0.0, 1.0);





    newpos.xy = newpos.xy - floor((newpos.xy + 2.0) / 4.0) * 4.0;


    vec2 difpos = mouse - (newpos).xy;
    difpos.y /= yaspect;
    vDist = length(difpos);
    float len = length(difpos);

    //displace sphere
    vec2 dispp = (newpos.xy - mouse) * max(0.0,1.0 - len * 2.5);
    vec4 outp = newpos + vec4(dispp,0.0,0.0);


   /*vec2 orbitcentered = newpos.xy - mouse;
    orbitcentered.y /= yaspect;
    float maxrot = min(0.01,0.1 / len);
    maxrot *= time;
    orbitcentered = vec2(cos(maxrot) * orbitcentered.x - sin(maxrot) * orbitcentered.y, cos(maxrot) * orbitcentered.y + sin(maxrot) * orbitcentered.x);
    orbitcentered.y *= yaspect;
    orbitcentered += mouse;

    vec4 forbit = vec4(orbitcentered,newpos.z,newpos.w);
    vec4 outp = newpos;
    outp.xy += (orbitcentered - newpos.xy) / len * 0.1;*/
  vPos = (outp + ownpos).xy;
    //outp.xy = newpos.xy * len + outp.xy * (1.0 - len);

    gl_Position = outp + ownpos;


}
