import React from 'react';
import ReviewGraph from '../../assets/images/reviews-graph.png';

export default function Reviews() {
  const reviewsData = [
    {
      rating: 5,
      name: "Elliot",
      date: "January 3, 2023",
      text: "The beach bum is such an awesome van! Such a comfortable trip. We had it for 2 weeks and there was not a single issue. Super clean when we picked it up and the host is very comfortable and understanding. Highly recommend!",
      id: "1",
    },
    {
      rating: 4,
      name: "Sandy",
      date: "December 12, 2022",
      text: "This is our third time using the Modest Explorer for our travels and we love it! No complaints, absolutely perfect!",
      id: "2",
    },
  ]

  return (
    <section className='host-reviews'>
      <div className='top-next'>
        <h2>Your reviews</h2>
        <p>Last <span>30 days</span></p>
      </div>
      <img className='graph' src={ReviewGraph} alt="Review Graph" />
      <h3>Review (2)</h3>
      {reviewsData.map((review) => (
        <div key={review.id}>
          <div className='review'>
            {[...Array(review.rating)].map((_, i) => (
              <span key={i}>⭐️</span>
            ))}
            <div className='info'>
              <p className="name">{review.name}</p>
              <p className="date">{review.date}</p>
            </div>
            <p>{review.text}</p>
          </div>
          <hr/>
        </div>
      ))}
    </section>
  )
}