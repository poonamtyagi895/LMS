import "./DashboardInfoCard.css";

const DashboardInfoCard = ({ icon, heading, subheading }) => {
  return (
    <div className="dashboard-info-card">
      <div className="dashboard-info-card-icon">
        <i className={`fas ${icon}`}></i>
      </div>

      <div className="dashboard-info-card-content">
        <h4>{heading}</h4>
        <p>{subheading}</p>
      </div>
    </div>
  );
};

export default DashboardInfoCard;
