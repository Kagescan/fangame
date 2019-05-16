/* EASING CPP - Smooth-animation Curves for CPP
 * Copyright (c) 2018, 2019 ShinProg, inspiration from https://github.com/jesusgollonet/ofpennereasing/tree/master/PennerEasing
 * Under MIT license, more informations in the file LICENSE
 */
#include "easing.h"
double PI=3.141592653589793238463;

float easeLinear (float t,float b , float c, float d)    {return c*t/d + b;}

float easeInSine    (float t,float b , float c, float d) {return -c * cos(t/d * (PI/2)) + c + b;}
float easeOutSine   (float t,float b , float c, float d) {return c * sin(t/d * (PI/2)) + b;}
float easeInOutSine (float t,float b , float c, float d) {return -c/2 * (cos(PI*t/d) - 1) + b;}

float easeInCubic   (float t,float b , float c, float d) {return c*(t/=d)*t*t + b;}
float easeOutCubic  (float t,float b , float c, float d) {return c*((t=t/d-1)*t*t + 1) + b;}
float easeInOutCubic(float t,float b , float c, float d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b;
	return c/2*((t-=2)*t*t + 2) + b;
}

float easeInExpo    (float t,float b , float c, float d) {return (t==0) ? b : c * pow(2, 10 * (t/d - 1)) + b;}
float easeOutExpo   (float t,float b , float c, float d) {return (t==d) ? b+c : c * (-pow(2, -10 * t/d) + 1) + b;	}
float easeInOutExpo (float t,float b , float c, float d) {
	if (t==0) return b;
	if (t==d) return b+c;
	if ((t/=d/2) < 1) return c/2 * pow(2, 10 * (t - 1)) + b;
	return c/2 * (-pow(2, -10 * --t) + 2) + b;
}

float easeInCirc (float t,float b , float c, float d) {return -c * (sqrt(1 - (t/=d)*t) - 1) + b;}
float easeOutCirc (float t,float b , float c, float d) {return c * sqrt(1 - (t=t/d-1)*t) + b;}
float easeInOutCirc (float t,float b , float c, float d) {
	if ((t/=d/2) < 1) return -c/2 * (sqrt(1 - t*t) - 1) + b;
	return c/2 * (sqrt(1 - t*(t-=2)) + 1) + b;
}

float easeInElastic (float t,float b , float c, float d) {
	if (t==0) {return b;}  if ((t/=d)==1) {return b+c;}
	float p=d*.3f, a=c, s=p/4, postFix =a*pow(2,10*(t-=1));
	return -(postFix * sin((t*d-s)*(2*PI)/p )) + b;
}

float easeOutElastic(float t,float b , float c, float d) {
	if (t==0) {return b;}  if ((t/=d)==1) {return b+c;}
	float p=d*.3f, a=c, s=p/4;
	return (a*pow(2,-10*t) * sin( (t*d-s)*(2*PI)/p ) + c + b);
}

float easeInBack (float t,float b , float c, float d) {
	float s = 1.70158f, postFix = t/=d;
	return c*(postFix)*t*((s+1)*t - s) + b;
}
float easeOutBack(float t,float b , float c, float d) {
	float s = 1.70158f;
	return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
}

float easeInOutBack(float t,float b , float c, float d) {
	float s = 1.70158f;
	if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525f))+1)*t - s)) + b;
	float postFix = t-=2;
	return c/2*((postFix)*t*(((s*=(1.525f))+1)*t + s) + 2) + b;
}

float easeInOutElastic(float t,float b , float c, float d) {
	if (t==0) {return b;}  if ((t/=d/2)==2) {return b+c;}
	float p=d*(.3f*1.5f), a=c, s=p/4;

	if (t < 1) {
		float postFix =a*pow(2,10*(t-=1)); // postIncrement is evil
		return -.5f*(postFix* sin( (t*d-s)*(2*PI)/p )) + b;
	}
	float postFix =  a*pow(2,-10*(t-=1)); // postIncrement is evil
	return postFix * sin( (t*d-s)*(2*PI)/p )*.5f + c + b;
}

//Bounce
  float easeInBounce (float t,float b , float c, float d) {
  	return c - easeOutBounce (d-t, 0, c, d) + b;
  }
  float easeOutBounce(float t,float b , float c, float d) {
  	if ((t/=d) < (1/2.75f)) {
  		return c*(7.5625f*t*t) + b;
  	} else if (t < (2/2.75f)) {
  		float postFix = t-=(1.5f/2.75f);
  		return c*(7.5625f*(postFix)*t + .75f) + b;
  	} else if (t < (2.5/2.75)) {
  			float postFix = t-=(2.25f/2.75f);
  		return c*(7.5625f*(postFix)*t + .9375f) + b;
  	} else {
  		float postFix = t-=(2.625f/2.75f);
  		return c*(7.5625f*(postFix)*t + .984375f) + b;
  	}
  }

  float easeInOutBounce(float t,float b , float c, float d) {
  	if (t < d/2) return easeInBounce (t*2, 0, c, d) * .5f + b;
  	else return easeOutBounce (t*2-d, 0, c, d) * .5f + c*.5f + b;
  }

// --------------------------------------------------

float returnEase(std::string e, float t, float b, float c, float d){
  if      (e=="inSine")	  return easeInSine(t,b,c,d);
  else if (e=="outSine")	  return easeOutSine(t,b,c,d);
  else if (e=="inOutSine")	return easeInOutSine(t,b,c,d);

  else if (e=="inCubic")	  return easeInCubic(t,b,c,d);
  else if (e=="outCubic")	return easeOutCubic(t,b,c,d);
  else if (e=="inOutCubic")return easeInOutCubic(t,b,c,d);

  else if (e=="inExpo")	  return easeInExpo(t,b,c,d);
  else if (e=="outExpo")	  return easeOutExpo(t,b,c,d);
  else if (e=="inOutExpo")	return easeInOutExpo(t,b,c,d);

  else if (e=="inCirc")	  return easeInCirc(t,b,c,d);
  else if (e=="outCirc")	  return easeOutCirc(t,b,c,d);
  else if (e=="inOutCirc")	return easeInOutCirc(t,b,c,d);

  else if (e=="inElastic")	return easeInElastic(t,b,c,d);
  else if (e=="outElastic")return easeOutElastic(t,b,c,d);

  else if (e=="inBack")	  return easeInBack(t,b,c,d);
  else if (e=="outBack")	  return easeOutBack(t,b,c,d);
  else if (e=="inOutBack")	return easeInOutBack(t,b,c,d);

  else if (e=="inBounce")	return easeInBounce(t,b,c,d);
  else if (e=="outBounce")	return easeOutBounce(t,b,c,d);
  else if (e=="inOutBounce")return easeInOutBounce(t,b,c,d);

  else return easeLinear(t,b,c,d);
}

bool checkEase(std::string e) {
  if (   e=="inSine"
      || e=="outSine"
      || e=="inOutSine"
      || e=="inCubic"
      || e=="outCubic"
      || e=="inOutCubic"
      || e=="inExpo"
      || e=="outExpo"
      || e=="inOutExpo"
      || e=="inCirc"
      || e=="outCirc"
      || e=="inOutCirc"
      || e=="inElastic"
      || e=="outElastic"
      || e=="inBack"
      || e=="outBack"
      || e=="inOutBack"
      || e=="inBounce"
      || e=="outBounce"
      || e=="inOutBounce"
      || e=="none")
    return true;
  else
    //if (easing!="") std::cerr<<"Warning : unknown easing function ["<<e<<"].\n\n";
    return false;
}
