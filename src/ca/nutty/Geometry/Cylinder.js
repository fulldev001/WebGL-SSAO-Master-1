/// <summary>
/// Nutty Software Open WebGL Framework
/// 
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
/// This class created a cylinder mesh.
/// </summary>


/// <summary>
/// Constructor.
/// </summary>
/// <param name="numPoint">Number of points to create for this shape.</param>
/// <param name="radius">Radius of the cylinder.</param>
/// <param name="height">Height of the cylinder.</param>
function Cylinder (numPoint, radius, height)
{
	/// <summary>
	/// Setup inherited members.
	/// </summary>
	PolygonMesh.call(this);
	
	
	height *= 0.5;

	// Must have even number of points
	if ( (numPoint % 2) != 0 )
		++numPoint;

	// One centre point + points along the circle
	//Create(numPoint, numPoint * 3);
	this.Create(numPoint, (numPoint - 2) * 3);

	// Points on shape
	for (var i = 0; i < numPoint; i += 2)
	{
		//var angle = (i / numPoint) * (2.0 * CMath.PI);
		var angle = (i / (numPoint - 2.0)) * (2.0 * Math.PI);
		var p1 = new Point(Math.cos(angle) * radius, Math.sin(angle) * radius, height);
		var p2 = new Point(p1.x, p1.y, -height);

		this.SetPoint(i, p1);
		this.SetPoint(i + 1, p2);

		//Point uv = new Point(i / (double)numPoint, 1);
		var uv = new Point(i / (numPoint - 2.0), 1);
		this.SetUV(i, uv);
		this.SetUV(i + 1, new Point(uv.x, 0));

		if ( i < (numPoint - 2) )
		{
			this.Index[i * 3 + 0] = i;
			this.Index[i * 3 + 1] = i + 1;
			this.Index[i * 3 + 2] = i + 3;

			this.Index[i * 3 + 3] = i + 3;
			this.Index[i * 3 + 4] = i + 2;
			this.Index[i * 3 + 5] = i;
		}
	}

	// Set Normals
	this.CreateNormals();

	// Average normals along the seem
	if ( numPoint > 2 )
	{
		var endIndex = (numPoint * 3) - 6;
		this.Normal[0] = (this.Normal[0] + this.Normal[endIndex + 0]) * 0.5;
		this.Normal[1] = (this.Normal[1] + this.Normal[endIndex + 1]) * 0.5;
		this.Normal[2] = (this.Normal[2] + this.Normal[endIndex + 2]) * 0.5;

		this.Normal[3] = (this.Normal[3] + this.Normal[endIndex + 3]) * 0.5;
		this.Normal[4] = (this.Normal[4] + this.Normal[endIndex + 4]) * 0.5;
		this.Normal[5] = (this.Normal[5] + this.Normal[endIndex + 5]) * 0.5;

		this.Normal[endIndex + 0] = this.Normal[0];
		this.Normal[endIndex + 1] = this.Normal[1];
		this.Normal[endIndex + 2] = this.Normal[2];

		this.Normal[endIndex + 3] = this.Normal[3];
		this.Normal[endIndex + 4] = this.Normal[4];
		this.Normal[endIndex + 5] = this.Normal[5];
	}
}


/// <summary>
/// Prototypal Inheritance.
/// </summary>
Cylinder.prototype = new PolygonMesh();
Cylinder.prototype.constructor = Cylinder;