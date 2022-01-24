import React from 'react';

export const Footer = () => (
  <footer
    className="bg-light pt-2"
    style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100vw',
    }}
  >
    <div className="text-center">
      <p className="text-secondary">
        Made with
        {' '}
        <i className="fas fa-heart text-danger" />
        {' '}
        by
        {' '}
        <a
          href="https://github.com/sebacarrasco"
          target="_blank"
          className="link-info"
          rel="noreferrer"
        >
          @sebacarrasco
        </a>
      </p>
    </div>
  </footer>
);
