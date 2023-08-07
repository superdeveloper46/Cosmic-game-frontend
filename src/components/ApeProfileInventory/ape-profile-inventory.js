import React, { useEffect, useState } from 'react'
import { Image } from 'react-bootstrap'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'
import ApeProfileInventoryPage from '../ApeProfileInventoryPage/ape-profile-inventory-page'
import ApeProfileInventorySelectedItemInfo from '../ApeProfileInventorySelectedItemInfo/ape-profile-inventory-selected-item-info'
import ItemSlot from '../ItemSlot'

const ApeProfileInventory = ({ ape, reloadApes, setMessage }) => {
  const generalSound = useAudio(AUDIOLIST['GERNERAL_BUTTON'])
  const [selectedInventory, setSelectedInventory] = useState(null)

  useEffect(() => {
    if (!!ape) {
      setSelectedInventory(null)
    }
  }, [ape?.mint])

  return (
    <div
      className='d-flex justify-content-around flex-column p-2'
      style={{ border: '1px solid #3980DA', background: '#16305F' }}
    >
      <div className='d-flex justify-content-center align-items-center flex-column'>
        <div className='d-flex justify-content-center align-items-center w-100'>
          <div style={{ width: '120px' }} className='m-2'>
            <Image src={ape?.info?.image} width='120px' />
          </div>
          <div className='d-flex justify-content-center align-items-start flex-column'>
            <div className='d-flex justify-content-center align-items-center'>
              {(ape?.gameData?.default_items || [])
                .filter((dItem) => dItem.type === 'item')
                .map((dItem) => (
                  <ItemSlot
                    key={`ape-profile-item-slot-${dItem.id}`}
                    style={{
                      width: '40px',
                      height: '40px',
                      margin: '5px',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      generalSound()
                      setSelectedInventory({
                        inventory: {
                          Item: dItem.Item,
                        },
                        action: 'unequip',
                      })
                    }}
                    clickable
                  >
                    <Image
                      src={`/item/${(dItem.Item.icon || '').replaceAll(
                        ' ',
                        '_',
                      )}`}
                      style={{ borderRadius: '5px' }}
                      fluid
                    />
                  </ItemSlot>
                ))}
              {(ape?.gameData?.default_items || []).filter(
                (dItem) => dItem.type === 'item',
              ).length < 3
                ? [
                    ...Array(
                      3 -
                        (ape?.gameData?.default_items || []).filter(
                          (dItem) => dItem.type === 'item',
                        ).length,
                    ),
                  ].map((v, id) => (
                    <ItemSlot
                      key={`ape-profile-inactive-item-slot-${id}`}
                      style={{ width: '40px', height: '40px', margin: '5px' }}
                      inactive
                    />
                  ))
                : null}
            </div>
          </div>
          <ApeProfileInventorySelectedItemInfo
            inventory={selectedInventory}
            address={ape?.mint}
            wallet={ape?.gameData?.owner}
            setSelectedInventory={setSelectedInventory}
            reloadApes={reloadApes}
            setMessage={setMessage}
          />
        </div>
      </div>
      <ApeProfileInventoryPage
        ape={ape}
        onClickInventory={setSelectedInventory}
      />
    </div>
  )
}

export default ApeProfileInventory
