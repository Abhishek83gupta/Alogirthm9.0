import React from 'react'
import Hedaer from '../Compoenets/DoctorAppoinment/Hedaer'
import Specelist from '../Compoenets/DoctorAppoinment/Specelist'
import Topdoctor from '../Compoenets/DoctorAppoinment/Topdoctor'
import Banner from '../Compoenets/DoctorAppoinment/Banner'

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