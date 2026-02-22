import "./BounceLoader.css";

const BounceLoader = ({ size = 200 }) => {
  return (
    <div
      className="bounce-loader-wrapper"
      style={{ width: `${size}px`, height: `${size * 0.3}px` }}
    >
      <div className="bounce-loader-circle"></div>
      <div className="bounce-loader-circle"></div>
      <div className="bounce-loader-circle"></div>

      <div className="bounce-loader-shadow"></div>
      <div className="bounce-loader-shadow"></div>
      <div className="bounce-loader-shadow"></div>
    </div>
  );
};

export default BounceLoader;