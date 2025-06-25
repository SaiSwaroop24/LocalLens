import React from 'react';
import logo from '../../asserts/logo.png'; // Adjust the path based on your folder structure

function Nav() {
  const scrollToFooter = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <span style={{ width: '50px', fontSize: '27px' }}>
              <img
                src={logo}
                alt="LocalLens Logo"
                style={{ width: '50px', marginRight: '10px' }}
              />
              𝐋𝐨𝐜𝐚𝐥𝐋𝐞𝐧𝐬
            </span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto" style={{ marginRight: '100px', fontSize: '18px' }}>
              <a className="nav-link active" onClick={scrollToFooter} style={{ cursor: 'pointer' }}>
                <b>About Us</b>
              </a>
              <a className="nav-link active" href="/signup">
                <b>Sign In</b>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
