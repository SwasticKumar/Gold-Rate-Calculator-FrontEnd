import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VerifyRandomString() {
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");
  const navigate = useNavigate();
  const { randomString } = useParams();

  useEffect(() => {
    async function verifyRandomString() {
      try {
        const response = await axios.get(
          `https://gold-rate-calculator-backend.onrender.com/api/user/verifyRandomString/${randomString}`
        );

        if (response.data.message === "Random String Verified") {
          // If the random string is verified, display a success message
          toast.success("Random String Verified Successfully", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setVerificationStatus("Random String Verified");
        } else {
          // If verification fails, display an error message
          setVerificationStatus("Random String Verification Failed");
          toast.error("Random String Verification Failed", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (error) {
        // Handle API request error
        setVerificationStatus("Random String is Invalid or Expires");
        toast.error("Random String is Invalid or Expires", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.error(error);
      }
    }

    if (randomString) {
      verifyRandomString();
    }
  }, [randomString]);

  // Handle the "Continue" button click
  const handleContinueClick = () => {
    navigate(`/resetPassword/${randomString}`);
  };

  return (
    <div className="bg-color">
    <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5 py-md-0">
      <div className="content row gx-0">
        <div className="col-md-5">
          <div className="bg-login text-white h-100 d-flex align-items-center justify-content-center flex-column p-5 text-center">
            <h2 className="mb-3 fw-bold"> Back to</h2>
            <Link to="/forgotPassword">
              <button className="btn btn-outline-light fw-bold rounded-pill py-2 px-4">
                Send Reset Link
              </button>
            </Link>
          </div>
        </div>
        <div className="col-md-7 bg-light">
          <div className="text-center p-5">
            <h1 className="text-secondary fw-bolder">Verify Random String</h1>
            <p className="mt-3">{verificationStatus}</p>
            {verificationStatus === "Random String Verified" && (
              <button
                onClick={handleContinueClick}
                className="btn-style text-center mt-3 w-100"
              >
                Continue to Reset Password
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
