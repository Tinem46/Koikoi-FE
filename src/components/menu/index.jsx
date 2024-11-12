/* eslint-disable react/prop-types */
import { Input, Select, Button } from "antd";
import "./index.scss";
import { useEffect, useState } from "react";
import api from "../../config/api";
import Card from "../../card";

// MenuForShop component: hiển thị menu và danh sách cá Koi được lọc
function MenuForShop({ selectedMenu, setSelectedMenu, resetFish }) {
  // State quản lý danh sách cá Koi và kết quả lọc
  const [fish, setFish] = useState([]);
  const [filteredFish, setFilteredFish] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [sortOrder, setSortOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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
      setSortOrder(null);
    }
  }, [resetFish, fish, setSelectedMenu]);

  // Thêm useEffect để xử lý tìm kiếm khi searchTerm thay đổi
  useEffect(() => {
    let results = [...fish];

    // Lọc theo danh mục nếu có
    if (selectedMenu && selectedMenu !== "all") {
      results = results.filter(
        (item) => item.category.toLowerCase() === selectedMenu.toLowerCase()
      );
    }

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      results = results.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFish(results);
    setVisibleCount(36);
  }, [searchTerm, selectedMenu, fish]);

  const sortOptions = [
    { value: "", label: "Default" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
  ];

  const categories = [
    { value: "all", label: "All Koi" },
    { value: "kohaku", label: "Kohaku" },
    { value: "sanke", label: "Sanke" },
    { value: "showa", label: "Showa" },
    { value: "tancho", label: "Tancho" },
    { value: "utsurimono", label: "Utsurimono" },
    { value: "asagi", label: "Asagi" },
  ];

  // Thay đổi hàm xử lý sự kiện
  const handleCategoryChange = (value) => {
    let newFilteredFish = [...fish];

    if (value && value !== "all") {
      newFilteredFish = fish.filter(
        (item) => item.category.toLowerCase() === value.toLowerCase()
      );
    }

    setSelectedMenu(value);
    setFilteredFish(newFilteredFish);
    setVisibleCount(4);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    let newFilteredFish = [...filteredFish];

    if (value) {
      newFilteredFish.sort((a, b) => {
        return value === "price_asc" ? a.price - b.price : b.price - a.price;
      });
    }

    setFilteredFish(newFilteredFish);
  };

  // Hàm xử lý khi bấm "Show More"
  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <>
      <div className="containerMenuAndFishList">
        <div className="filterSection">
          <div className="category-buttons"> 
            <Select
            className="sort-select"
            placeholder="Sort by"
            onChange={handleSortChange}
            value={sortOrder}
            options={sortOptions}
          />
            {categories.map((category) => (
              <Button
                key={category.value}
                className={`category-button ${
                  selectedMenu === category.value ? "active" : ""
                }`}
                onClick={() => handleCategoryChange(category.value)}
              >
                {category.label}
              </Button>
            ))}
          </div>
         
        </div>
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
