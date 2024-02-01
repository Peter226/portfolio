export default /* glsl */`

precision mediump float;
uniform float time;
varying vec3 vCol;
varying vec2 vPos;
varying float vRan;
varying float vDist;
varying vec2 texCoord;
uniform sampler2D specTexture;

uniform sampler2D uSampler2;


void main() {
    //gl_FragColor = vec4(vCol * (sin(time * 0.003 * vRan + vRan) + 1.0) / vDist * (0.5 + min(1.0,max(max(0.0,1.0 - vDist),0.2))) * 2.5, 1.0) * texture2D(uSampler2, (vPos + 2.0) * 0.25);
    
    //gl_FragColor = vec4(1.0-mpos.x,0.1,0.1,1.0);

    //THIS
    vec4 spec = texture2D(specTexture, texCoord);
    float intensity = (sin(time * 0.003 * vRan + vRan) + 1.0) / vDist * (1.0 + min(1.0,max(max(0.0,1.0 - vDist),0.2))) * 2.5;
    float intensityPow = intensity * 0.5;
    vec4 calculatedColor = vec4(vCol * intensityPow,1.0);
    gl_FragColor = clamp(calculatedColor,0.0,3.0) * spec;
    //gl_FragColor = vec4(0.1,0.6,1,1.0);
}
`
