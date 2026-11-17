import { Link, useParams } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import { useEffect, useState } from 'react'
import { api } from "../api/api"
import { useUserStore } from '../store/useUserStore'

const ItemDetail = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [item, setItem] = useState(null)
    const [bids, setBids] = useState([])
    const { user } = useUserStore()

    useEffect(()=>{
    console.log(item)
    },[item])

    useEffect(() => {
        const loadData = async () => {
            try {
                setItem((await api.getItem(id)).data)
                setIsLoading(true)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    }, [id])

    useEffect(() =>{
        const loadBids = async () => {
        console.log(id)
            try {
                await api.getItemBids(id)
            } catch (error) {
                console.error(error)
            }
        }
        loadBids()    
        },[id])

    const handleBid = async (e) => {
        e.preventDefault()
        setError('')

        const form = e.target
        const amount = Number(form.bidInput.value)

        try {
            await api.createBid({ id, amount })
            form.reset()
            await loadBids()
        } catch (err) {
            setError(getErrorMessage(err))
        }
    }

    const handleDelete = async () => {
        try {
            await api.deleteItems(id)
            navigate("/")
        } catch (error) {
            console.error(error)
        }
    }

    if (isLoading) return <div className="container">Загрузка...</div>

    if (!item) {
        return <div className="container">Товар не найден</div>
    }

    if (item) return (
        <div className="container">
            <Link to={'/'}>← Вернуться к списку товаров</Link>

            <div class="item-detail">
                <div class="item-header">
                    <div>
                        <img src={item.imageUrl} class="item-image-large" />
                    </div>

                    <div class="item-info">
                        <span class="item-status">Активное</span>

                        <h1 class="item-title-large">{item.title}</h1>

                        <div class="item-seller-info">
                            <div class="seller-avatar">{item.username.slice(0, 2).toUpperCase()}</div>
                            <div class="seller-details">
                                <div class="seller-name">
                                    {item.username}
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
                            <div class="current-price">Цена: {item.highestBid ?? item.price}</div>
                            <div class="highest-bid">
                                {item.highestBid !== null
                                    ? `Текущая ставка: ${item.highestBid}`
                                    : "Ставок нет"
                                }
                            </div>

                            {error && <div className='alert alert-error active'>{error}</div>}

                            <form class="bid-form" onSubmit={handleBid}>
                                <Input
                                    type="number"
                                    name="bidInput"
                                    class="bid-input"
                                    placeholder="Введите вашу ставку (мин. стоимость + 1 рубль ₽)"
                                    min={(item.highestBid ?? ImageBitmap.price) + 1}
                                    step="100"
                                />
                                <Button type="submit" class="btn-bid" onClick={handleDelete}>
                                    Сделать ставку
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="bids-section">
                    <div class="bids-header">
                        <h2 class="bids-title">История ставок</h2>
                        <span class="bids-count">{bids.length}</span>
                    </div>
                        
                    <div class="bids-list">
                        {bids.map((bids) => (
                        <div className="bid-item highest-bid-item">
                            <div className="bid-user">
                                <div className="bid-avatar">{bids.username.slice(0, 2).toUpperCase()}</div>
                                <div className="bid-details">
                                    <span className="bid-username">{bids.username}</span>
                                    <span className="bid-time">{newDate(bids.createAt)}</span>
                                </div>
                                <span className="highest-bid-item">🏆 Лидирует</span>
                            </div>
                            <div className="bid-amount">{bids.amount}₽</div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail
