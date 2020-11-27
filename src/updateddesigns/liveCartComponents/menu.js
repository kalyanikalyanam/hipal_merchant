import { db } from "../../config";
import React, { useContext, useEffect, useState } from "react";
import MenuItem from "./menuItem";
import CategoryItem from "./categoryItem";
import { liveCartContext } from "./contexts";

const Menu = () => {
  const [itemList, setItemsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [permanentCategoryList, setPermanentCategoryList] = useState([]);
  const [permanentItemList, setPermanentItemList] = useState([]);
  const cartList = useContext(liveCartContext);
  const [selected, setSelected] = useState([]);
  const getItems = async () => {
    var businessId = sessionStorage.getItem("businessId");
    await db
      .collection("menuitems2")
      .where("businessId", "==", businessId)
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((childSnapShot) => {
          const Products = {
            itemId: childSnapShot.id,
            item_id: childSnapShot.data().item_id,
            item_name: childSnapShot.data().item_name,
            item_description: childSnapShot.data().item_description,
            item_halal: childSnapShot.data().item_halal,
            item_image: childSnapShot.data().item_image,
            item_points: childSnapShot.data().item_points,

            station_name: childSnapShot.data().station_name,
            item_restaurant_id: childSnapShot.data().item_restaurant_id,
            item_type: childSnapShot.data().item_type,
            item_hash_tags: childSnapShot.data().item_hash_tags,
            item_price: childSnapShot.data().item_price,
            item_tax: childSnapShot.data().item_tax,

            sessionId: childSnapShot.data().sessionId,
            status: childSnapShot.data().status,
            username: childSnapShot.data().username,
            categoryId: childSnapShot.data().categoryId,
            portions: childSnapShot.data().portions,
            portions_details: childSnapShot.data().portions_details,

            advance: childSnapShot.data().advance,
            carbs: childSnapShot.data().carbs,
            protien: childSnapShot.data().protien,
            fat: childSnapShot.data().fat,
            item_video: childSnapShot.data().item_video,
            item_multiple_image: childSnapShot.data().downloadURLs,
            extra: childSnapShot.data().extra,
            healthytag: childSnapShot.data().healthytag,
            bestsellertag: childSnapShot.data().bestsellertag,
            recommend: childSnapShot.data().recommend,
            categoryId: childSnapShot.data().categoryId,
            recommendations: childSnapShot.data().recommendations,
            created_on: childSnapShot.data().created_on,
          };
          data.push(Products);
        });
        setPermanentItemList(data);
      });
  };
  const getCategories = () => {
    var businessId = sessionStorage.getItem("businessId");
    db.collection("categories2")
      .where("businessId", "==", businessId)
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((childSnapShot) => {
          const GSTData = {
            categoryId: childSnapShot.id,
            name: childSnapShot.data().name,
            isParent: childSnapShot.data().isParent,
            photo: childSnapShot.data().photo,
            color: childSnapShot.data().color,
            created_on: childSnapShot.data().created_on,
            parentId: childSnapShot.data().parentId,
            sessionId: childSnapShot.data().sessionId,
            username: childSnapShot.data().username,
            itemId: childSnapShot.data().itemId,
          };

          data.push(GSTData);
        });
        setPermanentCategoryList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBackClick = () => {
    let newSelected = selected;
    newSelected.pop();
    setSelected(newSelected);
    if (newSelected.length !== 0) {
      let newCategories = permanentCategoryList.filter(
        (cat) => cat.parentId === newSelected[newSelected.length - 1].categoryId
      );
      let newItems = permanentItemList;

      var cat = newSelected[newSelected.length - 1];

      newItems = newItems.filter((item) => {
        let flag = false;
        item.categoryId.forEach((c) => {
          if (c == cat.categoryId) flag = true;
        });
        return flag;
      });

      setCategoryList(newCategories);
      setItemsList(newItems);
    } else {
      handleHome();
    }
  };
  const handleCrumbClick = (index) => {
    let newSelected = [];
    for (var i = 0; i <= index; i++) {
      newSelected.push(selected[i]);
    }
    let newCategories = permanentCategoryList.filter(
      (cat) => cat.parentId === newSelected[newSelected.length - 1].categoryId
    );
    let newItems = permanentItemList;

    var cat = newSelected[newSelected.length - 1];

    newItems = newItems.filter((item) => {
      let flag = false;
      item.categoryId.forEach((c) => {
        if (c == cat.categoryId) flag = true;
      });
      return flag;
    });

    setCategoryList(newCategories);
    setItemsList(newItems);
    setSelected(newSelected);
  };

  const handleHome = () => {
    let newCategories = permanentCategoryList.filter(
      (category) => category.parentId === ""
    );
    setCategoryList(newCategories);
    let newItems = permanentItemList.filter(
      (item) => item.categoryId.length === 0
    );
    setItemsList(newItems);
    setSelected([]);
    console.log(newItems);
    console.log(permanentItemList);
  };
  const handleCategoryClick = (category) => {
    const id = category.categoryId;
    let newSelected = selected.concat(category);
    setSelected(newSelected);
    let newCategories = permanentCategoryList.filter(
      (cat) => cat.parentId === id
    );
    let newItems = permanentItemList;

    var cat = newSelected[newSelected.length - 1];

    newItems = newItems.filter((item) => {
      let flag = false;
      item.categoryId.forEach((c) => {
        if (c == cat.categoryId) flag = true;
      });
      return flag;
    });

    setCategoryList(newCategories);
    setItemsList(newItems);
    console.log("click");
  };

  useEffect(() => {
    handleHome();
    console.log("UseEffect");
  }, [permanentItemList, permanentCategoryList]);

  useEffect(() => {
    getItems();
    getCategories();
    console.log("componenetDid");
  }, []);
  return (
    <div className="row m-t-20">
      <div className="col-md-12 menu_category_block">
        <div className="category_menu_search">
          <span className="cate_menu">
            <a href="#" className="current" onClick={handleHome}>
              Menu
            </a>{" "}
            {selected.length !== 0 &&
              selected.map((cat, index) => {
                return (
                  <label key={index}>
                    <i className="fa fa-caret-right" aria-hidden="true"></i>
                    <a
                      onClick={() => {
                        handleCrumbClick(index);
                      }}
                    >
                      {cat.name}{" "}
                    </a>
                  </label>
                );
              })}
          </span>
          <span className="cate_search">
            <input type="text" id="myInput1" placeholder="Search" />
            <a href="#" className="search_icon">
              <i className="fas fa-search"></i>
            </a>
          </span>
          <span className="livecart_box">
            Items in Live Cart <span className="number">{cartList.length}</span>
          </span>
          <span className="pull-right m-r-5 m-t-5" onClick={handleBackClick}>
            <img src="/images/icon/back_arrow_orange.png" width="30" />
          </span>
        </div>
        <div className="cate_images_blk">
          <div className="row">
            {categoryList &&
              categoryList.map((category, index) => {
                return (
                  <CategoryItem
                    key={index}
                    item={category}
                    onClick={handleCategoryClick}
                  />
                );
              })}
            {itemList &&
              itemList.map((item, index) => {
                return <MenuItem key={index} item={item} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Menu;
