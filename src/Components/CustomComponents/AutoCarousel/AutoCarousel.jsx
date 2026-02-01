import { useEffect } from "react";
import "./AutoCarousel.css";

const testimonials = [
  {
    name: "Maya Patel",
    handle: "@mayapatel",
    text: "The automation features alone have saved our team countless hours.",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    name: "Alex Johnson",
    handle: "@alexj",
    text: "Setup was effortless and the results were instant.",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Sophia Lee",
    handle: "@sophialee",
    text: "This completely changed how we work day to day.",
    avatar: "https://i.pravatar.cc/100?img=45",
  },
  {
    name: "Daniel Kim",
    handle: "@danielk",
    text: "Clean UI, smooth animations, and super reliable.",
    avatar: "https://i.pravatar.cc/100?img=22",
  },
];

const AutoCarousel = () => {
  return (
    <div className="auto-carousel-full-outer">
      <div className="auto-carousel-root">
        <div className="auto-carousel-viewport">
          <article className="auto-carousel-wrapper">
            {[false, true].map((reverse, rowIndex) => (
              <div
                key={rowIndex}
                className={`auto-carousel-marquee ${
                  reverse ? "auto-carousel-marquee--reverse" : ""
                }`}
              >
                <div className="auto-carousel-track">
                  <div className="auto-carousel-group">
                    {[...testimonials, ...testimonials].map((t, i) => (
                      <div
                        key={i}
                        className="auto-carousel-card"
                        style={{ "--enter-delay": `${i * 80}ms` }}
                      >
                        <div className="auto-carousel-card-header">
                          <img src={t.avatar} alt={t.name} />
                          <div>
                            <p className="auto-carousel-name">{t.name}</p>
                            <p className="auto-carousel-handle">{t.handle}</p>
                          </div>
                        </div>
                        <p className="auto-carousel-text">{t.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </article>
        </div>
      </div>
    </div>
  );
};

export default AutoCarousel;
