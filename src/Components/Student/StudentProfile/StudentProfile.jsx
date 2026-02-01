import "./StudentProfile.css";
import EditButton from "../../CustomComponents/Buttons/EditButton/EditButton";
import BackButton from "../../CustomComponents/Buttons/BackButton/BackButton";

const StudentProfile = () => {
  return (
    <div className="student-profile-container">
      <BackButton/>
      {/* Page Header */}
      <div className="student-profile-header">
        <h1 className="student-profile-heading">My Profile</h1>
        <p className="student-profile-subheading">
          Complete your Profile or This is the student profile page.
        </p>
      </div>

      {/* PROFILE HEADER */}
      <div className="profile-header card">
        <div className="section-header">
          <h3>Profile Information</h3>
          <EditButton onClick={() => console.log("Edit Profile Info")} />
        </div>

        <div className="profile-header-top">
          <div className="profile-left">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Sahil"
              className="profile-avatar"
            />

            <div className="profile-basic-info">
              <h2>Sahil</h2>
              <span className="username">@sahil</span>
              <p>sahil@example.com</p>
              <p>+91 98765 43210</p>
            </div>
          </div>
        </div>

        <div className="profile-meta">
          <Meta label="Gender" value="Male" />
          <Meta label="Enrollment Date" value="12 Aug 2023" />
          <Meta label="Enrolled Courses" value="6" />
        </div>
      </div>

      {/* DETAILS */}
      <div className="profile-details">
        {/* PERSONAL DETAILS */}
        <div className="card">
          <div className="section-header">
            <h3>Personal Details</h3>
            <EditButton onClick={() => console.log("Edit Personal Details")} />
          </div>

          <div className="details-grid">
            <Detail label="Full Name" value="Sahil" />
            <Detail label="Father Name" value="Rajesh Sharma" />
            <Detail label="Mother Name" value="Sunita Sharma" />
            <Detail label="Date of Birth" value="18 Feb 2002" />
            <Detail label="Nationality" value="Indian" />
            <Detail label="Blood Group" value="O+" />
          </div>
        </div>

        {/* ADDRESS */}
        <div className="card">
          <div className="section-header">
            <h3>Address</h3>
            <EditButton onClick={() => console.log("Edit Address")} />
          </div>

          <p className="address">
            Flat 402, Green Valley Apartments <br />
            MG Road, Indore <br />
            Madhya Pradesh, India – 452001
          </p>
        </div>
      </div>
    </div>
  );
};

/* Small reusable components */
const Detail = ({ label, value }) => (
  <div className="detail-item">
    <span className="detail-label">{label}</span>
    <span className="detail-value">{value}</span>
  </div>
);

const Meta = ({ label, value }) => (
  <div className="meta-item">
    <span className="meta-label">{label}</span>
    <span className="meta-value">{value}</span>
  </div>
);

export default StudentProfile;
