/* eslint-disable react/prop-types */
import { Input, Menu, Button } from "antd";
import "./index.scss";
import { useEffect, useState } from "react";
import api from "../../config/api";
import Card from "../../card";

// MenuForShop component: hiển thị menu và danh sách cá Koi được lọc
function MenuForShop({ setSelectedMenu, resetFish }) {
  // State quản lý danh sách cá Koi và kết quả lọc
  const [fish, setFish] = useState([]);
  const [filteredFish, setFilteredFish] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  // Hàm fetch dữ liệu cá từ API
  const fetchFish = async () => {
    try {
      const response = await api.get("Koi");
      setFish(response.data);
      setFilteredFish(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect được gọi khi component mount lần đầu tiên
  useEffect(() => {
    fetchFish();
  }, []);

  // useEffect được gọi khi 'resetFish' thay đổi giá trị
  useEffect(() => {
    if (resetFish) {
      setFilteredFish(fish);
      setSelectedMenu("");
    }
  }, [resetFish, fish, setSelectedMenu]);

  // Cấu hình các items của Menu
  const items = [
    {
      label: <Input.Search placeholder="Search Your Koi" />,
      key: "search",
    },
    { label: "Kohaku", key: "kohaku" },
    { label: "Sanke", key: "sanke" },
    { label: "Showa", key: "showa" },
    { label: "Tancho", key: "tancho" },
    { label: "Utsurimono", key: "utsurimono" },
    { label: "Asagi", key: "asagi" },
    { label: "ca bu hoàng anh ngu", key: "ca bu hoàng anh ngu" },
  ];

  // Hàm xử lý sự kiện khi click vào menu
  const onClickMenu = (e) => {
    const clickedKey = e.key;
    if (clickedKey === "search") {
      setFilteredFish(fish);
      setSelectedMenu("");
    } else {
      const filtered = fish.filter(
        (item) => item.name.toLowerCase() === clickedKey.toLowerCase()
      );
      setFilteredFish(filtered);
      setSelectedMenu(clickedKey);
      setVisibleCount(4);
    }
  };

  // Hàm xử lý khi bấm "Show More"
  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <>
      <div className="containerMenuAndFishList">
        {/* Menu hiển thị danh sách các loại cá */}
        <Menu className="menuBar" onClick={onClickMenu} items={items} />
        <div className="menuFish-Config">
          <div className="menuFish">
            {filteredFish.slice(0, visibleCount).map((item) => (
              <Card key={item.id} fish={item} />
            ))}
          </div>
          {visibleCount < filteredFish.length && (
            <Button
              type="primary"
              onClick={showMore}
              size="large"
              className="showMoreButton"
            >
              Show More
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default MenuForShop;
