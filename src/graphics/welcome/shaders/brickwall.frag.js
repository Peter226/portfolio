export default /* glsl */`
precision mediump float;

uniform sampler2D colorTexture;
uniform sampler2D glowTexture;
uniform sampler2D noiseTexture;
varying vec2 texCoord;
varying vec2 screenCoord;
varying float proximity;
uniform float time;

        void main()	{
            vec4 textureColor = texture2D(colorTexture, texCoord);
            vec4 textureGlow = texture2D(glowTexture, texCoord);
            vec4 textureNoiseDisp = texture2D(noiseTexture, screenCoord * 0.004 + time * 0.01);
            vec4 textureNoise = texture2D(noiseTexture, screenCoord * 0.001 + time * 0.015 + textureNoiseDisp.xy * 0.1);
            //textureColor.xyz = pow(textureColor.xyz + vec3(0.1,0.05,0.03), vec3(1.1,1.1,1.1));
            textureColor.xyz = pow(textureColor.xyz * 1.2, vec3(1.2,1.2,1.2));
            gl_FragColor = textureColor + vec4(0.1,0.6,1,0) * proximity * 1.0 * (1.0 + textureColor) * textureGlow.r * max(textureNoise.r * 1.3, textureGlow.g);
            
            //gl_FragColor = vec4(1.0,1.0,1.0,1.0) * textureNoise.r;
            // * sin(time);
        }
`;