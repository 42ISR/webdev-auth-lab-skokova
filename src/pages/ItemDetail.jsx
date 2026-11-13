import { Link, useParams } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import { useEffect, useState } from 'react'
import { api } from "../api/api"

const ItemDetail = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [item, setItem] = useState(null)
    useEffect(() => {
    const loadData = async () => {
        try {
            
            setItem(await api.getItem(id))
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    
        loadData()
    }, [id])

    if (!isLoading) return <div className="container">Загрузка...</div>

    if (!item) {
        return <div className="container">Товар не найден</div>
    }

    return (
        <div className="container">
            <Link to={'/'}>← Вернуться к списку товаров</Link>

            <div class="item-detail">
                <div class="item-header">
                    <div>
                        <img src="https:/..." class="item-image-large" />
                    </div>

                    <div class="item-info">
                        <span class="item-status">Активное</span>

                        <h1 class="item-title-large">{item.title}</h1>

                        <div class="item-seller-info">
                            <div class="seller-avatar">Первые 2 символа с юзернейма</div>
                            <div class="seller-details">
                                <div class="seller-name">
                                    {title.username}
                                </div>
                                <div class="seller-date">
Когда создан
                                </div>
                            </div>
                        </div>

                        <div class="item-description-full">
                            {item.description}
                        </div>

                        <div class="price-section">
                            <div class="starting-price">Начальная цена: {item.price}</div>
                            <div class="current-price">Цена</div>
                            <div class="highest-bid">
                                {item.highestBid !== null
                                ? `Текущая ставка: ${item.highestBid}`
                                : "Ставок нет"
                                }
                            </div>

                            <form class="bid-form">
                                <Input
                                    type="number"
                                    name="bidInput"
                                    class="bid-input"
                                    placeholder="Введите вашу ставку (мин. стоимость + 1 рубль ₽)"
                                    min={(item.highestBid ?? ImageBitmap.price) + 1}
                                    step="100"
                                />
                                <Button type="submit" class="btn-bid">
                                    Сделать ставку
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="bids-section">
                    <div class="bids-header">
                        <h2 class="bids-title">История ставок</h2>
                        <span class="bids-count">0</span>
                    </div>

                    <div class="bids-list">
                        <div class="bid-item highest-bid-item">
                            <div class="bid-user">
                                <div class="bid-avatar">BB</div>
                                <div class="bid-details">
                                    <span class="bid-username">buyer_best</span>
                                    <span class="bid-time">2 часа назад</span>
                                </div>
                                <span class="highest-badge">🏆 Лидирует</span>
                            </div>
                            <div class="bid-amount">70 000 ₽</div>
                        </div>

                        <div class="bid-item">
                            <div class="bid-user">
                                <div class="bid-avatar">JD</div>
                                <div class="bid-details">
                                    <span class="bid-username">john_doe</span>
                                    <span class="bid-time">5 часов назад</span>
                                </div>
                            </div>
                            <div class="bid-amount">68 000 ₽</div>
                        </div>

                        <div class="bid-item">
                            <div class="bid-user">
                                <div class="bid-avatar">AL</div>
                                <div class="bid-details">
                                    <span class="bid-username">alice_tech</span>
                                    <span class="bid-time">1 день назад</span>
                                </div>
                            </div>
                            <div class="bid-amount">67 000 ₽</div>
                        </div>

                        <div class="bid-item">
                            <div class="bid-user">
                                <div class="bid-avatar">MK</div>
                                <div class="bid-details">
                                    <span class="bid-username">mike_k</span>
                                    <span class="bid-time">1 день назад</span>
                                </div>
                            </div>
                            <div class="bid-amount">66 000 ₽</div>
                        </div>

                        <div class="bid-item">
                            <div class="bid-user">
                                <div class="bid-avatar">ST</div>
                                <div class="bid-details">
                                    <span class="bid-username">sarah_tech</span>
                                    <span class="bid-time">2 дня назад</span>
                                </div>
                            </div>
                            <div class="bid-amount">65 500 ₽</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail
