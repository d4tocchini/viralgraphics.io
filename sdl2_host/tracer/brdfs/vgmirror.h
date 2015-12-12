/*
 * Copyright (c) 2015 Markus Moenig <markusm@visualgraphics.tv>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

#ifndef __VG_BRDF_H____MIRROR__
#define __VG_BRDF_H____MIRROR__

namespace embree
{
    // VG based BRDF, mirror material
    class VGBRDF_Mirror : public VGBRDF
    {
    public:
        VGBRDF_Mirror(Color diffuse,
               Color ambient,
               Color specular,
               float shininess,
               int mode) : VGBRDF(diffuse, ambient, specular, shininess, mode)
        {
            mDiffuse = diffuse;
            mAmbient = ambient;
            mSpecular = specular;
            mShininess = shininess;
            mIlluminationMode = mode;
        }
        
        virtual ~VGBRDF_Mirror()
        {
        }
        
        virtual Color eval(const Vector3f& wo,
                           const DifferentialGeometry& dg,
                           const Vector3f& wi) const
        {
            return Color(zero);
        }

        virtual Color sample(const Vector3f& wo,
                             const DifferentialGeometry& dg,
                             Sample3f& wi,
                             const Vec2f& s) const
        {
            Vector3f tmp = reflect(wo,dg.Ng);
            wi = tmp;
            //return Color(tmp.x * 0.5f + 0.5f, tmp.y * 0.5f + 0.5f, tmp.z * 0.5f + 0.5f);
            return Color(one);
        }

        virtual float pdf(const Vector3f& wo,
                          const DifferentialGeometry& dg,
                          const Vector3f& wi) const 
        {
            return 0.0f;
        }
        
        virtual bool isDiffuse() const
        {
            return false;
        }
    };
}

#endif