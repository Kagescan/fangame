
#version 120

uniform sampler2D currentTexture; // Our render texture
//uniform sampler2D distortionMapTexture; // Our heat distortion map texture

uniform float time; // Time used to scroll the distortion map
uniform float distortionFactor; // Factor used to control severity of the effect
uniform float riseFactor; // Factor used to control how fast air rises


void main() {
    vec2 coord = gl_TexCoord[0].xy;
    coord.x += sin(radians(5*time*riseFactor + coord.y * 500)) * (0.02+distortionFactor);
    coord.y += cos(radians(5*time*riseFactor + coord.x * 250)) * (0.03+distortionFactor);
    vec4 pixel_color = texture2D(currentTexture, coord);

    gl_FragColor = pixel_color;
}
