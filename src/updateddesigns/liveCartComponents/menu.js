import React, { useContext, useEffect, useState } from "react";
import firebase from "../../config";
import MenuItem from "./menuItem";
import CategoryItem from './categoryItem'
import { liveCartContext } from "./contexts";

const Menu = () => {
  const [itemList, setItemsList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [loading, setLoading] = useState(false)
  const cartList = useContext(liveCartContext);
  const getItems = async () => {
    setLoading(true)
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");
    await firebase
      .firestore()
      .collection("menuitems")
      .where("sessionId", "==", sessionId)
      .where("businessId", "==", businessId)
      .get()
      .then((snapshot) => {
        setLoading(true)
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
            // recommenditem:childSnapShot.data(). recommenditem,
            recommendations: childSnapShot.data().recommendations,
            created_on: childSnapShot.data().created_on,
          };
          data.push(Products);
        });
        setItemsList(data)
      });
  };
  const getCategories = () => {
    var sessionId = sessionStorage.getItem("RoleId");
    var businessId = sessionStorage.getItem("businessId");
    firebase
      .firestore()
      .collection("categories")
      .where("sessionId", "==", sessionId)
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
        setCategoryList(data)
      })
      .catch((err) => {
        console.log(err)
      });
  }
  const handleCategoryClick = (category) => {

  }
  useEffect(()=>{
    console.log(itemList)
    console.log(categoryList)
  }, [itemList, categoryList])
  useEffect(() => {
    getItems();
    getCategories()

  }, []);
  return (
    <div className="row m-t-20">
      <div className="col-md-12 menu_category_block">
        <div className="category_menu_search">
          <span className="cate_menu">
            <a href="#" className="current">
              Menu
            </a>{" "}
            <i className="fa fa-caret-right" aria-hidden="true"></i>
            <a href="#">Category 1</a>{" "}
            <i className="fa fa-caret-right" aria-hidden="true"></i>
            <a href="#">Category 2</a>
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
        </div>
        <div className="cate_images_blk">
          <div className="row" id="myDIV1">
            {categoryList && categoryList.map((category, index) => {
              return <CategoryItem key={index} item={category} onClick={handleCategoryClick}/>
            })
            }
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
