varying vec2 vUv;

uniform float uTime;

uniform vec3 uColorStart;
uniform vec3 uColorEnd;

void main()
{
    vec2 uv = vUv;

    // Animate grid
    uv.x += uTime * 0.01;

    // Create grid cells
    vec2 pattern = fract(uv * 30.0 );

    float frame = 0.02;

    float x1 = step(frame, pattern.x);
    float y1 = step(frame, pattern.y);

    float x2 = step(frame, 1.0 - pattern.x);
    float y2 = step(frame, 1.0 - pattern.y);

    float grid = 1.0 - (x1 * x2 * y1 * y2);

    // --------------------------------
    // Outer fade
    // --------------------------------

    float distanceFromCenter =
        distance(vUv, vec2(0.5)) * 2.1;

    float fade = smoothstep(
        0.01,
        0.8,
        distanceFromCenter
    );

    // Reduce grid visibility toward the outside
    float alpha = grid * (1.0 - fade);

    // Make absolutely sure alpha is valid
    alpha = clamp(alpha, 0.0, 1.0);

    // --------------------------------
    // Color
    // --------------------------------

    vec3 color = mix(
        uColorStart,
        uColorEnd,
        grid
    );

    gl_FragColor = vec4(color, alpha);

    #include <colorspace_fragment>
}