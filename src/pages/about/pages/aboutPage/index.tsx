import Office from "@assets/images/office.png";

const About = () => {
  return(
    <div className="container">
      <h1>About Us</h1>
      <div className="about-us-grid">
        <div>
          <p>At PrimeEstate, we believe that finding the perfect property should be an exciting and empowering journey — not a stressful one. That’s why we’ve built a platform that combines technology, market expertise, and a deep understanding of our clients’ needs to deliver a seamless and rewarding experience from start to finish.</p>
          <p>Our team is made up of seasoned real estate professionals who are passionate about helping people move forward — whether you're buying your first home, investing in new opportunities, or looking for the ideal rental. We don’t believe in one-size-fits-all solutions. Instead, we listen carefully and offer tailored guidance based on your goals, preferences, and lifestyle.</p>
          <p>With powerful tools and real-time data at your fingertips, PrimeEstate simplifies property searching and decision-making. We're here to make every step — from browsing listings to closing deals — smooth, transparent, and personalized. Because at PrimeEstate, it's not just about property. It's about helping you feel at home.</p>
        </div>
        <img src={Office} alt="Office" className="office-img"/>
      </div>
    </div>
  );
}
export default About;