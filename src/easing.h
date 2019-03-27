#ifndef EASING_INCLUDED
#define EASING_INCLUDED
#include <iostream>
#include <math.h>


float easeLinear        (float t, float b, float c, float d);
float easeInSine        (float t, float b, float c, float d);
float easeOutSine       (float t, float b, float c, float d);
float easeInOutSine     (float t, float b, float c, float d);
float easeInCubic       (float t, float b, float c, float d);
float easeOutCubic      (float t, float b, float c, float d);
float easeInOutCubic    (float t, float b, float c, float d);
float easeInExpo        (float t, float b, float c, float d);
float easeOutExpo       (float t, float b, float c, float d);
float easeInOutExpo     (float t, float b, float c, float d);
float easeInCirc        (float t, float b, float c, float d);
float easeOutCirc       (float t, float b, float c, float d);
float easeInOutCirc     (float t, float b, float c, float d);
float easeInElastic     (float t, float b, float c, float d);
float easeOutElastic    (float t, float b, float c, float d);
float easeInBack        (float t, float b, float c, float d);
float easeOutBack       (float t, float b, float c, float d);
float easeInOutBack     (float t, float b, float c, float d);
float easeInOutElastic  (float t, float b, float c, float d);
float easeInBounce      (float t, float b, float c, float d);
float easeOutBounce     (float t, float b, float c, float d);
float easeInOutBounce   (float t, float b, float c, float d);
float returnEase(std::string easingFunction, float t, float b ,float c, float d);
bool checkEase(std::string easingFunction);


float easeInAtan(float t,float b,float c,float d);
float easeOutAtan(float t,float b,float c,float d);

#endif
