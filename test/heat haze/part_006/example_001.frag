#version 120
uniform sampler2D currentTexture;
uniform float time;

void main() {
    vec2 coord = gl_TexCoord[0].xy;
    coord.x += sin(radians(500*time + coord.y * 500)) * 0.02;
    coord.y += cos(radians(500*time + coord.x * 250)) * 0.03;
    vec4 pixel_color = texture2D(currentTexture, coord);

    gl_FragColor = pixel_color;
}
