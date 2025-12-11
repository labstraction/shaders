#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_buffer0;

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;

vec2 tile(vec2 st, float zoom) {
    st *= zoom;
    return fract(st);
}

vec3 rect(vec2 st, vec2 origin, vec2 size) {
    vec2 bl = step(origin, st);
    vec2 tr = step(st, origin + size);
    return vec3(bl.x * bl.y * tr.x * tr.y);
}

vec3 rect(vec2 st,vec2 vert[4]) {
    // create rect from vertices
    vec2 bl = step(vert[0], st);
    vec2 tr = step(st, vert[3]);
    return vec3(bl.x * bl.y * tr.x * tr.y);

}

vec2 line(vec2 st) {

    st = vec2((step(0.4, st.x) - step(0.5, st.x)), (step(0.4, st.y) - step(0.5, st.y)));
    //st.y = step(0.4,st.y) - step(0.5,st.y);
    return st;
}

void main(void) {
    vec3 color = vec3(0.0);
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    // st.x += u_time * st.y * 0.1;
    // st.y += u_time * -st.x * 0.2;
    st = tile(st, 10.0);

    //color = rect(st, vec2(0.2), vec2(0.6));
    vec2 rectPoints[4];
    rectPoints[0] = vec2(0.2, 0.2);
    rectPoints[1] = vec2(0.8, 0.2);
    rectPoints[2] = vec2(0.2, 0.8);
    rectPoints[3] = vec2(0.8, 0.8);

    color = rect(st, rectPoints) * vec3(st, sin(u_time * st.x ));

    gl_FragColor = vec4(color, 1.0);
}
