import "./ReferFriend.css";

const ReferFriend = () => {
  const referralLink = "https://refer.udemy.com/parasgupta618";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      alert("Referral link copied!");
    } catch (err) {
      alert("Failed to copy link");
    }
  };

  return (
    <>
      {/* Header (same style idea as StudentDashboard) */}
      <div className="refer-friend-header">
        <h1 className="refer-friend-title">Refer a Friend</h1>
        <p className="refer-friend-subtitle">
          Invite friends and earn rewards together
        </p>
      </div>

      {/* Main Card */}
      <div className="refer-friend-card">
        {/* Left Image Section */}
        <div className="refer-friend-image-wrapper">
          <img
            src="/images/student/1.jpg"
            alt="Learning together"
            className="refer-friend-image"
          />
        </div>

        {/* Right Content Section */}
        <div className="refer-friend-content">
          <h2 className="refer-friend-heading">
            Give 20%, Get 20%
          </h2>

          <p className="refer-friend-description">
            Share your referral link with a friend. When they join, both of you
            get <strong>20% off</strong> on premium learning plans.
          </p>

          {/* Referral Link Box */}
          <div className="refer-friend-link-box">
            <span className="refer-friend-link">
              {referralLink}
            </span>
            <button
              className="refer-friend-copy-btn"
              onClick={handleCopy}
              type="button"
            >
              Copy
            </button>
          </div>

          {/* Social Icons */}
          <div className="refer-friend-socials">
            <button className="refer-friend-social-btn">X</button>
            <button className="refer-friend-social-btn">WhatsApp</button>
            <button className="refer-friend-social-btn">Pinterest</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferFriend;
