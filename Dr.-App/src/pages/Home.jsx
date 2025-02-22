import React from 'react'
import Hedaer from '../Compoenets/Home/Hedaer'
import Specelist from '../Compoenets/Home/Specelist'
import Topdoctor from '../Compoenets/Home/Topdoctor'
import Banner from '../Compoenets/Home/Banner'

function Home() {
    return (
        <>
            <div className='my-10 bg-[#1a2332]'>
                <Hedaer />
                <div className='border-b border-gray-700'>
                    <Specelist />
                </div>
                <div className='border-b border-gray-700'>
                    <Topdoctor />
                </div>
                <Banner/>
            </div>
        </>
    )
}

export default Home