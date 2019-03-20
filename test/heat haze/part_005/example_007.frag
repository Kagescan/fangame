#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;


void main()
{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    uv-=.3;
    uv*=3.;
    
    vec3 col = vec3(0.1,0.6,0.9);

    if (uv.y<cos(0.4*time+uv.x*4.)/1.2) col = vec3(0,.4,0);
    if (uv.y<cos(1.2*time+uv.x*8.)/4.)  col = vec3(0,.6,0);
    if (uv.y<sin(1.4*time+uv.x*6.)/10.) col = vec3(0,8,0);

    
    gl_FragColor = vec4(col,1.0);
}
