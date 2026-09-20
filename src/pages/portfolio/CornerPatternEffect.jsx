import * as THREE from 'three';
import { BlendFunction, Effect } from "postprocessing";
import { Uniform } from "three";
import perlinNoice from "../../shaders-includes/perlinnoise3d.glsl"


const fragmentShader = /* glsl */`
    uniform float frequency;
    uniform float amplitude;
    uniform float time;
    uniform vec2 uResolution;

    ${perlinNoice}

    float circleShape(vec2 st, float radius, vec2 center){
        float strenth = distance(center / radius, st / radius );
        strenth = smoothstep(0.1,  0.66, strenth);
        return strenth;
    }

    float circleShape1(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0);
}

float circleShape2(vec2 st, float radius, vec2 center)
{
    float dist = distance(center, st);

    return dist / radius;
}
    float circleStripe(vec2 st, float multipler, vec2 center, float adjuct){
        return fract( (distance(center, st ) - adjuct) * multipler) ;
    }
    
    void mainUv(inout vec2 uv)
    {
        // uv.y += sin(uv.x * frequency + time) * amplitude;
    }

    // void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
    // {   vec4 color = inputColor;
    //     color.rgb *= vec3(0.8, 1.0, 0.5);;
        
    //      outputColor = vec4(0.8, 1.0, 0.5, inputColor.a);
    // }

    //  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
    // {   vec4 color = inputColor;
    //     float dist = 1.0 - distance(vec2(0.5), uv) * 2.0 ;
    //     color.rgb += dist;
    //     // color.rgb *= vec3(0.8, 1.0, 0.5);
        
    //     //  outputColor = vec4(0.8, 1.0, 0.5, 1.0 - dist);
    //      outputColor = color;
    // }

     void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)

    {   
        
        vec4 color1 = inputColor;

        vec4 color = inputColor;
        //displace uv
        vec2 displacedUV = uv + perlinClass3D(vec3(uv * 1.1 ,0.1 ));

        //perlin noise
        float strength = perlinClass3D(vec3(displacedUV * 1.1 ,0.1 ));

        //outer glow
        float dist = 1.0 - (distance(uv, vec2(0.5)) * 4.0 - 1.0);

        strength += dist;
        strength += step(-0.2, strength) * 0.8;

        //cleanup value
        strength = clamp(strength, 0.0, 1.0);

        // color.rgb *= 1.0 - strength;




      

        //1) waved edges 
        vec2 wavedUv = vec2(
            uv.x + sin(uv.y * 10.0) * 0.1,
            uv.y + sin(uv.x * 10.0) * 0.1
        ) ;
    float strength1 =  smoothstep(0.9, 0.1, circleShape( wavedUv , 2.3, vec2(0.5))) ;
    


        //2) dot pattern
      float aspect = uResolution.x / uResolution.y;

        float gridSize = 100.0;
        vec2 st = uv * vec2(
            gridSize * aspect,
            gridSize
        );
        
        st = fract(st);

        vec2 p = st - 0.5;

        float d = distance(st, vec2(0.5));

        float radius = 0.5;

        float dot =  step(
            radius - (strength1 * 0.2),
            d
        );
        
        float maskedPattern = mix(dot, 1.0, strength1);
        vec3 dotColor = mix(vec3(10.0) , vec3(1.0), maskedPattern);

        color.rgb *= dotColor;

        outputColor = color;
    }


`

export default class CornerPatternEffect extends Effect {
    constructor({ frequency, amplitude, blendFunction = BlendFunction.DARKEN }) {
        super(
            'CornerPatternEffect',
            fragmentShader,
            {
                blendFunction: blendFunction,
                uniforms: new Map([
                    ['frequency', new Uniform(frequency)],
                    ['amplitude', new Uniform(amplitude)],
                    ['time', new Uniform(0)],
                    ['uResolution', new Uniform(new THREE.Vector2(
                        window.innerWidth * Math.min(window.devicePixelRatio, 2),
                        window.innerHeight * Math.min(window.devicePixelRatio, 2)
                    ))],
                ])
            }
        )

        window.addEventListener('resize', () => {
            this.uniforms.get('uResolution').value = {
                x: window.innerWidth * Math.min(window.devicePixelRatio, 2),
                y: window.innerHeight * Math.min(window.devicePixelRatio, 2)
            }
        })

    }
    update(renderer, inputBuffer, deltaTime) {

        this.uniforms.get('time').value += deltaTime;


    }
}


