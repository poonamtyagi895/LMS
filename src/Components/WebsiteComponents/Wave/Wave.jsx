import "./Wave.css";

const Wave = ({ children }) => {
  return (
    <section className="wave-section">
      {children}

      <svg
        className="wave-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="wave-path"
            d="M-160 44c30 0 58-18 88-18s58 18 88 18
               58-18 88-18 58 18 88 18v44h-352z"
          />
        </defs>

        <g className="wave-parallax">
          <use href="#wave-path" x="48" y="0" fill="rgba(255,255,255,0.7)" />
          <use href="#wave-path" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use href="#wave-path" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use href="#wave-path" x="48" y="7" fill="#ffffff" />
        </g>
      </svg>
    </section>
  );
};

export default Wave;
