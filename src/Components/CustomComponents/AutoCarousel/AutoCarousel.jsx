import { useEffect, useRef } from "react";
import "./AutoCarousel.css";

const testimonials = [
  {
    name: "Liam Brooks",
    handle: "@liambrooks",
    text: "Setup was ridiculously easy. Within 10 minutes, we were running live...",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Sophia Carter",
    handle: "@sophiacodes",
    text: "This SaaS app has completely streamlined our onboarding...",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    name: "Ethan Walker",
    handle: "@ethanwrites",
    text: "We've tried several tools before, but nothing comes close...",
    avatar: "https://i.pravatar.cc/100?img=48",
  },
  {
    name: "Maya Patel",
    handle: "@mayapatel",
    text: "The automation features alone have saved our team countless...",
    avatar: "https://i.pravatar.cc/100?img=22",
  },
];

const useAutoScroll = (ref, speed = 0.3, reverse = false) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let x = 0;
    const totalWidth = el.scrollWidth / 2;

    let rafId;
    const animate = () => {
      x += reverse ? speed : -speed;

      if (Math.abs(x) >= totalWidth) {
        x = 0;
      }

      el.style.transform = `translate3d(${x}px, 0, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [ref, speed, reverse]);
};

const Row = ({ reverse = false }) => {
  const trackRef = useRef(null);
  useAutoScroll(trackRef, 0.35, reverse);

  return (
    <div className="auto-carousel-row">
      <div className="auto-carousel-track" ref={trackRef}>
        {[...testimonials, ...testimonials].map((item, index) => (
          <div className="auto-carousel-card" key={index}>
            <div className="auto-carousel-user">
              <img src={item.avatar} alt={item.name} />
              <div>
                <div className="auto-carousel-name">
                  {item.name}
                  <span className="auto-carousel-badge">✔</span>
                </div>
                <div className="auto-carousel-handle">{item.handle}</div>
              </div>
            </div>
            <p className="auto-carousel-text">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const AutoCarousel = () => {
  return (
    <div className="auto-carousel-wrapper">
      <Row />
      <Row reverse />
    </div>
  );
};

export default AutoCarousel;
