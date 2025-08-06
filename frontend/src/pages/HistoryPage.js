import React from 'react';
import './HistoryPage.css';

const HistoryPage = () => {
  const milestones = [
    {
      year: '2018',
      title: 'The First Meeting',
      description: 'A small group of passionate students and young professionals organized the first-ever Young Cryonicist Meeting in a university basement. The focus was on building a foundational community.'
    },
    {
      year: '2019',
      title: 'Growing Momentum',
      description: 'The second meeting saw a significant increase in attendance, with participants from over 10 countries. The event featured the first-ever student presentation competition.'
    },
    {
      year: '2021',
      title: 'Virtual Expansion',
      description: 'In response to global travel restrictions, the meeting went fully virtual, allowing for unprecedented global participation and the inclusion of speakers from major cryonics organizations.'
    },
    {
      year: '2023',
      title: 'Hybrid Model & Formalization',
      description: 'The first hybrid event was held, combining in-person and virtual experiences. The Young Cryonicist Society was formally established to provide year-round support to the community.'
    },
     {
      year: 'Present',
      title: 'Looking to the Future',
      description: 'We continue to expand our reach, focusing on mentorship programs, research grants, and fostering a vibrant, global community dedicated to advancing cryonics.'
    }
  ];

  return (
    <div className="history-page py-5">
      <div className="container">
        <h1 className="display-4 text-center mb-5">Our Journey</h1>
        <div className="timeline">
          {milestones.map((milestone, index) => (
            <div key={index} className={`timeline-container ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-content">
                <h2>{milestone.year} - {milestone.title}</h2>
                <p>{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;