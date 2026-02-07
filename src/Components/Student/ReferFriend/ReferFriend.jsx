import "./ReferFriend.css";

import ShareButton from "../../CustomComponents/Buttons/ShareButton/ShareButton";

const ReferFriend = () => {
  const referralLink = "https://refer.eduskillprep.com/sahil-student";
  return (
    <div className="refer-friend-page">
      {/* Header */}
      <div className="refer-friend-header">
        <h1 className="refer-friend-title">Refer a Friend</h1>
        <p className="refer-friend-subtitle">
          Invite friends and earn rewards together
        </p>
      </div>

      {/* Main Card */}
      <div className="refer-friend-card">
        {/* Left Lottie */}
        <div className="refer-friend-lottie-wrapper">
          <dotlottie-wc
            src="https://lottie.host/0042e4e4-2f3c-4713-92a2-7aaf3c76bfed/8M4rWSJSSE.lottie"
            autoplay
            loop
            className="refer-dotlottie-wc"
            style={{ width: "440px", height: "440px" }}
          />
        </div>

        {/* Right Content */}
        <div className="refer-friend-content">
          <h2 className="refer-friend-heading">Give 20%, Get 20%</h2>

          <p className="refer-friend-description">
            Share your referral link with a friend. When they join, both of you
            get <strong>20% off</strong> on premium learning plans.
          </p>

          {/* INPUT (same pattern as admin page) */}
          <div className="refer-friend-input-wrapper">
            <label>Your referral link</label>
            <input
              type="text"
              value={referralLink}
              readOnly
            />
            <ShareButton link={referralLink}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferFriend;
