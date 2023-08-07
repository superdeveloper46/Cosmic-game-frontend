import { useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect, useState } from 'react'
import ReactSlider from 'react-slider'
import ApplyButton from '../ApplyButton'
import './shop-item-modal.scss'
import shopPurchase from '../../utils/fetch-shop-purchase'
import { getAccount } from '../../slices/accountSlice'
import { useDispatch, useSelector } from 'react-redux'
import { clearInventories } from '../../slices/inventorySlice'
import { getAccountResources } from '../../slices/resourceSlice'

export const rarityGradients = {
  Uncommon: 'linear-gradient(180deg, #A0A0A0 0%, #D8D8D8 100%)',
  Common: 'linear-gradient(180deg, #098261 0%, #27B771 100%)',
  Rare: 'linear-gradient(180deg, #344188 0%, #5197DD 100%)',
  Epic: 'linear-gradient(180deg, #503B7E 0%, #8D4EB9 100%)',
  Legendary: 'linear-gradient(180deg, #9C5740 0%, #C1833F 100%)',
}

function ShopItemModal({
  item,
  isOpen,
  onClose,
  onConfirm,
  reloadLimit,
  setMessage,
}) {
  const { publicKey, connected, disconnecting } = useWallet()
  const [quantity, setQuantity] = useState(0)
  const [inactive, setInactive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [remaining, setRemaining] = useState(0)
  const [hasLimit,setHasLimit] = useState(false)
  const [maxBuy,setMaxBuy] = useState(0)

  const [max, setMax] = useState(0)
  const dispatch = useDispatch()
  const shopAccountLimits = useSelector((state) => state.accounts.shopLimits)
  const account = useSelector((state) => state.accounts.account)

  const purchase = (product_id) => {
    shopPurchase({
      product_id: product_id,
      quantity: quantity,
      wallet: publicKey,
      setMessage,
      setLoading,
      reload: () =>{
        reloadLimit()
        dispatch(getAccount(publicKey))
        clearInventories()
        dispatch(getAccountResources(publicKey))
      }
    })
  }
  useEffect(() => {
    let limit = null

    let maxCurrencyAmount =
      account?.currencies.find(
        (c) => c.currency_id === item?.purchase_currency.id,
      )?.amount || 0

    if (shopAccountLimits != null && item !== undefined) {
      limit = shopAccountLimits.filter((l) => l.product_id === item.id)[0]
    }
    if (item?.product_type === 'Currency') {
      setInactive(false)
    } else if (item?.product_type === 'Resource') {
      if (shopAccountLimits != null && item !== undefined) {
        limit = shopAccountLimits?.filter((l) => l.product_id === item.id)[0]
      }
      if (limit?.total_limit_used >= limit?.maximum_allowed) {
        setInactive(true)
      } else if (limit?.slot_required_for_item > 0) {
        setInactive(false)
      } else if (
        limit?.slot_required_for_item === 0 &&
        limit?.exisiting_solot_capacity_available < item?.product_details?.stack
      ) {
        setInactive(false)
      } else {
        setInactive(true)
      }
    }

    let maxAbleToBuy = limit
    if (maxCurrencyAmount > 0) {
      maxAbleToBuy = Math.floor(maxCurrencyAmount / item.cost)
    }
    setMaxBuy(maxAbleToBuy);

    if (item?.product_type === 'Currency') {
      setMax(maxAbleToBuy)

      if (maxAbleToBuy > 0) {
        setQuantity(1)
      } else {
        setInactive(true)
      }
    } else {
      let newLimit = Math.min(
        limit?.maximum_allowed - limit?.total_limit_used || 0,
        maxAbleToBuy,
      )
      setMax(newLimit)
      if (newLimit > 0) {
        setQuantity(1)
      } else {
        setInactive(true)
      }
    }
  }, [])

  useEffect(()=>{
    let limitInfo = shopAccountLimits?.find(s => s.product_id == item.id)
    if(!!limitInfo){
      setRemaining((limitInfo.maximum_allowed - limitInfo.total_limit_used));
      if(limitInfo.limit_type!=="NO_Limit"){
        setHasLimit(true)
      }

    }
  }, [shopAccountLimits])
  
  return isOpen && item ? (
    <div className='shop-item-modal-container'>
      <div className='shop-item-modal-title custom-border-bottom pb-1 mb-3'>
        <h1>Item to Buy</h1>
      </div>
      <div className='shop-item-modal-content custom-border-bottom pb-1 mb-3'>
        <div
          className='shop-item-modal-detail mb-2'
          style={{
            background:
              rarityGradients[item?.product_details?.rarity] || '#132849',
          }}
        >
          <img
            src={`/images/v2${
              item?.product_type === 'Resource'
                ? '/resources/' + item?.product_details?.icon
                : '/currencies/' + item?.product_details.name + '.png'
            }`}
            alt='icon'
            className='shop-item-modal-detail-image'
          />
          <div className='shop-item-modal-detail-description'>
            <h3>
              {item?.product_details?.name} x {item?.quantity}
            </h3>
            <p>{item?.product_details?.description}</p>
          </div>
          <div className='shop-item-modal-detail-info'>
            <div>
              <h4>{item.cost * quantity}</h4>
              <img
                src={`/images/v2/currencies/${item.purchase_currency.name}.png`}
                alt='currency'
              />
            </div>
          </div>
        </div>
        <div className='shop-item-modal-quantity'>
          <h2>Quantity: {quantity}</h2>
          <div className='shop-item-modal-slider'>
            <button
              onClick={() => {
                setQuantity((prev) => Math.max(prev - 1, 0))
              }}
            >
              <img src='/images/decrease.png' alt='decrease' />
            </button>
            <p></p>
            <ReactSlider
              className='horizontal-slider '
              thumbClassName='slider-thumb'
              trackClassName='slider-track'
              value={quantity}
              min={0}
              max={max}
              onChange={(value) => setQuantity(value)}
            />
            <p></p>

            <button
              onClick={() => {
                setQuantity((prev) => Math.min(prev + 1, max))
              }}
            >
              <img src='/images/increase.png' alt='decrease' />
            </button>
          </div>

          <div className='shop-item-modal-remain'>
            {hasLimit &&
              <p>{'Remaining: ' + remaining}</p>
            }

          </div>
          {maxBuy === 0 &&
              <div className="d-block text-danger text-center">
                <p >Not Enough {item?.purchase_currency?.name} available</p>
              </div>
          }
        </div>
      </div>
      <div className='d-flex justify-content-around'>
        <ApplyButton
          className='unequip-btn shop-item-modal-btns'
          onClick={onClose}
        >
          Cancel
        </ApplyButton>
        <ApplyButton
          className='shop-item-modal-btns'
          onClick={() => {
            onConfirm()
            purchase(item?.id)
          }}
          inactive={inactive}
        >
          Buy
        </ApplyButton>
      </div>
    </div>
  ) : null
}

export default ShopItemModal
