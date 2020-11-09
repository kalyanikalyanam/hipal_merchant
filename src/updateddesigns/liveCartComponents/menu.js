import React, { useContext, useEffect, useState } from 'react'
import firebase from '../../config'
import MenuItem from './menuItem'
import {liveCartContext} from './contexts'

const Menu = () => {
    const [state, setState] = useState({})
    const cartList = useContext(liveCartContext)
    const getItems = async () => {
        setState({ loading: false })
        var snapshot = await firebase.firestore().collection('menuitems').get()
        const data = [];
        console.log(snapshot)
        snapshot.forEach(childSnapShot => {
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

                category: childSnapShot.data().category,
                sub_category: childSnapShot.data().sub_category,


                sessionId: childSnapShot.data().sessionId,
                status: childSnapShot.data().status,
                username: childSnapShot.data().username,



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
                // recommenditem:childSnapShot.val(). recommenditem,
                recommendations: childSnapShot.data().recommendations,
                created_on: childSnapShot.data().created_on,
            };
            data.push(Products);
        });
        setState({ itemList: data, loading: false });
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
                        {state.itemList && state.itemList.length !== 0 ? state.itemList.map((item, index) => {
                            return (
                                <MenuItem key={index} item={item} />
                            )
                        }) : <div>Add Menu Items</div>}
                    </div>
                </div>
            </div>
        </div>)
}
export default Menu