import React, { useContext, useEffect, useState } from 'react'
import firebase from '../../config'
import MenuItem from './menuItem'
import {liveCartContext} from './contexts'

const Menu = () => {
    const [state, setState] = useState({})
    const cartList = useContext(liveCartContext)
    const getItems = async () => {
        setState({loading: false})
        var ref = await firebase.database().ref('merchant_menu_items')
        ref.on("value", snapshot => {
            const data = [];
            snapshot.forEach(childSnapShot => {

                const Products = {
                    itemId: childSnapShot
                    .key
                    .toString(),
                    item_id:childSnapShot.val().item_id,
                    item_name:childSnapShot.val().item_name,
                    item_description:childSnapShot.val().item_description,
                    item_halal:childSnapShot.val().item_halal,
                    item_image:childSnapShot.val().item_image,
                    item_points:childSnapShot.val().item_points,

                    station_name:childSnapShot.val().station_name,
                    item_restaurant_id:childSnapShot.val().item_restaurant_id,
                    item_type:childSnapShot.val().item_type,
                    item_hash_tags:childSnapShot.val().item_hash_tags,
                    item_price:childSnapShot.val().item_price,
                    item_tax:childSnapShot.val().item_tax,

                    category:childSnapShot.val().category,
                    sub_category:childSnapShot.val().sub_category,


                    sessionId:childSnapShot.val().sessionId,
                    status: childSnapShot.val().status,
                    username:childSnapShot.val().username,



                    portions:childSnapShot.val().portions,
                    portions_details:childSnapShot.val().portions_details,



                    advance:childSnapShot.val().advance,
                    carbs:childSnapShot.val().carbs,
                    protien:childSnapShot.val().protien,
                    fat:childSnapShot.val().fat,
                    item_video:childSnapShot.val().item_video,
                    item_multiple_image:childSnapShot.val().downloadURLs,
                    extra:childSnapShot.val().extra,
                    healthytag:childSnapShot.val().healthytag,
                    bestsellertag:childSnapShot.val().bestsellertag,
                    recommend:childSnapShot.val().recommend,
                    // recommenditem:childSnapShot.val(). recommenditem,
                    recommendations:childSnapShot.val().recommendations,
                    created_on:childSnapShot.val().created_on,
                };
                data.push(Products);
            });
            setState({itemList: data, loading: false});
        }) 
    }
  
    useEffect(() => {
        getItems()
    }, [])
    return(
        <div className="row m-t-20">
            <div className="col-md-12 menu_category_block">
                <div className="category_menu_search">
                    <span className="cate_menu">
                        <a href="#" className="current">Menu</a> <i className="fa fa-caret-right" aria-hidden="true"></i>
                        <a href="#">Category 1</a> <i className="fa fa-caret-right" aria-hidden="true"></i>
                        <a href="#">Category 2</a>
                    </span>
                    <span className="cate_search">
                        <input type="text" id="myInput1" placeholder="Search" />
                        <a href="#" className="search_icon"><i className="fas fa-search"></i></a>
                    </span>
                    <span className="livecart_box">Items in Live Cart <span className="number">{cartList.length}</span></span>
                </div>
                <div className="cate_images_blk">
                    <div className="row" id="myDIV1">
                        {state.itemList && state.itemList.map((item, index) => {
                            return (
                                <MenuItem key={index} item={item} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>)
}
export default Menu