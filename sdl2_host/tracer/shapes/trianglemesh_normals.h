// ======================================================================== //
// Copyright 2009-2013 Intel Corporation                                    //
//                                                                          //
// Licensed under the Apache License, Version 2.0 (the "License");          //
// you may not use this file except in compliance with the License.         //
// You may obtain a copy of the License at                                  //
//                                                                          //
//     http://www.apache.org/licenses/LICENSE-2.0                           //
//                                                                          //
// Unless required by applicable law or agreed to in writing, software      //
// distributed under the License is distributed on an "AS IS" BASIS,        //
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. //
// See the License for the specific language governing permissions and      //
// limitations under the License.                                           //
// ======================================================================== //

#ifndef __EMBREE_TRIANGLE_MESH_WITH_NORMALS_H__
#define __EMBREE_TRIANGLE_MESH_WITH_NORMALS_H__

#include "../shapes/shape.h"

namespace embree
{
  /*! Triangle mesh that only supports vertex normals. */
  class TriangleMeshWithNormals : public Shape
  {
  public:

    /*! Vertex description. */
    struct Vertex {
      Vec3fa p;    //!< vertex position
      Vec3fa n;    //!< vertex normal
    };

    /*! Triangle indices description. */
    struct Triangle {
      __forceinline Triangle () {}
      __forceinline Triangle (const Vector3i& tri) : v0(tri.x), v1(tri.y), v2(tri.z) {}
      __forceinline Triangle (uint32 v0, uint32 v1, uint32 v2) : v0(v0), v1(v1), v2(v2) {}
      uint32 v0;  //!< index of first triangle vertex
      uint32 v1;  //!< index of second triangle vertex
      uint32 v2;  //!< index of third triangle vertex
    };

  public:

    /*! Construction from acceleration structure type. */
    TriangleMeshWithNormals (const AccelType& ty)
      : Shape(ty) {}

    /*! Construction from vertex data and triangle index data. */
    TriangleMeshWithNormals(const Parms& parms);
    
  public:
    Ref<Shape> transform(const AffineSpace3f& xfm) const;
    size_t numTriangles() const;
    size_t numVertices () const;
    int extract(RTCScene scene, size_t id) const;
    void postIntersect(const Ray& ray, DifferentialGeometry& dg) const;
    
    virtual Vector3f getRandomSample() const
    {
        unsigned int i = rand() % triangles.size();
        
        float s = static_cast<float>(rand()) / static_cast<float>(RAND_MAX);
        float t = static_cast<float>(rand()) / static_cast<float>(RAND_MAX);
        if (s + t > 1.0f)
        {
            s = 1.0f - t;
            t = 1.0f - t;
        }
        float r = 1.0f - s - t;
        
        return vertices[triangles[i].v0].p + 
            s * (vertices[triangles[i].v1].p - vertices[triangles[i].v0].p) + 
            t * (vertices[triangles[i].v2].p - vertices[triangles[i].v0].p);
    }

  public:
    vector_t<Vertex> vertices;     //!< Vertex array (positions and normals).
    vector_t<Triangle> triangles;  //!< Triangle indices array.
  };
}

#endif