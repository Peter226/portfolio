export default /* glsl */`
precision mediump float;

attribute vec3 position;
attribute vec2 uv;
attribute vec2 uv1;
attribute vec4 color;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

uniform vec2 cursorPosition;
uniform float cursorSize;

varying vec2 texCoord;
varying vec2 screenCoord;
varying float proximity;


uniform float time;
        uniform vec2 resolution;
        void main()	{
            texCoord = uv;


            vec4 _center = modelViewMatrix * vec4(0.0,0.0,0.0, 1.0);
            vec4 _position = modelViewMatrix * vec4(position, 1.0);
            screenCoord = _position.xy;
            vec4 _faceCenter = modelViewMatrix * vec4(uv1, 0.0, 1.0);
            //_position += vec4(normalize(sin(cursorPosition + time) * 1000.0 - _position.xy),0,0) * 100.1;
            vec4 _newFaceCenter = _faceCenter;

            float noiseInfluence = clamp(distance(_center.xy, _newFaceCenter.xy) * 0.005 - 0.2,0.0,1.0);
            noiseInfluence *= noiseInfluence * noiseInfluence * noiseInfluence * noiseInfluence;
            _newFaceCenter.x += sin(_faceCenter.y + time) * 4.0 * noiseInfluence;
            _newFaceCenter.y += cos(_faceCenter.x + time) * 4.0 * noiseInfluence;
            float _spreadInfluence = sin(time * 0.4 + 0.7 + (-_faceCenter.x + _faceCenter.y) * 0.01) + 1.0;
            _newFaceCenter += vec4(normalize(_newFaceCenter.xy - _center.xy),0,0) * noiseInfluence * 30.0 * _spreadInfluence;

            float influence = clamp(1.0 / distance(cursorPosition, _newFaceCenter.xy) * cursorSize - 1.0,0.0,1.0);
            _newFaceCenter += vec4(-normalize(cursorPosition - _newFaceCenter.xy),0,0) * influence * 10.0 * color.r;
            _newFaceCenter += vec4(normalize(_newFaceCenter.xy - _center.xy),0,0) * influence * 20.0 * color.r;
            proximity = influence;
            
            

            _position += _newFaceCenter - _faceCenter;

            //_position.xy += cursorPosition;

            //_position.y += sin(_position.x);
            gl_Position = projectionMatrix * _position;
        }
        `;