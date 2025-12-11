
#ifdef GL_ES
precision mediump float;
#endif


uniform vec2 u_resolution;

float stroke(float x, float s, float w){
    float d = step(s,x+w*.5) - 
              step(s,x-w*.5);
    return d;//clamp(d, 0., 1.);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution;
    
    color += stroke(st.x - st.y, .5, .15);
    color += stroke(st.x + st.y, 1., .15);
    color += stroke(st.x - st.y, -.5, .15);

    gl_FragColor = vec4(color,1.);
}
