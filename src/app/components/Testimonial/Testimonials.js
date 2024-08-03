import { useState, useEffect } from 'react';
import { firestore, signInWithGoogle } from '../../lib/firebase';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import '../../globals.css'; // Importar el archivo CSS global
import './testimonials.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [user, setUser] = useState(null);
  const [newTestimonial, setNewTestimonial] = useState("");
  const [rating, setRating] = useState("");


  useEffect(() => {
    const fetchTestimonials = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'testimonials'));
      const testimonialsData = querySnapshot.docs.map(doc => doc.data());
      setTestimonials(testimonialsData);
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const container = document.querySelector('.testimonials-container');
      if (container) {
        container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });

        // Reset scroll position to the beginning after reaching the end
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 3000); // Ajusta el intervalo según sea necesario

    return () => clearInterval(interval);
  }, []);

  const handleLogin = async () => {
    const user = await signInWithGoogle();
    setUser(user);
  };

  const handleAddTestimonial = async () => {
    if (newTestimonial.trim() !== "" && rating > 0) {
      await addDoc(collection(firestore, 'testimonials'), {
        testimonial: newTestimonial,
        name: user.displayName,
        photoURL: user.photoURL,
        rating: rating,
        createdAt: Timestamp.now(),
      });
      setNewTestimonial("");
      setRating("");
      // Fetch the updated testimonials
      const querySnapshot = await getDocs(collection(firestore, 'testimonials'));
      const testimonialsData = querySnapshot.docs.map(doc => doc.data());
      setTestimonials(testimonialsData);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} className="star">&#9733;</span>); // estrella llena dorada
      } else {
        stars.push(<span key={i} className="star">&#9734;</span>); // estrella vacía dorada
      }
    }
    return stars;
  };

  const handleRatingChange = (e) => {
    setRating(Number(e.target.value));
  };

  return (
    <div className="text-white p-8 ml-2 mt-5 mr-2 rounded-lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <h2 className="text-3xl font-bold mb-6">What people say</h2>
      <div className="testimonials-wrapper">
        <div className="testimonials-container">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card testimonial-card">
        
              <div className="p-4 text-center">
                <img src={testimonial.photoURL} alt={testimonial.name} className="w-16 h-16 rounded-full mx-auto mb-4" />
                <p className="text-lg font-semibold mb-2">{testimonial.name}</p>
                <div className="flex justify-center mb-2">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-sm">{testimonial.testimonial}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {user ? (
        <div className="mt-6">
          <textarea
            value={newTestimonial}
            onChange={(e) => setNewTestimonial(e.target.value)}
            placeholder="Add your testimonial"
            className="w-full p-2 rounded-lg bg-gray-700"
          />
          <select
            value={rating}
            onChange={handleRatingChange}
            className="w-full p-2 rounded-lg bg-gray-700 mt-2"
          >
            <option value="" disabled>Select stars</option>
            <option value="1">★</option>
            <option value="2">★★</option>
            <option value="3">★★★</option>
            <option value="4">★★★★</option>
            <option value="5">★★★★★</option>
          </select>
          <button
            onClick={handleAddTestimonial}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
          >
            Submit
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-6"
        >
          Sign in with Google to add your testimonial
        </button>
      )}
    </div>
  );
};

export default Testimonials;
