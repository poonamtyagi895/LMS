import "./InfoCard.css";

const InfoCard = ({ icon, heading, subheading }) => {
  return (
    <div className="info-card">
      <div className="info-card-icon">
        <i className={`fas ${icon}`}></i>
      </div>

      <div className="info-card-content">
        <h4>{heading}</h4>
        <p>{subheading}</p>
      </div>
    </div>
  );
};

export default InfoCard;
