import { Steps } from "antd";


// eslint-disable-next-line react/prop-types
function StepsComponent({ current }) {
  return (
    <div className="ConsignmentPageContainer__Steps">
      <Steps
        className="Steps"
        direction="horizontal"
        current={current}
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
  );
}

export default StepsComponent;
