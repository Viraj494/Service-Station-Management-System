import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OneService = ({ match }) => {
  const [service, setService] = useState({});

  useEffect(() => {
    const fetchServiceDetails = async () => {
      const { data } = await axios.get(`/services/${match?.params?.id}`);
      setService(data);
    };

    fetchServiceDetails();
  }, [match?.params?.id]);

  return (
    <div>
      <h2>{service.name}</h2>
      <p>Category: {service.category}</p>
      <p>Price: {service.price}</p>
      <p>Availability: {service.availability ? 'Available' : 'Not Available'}</p>
      
      <ul>
        {service.comment && service.comment.map(comment => (
          <li key={comment._id}>
            <p>{comment.user}: {comment.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OneService;
