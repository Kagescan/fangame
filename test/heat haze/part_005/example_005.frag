// Example from http://glslsandbox.com/

#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

void main( void )
{
    vec2 position = gl_FragCoord.xy;
    vec4 finalColor = vec4(0.0, 0.0, 0.0, 1.0);

    for (int i = 0; i < 10; i++) {
        float a = float(i)*0.25;
        vec2 loc = 200.0*vec2(cos(time+a), abs(sin(time+a))) + resolution.xy/2.0;

        if(distance(position, loc) < 23.0+sin(time*1.0+a)*22.0){
            finalColor += 0.5*vec4(.5, 0.0, .5, 1.0);
        }
    }

    gl_FragColor = finalColor;
}
