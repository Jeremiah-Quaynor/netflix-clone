import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Movie from './Movie'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'



const Row = ({title, fetchURL, rowID}) => {
    const [movies, setMovies] = useState([])

    useEffect(()=> {
        axios.get(fetchURL).then((res)=> {
            setMovies(res.data.results)
        }).catch((err)=> console.log(err))
    },[fetchURL])

    const sliderLeft = () => {
        var slider = document.getElementById('slider'+ rowID)
        slider.scrollLeft = slider.scrollLeft -500;
    }

    const sliderRight = () => {
        var slider = document.getElementById('slider'+ rowID)
        slider.scrollLeft = slider.scrollLeft + 500;
    }
    
  return (
    <>
        <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
        <div className='relative flex items-center group'>
            <MdChevronLeft 
                size={40} 
                onClick={sliderLeft} 
                className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block "/>
            <div id={'slider'+rowID} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
                {movies.map((item, id)=> {
                    return (
                        <Movie item={item} key={id}/>
                    )
                })}
            </div>
            <MdChevronRight 
                size={40} 
                className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block " onClick={sliderRight}/>
        </div>
    </>
  )
}

export default Row