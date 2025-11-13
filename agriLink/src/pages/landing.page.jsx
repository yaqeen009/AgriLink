import React from 'react'
import logo from '../assets/Logo.png'
import RoundedBtn from '../components/roundedbtn'
import boots from "../assets/boots.png"

export const Landing = () => {
  return (
    <div className='px-9 pt-6'>
        <nav className='bg-primary p-2 w-full rounded-full flex justify-between'>
            <img src={logo} alt="" />
            <div className='flex space-x-2'>
               <RoundedBtn name={"Landing"} fn colors={true}/>
                <RoundedBtn name={"About"} fn colors={true}/>
                <RoundedBtn name={"Contact"} fn colors={true}/>
            </div>
            <div className='flex space-x-2'>
                <RoundedBtn name={"Login"} fn colors={false} altColor={`bg-accent text-background hover:bg-transparent border`}/>
                <RoundedBtn name={"Sign Up"} fn colors={false} altColor={`hover:bg-accent text-background bg-transparent border`}/>
            </div>
        </nav>

        {/* Hero Section  */}
        <section id='hero' className='pt-6'>
            <div className="bg-primary text-background p-10 rounded-2xl flex justify-between">
                <span className='flex flex-col space-y-6'>
                    <h1 className='text-display font-montserrat'>Empowering Farmers with <br />Knowledge, Data, and <br />Community.</h1>
                    <p className='text-body font-open_sans font-light'>Access real-time market prices, weather alerts, expert farming tips, and local <br /> community insights, all in one platform designed for smarter, sustainable <br /> agriculture.</p>
                    <RoundedBtn name={"Get Started"} fn colors={false} altColor={`hover:bg-accent text-background bg-transparent border`}/>
                </span>
                <img src={boots} alt="" />
            </div>

            <div>
               <div className=""></div> 
            </div>
        </section>
    </div>
  )
}
