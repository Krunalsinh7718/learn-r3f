varying vec2 vUv;
uniform float uTime;

uniform vec3 uColorStart;
uniform vec3 uColorEnd;
uniform vec2 uResolution;

#include "../../../shaders-includes/perlinnoise3d.glsl"

float circleShape(vec2 st, float radius, vec2 center) {
    float strength = distance(center / radius, st / radius);
    strength = smoothstep(0.1, 0.66, strength);
    return strength;
}

void main() {   
      //1) waved edges 
    vec2 wavedUv = vec2(vUv.x + sin(vUv.y * 10.0) * 0.1, vUv.y + sin(vUv.x * 10.0) * 0.1);
    float strength1 = smoothstep(0.9, 0.1, circleShape(wavedUv, 2.3, vec2(0.5)));

        //2) dot pattern
    float aspect = uResolution.x / uResolution.y;

    float gridSize = 100.0;
    vec2 st = vUv * vec2(gridSize * aspect, gridSize);

    st = fract(st);

    vec2 p = st - 0.5;

    float d = distance(st, vec2(0.5));

    float radius = 0.5;

    float dot = step(radius - (strength1 * 0.2), d);

    float maskedPattern = mix(dot, 1.0, strength1);
    vec3 dotColor = mix(vec3(10.0), vec3(1.0), maskedPattern);

    vec3 color = dotColor;

    gl_FragColor = vec4(vec3(1.0,0.0,0.0),1.0);
     #include <colorspace_fragment>
}