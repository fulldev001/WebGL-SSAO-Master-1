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
/// This class provides storage of ResourceItem objects.
/// </summary>


/// <summary>
/// Constructor.
/// </summary>
function ResourceManager ()
{
	/// <summary>
	/// Store a collection of ResourceItem objects.
	/// </summary>
	this.Item = new Array();
}


/// <summary>
/// Add an item to the list.
/// </summary>
/// <param name="item">Item to add.</param>
ResourceManager.prototype.Add = function (item)
{
	this.Item.push(item);
}


/// <summary>
/// Finds the resource with the specified name.
/// </summary>
/// <param name="name">Name of the resource item to find.</param>
/// <returns>Reference to the resource item if found, otherwise 0.</returns>
ResourceManager.prototype.Find = function (name)
{
	for (var i = 0; i < this.Item.length; ++i)
	{
		if ( this.Item[i].Name == name )
			return this.Item[i];
	}
	return null;
}