import { Button, Steps } from "antd";
import "./index.scss";
import backgroundStep2 from "../../assets/image/BackgroundStep2.webp";
import { useNavigate } from "react-router-dom";

function ConsignmentPage() {
  const navigate = useNavigate();

  const handleOfflineConsignment = () => {
    navigate("/consignmentForm", { state: { consignmentType: "Offline Consignment" } });
  };

  const handleOnlineConsignment = () => {
    navigate("/consignmentForm", { state: { consignmentType: "Online Consignment" } });
  };

  return (
    <div className="ConsignmentPageContainer">
      <img src={backgroundStep2}></img>
      <div className="ConsignmentPageContainer__content">
        <h1>Consignment With Us</h1>
        <div className="ConsignmentPageContainer__Steps">
          <Steps
            className="Steps"
            direction="horizontal"
            current={0}
            type="navigation"
            items={[
              {
                title: "Choose Your Plan",
              },
              {
                title: "Fill Your Information",
              },
              {
                title: "Payment",
              },
            ]}
          />
        </div>
        <div className="ConsignmentPageContainer__content__options">
          <div className="ConsignmentPageContainer__content__options__offline">
            <h3>Offline Consignment (Regular Customers):</h3>
            <p>
              Customers bring their Koi fish directly to the farm for consignment. 
              Our staff will inspect the condition of the fish, evaluate its quality, 
              and negotiate the selling price with the customer. The Koi will then be 
              cared for at the farm and sold directly to potential buyers at the farm.
            </p>
            <Button
              size="large"
              className="twoButton"
              type="primary"
              onClick={handleOfflineConsignment}
            >
              Offline Consignment
            </Button>
          </div>

          <div className="ConsignmentPageContainer__content__options__online">
            <h3>Online Consignment (Business Customers):</h3>
            <p>
              Customers can consign their Koi fish through our online platform (website or app). 
              The system allows customers to enter details about their Koi, such as type, size, 
              health status, and desired selling price. The Koi will be listed on the website 
              for other customers to view and purchase. Upon a successful sale, the customer 
              will be notified, and the profit will be shared according to the agreement 
              between the farm and the customer.
            </p>
            <Button
              size="large"
              className="twoButton"
              type="primary"
              onClick={handleOnlineConsignment}
            >
              Online Consignment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsignmentPage;
