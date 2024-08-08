import { useState, useEffect, useRef } from 'react';
import { firestore, signInWithGoogle, signOut, auth } from '../../lib/firebase';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import '../../globals.css'; // Importar el archivo CSS global
import './testimonials.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [user, setUser] = useState(null);
  const [newTestimonial, setNewTestimonial] = useState("");
  const [rating, setRating] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error
  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'testimonials'));
      const testimonialsData = querySnapshot.docs.map(doc => doc.data());
      setTestimonials(testimonialsData);
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    // Listener para cambios de autenticación
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      setUser(user);
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      if (error.code === 'auth/operation-not-allowed' || error.code === 'auth/unauthorized-domain' || error.code === 'auth/web-storage-unsupported') {
        setErrorMessage("Your browser is not supported. Please use a different browser to sign in.");
      } else {
        setErrorMessage("An error occurred during sign-in. Please try again.");
      }
      console.error("Error signing in with Google: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null); // Update state to reflect user has signed out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
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

      // Sign out the user after adding the testimonial
      await handleLogout();
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

  const handleMouseDown = (e) => {
    setIsDown(true);
    const scrollContainer = scrollRef.current;
    setStartX(e.pageX - scrollContainer.offsetLeft);
    setScrollLeft(scrollContainer.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const scrollContainer = scrollRef.current;
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 3; // Ajusta la velocidad del desplazamiento
    scrollContainer.scrollLeft = scrollLeft - walk;
  };

  const scrollLeftOne = () => {
    const scrollContainer = scrollRef.current;
    scrollContainer.scrollBy({ left: -scrollContainer.clientWidth, behavior: 'smooth' });
  };

  const scrollRightOne = () => {
    const scrollContainer = scrollRef.current;
    scrollContainer.scrollBy({ left: scrollContainer.clientWidth, behavior: 'smooth' });
  };
 

  // Detectar si el usuario está en un navegador embebido
  const isInEmbeddedBrowser = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return (
      /instagram/i.test(userAgent) ||
      /FBAN/i.test(userAgent) || // Facebook
      /FBAV/i.test(userAgent)
    );
  };

  useEffect(() => {
    if (isInEmbeddedBrowser()) {
      setErrorMessage("¡Tu navegador no es seguro!. Para iniciar sesión y dejar tu testimonio, por favor abre este sitio web en tu navegador web de confianza (por ejemplo, Chrome, Safari, firefox, etc. ). To add your testimonial select a secure browser");
    }
  }, []);



  return (
    <div className="text-white p-8 ml-2 mt-5 mr-2 rounded-lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <h2 className="text-3xl font-bold mb-6">What people say</h2>
      <div className="testimonials-wrapper">
        <button onClick={scrollLeftOne} className="scroll-button left-button">‹</button>
        <div 
          className="testimonials-container"
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
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
        <button onClick={scrollRightOne} className="scroll-button right-button">›</button>
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
            Send
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2 ml-2"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-6"
          >
            Sign in with Google to add your testimonial
          </button>
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </>
      )}
    </div>
  );
};

export default Testimonials;
