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
/// ViewMatrix builds Matrix objects based on certain desired views.
/// </summary>


/// <summary>
/// Constructor.
/// </summary>
function ViewMatrix ()
{
}


/// <summary>
/// Build a frustum matrix.
/// </summary>
/// <param name="left">Left coordinate of frustum.</param>
/// <param name="right">Right coordinate of frustum.</param>
/// <param name="bottom">Bottom coordinate of frustum.</param>
/// <param name="top">Top coordinate of frustum.</param>
/// <param name="near">Near distance of frustum.</param>
/// <param name="far">Far distance of frustum.</param>
/// <returns>A frustum (3D rectangular region of space) matrix.</returns>
ViewMatrix.Frustum = function (left, right, bottom, top, near, far)
{
	var matrix = new Matrix(4, 4);

	matrix.MMatrix[0] = (2.0 * near) / (right - left);
	matrix.MMatrix[1] = 0.0;
	matrix.MMatrix[2] = 0.0;
	matrix.MMatrix[3] = 0.0;

	matrix.MMatrix[4] = 0.0;
	matrix.MMatrix[5] = (2.0 * near) / (top - bottom);
	matrix.MMatrix[6] = 0.0;
	matrix.MMatrix[7] = 0.0;

	matrix.MMatrix[8] = (right + left) / (right - left);
	matrix.MMatrix[9] = (top + bottom) / (top - bottom);
	matrix.MMatrix[10] = -(far + near) / (far - near);
	matrix.MMatrix[11] = -1.0;

	matrix.MMatrix[12] = 0.0;
	matrix.MMatrix[13] = 0.0;
	matrix.MMatrix[14] = -(2.0 * far * near) / (far - near);
	matrix.MMatrix[15] = 0.0;

	return matrix;
}


/// <summary>
/// Build an orthographic matrix with centre at (0,0).
/// </summary>
/// <param name="width">Width of the frustum.</param>
/// <param name="height">Height of the frustum.</param>
/// <param name="near">Near distance of frustum.</param>
/// <param name="far">Far distance of frustum.</param>
/// <returns>An orthographic matrix.</returns>
ViewMatrix.Orthographic = function (width, height, near, far)
{
	var matrix = new Matrix(4, 4);

	matrix.MMatrix[0] = 1.0 / width;
	matrix.MMatrix[1] = 0.0;
	matrix.MMatrix[2] = 0.0;
	matrix.MMatrix[3] = 0.0;

	matrix.MMatrix[4] = 0.0;
	matrix.MMatrix[5] = 1.0 / height;
	matrix.MMatrix[6] = 0.0;
	matrix.MMatrix[7] = 0.0;

	matrix.MMatrix[8] = 0.0;
	matrix.MMatrix[9] = 0.0;
	matrix.MMatrix[10] = -2.0 / (far - near);
	matrix.MMatrix[11] = 0.0;

	matrix.MMatrix[12] = 0;
	matrix.MMatrix[13] = 0;
	matrix.MMatrix[14] = -near / (far - near);
	matrix.MMatrix[15] = 1.0;

	return matrix;
}


/// <summary>
/// Build an orthographic matrix.
/// </summary>
/// <param name="left">Left coordinate of frustum.</param>
/// <param name="right">Right coordinate of frustum.</param>
/// <param name="bottom">Bottom coordinate of frustum.</param>
/// <param name="top">Top coordinate of frustum.</param>
/// <param name="near">Near distance of frustum.</param>
/// <param name="far">Far distance of frustum.</param>
/// <returns>An orthographic matrix.</returns>
ViewMatrix.OrthographicRect = function (left, right, bottom, top, near, far)
{
	var matrix = new Matrix(4, 4);

	matrix.MMatrix[0] = 2.0 / (right - left);
	matrix.MMatrix[1] = 0.0;
	matrix.MMatrix[2] = 0.0;
	matrix.MMatrix[3] = 0.0;

	matrix.MMatrix[4] = 0.0;
	matrix.MMatrix[5] = 2.0 / (top - bottom);
	matrix.MMatrix[6] = 0.0;
	matrix.MMatrix[7] = 0.0;

	matrix.MMatrix[8] = 0.0;
	matrix.MMatrix[9] = 0.0;
	matrix.MMatrix[10] = -2.0 / (far - near);
	matrix.MMatrix[11] = 0.0;

	matrix.MMatrix[12] = -(right + left) / (right - left);
	matrix.MMatrix[13] = -(top + bottom) / (top - bottom);
	matrix.MMatrix[14] = -(far + near) / (far - near);
	matrix.MMatrix[15] = 1.0;

	return matrix;
}


/// <summary>
/// Build a perspective matrix.
/// </summary>
/// <param name="fovY">Angular pitch of frustum</param>
/// <param name="aspect">Aspext ratio of frustum</param>
/// <param name="near">Near distance of frustum</param>
/// <param name="far">Far distance of frustum</param>
/// <returns>A projection matrix</returns>
ViewMatrix.Perspective = function (fovY, aspect, near, far)
{
	var top = near * Math.tan(fovY * (Math.PI / 360.0));
	var bottom = -top;
	var left = bottom * aspect;
	var right = top * aspect;

	return this.Frustum(left,
						right,
						bottom,
						top,
						near,
						far);
}


/// <summary>
/// Build a viewport matrix.
/// </summary>
/// <param name="width">Width of the viewport.</param>
/// <param name="height">Height of the viewport.</param>
/// <returns>A viewport matrix.</returns>
ViewMatrix.ViewPort = function (x, y, width, height)
{
	var matrix = new Matrix(4, 4);

	matrix.MMatrix[0] = width * 0.5;
	matrix.MMatrix[1] = 0.0;
	matrix.MMatrix[2] = 0.0;
	matrix.MMatrix[3] = 0.0;

	matrix.MMatrix[4] = 0.0;
	matrix.MMatrix[5] = height * 0.5;
	matrix.MMatrix[6] = 0.0;
	matrix.MMatrix[7] = 0.0;

	matrix.MMatrix[8] = 0.0;
	matrix.MMatrix[9] = 0.0;
	matrix.MMatrix[10] = 1.0;
	matrix.MMatrix[11] = 0.0;

	matrix.MMatrix[12] = x + width * 0.5;
	matrix.MMatrix[13] = y + height * 0.5;
	matrix.MMatrix[14] = 0.0;
	matrix.MMatrix[15] = 1.0;

	return matrix;
}