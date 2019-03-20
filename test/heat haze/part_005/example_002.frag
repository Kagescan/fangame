// Example from http://glslsandbox.com/

#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

float hash(float n) { return fract(sin(n)*43578.5453); }
float hash(vec2 n) { return hash(dot(n, vec2(12.232, 94.454))); }

float de(vec2 p) {
        p.x += time*0.2;;
	
	float m = 1.0;
	vec2 q = p;
	for(int i = 0; i < 3; i++) {
		p = q;
		vec2 t = floor(p);
		p = fract(p) - 0.5;
		p.x *= 2.0*floor(1.8*fract(hash(t))) - 1.0;
		
		float d = abs(1.0 - 2.0*abs(p.x + p.y))/(2.0*sqrt(5.0));
		
		m = min(m, smoothstep(0.0, 0.05, d));
		q *= 2.0;
	}
	
	return m;
}

vec3 bump(vec2 p, float e, float z) {
	vec2 r = vec2(e, 0.0); vec2 l = r.yx;
	vec3 g = vec3(
		de(p + r) - de(p - r),
		de(p + l) - de(p - l),
		z);
	
	return normalize(g);
}

vec3 render(vec2 p) {
	vec3 col = vec3(0);
	
	vec3 rd = normalize(vec3(p, 1.97));
	vec3 sn = bump(p, 0.01, -0.6);
	
	col += pow(clamp(dot(-rd, sn), 0.3, 1.0), 10.0);
	
	return col;
}

void main( void ) {
	vec2 p = (-resolution + 2.0*gl_FragCoord.xy)/resolution.y;

        //vec3 col = vec3(de(p));
        vec3 col = render(p);
	
	gl_FragColor = vec4(col, 1);
}
