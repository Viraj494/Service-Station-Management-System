import React, {useState, useEffect} from "react";
import '../App.css';

function IndividualService(){

    const [services, setServices] = useState([]);
   // const servicesArray = Array.from(services);
    
        useEffect(() => {
            fetch('http://localhost:8070/services/getService')
              .then((response) => response.json())
              .then((data) => setServices(data));
          }, []);

    return(
        <div>
            <div className='individual-service-area'>
            <div className='individual-service-header'>Individual service</div>
            <div className='individual-service-container'>

               

            </div>
        </div>

        </div>
    )
}

export default IndividualService;