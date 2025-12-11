
#ifdef GL_ES
precision mediump float;
#endif

#include "./libs/math.glsl"


uniform vec2 u_mouse;
uniform vec2  u_resolution;
uniform float u_time;

void main() {

    vec4 color = vec4(0.);
    vec2 st = gl_FragCoord.xy/u_resolution;
    float tilePosX = float(int(mod(st.y * 30.0, 30.0)));
    st = tile(st, 30.);
    float direction = mod(tilePosX, 4.0) <= 1.0 ? 1.0: -1.0;
    if(mod(tilePosX, 2.0) == 0.0){
        color += step(.5 + cos(st.x * 2. * PI + u_time * 5. * direction) * .4 , st.y);
    }
    else{
        color += step(.5 + cos(st.x * 2. * PI + u_time * 5. * direction) * .4 , 1.-st.y);
    }

    gl_FragColor = color;

}
