import React, {useState} from 'react'

const CategoryItem = ({item, onClick}) => {
    const [clickStyle, setClickStyle] = useState()
    const handleClick = () => {
        setClickStyle({
            boxShadow: '1px, 6px, 10px, rgba(96, 96, 0.1)',
            border: 'solid 3px'
        })
        setTimeout(() => {
            setClickStyle()
            onClick(item) 
        }, [100])
    }
    return (
        <div className="col-md-4 mb-15"  >
            <button 
                className="cate_img_box " 
                style={{ background: item.color, ...clickStyle }} 
                onClick={handleClick}>
                <img src={item.photo} alt="categoryPHoto" />
                <p>{item.name}</p>
            </button>
        </div>
    )
}

export default CategoryItem