import React, {useEffect, useState} from 'react'
import { getCategories } from '../services'
import Link from 'next/link'
import Image from 'next/image'
import logoDark from '../public/logo4.svg'

const Header = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      getCategories()
        .then((newCategories) => setCategories(newCategories))
    }, []);

    return (
        <div className="container mx-auto px-10 mb-8">
          <div className="border-b w-full inline-block border-blue-400 py-8">
            <div className="md:float-left block">
              <Link href="/" className='items-center flex justify-center'>
                {/* <span className="cursor-pointer font-bold text-4xl text-white">Mbumwa Tech Hub</span> */}
                <Image 
                  className='h-auto w-40 sm:h-20 cursor-pointer'
                  src={logoDark}
                  alt='mbumwa.com logo'
                  priority={true}
                />
              </Link>
            </div>
            <div className="hidden md:float-left md:contents">
              {categories.map((category, index) => (
                <Link key={index} href={`/category/${category.slug}`}><span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">{category.name}</span></Link>
              ))}
            </div>
          </div>
        </div>
      );
    };

export default Header
