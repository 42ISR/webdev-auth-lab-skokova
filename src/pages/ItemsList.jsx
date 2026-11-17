import { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard'
import { useItemStore } from '../store/useItemStore'
import { api } from "../api/api"

const ItemsList = () => {

    const { items, getItems } = useItemStore()
    const [stats, setStats] = useState(null)

    useEffect(() => {
        getItems()

        const fetchStats = async () => {
            try {
                const res = await api.getStats()
                setStats(res.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchStats()
    }, [getItems])


    return (
        <div className="container">
            <div className="page-header">
                <h1>Все товары</h1>
            </div>
            <div className="stats">
                <div className="stat-item">
                    <span className="stat-value">{stats?.totalItems}</span>
                    <span className="stat-label">Товаров</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{stats?.totalBids}</span>
                    <span className="stat-label">Ставок</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{stats?.activeItems}</span>
                    <span className="stat-label">Активных</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{stats?.averageItemPrice}</span>
                    <span className="stat-label">Средняя цена</span>
                </div>
            </div>

            <div className="items-grid">
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}

export default ItemsList
