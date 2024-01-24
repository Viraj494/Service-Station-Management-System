import React, { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
//import Header from "./Header";
import '../App.css';
import './ServiceHome.css'
import WelcomeHeader from './WelcomeHeader';

//importing images and videos
import car from '../images/car.png';
import section1 from '../images/section1.png';
import section2 from '../images/section2.png';
import section3 from '../images/section3.png';
import smoke from '../images/smoke.mp4';
import Footer from './Footer';

function ServiceHome(){

    const [services, setServices] = useState([]);
    const servicesArray = Array.from(services);

    useEffect(() => {
        fetch('http://localhost:8070/services/getService')
          .then((response) => response.json())
          .then((data) => setServices(data));
      }, []);

    return(
        
        <div>
            <WelcomeHeader/>
        <div className="home">
         
            <div className="left-s"> 
           
                 {/* -------------slider text-------------------- */}
                <div className="slider-text">
                   
                        <span>The best service station of the town</span>
                </div>

                {/* -------------Heading-------------------- */}
                <div className="service-home-topic">
                    <div>
                        <span className="stroke-text"> Service </span>
                        <span> your ideal</span>
                    </div>
                    <div>
                        <span>  vehicle </span>
                    </div>
                  
                </div>

                {/* -------------figures-------------------- */}
                <div className="figures">
                    <div>
                        <span>20+</span>
                        <span>Services</span>
                    </div>
                    <div>
                        <span>10+</span>
                        <span>Experties Workers</span>
                    </div>
                    <div>
                        <span>3500</span>
                        <span>Members</span>
                    </div>
                </div>

              

            </div>

            <div className="right-s"> 
            
                 {/*
                <div className="repair">
                    <img src={icon} alt="" />    
                </div> */}

                {/*---------main images------------- */}

                <img src={car} alt="" className="car-image"/>

              
                <div className="smoke">
                <video autoPlay muted loop id="background-video" className="vid-smoke">
                    <source src={smoke} type="video/mp4" />
                </video>
                </div>
            
            </div>
            
    
        </div>
        <div className='homepage-introduction'>
        <span> We are your one-stop-shop for all your vehicle maintenance and repair needs. Our team of experienced and certified technicians is dedicated to providing top-quality service. </span>

        </div>

        <div className="plans-header-title">
        <span>We offer a wide range of customizable services to meet your specific needs and also special service packages to provide you a comprehensive range of maintenance and repair services at an affordable price.</span>
        </div>
        <div className="plans-header">
                    <span> Service Packages </span>
                </div>
        <div className="plans-container">

                
                {servicesArray.filter(service => service.category.includes('Standard Package')).map((service) => (
                   
               
                   <div className="plan">  
                        <div className="fact-icon-cont">                   
                            <div className="fact-icon">
                                <img src={section1} alt="Icon"/>
                            </div>
                        </div>
                       <span className='plan-title'>{service.name}</span>
                       <span className='plan-price'>Rs. {service.price}</span>

                       <div className="details">
                            <span  className='plan-desc'> {service.subServices} </span>
                       </div>
                       <div className="btn-cont">
                            <a href='/login' className="plan-btn"> +&nbsp;&nbsp;&nbsp;Select </a>
                       </div>
                   </div>
                
               ))}

                {servicesArray.filter(service => service.category.includes('Premium Package')).map((service) => (
                   

                   <div className="plan">  
                        <div className="fact-icon-cont">                   
                            <div className="fact-icon">
                                <img src={section2} alt="Icon"/>
                            </div>
                        </div>
                       <span className='plan-title'>{service.name}</span>
                       <span className='plan-price'>Rs. {service.price}</span>

                       <div className="details">
                            <span  className='plan-desc'> {service.subServices} </span>
                       </div>
                       <div className="btn-cont">
                       <a href='/login' className="plan-btn"> +&nbsp;&nbsp;&nbsp;Select </a>
                       </div>
                    </div>
               ))}
                    
                {servicesArray.filter(service => service.category.includes('Luxury Package')).map((service) => (
                   

                   <div className="plan">  
                        <div className="fact-icon-cont">                   
                            <div className="fact-icon">
                                <img src={section3} alt="Icon"/>
                            </div>
                        </div>
                        <span className='plan-title'>{service.name}</span>
                        <span className='plan-price'>Rs. {service.price}</span>

                        <div className="details">
                            <span  className='plan-desc'> {service.subServices} </span>
                        </div>
                        <div className="btn-cont">
                        <a href='/login' className="plan-btn"> +&nbsp;&nbsp;&nbsp;Select </a>
                        </div>
                    </div>
                ))}
               
        </div>
        <div className="plans-header-title">
                    <span> We offer you the best services. </span>
                    <span> Check out our all individual services </span>
                    <a className="btn-allservice" href="/ServiceDetails"> All Services</a> 
        </div>
        



                    <Footer/>
        </div>

        

    )
}

export default ServiceHome;