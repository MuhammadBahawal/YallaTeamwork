import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Categorys.css'

const Categorys = () => {

    const { categorys } = useSelector(state => state.home)

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mdtablet: {
            breakpoint: { max: 991, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 3
        },
        smmobile: {
            breakpoint: { max: 640, min: 0 },
            items: 2
        },
        xsmobile: {
            breakpoint: { max: 440, min: 0 },
            items: 1
        }
    }
    return (
        <div className='w-full mx-auto relative Categorybg'>

            <Carousel
                autoPlay={true}
                infinite={true}
                arrows={true}
                responsive={responsive}
                transitionDuration={500}
            >
                {
                    categorys.map((c, i) => <Link className='h-[185px] block mx-5' key={i} to={`/products?category=${c.name}`}> {/* Add margin */}
                        <div className='w-full h-full relative p-3 flex flex-col justify-center items-center category-card'>
                            <img className='w-[100px] h-[100px] rounded-full object-cover' src={c.image} alt="image" />
                            <div className='w-full font-bold flex justify-center items-center mt-3'>
                                <span>{c.name}</span>
                            </div>
                        </div>
                    </Link>)
                }
            </Carousel>

        </div>

    )
}

export default Categorys