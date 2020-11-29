import React from 'react'

const CategoryItem = ({item, onClick}) => {
    return(
        <div className="col-md-4 mb-15" onClick={() => { onClick(item) }} >
            <div className="cate_img_box " style={{ background: item.color }}>
                <img src={item.photo} alt="categoryPHoto" />
                <p>{item.name}</p>
            </div>
        </div>
    )
}

export default CategoryItem