import React, {useEffect, useState} from 'react'
import { Image, ProgressBar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ExpProgressBar from '../ExpProgressBar/exp-progress-bar'
import IconTextButton from '../IconTextButton'
import ApplyButton from '../ApplyButton'
import PanelDivider from '../PanelDivider/panel-divider'
import getBonusesFromPowerEffect from '../../utils/get-bonuses-from-power-effect'
import getBonusesFromEquippedItems from '../../utils/get-bonuses-from-equipped-items'
import { clearExperienceItem } from '../../slices/resourceSlice'

const CharacterProfileStats = ({
  ape,
  withEvolve,
  gotoEvolve,
  withLevel,
  tab,
  gotoLevel,
}) => {
  const resources = useSelector((state) => state.resources.resources)
  const selectedExperiences = useSelector(
    (state) => state.resources.selectedExperiences,
  )

  const levels = useSelector((state) => state.levels.levels)
  const powers = useSelector((state) => state.apes.powers)
  const powerEffects = useSelector((state) => state.apes.powerEffects)
  const dispatch = useDispatch()

  const [maxLevelReached,setMaxLevelReached] = useState(false)
  
  const power = powers.find(power => power.slug === ape?.gameData?.power)
  const powerEffect = powerEffects.find(power => power.slug === ape?.gameData?.power)
  const equippedItems = ape?.gameData?.default_items || []
  const bonusesFromPowerEffect = getBonusesFromPowerEffect(powerEffect)
  const bonusesFromEquippedItems = getBonusesFromEquippedItems(equippedItems)
  const xpByItems = resources
    .filter((resource) => resource.type === 'Resource: Level-Up Material')
    .map((resource) => {
      return (
        ((typeof resource.effect === 'object'
          ? resource.effect
          : JSON.parse(resource.effect || '{}')
        )?.experience || 0) * (selectedExperiences[resource.star || 0] || 0)
      )
    })
    .reduce((a, b) => a + b, 0)
  const tierMaxLevel = (levels || []).find(
    (level) => level.level === ape?.gameData?.Tier?.max_level,
  )
  const levelByXpItems = (levels || []).findLast(
    (level) => level.experience <= (ape?.gameData?.experience || 0) + (xpByItems || 0),
  )
  const upgradedLevel =
    (tierMaxLevel?.level || 0) >= (levelByXpItems?.level || 0)
      ? levelByXpItems
      : tierMaxLevel



  useEffect(()=>{
    let maxLevel = ape?.gameData.Tier.max_level;
    let currentLevel = ape?.gameData.Level.level;
    if(currentLevel === maxLevel){
      setMaxLevelReached(true)
    } else {
      setMaxLevelReached(false)
    }
  },[ape])

  useEffect(() => {
    dispatch(clearExperienceItem())
  }, [ape, withEvolve, withLevel, tab ])

  return (
    <div
      style={{ paddingRight: '1rem' }}
      className='character-profile-stats d-flex justify-content-start align-items-center flex-column flex-grow-1'
    >
      <div className='panel-header w-100 justify-content-between align-items-center p-1 custom-border-bottom'>
        <div className='d-flex justify-content-center align-items-start flex-column'>
          {
            !!power
            ? <div
              className='d-flex justify-content-start align-items-center text-sm'
              style={{ fontSize: '18px' }}
            >
              <Image
                style={{ width: '36px', marginRight: '0.5rem' }}
                src={`/images/v2/power/${power.icon}`}
              />
              {power.power}
            </div>
            : null
          }
          <div className='text-white'>{ape?.info?.name || ''}</div>
        </div>
      </div>
      <div className='w-100 justify-content-between p-1'>
        <div
          className={`d-flex justify-content-center align-items-center ${
            withLevel ? '' : 'custom-border-bottom type-2 pb-3'
          } ${tab === 'Character' ? 'custom-border-bottom type-2 pb-3' : ''}`}
        >
          {!withLevel || tab === 'Character' ? (
            <Image
              src={`/images/v2/Tier${ape?.gameData?.tier || 1}.png`}
              className='tier-img me-2'
            />
          ) : null}
          {!!withLevel && tab !== 'Character' ? (
            <div className='upgrade-info d-flex justify-content-between align-items-center flex-column flex-grow-1 custom-border-bottom type-2 pb-3'>
              {!!ape?.gameData?.nextTier ? (
                <div className='d-flex justify-content-evenly align-items-center w-100'>
                  <div className='d-flex justify-content-center align-items-center'>
                    <Image
                      src={`/images/v2/Tier${ape?.gameData?.tier || 1}.png`}
                      className='tier-img'
                    />
                    <div className='d-flex justify-content-center align-items-start flex-column'>
                      <p className='h5 m-1'>Max Level</p>
                      <p className='h4 m-1'>
                        Lv. {ape?.gameData?.Tier?.max_level || 0}
                      </p>
                    </div>
                  </div>
                  <Image
                    src='/images/move-right-orange.png'
                    className='upgrade-to-img'
                  />
                  <div className='d-flex justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center align-items-end flex-column'>
                      <p className='h5 m-1'>Max Level</p>
                      <p className='h4 m-1'>
                        Lv. {ape?.gameData?.nextTier?.max_level || 0}
                      </p>
                    </div>
                    <Image
                      src={`/images/v2/Tier${
                        ape?.gameData?.nextTier.tier || 1
                      }.png`}
                      className='tier-img'
                    />
                  </div>
                </div>
              ) : (
                <div className='d-flex justify-content-evenly align-items-center w-100'>
                  <div className='d-flex justify-content-center align-items-center'>
                    <Image
                      src={`/images/v2/Tier${ape?.gameData?.tier || 1}.png`}
                      className='tier-img'
                    />
                    <div className='d-flex justify-content-center align-items-start flex-column'>
                      <p className='h5 m-1'>Max Level</p>
                      <p className='h4 m-1'>
                        Lv. {ape?.gameData?.Tier?.max_level || 0}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : !!withEvolve && tab !== 'Character' ? (
            <div className='upgrade-info d-flex justify-content-center align-items-center flex-column flex-grow-1'>
              {!!upgradedLevel &&
              upgradedLevel.level > (ape?.gameData?.Level?.level || 0) ? (
                <div className='d-flex justify-content-evenly align-items-center w-100'>
                  <p className='h4 m-1'>
                    Lv. {ape?.gameData?.Level?.level || 0}
                  </p>
                  <Image
                    src='/images/move-right-orange.png'
                    className='upgrade-to-img'
                  />
                  <p className='h4 m-1'>Lv. {upgradedLevel?.level || 0}</p>
                </div>
              ) : (
                <div className='d-flex justify-content-start align-items-center w-100'>
                  <p className='h4 m-2'>
                    Lv. {ape?.gameData?.Level?.level || 0}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className='d-flex justify-content-center align-items-center flex-column flex-grow-1'>
              <div className='d-flex justify-content-between align-items-center w-100'>
                <p className='h4 m-1'>
                  Lv. {ape?.gameData?.Level?.level || 0}/
                  {ape?.gameData?.Tier?.max_level || 0}
                </p>
                {maxLevelReached &&
                <p className='h5 m-1'>
                  Max
                </p>
                }
                {!maxLevelReached &&
                <p className='h5 m-1'>
                  {(ape?.gameData?.experience - ape?.gameData?.Level.experience)  || 0}/
                  {(ape?.gameData?.nextLevel?.experience - ape?.gameData?.Level.experience)|| 0}
                </p>
                }
              </div>
              <ExpProgressBar
                total={maxLevelReached ? 1 : (ape?.gameData?.nextLevel?.experience - ape?.gameData?.Level.experience)|| 0}
                firstValue={maxLevelReached? 1: (ape?.gameData?.experience - ape?.gameData?.Level.experience)|| 0}
                className='mw-100'
                centerText={false}
              />
            </div>
          )}
        </div>
      </div>
      <div className='d-flex justify-content-start align-items-start flex-column w-100 p-3 pt-0'>
        <p className='m-1 my-3 h5'>Character Stats</p>
        <div
          className='d-flex justify-content-center align-items-center flex-column w-100'
          style={{ border: '1px solid #3980DA' }}
        >
          <div className='character-stat w-100'>
            <div className='character-stat-label'>Stamina</div>
            <div className='character-stat-value'>
              {(ape?.gameData?.Level?.stamina || 0) + bonusesFromPowerEffect.stamina + bonusesFromEquippedItems.stamina}
            </div>
            <div className='character-stat-note'>
              {!!withEvolve &&
              !!upgradedLevel &&
              upgradedLevel.level > (ape?.gameData?.Level?.level || 0) ? (
                <div className='d-flex justify-content-start align-items-center'>
                  <Image
                    src='/images/move-right-orange.png'
                    className='upgrade-to-img'
                  />
                  {(upgradedLevel?.stamina || 0) + bonusesFromPowerEffect.stamina + bonusesFromEquippedItems.stamina}
                </div>
              ) : !!bonusesFromEquippedItems.stamina
              ? `${bonusesFromEquippedItems.stamina}`
              : ''}
            </div>
          </div>
          <div className='character-stat w-100'>
            <div className='character-stat-label'>Inventory</div>
            <div className='character-stat-value'>
              {(ape?.gameData?.Level?.inventory || 0) + bonusesFromPowerEffect.inventory + bonusesFromEquippedItems.inventory}
            </div>
            <div className='character-stat-note'>
            </div>
          </div>
          <div className='character-stat w-100'>
            <div className='character-stat-label'>Luck Bonus</div>
            <div className='character-stat-value'>
              {(ape?.gameData?.Level?.lr_bonus || 0) + bonusesFromPowerEffect.luckBonus + bonusesFromEquippedItems.luckBonus}%
            </div>
            <div className='character-stat-note'>
              {!!withEvolve &&
              !!upgradedLevel &&
              upgradedLevel.level > (ape?.gameData?.Level?.level || 0) ? (
                <div className='d-flex justify-content-start align-items-center'>
                  <Image
                    src='/images/move-right-orange.png'
                    className='upgrade-to-img'
                  />
                  {(upgradedLevel?.lr_bonus || 0) + bonusesFromPowerEffect.luckBonus + bonusesFromEquippedItems.luckBonus}%
                </div>
              ) : !!bonusesFromEquippedItems.luckBonus
              ? `+${bonusesFromEquippedItems.luckBonus}%`
              : ''}
            </div>
          </div>
          <div className='character-stat w-100'>
            <div className='character-stat-label'>Mission Reduction</div>
            <div className='character-stat-value'>
              {(ape?.gameData?.Level?.mission_time || 0) + bonusesFromPowerEffect.missionReduction + bonusesFromEquippedItems.missionReduction}%
            </div>
            <div className='character-stat-note'>
              {
                !!bonusesFromEquippedItems.missionReduction
                ? `+${bonusesFromEquippedItems.missionReduction}%`
                : ''
              }
            </div>
          </div>
          <div className='character-stat w-100'>
            <div className='character-stat-label'>Experience Gain</div>
            <div className='character-stat-value'>
              {(ape?.gameData?.Level?.exp_gain || 0) + bonusesFromPowerEffect.experienceGain + bonusesFromEquippedItems.experienceGain}%
            </div>
            <div className='character-stat-note'>
              {
                !!bonusesFromEquippedItems.experienceGain
                ? `+${bonusesFromEquippedItems.experienceGain}%`
                : ''
              }
            </div>
          </div>
          <div className='character-stat w-100'>
            <div className='character-stat-label'>Gold Gain</div>
            <div className='character-stat-value'>
              {(ape?.gameData?.Level?.gold_gain || 0) + bonusesFromPowerEffect.goldGain + bonusesFromEquippedItems.goldGain}%
            </div>
            <div className='character-stat-note'>
              {
                !!bonusesFromEquippedItems.goldGain
                ? `+${bonusesFromEquippedItems.goldGain}%`
                : ''
              }
            </div>
          </div>
          <div className='character-stat w-100'>
            <div className='character-stat-label'>Animal Gain</div>
            <div className='character-stat-value'>
              {(ape?.gameData?.Level?.animal_gain || 0) + bonusesFromPowerEffect.animalGain + bonusesFromEquippedItems.animalGain}%
            </div>
            <div className='character-stat-note'>
              {
                !!bonusesFromEquippedItems.animalGain
                ? `+${bonusesFromEquippedItems.animalGain}%`
                : ''
              }
            </div>
          </div>
          <div className='character-stat w-100'>
            <div className='character-stat-label'>Mineral Gain</div>
            <div className='character-stat-value'>
              {(ape?.gameData?.Level?.mineral_gain || 0) + bonusesFromPowerEffect.mineralGain + bonusesFromEquippedItems.mineralGain}%
            </div>
            <div className='character-stat-note'>
              {
                !!bonusesFromEquippedItems.mineralGain
                ? `+${bonusesFromEquippedItems.mineralGain}%`
                : ''
              }
            </div>
          </div>
          <div className='character-stat w-100'>
            <div className='character-stat-label'>Plant Gain</div>
            <div className='character-stat-value'>
              {(ape?.gameData?.Level?.plant_gain || 0) + bonusesFromPowerEffect.plantGain + bonusesFromEquippedItems.plantGain}%
            </div>
            <div className='character-stat-note'>
              {
                !!bonusesFromEquippedItems.plantGain
                ? `+${bonusesFromEquippedItems.plantGain}%`
                : ''
              }
            </div>
          </div>
        </div>
        <div className='d-flex w-100 mt-1'>
          <div className='p-1'>Power Class: </div>
          <div className='flex-grow-1 p-1'>{power?.power || "None"}</div>
        </div>
        <div className='d-flex w-100'>
          <div className='p-1 text-nowrap'>Dispatch Effect: </div>
          <div className='flex-grow-1 p-1'>{power?.description || "No Effect"}</div>
        </div>
      </div>
      {(withEvolve || withLevel) && <PanelDivider />}
      <div className='w-100 justify-content-between p-1'>
        {!(withEvolve && withLevel) ? (
          !!withEvolve ? (
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <p className='h5' style={{ color: '#BD8926' }}>
                  Current Max Level: {ape?.gameData?.Tier?.max_level || 0}
                </p>
                <p className='h6'>
                  Ascension becomes available once <br /> the current max level
                  is reached.
                </p>
              </div>
              <div>
                <ApplyButton
                  className='m-1'
                  style={{ flex: 1 }}
                  onClick={() => gotoEvolve()}
                >
                  Ascend
                </ApplyButton>
              </div>
            </div>
          ) : !!withLevel ? (
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <p className='h5' style={{ color: '#BD8926' }}>
                  Current Max Level: {ape?.gameData?.Tier?.max_level || 0}
                </p>
                <p className='h6'>
                  You must be the max level of a tier <br /> to be able to
                  ascend.
                </p>
              </div>
              <div>
                <ApplyButton
                  className='m-1 px-5'
                  style={{ flex: 1 }}
                  onClick={() => gotoLevel()}
                >
                  Level Up
                </ApplyButton>
              </div>
            </div>
          ) : null
        ) : (
          <div className='d-flex justify-content-between align-items-center gap-5'>
            <div className='w-50'>
              <ApplyButton
                className='m-1 px-5 w-100'
                style={{ flex: 1 }}
                onClick={() => gotoEvolve()}
              >
                Ascend
              </ApplyButton>
            </div>
            <div  className='w-50'>
              <ApplyButton
                className='m-1 px-5 w-100'
                style={{ flex: 1 }}
                onClick={() => gotoLevel()}
              >
                Level
              </ApplyButton>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CharacterProfileStats
