import * as THREE from 'three';
import { BlendFunction, Effect } from "postprocessing";
import { Uniform } from "three";

const fragmentShader = /* glsl */`
    uniform float frequency;
    uniform float amplitude;
    uniform float time;
    uniform float gridSize;
    uniform float dotRadius;
    uniform vec3 color1;
    uniform vec3 color2;
    uniform vec2 uResolution;


     void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor){   
        
         //2) wave frame pattern 
        vec2 newUv1 = vec2(
            uv.x,
            uv.y + sin(uv.x * frequency + time) * amplitude
        );

        float strenth = smoothstep(0.3, 0.51, 1.0 - distance(newUv1, vec2(0.5))) ;
        vec4 patternColor = vec4(vec3(strenth) , 1.0);

        //3) dot pattern
        float aspect = uResolution.x / uResolution.y;

        vec2 st = uv * vec2(gridSize * aspect, gridSize);

        st = fract(st);

        vec2 p = st - 0.5;

        float d = distance(st, vec2(0.5));

        // float radius = 0.21;

        float dot = 1.0 - step(dotRadius - (strenth * 0.5), d);
        vec3 dotColorMix = mix(color1, color2, strenth);
        vec3 dotColorMixFinal = dotColorMix * dot;

        //3) color mix between input and pattern
        // vec4 color = mix(patternColor1, inputColor,  patternColor.b );
        

        outputColor =  vec4(
            inputColor.rgb + dotColorMixFinal,
            inputColor.a
        );
    }


`

export default class CornerPatternEffect extends Effect {
    constructor({
        frequency,
        amplitude,
        blendFunction = BlendFunction.DARKEN,
        color1 = 'red',
        color2 = 'yellow',
        gridSize,
        dotRadius
    }) {


        super(
            'CornerPatternEffect',
            fragmentShader,
            {
                blendFunction: blendFunction,
                uniforms: new Map([
                    ['color1', new Uniform(new THREE.Color(color1))],
                    ['color2', new Uniform(new THREE.Color(color2))],
                    ['frequency', new Uniform(frequency)],
                    ['amplitude', new Uniform(amplitude)],
                    ['gridSize', new Uniform(gridSize)],
                    ['dotRadius', new Uniform(dotRadius)],
                    ['time', new Uniform(0)],
                    ['uResolution', new Uniform(new THREE.Vector2(
                        window.innerWidth * Math.min(window.devicePixelRatio, 2),
                        window.innerHeight * Math.min(window.devicePixelRatio, 2)
                    ))],
                ])
            }
        )

        window.addEventListener('resize', () => {
           
            this.uniforms
                .get("uResolution")
                .value
                .set(window.innerWidth * Math.min(window.devicePixelRatio, 2),
                    window.innerHeight * Math.min(window.devicePixelRatio, 2)
                );
        })

    }
    update(renderer, inputBuffer, deltaTime) {

        this.uniforms.get('time').value += deltaTime;


    }
}


