import { useEffect, useState } from "react";
import { Spin, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.scss";

function PendingPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2-second delay
    return () => clearTimeout(timer); // Clear timer on unmount
  }, []);

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className="pending-page">
      {loading ? (
        <Spin className="pending-page__spinner" tip="Waiting for pending..." size="large" />
      ) : (
        <div className="pending-page__content">
          <div className="pending-page__confirmation-message">
            Wait for Our Confirmation
          </div>
          <Button
            type="primary"
            className="pending-page__return-button"
            onClick={handleReturnHome}
          >
            Return to Home
          </Button>
        </div>
      )}
    </div>
  );
}

export default PendingPage;
