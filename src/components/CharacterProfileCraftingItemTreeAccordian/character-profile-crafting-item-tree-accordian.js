import React from "react"
import { Image } from "react-bootstrap"
import TierItemSlot from "../TierItemSlot"

import './character-profile-crafting-item-tree-accordian.scss'

const CharacterProfileCraftingItemTreeAccordian = ({
  title,
  placeholder,
  recipes = [],
  expanded,
  onClick,
  setSelectedRecipe,
}) => {
  return (
    <div className="characters-profile-crafting-item-tree-wrapper w-100 mb-2">
      <div className="characters-profile-crafting-item-tree-accordian w-100 hover-opacity-8 hover-cursor-pointer" onClick={ onClick }>
        <p className="accordian-title m-0">
          { title }
        </p>
        <Image
          src={ !!expanded ? "/images/v2/accordian-expanded.png" : "/images/v2/accordian-collapsed.png" }
        />
      </div>
      {
        !!expanded
        ? <div className="d-flex flex-wrap justify-content-center">
          {
            !!recipes && recipes.length > 0
            ? recipes.map(
              recipe => (
                <TierItemSlot
                  item={ recipe }
                  key={`character-craft-item-slot-${recipe.id}`}
                  style={{ width: '80px', height: '80px', margin: '10px' }}
                  onClick={
                    () => !!setSelectedRecipe && setSelectedRecipe(recipe)
                  }
                  clickable={ !!setSelectedRecipe }
                />
              )
            )
            : !!placeholder
            ? placeholder
            : null
          }
        </div>
        : null
      }
    </div>
  )
}

export default CharacterProfileCraftingItemTreeAccordian