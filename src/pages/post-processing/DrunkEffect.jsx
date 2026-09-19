import { BlendFunction, Effect } from "postprocessing";
import { Uniform } from "three";
import perlinNoice from "../../shaders-includes/perlinnoise3d.glsl"


const fragmentShader = /* glsl */`
    uniform float frequency;
    uniform float amplitude;
    uniform float time;

    ${perlinNoice}

    float circleShape(vec2 st, float radius, vec2 center){
        float strenth = distance(center, st);
        strenth = step(radius * 0.5, strenth);
        return strenth;
    }

    float circle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0);
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
    {   vec4 color = inputColor;
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


      
    vec2 st1 = uv;
    st1 *= 100.0;
    
    st1 = fract(st1);

	//color.rgb *=  vec3(circle(st1, st1.y * st1.x  ));

    color.rgb *= step(0.2,vec3(length( (st1-0.5)  / 2.0)));
        
        outputColor = color;
    }


`

export default class DrunkEffect extends Effect {
    constructor({ frequency, amplitude, blendFunction = BlendFunction.DARKEN }) {
        super(
            'DrunkEffect',
            fragmentShader,
            {
                blendFunction: blendFunction,
                uniforms: new Map([
                    ['frequency', new Uniform(frequency)],
                    ['amplitude', new Uniform(amplitude)],
                    ['time', new Uniform(0)]
                ])
            }
        )
    }
    update(renderer, inputBuffer, deltaTime) {

        this.uniforms.get('time').value += deltaTime;
    }
}


