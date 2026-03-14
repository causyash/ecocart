const About = () => {
  return (
    <div className="container section about-page">
      <div className="about-header text-center mb-5">
        <h1 className="display-4 fw-bold">Meet Our Team</h1>
        <p className="lead text-muted">The passionate individuals behind EcoCart, working together for a sustainable future.</p>
      </div>
      <div className="team-grid">
        <div className="team-card">
          <div className="team-avatar-wrap">
            <img className="team-avatar" src="/images/pal.png" alt="Pal Patel" />
          </div>
          <div className="team-name">Pal Patel</div>
          <div className="team-role">Software Engineer</div>
          <div className="team-desc">
            Pal is a full‑stack problem solver focused on clean architecture, performance, and robust DX.
            He enjoys building scalable systems and mentoring teams.
          </div>
        </div>
        <div className="team-card">
          <div className="team-avatar-wrap">
            <img className="team-avatar" src="/images/yash.png" alt="Yash Patel" />
          </div>
          <div className="team-name">Yash Patel</div>
          <div className="team-role">Front‑End Lead</div>
          <div className="team-desc">
            Yash crafts delightful UI with attention to accessibility, motion, and micro‑interactions.
            He leads the front‑end practice and design systems.
          </div>
        </div>
        <div className="team-card">
          <div className="team-avatar-wrap">
            <img className="team-avatar" src="/images/riya.png" alt="Riya Patel" />
          </div>
          <div className="team-name">Riya Patel</div>
          <div className="team-role">Web Designer</div>
          <div className="team-desc">
            Riya blends aesthetics with clarity, shaping brand‑consistent web experiences that are
            responsive, fast, and user‑centric.
          </div>
        </div>
        <div className="team-card">
          <div className="team-avatar-wrap">
            <img className="team-avatar" src="/images/dhruv.png" alt="Dhruv Patel" />
          </div>
          <div className="team-name">Dhruv Patel</div>
          <div className="team-role">Full-Stack Developer</div>
          <div className="team-desc">
            Dhruv specializes in building seamless integrations and efficient backend services.
            He is passionate about optimizing performance and security.
          </div>
        </div>
        <div className="team-card">
          <div className="team-avatar-wrap">
            <img className="team-avatar" src="/images/nidhi.png" alt="Nidhi Patel" />
          </div>
          <div className="team-name">Nidhi Patel</div>
          <div className="team-role">Product Manager</div>
          <div className="team-desc">
            Nidhi bridge the gap between user needs and technical execution, ensuring that
            every feature we build adds real value to our customers.
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;


