
import React,{useState, useEffect} from "react";


function ServiceDetails()

{  const [services, setServices] = useState([]);
    const servicesArray = Array.from(services);

    useEffect(() => {
        fetch('http://localhost:8070/services/getService')
          .then((response) => response.json())
          .then((data) => setServices(data));
      }, []);

    return(
        <div>

        <div className='service-common-area'>
            <div className='service-header'>Detailing Services</div>
            <div className='ind-service-container'>

                    {servicesArray.filter(service => service.category.includes('Detailing')).map((service) => (
                    

                    <div className="service-tile">                       
                        <div className='serv-name'>{service.name}</div>
                        <div className='serv-price'>Rs. {service.price} /=</div>
                        <div className='serv-desc'>{service.description}</div>

                        <div className="serv-sub">
                            {service.subServices === '-' ? '' : <ul> <li> {service.subServices} </li>  </ul>}
                            
                        </div>     

                        <div className='serv-avail'>Availability : {service.availability}</div>

                        <a className="btn-appoin" href="/login"> Appointment</a>                   
                        
                    </div>
                ))}


            </div>
        </div>

        <div className='service-common-area'>
            <div className='service-header'>Periodic Maintenance Services</div>
            <div className='ind-service-container'>

                    {servicesArray.filter(service => service.category.includes('Periodic Maintenance')).map((service) => (
                    

                    <div className="service-tile">                       
                        <div className='serv-name'>{service.name}</div>
                        <div className='serv-price'>Rs. {service.price} /=</div>
                        <div className='serv-desc'>{service.description}</div>

                        <div className="serv-sub">
                            {service.subServices === '-' ? '' : <ul> <li> {service.subServices} </li>  </ul>}
                            
                        </div>     

                        <div className='serv-avail'>Availability : {service.availability}</div>  

                        <a className="btn-appoin" href="/login"> Appointment</a>                    
                        
                    </div>
                ))}


            </div>
        </div>

        <div className='service-common-area'>
            <div className='service-header'>Repairing Services</div>
            <div className='ind-service-container'>

                    {servicesArray.filter(service => service.category.includes('Repairing')).map((service) => (
                    

                    <div className="service-tile">                       
                        <div className='serv-name'>{service.name}</div>
                        <div className='serv-price'>Rs. {service.price} /=</div>
                        <div className='serv-desc'>{service.description}</div>

                        <div className="serv-sub">
                            {service.subServices === '-' ? '' : <ul> <li> {service.subServices} </li>  </ul>}
                            
                        </div>     

                        <div className='serv-avail'>Availability : {service.availability}</div>  

                        <a className="btn-appoin" href="/login"> Appointment</a>                    
                        
                    </div>
                ))}


            </div>
        </div>


        </div>
    )
}


export default ServiceDetails;