import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../footer";
import Header from "../header";
import CompareModal from "../CompareModal";
import "./index.scss";

function Layout() {
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const compareItems = useSelector((state) => state.compare.items);

  return (
    <div className="layout">
      <Header />
      <div className="layout__container">
        <Outlet />
        {compareItems.length > 0 && (
          <div className="layout__compare-button-container">
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="layout__compare-button"
            >
              Compare ({compareItems.length})
            </button>
          </div>
        )}
      </div>
      <Footer style = {{height: "100dvh"}}/>
      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
      />
    </div>
  );
}

export default Layout;
