import "./HomePage.css";
import Header from "../../WebsiteComponents/Header/Header";
import Wave from "../../WebsiteComponents/Wave/Wave";

const HomePage = () => {
  return (
    <div className="home-page">
      <Wave>
        <Header />
      </Wave>
    </div>
  );
};

export default HomePage;
