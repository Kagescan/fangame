
#version 120

uniform sampler2D currentTexture;
uniform sampler2D distortionMapTexture;
uniform float time;
uniform float level;

void main()
{
    vec2 coord = gl_TexCoord[0].xy;
    // Get the color of the noise texture at a position the current fragment position offset by the time
    vec4 noiseTexCol = texture2D(distortionMapTexture, vec2(gl_TexCoord[0].x + 0.5*time, gl_TexCoord[0].y + 0.5*time));


    // Reduce the offset
    float reducedOffset = noiseTexCol.x / 80;

    // Upper part is normal
    if (coord.y+reducedOffset<level)
    {
        // lookup the pixel in the texture
        vec4 pixel = texture2D(currentTexture, gl_TexCoord[0].xy);

        // multiply it by the color
        gl_FragColor = gl_Color * pixel;

    }
    else
    {
        // Get the color of the screen at the offset location
        vec4 col = texture2D(currentTexture,  gl_TexCoord[0].xy + vec2(reducedOffset, reducedOffset));

        // Set the fragment color
        gl_FragColor = vec4 (col.r/2,col.g/2,col.b/1,col.a);

    }
}
