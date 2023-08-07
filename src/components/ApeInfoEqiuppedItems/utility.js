import React from "react"
import { Image } from "react-bootstrap"
import Divider from "../Divider"
import ItemSlot from "../ItemSlot"

import './index.css'

const ApeInfoUtilityItems = ({
                                  items,
                              }) => {
    return (
        <div className="ape-info-equipped-items-container d-flex col">
            {
                (items || []).map(
                    item => (
                        <ItemSlot
                            key={ item.id }
                            style={{ width: '40px', height: '40px', margin: '5px' }}
                            onClick={ (e) => {
                                if (typeof item.onClick === 'function') {
                                    e.stopPropagation()
                                    item.onClick()
                                }
                            } }
                            clickable={ !!item.onClick }
                        >
                            <Image src={`/item/${item.icon.replaceAll(' ', '_')}`} style={{ borderRadius: '5px' }} fluid />
                        </ItemSlot>
                    )
                )
            }
            {
                (items || []).length < 3
                    ? [...Array(2)].map((v, id) => <ItemSlot key={ `inactive-item-slot-${id}` } style={{ width: '40px', height: '40px', margin: '5px' }} inactive />)
                    : null
            }

        </div>
    )
}

export default ApeInfoUtilityItems