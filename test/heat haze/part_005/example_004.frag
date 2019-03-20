// Example from http://glslsandbox.com/

#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;

#define hash(a) fract(sin(a)*12345.0) 
#define noise(p) ((old_noise(p, 883.0, 971.0) + old_noise(p + 0.5, 113.0, 157.0)) * 0.5)
float old_noise(vec3 x, float c1, float c2)
{
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f*f*(3.0-2.0*f);
    float n = p.x + p.y*c2+ c1*p.z;
    return mix(
        mix(
            mix(hash(n+0.0),hash(n+1.0),f.x),
            mix(hash(n+c2),hash(n+c2+1.0),f.x),
            f.y),
        mix(
            mix(hash(n+c1),hash(n+c1+1.0),f.x),
            mix(hash(n+c1+c2),hash(n+c1+c2+1.0),f.x),
            f.y),
        f.z);
}
float fbm(vec2 n)
	{
	float total = 0.0, amplitude = 1.0;
	for (int i = 0; i < 5; i++)
		{
		total += noise(vec3(n.x, n.y, 0.0) * 2.0) * amplitude;
		n += n;
		amplitude *= 0.5;
		}
	return total;
	}


void main( void ) 
	{
	vec2 uv = (gl_FragCoord.xy / resolution.xy * 2. - 1.)*2.00;


	const vec3 c1 = vec3(0.1, 0.0, 0.0);
	const vec3 c2 = vec3(0.7, 0.5, 0.0);
	const vec3 c3 = vec3(0.2, 0.0, 0.0);
	const vec3 c4 = vec3(1.0, 0.9, 0.0);
	const vec3 c5 = vec3(0.1);
	const vec3 c6 = vec3(0.9);
	vec2 p = gl_FragCoord.xy * 8.0 / resolution.xx;
	float q = fbm(p - vec2(0.0, time * 0.4));
	vec2 r = vec2(fbm(p + q + time * 0.7 - p.x - p.y), fbm(p + q - vec2(0.0, time * 0.94)));
	vec3 c = mix(c1, c2, fbm(p + r * 0.7)) + mix(c3, c4, r.x) - mix(c5, c6, r.y);
	c=pow(c * cos(1.57 * gl_FragCoord.y / resolution.y), vec3(3.0));	
	gl_FragColor = vec4(c, 1);
	}

