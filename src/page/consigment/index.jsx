import { Button } from "antd";
import "./index.scss";
import backgroundStep2 from "../../assets/image/BackgroundStep2.webp";
import { useNavigate } from "react-router-dom";
import StepsComponent from "../../components/steps";

function ConsignmentPage() {
  const navigate = useNavigate();

  const handleConsignmentCare = () => {
    navigate("/consignmentCare");
  };

  const handleOnlineConsignment = () => {
    navigate("/consignmentForm", { state: { consignmentType: "Online Consignment" } });
  };

  return (
    <div className="ConsignmentPageContainer">
      <img src={backgroundStep2}></img>
      <div className="ConsignmentPageContainer__content">
        <h1>Consignment With Us</h1>
        <StepsComponent current={0} />
        <div className="ConsignmentPageContainer__content__options">
          <div className="ConsignmentPageContainer__content__options__offline">
            <h3>Consignment Care</h3>
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
              onClick={handleConsignmentCare}
            >
             Consignment Care
            </Button>
          </div>

          <div className="ConsignmentPageContainer__content__options__online">
            <h3>Consignment Sell</h3>
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
              Consignment Sell
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsignmentPage;
