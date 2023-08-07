import React, {useEffect} from "react"
import { Image } from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import { getAccount } from "../../slices/accountSlice"
import craft from "../../utils/craft"
import IconTextButton from "../IconTextButton"
import MaterialsSlot from "../MaterialsSlot/materials-slot"
import TierItemSlot from "../TierItemSlot"
import ProfileErrorLabelBar from "../ProfileErrorLabelBar/profile-error-label-bar"
import getItemImageFromItem from "../../utils/get-item-image-from-item"
import {refetchInventory, setSelectedInventory} from "../../slices/inventorySlice";
import {getAccountResources} from "../../slices/resourceSlice";
import {useWallet} from "@solana/wallet-adapter-react";

const CharacterProfileCraftingRecipeDetails = ({
  ape,
  selectedRecipe,
  setSelectedRecipe,

  reloadApes,
  setMessage,
}) => {
  const reloadInventory = (inventory) => dispatch(refetchInventory(inventory))
  const mainInventory = useSelector(
      (state) => state.inventories.selectedInventory,
  )
  const { publicKey, disconnecting } = useWallet()

  const accountResources = useSelector((state) => state.resources.accountResources)
  const account = useSelector((state) => state.accounts.account)

  const dispatch = useDispatch()

  const refetchResources = () => dispatch(getAccountResources(publicKey))


  const reloadAccount = publicKey => dispatch(getAccount(publicKey))


  useEffect(()=>{
    if(!accountResources || accountResources.length===0){
      refetchResources()
    }
  },[mainInventory])


  return (
    <div className="d-flex justify-content-start align-items-center flex-column position-relative w-100" >
      <div className="d-flex justify-content-center align-items-center flex-column">
        <p className="text-center h5 w-100 mt-2">
          Item Selected:
        </p>
        <TierItemSlot
          key={`ape-profile-main-ingredient`}
          className="m-1"
          style={{ width: '240px', height: '240px', margin: '5px'}}
          item={ mainInventory }
          inventory={ mainInventory }
          placeholder={
            <p className="h3 text-center">Select Item to Limit Break</p>
          }
        >
          {
            !!selectedRecipe && !!mainInventory
            ? <Image src={`/item/reveals/blah`} style={{ borderRadius: '20px' }} fluid />
            : null
          }
        </TierItemSlot>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <p className="text-center h5 w-100 mt-2">
          Materials Required:
        </p>
        <div className="d-flex justify-content-center">
          {
            (selectedRecipe?.Resources || []).filter(r => r.amount > 0).map(
              r => {

               const remaining = accountResources.find(ar => ar.id===r.Cost.id)?.quantity||0
                return (
                  <div className="d-flex flex-column" key={ `ape-profile-craft-cost-${r.Cost.id}` } >
                    <MaterialsSlot
                      resource={ r.Cost }
                      key={`character-craft-item-slot-${r.Cost.id}`}
                      style={{ color: (Number(remaining) >= Number(r.amount || 0) ? '#07da42' : 'red') }}
                      text={`${remaining}/${r.amount || 0}`}
                    />
                  </div>
                )
              }
            )
          }
          {
            (selectedRecipe?.Resources || []).filter(r => r.amount >0 ).length < 3
            ? [...Array(2 - (selectedRecipe?.Resources || []).filter(r => r.amount > 0).length)].map((v, id) => (
              <MaterialsSlot
                key={`character-craft-inactive-item-slot-${id}`}
              />
            ))
            : null
          }
        </div>
      </div>
      <div>
        <IconTextButton 
          className="m-2 evolve-box-responsiveness"
          style={{ flex: 1 }} 
          info={
            (selectedRecipe?.Currencies || [])
            .filter(c => c.amount > 0)
            .map(c => ({
              id: `character-profile-evolve-${c.Cost.id}`,
              image: `/images/v2/currencies/${c.Cost.name}.png`,
              text: c.amount || 0,
              available: (
                c.Cost.name !== 'Ascension'
                ? (account?.currencies || []).find(currency => currency.Currency?.name === c.Cost.name)?.amount 
                : (account?.character_currencies || []).find(currency => currency.name === c.Cost.name)?.amount 
              )
            }))
          }
          onClick={() => setMessage({
            type: 'confirm',
            text: `Are you sure to limit break ${mainInventory.name || 'this item'}  to ${selectedRecipe?.Tier || 'next'} tier?`,
            callback: confirm => {
              if (confirm === 'yes') {
                craft({
                  wallet: ape?.gameData?.owner,
                  inventory:mainInventory,
                  setMessage,
                  callback: () => { 
                    !!ape?.mint && reloadApes([ ape?.mint ])
                    reloadAccount(ape?.gameData?.owner)
                    reloadInventory(mainInventory)
                    refetchResources()
                    setSelectedRecipe(null)

                  }
                })
              }
            }
          })}
          inactive={ 
            !selectedRecipe
            || !!(selectedRecipe?.Currencies || [])
            .filter(c => c.amount > 0)
            .find(c => (c.amount || 0) > (
              c.Cost.name !== 'Ascension'
              ? (account?.currencies || []).find(currency => currency.Currency?.name === c.Cost.name)?.amount 
              : (account?.character_currencies || []).find(currency => currency.name === c.Cost.name)?.amount 
            ))
            || !!(selectedRecipe?.Resources || []).filter(r => r.amount > 0).find(
              r => {
                const remaining = accountResources.find(ar => ar.id===r.Cost.id)?.quantity||0
                return Number(remaining) < Number(r.amount || 0)
              }
            )
          }
        >
          Limit Break
        </IconTextButton>
      </div>
    </div>
  )
}

export default CharacterProfileCraftingRecipeDetails