const About = () => {
  return (
    <div className="container section about-page">
      <h2>Our Team</h2>
      <div className="team-grid">
        <div className="team-card">
          <div className="team-avatar-wrap">
            <img className="team-avatar" src="/images/pal.jpg" alt="Pal Patel" />
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
            <img className="team-avatar" src="/images/yash.jpg" alt="Yash Patel" />
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
            <img className="team-avatar" src="/images/riya.jpg" alt="Riya Patel" />
          </div>
          <div className="team-name">Riya Patel</div>
          <div className="team-role">Web Designer</div>
          <div className="team-desc">
            Riya blends aesthetics with clarity, shaping brand‑consistent web experiences that are
            responsive, fast, and user‑centric.
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;


