import { useState } from "react";
import "./StudentProfile.css";
import BackButton from "../../CustomComponents/Buttons/BackButton/BackButton";
import EditButton from "../../CustomComponents/Buttons/EditButton/EditButton";
import DotButton from "../../CustomComponents/Buttons/DotButton/DotButton";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Loader2 from "../../CustomComponents/Loaders/Loader2";
import { showToast } from "../../CustomComponents/CustomToast/CustomToast";
import Calendar from "../../CustomComponents/Calendar/Calendar";

const StudentProfile = () => {
  const [editBox, setEditBox] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [tempProfile, setTempProfile] = useState(null);
  const [showDobPicker, setShowDobPicker] = useState(false);

  const [profile, setProfile] = useState({
    name: "Sahil",
    email: "sahil@gmail.com",
    phone: "",
    gender: "Male",
    dob: "",
    bloodGroup: "",
    nationality: "",
    fatherName: "",
    motherName: "",
    enrollmentDate: new Date().toISOString().split("T")[0],
    enrolledCourses: 0,
    address: "",
  });

  const isProfileCompleted =
    profile.phone &&
    profile.gender &&
    profile.dob &&
    profile.address;

  const handleChange = (field, value) => {
    setTempProfile({ ...tempProfile, [field]: value });
  };

  const startEdit = (box) => {
    setTempProfile({ ...profile });
    setEditBox(box);
  };

  const handleProfileSave = () => {
    if (!tempProfile.name.trim()) {
      showToast("error", "Name is required");
      return;
    }

    if (tempProfile.phone && !/^\d{10}$/.test(tempProfile.phone)) {
      showToast("error", "Phone number must be 10 digits");
      return;
    }

    setShowLoader(true);

    setTimeout(() => {
      setProfile({ ...tempProfile });
      setTempProfile(null);
      setEditBox(null);
      setShowLoader(false);
      showToast("success", "Profile information updated");
    }, 700);
  };

  const handlePersonalSave = () => {
    setShowLoader(true);

    setTimeout(() => {
      setProfile({ ...tempProfile });
      setTempProfile(null);
      setEditBox(null);
      setShowLoader(false);
      showToast("success", "Personal details updated");
    }, 700);
  };

  return (
    <div className="student-profile-page">
      {showLoader && <Loader2 />}
      <BackButton />

      {/* HEADER */}
      <div className="student-profile-header">
        <h1>My Profile</h1>
        <p>
          {isProfileCompleted
            ? "Profile Completed! This is the student profile page"
            : "Complete your Profile"}
        </p>
      </div>

      {/* PROFILE INFORMATION */}
      <div className="student-profile-card student-profile-information">
        <div className="student-profile-card-header">
          <h3>Profile Information</h3>

          {editBox === "profile" ? (
            <DotButton
              label="Save"
              small
              onClick={() => handleProfileSave()}
            />
          ) : (
            <EditButton onClick={() => startEdit("profile")} />
          )}
        </div>

        <div className="student-profile-info-content">
          {/* BIG LOTTIE */}
          <div className="student-profile-avatar-large">
            <DotLottieReact
              src="https://lottie.host/f2ffc4a9-3e7d-4eee-95f7-4aeaac63e5da/y0dA0Bl62z.lottie"
              autoplay
              loop
            />
          </div>

          {/* DETAILS */}
          <div className="student-profile-basic-details">
            {/* NAME */}
            <div className="student-profile-field">
              <label>Name</label>
              {editBox === "profile" ? (
                <input
                  value={editBox === "profile" ? tempProfile.name : profile.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              ) : (
                <p>{profile.name}</p>
              )}
            </div>

            {/* EMAIL (NOT EDITABLE) */}
            <div className="student-profile-field">
              <label>Email</label>
              <p>{profile.email}</p>
            </div>

            {/* PHONE */}
            <div className="student-profile-field">
              <label>Phone</label>
              {editBox === "profile" ? (
                <input
                  placeholder="Enter phone number"
                  value={editBox === "profile" ? tempProfile.phone : profile.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              ) : (
                <p
                  className={
                    profile.phone ? "student-profile-value" : "student-profile-muted"
                  }
                >
                  {profile.phone || "Not added"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DETAILS GRID */}
      <div className="student-profile-grid">
        {/* PERSONAL DETAILS */}
        <div className="student-profile-card student-personal-details">
          <div className="student-profile-card-header">
            <h3>Personal Details</h3>
            {editBox === "personal" ? (
              <DotButton label="Save" onClick={handlePersonalSave} />
            ) : (
              <EditButton onClick={() => startEdit("personal")} />
            )}
          </div>
          <div className="student-profile-row">
            <span className="student-profile-label">Gender</span>

            {editBox === "personal" ? (
              <select
                value={tempProfile.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <span>{profile.gender}</span>
            )}
          </div>
          <div className="student-profile-row">
            <span className="student-profile-label">Date of Birth</span>

            {editBox === "personal" ? (
              <div className="dob-picker-wrapper">
                <input
                  readOnly
                  placeholder="Select date"
                  value={tempProfile.dob || ""}
                  onClick={() => setShowDobPicker(!showDobPicker)}
                />

                {showDobPicker && (
                  <div className="dob-calendar-popover">
                    <Calendar
                      mode="picker"
                      onSelectDate={(date) => {
                        if (!date) {
                          handleChange("dob", "");
                        } else {
                          handleChange(
                            "dob",
                            date.toISOString().split("T")[0]
                          );
                        }
                        setShowDobPicker(false);
                      }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <span
                className={
                  profile.dob ? "student-profile-value" : "student-profile-muted"
                }
              >
                {profile.dob || "Not added"}
              </span>
            )}
          </div>
          <div className="student-profile-row">
            <span className="student-profile-label">Blood Group</span>
            {editBox === "personal" ? (
              <select
                value={tempProfile.bloodGroup}
                onChange={(e) => handleChange("bloodGroup", e.target.value)}
              >
                <option value="">Select</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            ) : (
              <span
                className={
                  profile.bloodGroup
                    ? "student-profile-value"
                    : "student-profile-muted"
                }
              >
                {profile.bloodGroup || "Not added"}
              </span>
            )}
          </div>
          <ProfileField
            label="Father Name"
            value={editBox === "personal" ? tempProfile.fatherName : profile.fatherName}
            editable={editBox === "personal"}
            onChange={(v) => handleChange("fatherName", v)}
          />
          <ProfileField
            label="Mother Name"
            value={editBox === "personal" ? tempProfile.motherName : profile.motherName}
            editable={editBox === "personal"}
            onChange={(v) => handleChange("motherName", v)}
          />
        </div>

        {/* ACADEMIC DETAILS */}
        <div className="student-profile-card student-academic-details">
          <div className="student-profile-card-header">
            <h3>Academic Details</h3>
          </div>

          <ProfileField
            label="Enrollment Date"
            value={profile.enrollmentDate}
          />

          <ProfileField
            label="Enrolled Courses"
            value={String(profile.enrolledCourses)}
          />
        </div>
      </div>

      {/* ADDRESS */}
      <div className="student-profile-card student-address-details">
        <CardHeader
          title="Address"
          isEditing={editBox === "address"}
          onEdit={() => startEdit("address")}
          onSave={() => {
            setShowLoader(true);
            setTimeout(() => {
              setProfile({ ...tempProfile });
              setTempProfile(null);
              setEditBox(null);
              setShowLoader(false);
              showToast("success", "Address updated");
            }, 700);
          }}
        />
        {editBox === "address" ? (
          <textarea
            placeholder="Enter address"
            value={tempProfile?.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        ) : (
          <p className="student-profile-muted">
            {profile.address || "Address not added"}
          </p>
        )}
      </div>
    </div>
  );
};

/* ---------- Reusable ---------- */

const CardHeader = ({ title, isEditing, onEdit, onSave }) => (
  <div className="student-profile-card-header">
    <h3>{title}</h3>
    {isEditing ? (
      <DotButton label="Save" onClick={onSave} />
    ) : (
      <EditButton onClick={onEdit} />
    )}
  </div>
);

const ProfileField = ({ label, value, editable, onChange }) => (
  <div className="student-profile-row">
    <span className="student-profile-label">{label}</span>
    {editable ? (
      <input
        value={value}
        placeholder={`Enter ${label}`}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <span
        className={
          value !== "" && value !== null && value !== undefined
            ? "student-profile-value"
            : "student-profile-muted"
        }
      >
        {value || "Not added"}
      </span>
    )}
  </div>
);

export default StudentProfile;
