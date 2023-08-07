import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'
import { rarityIcons } from '../../../components/ItemDetailsCard/item-details-card'
import ShopItemCard from '../../../components/ShopItemCard/shop-item-card'
import ShopItemModal from '../../../components/ShopItemModal/shop-item-modal'
import './shop-content.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getShopLimits } from '../../../slices/accountSlice'
import { useWallet } from '@solana/wallet-adapter-react'
import ShopRefreshTime from '../../../components/ShopRefreshTime/shop-refresh-time'

function ShopContent({ tab, setTab, shopItems, setMessage }) {
  const account = useSelector((state) => state.accounts.account)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [limitType, setLimitType] = useState('Monthly')
  const shopLimits = useSelector((state) => state.accounts.shopLimits)
  const { publicKey, connected, disconnecting } = useWallet()
  const dispatch = useDispatch()
  const loadShopLimits = () => {
    dispatch(getShopLimits(publicKey))
  }
  useEffect(() => {
    setSelectedItem(null)
    let shop_limit_type =
      shopItems?.find(
        (shop) =>
          shop.purchase_currency.name.toLowerCase() === tab.toLowerCase(),
      )?.limit_type || 'Monthly'

    setLimitType(shop_limit_type)
  }, [tab])

  useEffect(() => {
      loadShopLimits()
  }, [])

  return (
    <>
      <div className='shop-content-container'>
        <div className='shop-content-header'>
          <div>
            <h3>{tab} SHOP</h3>
            <p>
              <ShopRefreshTime reloadShopLimits={loadShopLimits} limit_type={limitType} />
            </p>
          </div>
          {tab.toLowerCase() === 'salvage' && (
            <div className='salvage-amount'>
              <Image src='/images/v2/currencies/Salvage.png' />
              {account?.currencies?.find(c => c.Currency.name.toLowerCase() === tab?.toLowerCase())?.amount || 0}
            </div>
          )}
        </div>
        <div className='shop-content-cards-container custom-scroll'>
          {shopItems && shopItems.length > 0
            ? shopItems
                .filter(
                  (shop) =>
                    shop.purchase_currency.name.toLowerCase() ===
                    tab.toLowerCase(),
                )
                .map((item, index) => (
                  <ShopItemCard
                    key={`shop-cards-${index}`}
                    name={item?.product_details?.name}
                    percentage={-40}
                    background={rarityIcons[item?.product_details?.rarity]}
                    amount={item?.quantity}
                    value={item?.cost}
                    limitInfo={shopLimits?.find((s) => s.product_id == item.id)}
                    type={item.purchase_currency.name}
                    image={`/images/v2${
                      item?.product_type === 'Resource'
                        ? '/resources/' + item?.product_details?.icon
                        : '/currencies/' + item?.product_details.name + '.png'
                    }`}
                    onClick={() => {
                      setIsOpen(true)
                      setSelectedItem(index)
                    }}
                    active={index === selectedItem}
                  />
                ))
            : null}
        </div>
      </div>
      {isOpen && (
        <ShopItemModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => setIsOpen(false)}
          setMessage={setMessage}
          reloadLimit={loadShopLimits}
          item={
            shopItems && shopItems.length > 0
              ? shopItems.filter(
                  (shop) =>
                    shop.purchase_currency.name.toLowerCase() ===
                    tab.toLowerCase(),
                )[selectedItem]
              : null
          }
        />
      )}
    </>
  )
}

export default ShopContent
