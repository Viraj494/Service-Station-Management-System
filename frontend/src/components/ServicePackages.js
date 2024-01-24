import React, { useState, useEffect  } from 'react';

function ServicePackage() {
  const [selectedPackage, setSelectedPackage] = useState('');
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);

  const handlePackageSelect = (servicePackage) => {
    setSelectedPackage(servicePackage);
  };

  useEffect(() => {
    fetch('http://localhost:8080/services/getService/')
      .then((response) => response.json())
      .then((data) => setServices(data));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/services/getSubService/${selectedPackage}`)
      .then((response) => response.json())
      .then((data) => setSubServices(data));
  }, [selectedPackage]);

  let packageServices = services.find((service) => service.category === 'Package')? services : [];

  return (
    <div>
      <div>
        <button onClick={() => handlePackageSelect('standard')}>
          Standard
        </button>
        <button onClick={() => handlePackageSelect('premium')}>
          Premium
        </button>
        <button onClick={() => handlePackageSelect('luxury')}>
          Luxury
        </button>
      </div>

       
       {/*-------------------------------------PACKAGE PLANS---------------------------------------------------- */}

    

    {/*-------------------------------------PACKAGE PLANS---------------------------------------------------- */}
      
      <h2>Service Package</h2>
      <ul>
        {services.filter(service => service.category.includes('Package')).map((service) => (
          <li key={service.name}>            
            {service.name} - {service.price}
            <div>
            <h3>Sub Services</h3>
            <ul>
            
              <li key={service.subServices}>
                {service.subServices} 
              </li>
            
          </ul>
        </div>
          </li>
        ))}
      </ul>

    </div>
  );
}



















/*

  return (
    <div>
      <div>
        <button onClick={() => handlePackageSelect('standard')}>
          Standard
        </button>
        <button onClick={() => handlePackageSelect('premium')}>
          Premium
        </button>
        <button onClick={() => handlePackageSelect('luxury')}>
          Luxury
        </button>
      </div>
      {selectedPackage === 'standard' && <StandardService />}
      {selectedPackage === 'premium' && <PremiumService />}
      {selectedPackage === 'luxury' && <LuxuryService />}
    </div>
  );
}


function StandardService() {
  const [showAllServices, setShowAllServices] = useState(false);
  const [services, setServices] = useState([]);

 
  return (
    <div>
      <h2>Standard Service Package</h2>
      <ul>
        {!showAllServices && services.slice(0, 3).map((service) => (
           <li key={service.name}>
           {service.name} - {service.price}
         </li>
        ))}
        {showAllServices && services.map((service) => (
          <li key={service.name}>
          {service.name} - {service.price}
        </li>
        ))}
      </ul>
      <button onClick={() => setShowAllServices(!showAllServices)}>
        {showAllServices ? 'See Less' : 'See More'}
      </button>
    </div>
  );
}

function PremiumService() {
    const [showAllServices, setShowAllServices] = useState(false);
    const [services, setServices] = useState([]);
  
   
    return (
      <div>
        <h2>Premium Service Package</h2>
        <ul>
          {!showAllServices && services.slice(0, 3).map((service) => (
             <li key={service.name}>
             {service.name} - {service.price}
           </li>
          ))}
          {showAllServices && services.map((service) => (
            <li key={service.name}>
            {service.name} - {service.price}
          </li>
          ))}
        </ul>
        <button onClick={() => setShowAllServices(!showAllServices)}>
          {showAllServices ? 'See Less' : 'See More'}
        </button>
      </div>
    );
}

function LuxuryService() {
  // similar to StandardService component
}
*/
export default ServicePackage;
