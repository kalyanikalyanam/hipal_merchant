import React from 'react'


const CategoryItem = ({item, onClick}) => {
    
    return(
        <div className="col-md-4 mb-15" onClick={() => {onClick(item)}}>
            <div className="cate_img_box item">
                <img src={item.photo} />
                <div className="item_name">
                    <span>{item.name}</span>
                </div>
            </div>
        </div>
    )
}

export default CategoryItem