/// <summary>
/// Copyright (C) 2012 Nathaniel Meyer
/// Nutty Software, http://www.nutty.ca
/// All Rights Reserved.
/// 
/// Permission is hereby granted, free of charge, to any person obtaining a copy of
/// this software and associated documentation files (the "Software"), to deal in
/// the Software without restriction, including without limitation the rights to
/// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
/// of the Software, and to permit persons to whom the Software is furnished to do
/// so, subject to the following conditions:
///     1. The above copyright notice and this permission notice shall be included in all
///        copies or substantial portions of the Software.
///     2. Redistributions in binary or minimized form must reproduce the above copyright
///        notice and this list of conditions in the documentation and/or other materials
///        provided with the distribution.
/// 
/// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
/// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
/// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
/// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
/// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
/// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
/// SOFTWARE.
/// </summary>


/// <summary>
/// This fragment shader blends an ambient occlusion map with the rendered scene.
/// </summary>


#ifdef GL_ES
	precision highp float;
#endif


/// <summary>
/// Texture samples used by this shader.
/// <summary>
uniform sampler2D Sample0;	// Rendered scene texture
uniform sampler2D Sample1;	// Ambient occlusion map


/// <summary>
/// Varying variables.
/// <summary>
varying vec2 vUv;


/// <summary>
/// Fragment shader entry.
/// <summary>
void main ()
{
	// Get scene colour and ambient occlusion values
	vec3 colour = texture2D(Sample0, vUv).xyz;
	float ao = texture2D(Sample1, vUv).x;
	
	// Blend the two
	colour = clamp(colour - ao, 0.0, 1.0);
	
	// Apply gamma correction
	gl_FragColor.xyz = pow(colour, vec3(1.0 / 2.2));
	gl_FragColor.w = 1.0;
}