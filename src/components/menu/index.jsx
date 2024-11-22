/* eslint-disable react/prop-types */
import { Input, Select, Button } from "antd";
import "./index.scss";
import { useEffect, useState } from "react";
import api from "../../config/api";
import Card from "../../card";

function MenuForShop({ selectedMenu, setSelectedMenu, resetFish }) {
  const [fish, setFish] = useState([]);
  const [filteredFish, setFilteredFish] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [sortOrder, setSortOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchFish = async () => {
    try {
      const response = await api.get("Koi");
      setFish(response.data);
      setFilteredFish(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("KoiTypes");
      const categoryList = [
        { value: "All Koi", label: "All Koi" },
        ...response.data.map(cat => ({
          value: cat.category.toLowerCase(),
          label: cat.category
        }))
      ];
      setCategories(categoryList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFish();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (resetFish) {
      setFilteredFish(fish);
      setSelectedMenu("");
      setSortOrder(null);
    }
  }, [resetFish, fish, setSelectedMenu]);

  useEffect(() => {
    let results = [...fish];

    if (selectedMenu && selectedMenu !== "All Koi") {
      results = results.filter(
        (item) => item.category.toLowerCase() === selectedMenu.toLowerCase()
      );
    }

    if (searchTerm) {
      results = results.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFish(results);
  }, [searchTerm, selectedMenu, fish]);

  const sortOptions = [
    { value: "", label: "Default" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
  ];

  const handleCategoryChange = (value) => {
    let newFilteredFish = [...fish];

    if (value && value !== "all") {
      newFilteredFish = fish.filter(
        (item) => item.category.toLowerCase() === value.toLowerCase()
      );
    }

    setSelectedMenu(value);
    setFilteredFish(newFilteredFish);
    setVisibleCount(8);
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

  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <>
      <div className="containerMenuAndFishList">
        <div className="filterSection">
          <Input.Search
            className="Input-Menu"
            placeholder="Search Your Koi"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <div className="category-buttons">
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
          <Select
            className="sort-select"
            placeholder="Sort by"
            onChange={handleSortChange}
            value={sortOrder}
            options={sortOptions}
          />
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