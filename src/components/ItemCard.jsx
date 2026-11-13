import { Link } from "react-router-dom"

const ItemCard = ({ item, id, title, description, price, bidCount, seller }) => {
   
    return (
        <Link to={`/item/${id}`}>
        <div className="item-card">
            { <img src={item.imageUrl} className="item-image" /> }
            <div className="item-content">
                <span className="status-badge status-active">Активное</span>
                <h3 className="item-title">{item.title}</h3>
                <p className="item-description">{item.description}</p>
                <div className="item-footer">
                    <div>
                        <div className="item-price">{item.price}</div>
                        <div className="bid-info">
                            {item.price}
                            <span className="bid-count">{item.bidCount ?? 0}</span>
                        </div>
                    </div>
                    <div className="item-meta">
                        <span className="item-seller">Продавец: {item.username}</span>
                    </div>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default ItemCard
