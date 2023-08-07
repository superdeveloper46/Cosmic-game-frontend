import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CloseButton from '../CloseButton'
import './guide-modal.scss'

const GuideModal = ({ open, onClose }) => {
  const location = useLocation()
  const [selectedTitle, setSelectedTitle] = useState(0)
  const [selectedSubTitle, setSelectedSubTitle] = useState(1)
  const [selectedPage, setSelectedPage] = useState(0)
  const guides = [
    {
      title: 'Character',
      datas: [
        { title: 'Character', level: 2 },
        {
          title: 'Overview',
          level: 3,
          img: 'img.png',
          page_contents: [
            'Collect and power up your characters! Each character has their own stats, inventory, equipment slots, and stamina. Characters can be leveled up or ascended, increasing their stats or expanding their levels respectively. Ascending your character will also increase their tier and allow them to complete higher tier missions easier. Each character can also train to attain a Power Class. Currently there are four Power Classes: Energenesis, Terraformer, Dimension Breaker, and Physical Augmenter. Each Power Class has different effects that help the character in various ways. Characters can be retrained and have the chance to attain a different Power Class, replacing the one they currently have.',
          ],
        },
        {
          title: 'Management',
          level: 3,
          img: 'img.png',
          page_contents: [
            'In the character menu, you can manage your characters and view detailed information about them: <br>1. Check their stats and level <br>2. Level and Ascend characters <br>3. Check, equip, or change their equipment <br>4. Limit Break or Repair their equipment',
          ],
        },
        {
          title: 'Power Class',
          level: 3,
          img: 'img.png',
          page_contents: [
            'Crusader characters have various different Power Classes that can be attained by training your Crusader. Currently there are four Power Classes (from left to right): Physical Augmenter, Dimension Breaker, Terraformer, Energenesis. Each of the Power Classes have different effects that help in various aspects of the game and will continue to gain effects as more content and features are released.',
          ],
        },
        { title: 'Growing Stronger', level: 2 },
        {
          title: 'Level Up',
          level: 3,
          img: 'img.png',
          page_contents: [
            'As a character’s level increases, their stats also increase. Characters can be leveled up by completing missions or you can speed up the process by using Experience Relic items. <br> <br>Experience Relics, which you can obtain by completing missions, grant a lot of Character EXP when used as a Level Up ingredient in the Level screen of the Character Menu. This also requires a small amount of Gold per Experience Relic used.',
          ],
        },
        {
          title: 'Ascend',
          level: 3,
          img: 'img.png',
          page_contents: [
            'Ascending a character will expand their maximum level and increase their tier. The current maximum level for characters is level 70 and the current maximum tier is 4. Being a higher tier will allow characters to complete higher tier missions easier. To Ascend a character, you will need to use Gold, Ascension Points, and various resources as Ascension ingredients. You can view the exact amount of resources required to Ascend on the Ascend screen of the Character Menu.',
          ],
        },
        {
          title: 'Character Stats',
          level: 3,
          img: 'img.png',
          page_contents: [
            'Characters have various stats that increase when they level:<br> 1. Stamina - Used to go on missions. <br>2. Luck Bonus - This stat improves a character’s chances of obtaining item drops from the Item Rewards pool when completing missions. (Luck Bonus has no effect on the Lootbox Rewards pool in missions)',
            {
              title: 'Luck Bonus',
              content:
                'The Luck Bonus stat increases the chance of the Item Rewards but does not affect the Loot box Reward drop rates.<br><br>Luck Bonus Calculation:<br>x + (x*y%)<br><br>x = The item pool luck/chance %<br>y = The Luck Bonus of the character<br>The result = the new luck/chance of getting that item with the character’s Luck Bonus factored in.<br><br>For example, if you have a character that has 100% Luck Bonus stat and you want to get an item from the Item Rewards that has a base chance of 2%, then that character would have a 4% chance to get that item thanks to their Luck Bonus.<br><br>Example Calculation:<br>2 + (2*100%) = 4%',
            },
          ],
        },
      ],
    },
    {
      title: 'Dispatch',
      datas: [
        { title: 'Dispatch', level: 2 },
        {
          title: 'Overview',
          level: 3,
          img: 'img.png',
          page_contents: [
            'Dispatch missions are a core part of the game that focuses on resource gathering to grow your characters stronger, find rare items, and upgrade those items to further enhance your characters. Each character you have is able to go on their own Dispatch mission. Stamina is required to start a Dispatch mission. There are various Dispatch missions available, with each one requiring a different stamina cost and rewarding different items, resources, and currency.',
          ],
        },
        {
          title: 'Map',
          level: 3,
          img: 'img.png',
          page_contents: [
            'You can find all available Dispatch missions on the map. Clicking on a mission will bring up the mission details box which shows information like:<br>Stamina Cost<br>Currency Rewards <br>Mission Duration<br>Lootbox Rewards pool <br>Items Item Rewards Pool items',
          ],
        },
        {
          title: 'Mission Types',
          level: 3,
          img: 'img.png',
          page_contents: [
            'There are various types of Dispatch missions that specialise in rewarding specific types of resources or items. <br>1. Experience Missions - Reward the most and best chances at obtaining Experience Relics which can be used to massively speed up character leveling. <br>2. Gold Missions - Reward the most and best chances at obtaining Treasure Chests which can be sold for large sums of Gold. <br>3. Resource Missions - Reward various resource materials and other important or helpful resource items. Also has the chance to reward a specific Equipment Type.',
            {
              title: 'Unlockable Missions',
              content:
                'There are some missions that require a Utility Item in order to be able to play them. <br> <br>Unlockable Missions have a high chance to reward very rare items.',
            },
          ],
        },
        {
          title: 'Difficulty',
          level: 3,
          img: 'img.png',
          page_contents: [
            'Missions can be played on multiple difficulties ranging from Tier 1 to Tier 4. Higher difficulties provide you with greater rewards. The tier of your character and the tier of the mission you select will determine how difficult the mission is to complete. Higher tier characters are able to complete higher tier missions easier as they will not be debuffed as much by the two types of difficulty scales, and can even gain a buff if they are a higher tier than the mission.',
            {
              title: 'Difficulty Scales',
              content:
                'There are two types of difficulty scales, Duration and Success. 1. Duration: The Duration scale determines how long a mission will take to complete depending on the tier of the character used and the tier of the mission selected. For example, a tier 1 character playing a tier 4 mission would be debuffed drastically and the mission would take 9x longer than the base mission duration. 2. Success: The Success scale determines the chance of completing the mission depending on the tier of the character used and the tier of the mission selected. For example, a tier 1 character playing a tier 4 mission would be debuffed drastically and the mission would have a 25% chance of success.',
            },
          ],
        },
        {
          title: 'Lootbox Rewards',
          level: 3,
          img: 'img.png',
          page_contents: [
            'Each mission has a Lootbox Rewards system that rewards various types of resource items. You are guaranteed to get at least one item from the Lootbox Rewards and if you are lucky you may even get more. However, the Lootbox Rewards drop rates are not affected by the Luck Bonus stat.',
          ],
        },
        {
          title: 'Item Rewards',
          level: 3,
          img: 'img.png',
          page_contents: [
            'Each mission has an Item Rewards system that rewards various types of Equipment items. Each item in the Item Rewards system has its own drop rate and the drop rates are affected by the Luck Bonus stat. However, you are not guaranteed to get an item from the Item Rewards system.',
          ],
        },
      ],
    },
    {
      title: 'Items',
      datas: [
        { title: 'Inventory', level: 2 },
        {
          title: 'Overview',
          level: 3,
          img: 'img.png',
          page_contents: [
            'In the Inventory you can view what Equipment and Items you own as well as which Equipment has been equipped to your characters.<br><br>The Inventory has tabs for each Category of item and each Category has tabs for the item types:<br>Resources - Currency, Enhancement Material, Resource Material<br>Equipment - Trinket, Jewelry, Footwear<br><br> items get stacked into a folder which can be double clicked to view the characters that own that resource.',
          ],
        },
        {
          title: 'Equipped',
          level: 3,
          img: 'img.png',
          page_contents: [
            'If an Equipment Item is equipped to a character, the icon and item detail box will show that it is equipped with an “E” symbol and it will also show an icon of the character it is equipped to.<br><br>The character icon can be double clicked to go to that characters info screen.',
          ],
        },
        {
          title: 'Limit Break',
          level: 3,
          img: 'img.png',
          page_contents: [
            "You can Limit Break Equipment in the Limit Break screen. To Limit Break equipment, you will need various resources and currency. Limit Breaking upgrades equipment, increasing the equipment's effect, Efficiency, and Tier.",
          ],
        },
        { title: 'Item Types', level: 2 },
        {
          title: 'Resource Items',
          level: 3,
          img: 'img.png',
          page_contents: [
            'Resource Items are materials and items that get used up after 1 use. There are various types of Resource Items and uses for them: <br>1. Resource Materials - Used as Limit Break material. <br>2. Experience Relics - Used for character level-up material. <br>3. Treasure Chests - Can be sold for large sums of Gold. <br>4. Repair Items - Can be used to repair Legendary Equipment. <br>5. Ascension Materials - Used to Ascend characters.',
          ],
        },
        {
          title: 'Key Items',
          level: 3,
          img: 'img.png',
          page_contents: [
            'Key Items are a type of stamina in the form of an item. Keys are required and used as stamina in order to play Unlockable Missions.<br><br>There are four rarities of Key and higher rarity Keys can be used to play higher Tier Unlockable Missions:<br>Common Key - Tier <br>Uncommon Key - Tier <br>Rare Key - Tier 3<br>Epic Key - Tier 4',
          ],
        },
        {
          title: 'Equipment',
          level: 3,
          img: 'img.png',
          page_contents: [
            'There are three types of Equipment: Trinket, Jewelry, and Footwear. Characters can equip one of each respectively. <br><br>Equipment items can be obtained from missions and equipped on a character to provide effects that help in missions. Higher Tier missions have higher chances to obtain higher rarity equipment items. There are currently 3 rarities: 1 Star (Common), 2 Star (Uncommon), and 3 Star (Rare).Higher rarity equipment items have higher effects and efficiency.',
          ],
        },
        {
          title: 'stats',
          level: 3,
          img: 'img.png',
          page_contents: [
            'Items have various stats, these stats include:<br>1. Efficiency <br>2. Effect',
            {
              title: 'Efficiency',
              content:
                '1 - 3 star items have an Efficiency stat that determines the effectiveness of the item’s effect. As the Efficiency stat lowers, the effect of the item reduces. Starting a mission reduces the Efficiency of all items equipped on the character. The amount that the Efficiency is reduced depends on the difficulty tier of the mission, with higher tier missions reducing Efficiency more. Items with an Efficiency stat can never break, even if the Efficiency stat hits 0. They can also be repaired to replenish the Efficiency stat and effect of the item. Upgrading an item via Limit Breaking will also “replenish” the item to the max Efficiency stat of the upgraded item.',
            },
            {
              title: 'Effect',
              content:
                'All items randomly get an effect that help in various ways in Dispatch missions. Higher rarity items get more powerful effects.<br><br>The item effect can be increased by Limit Breaking.',
            },
          ],
        },
      ],
    },
    {
      title: 'Shop',
      datas: [
        { title: 'Inventory', level: 2 },
        {
          title: 'Overview',
          level: 3,
          img: 'img.png',
          page_contents: [
            'There are various Shop types that sell a different variety of items for different currency. These shops can be found in the Shop menu. Shops may be updated to add or remove items, rebalance item costs, or rebalance item quantity available.',
          ],
        },
        {
          title: 'Cosmic Shop',
          level: 3,
          img: 'img.png',
          page_contents: [
            'The Cosmic Shop sells a variety of items, including Keys, Experience Relics, Treasure Chests, and Ascension Points in exchange for $COSMIC currency. <br><br>$COSMIC can be obtained by playing missions or selling items for $COSMIC in the marketplace.',
          ],
        },
        {
          title: 'Salvage Shop',
          level: 3,
          img: 'img.png',
          page_contents: [
            'The Salvage Shop sells a variety of items including Keys and Hammers in exchange for Salvage currency. <br><br>Salvage currency can be obtained by salvaging items.',
          ],
        },
        {
          title: 'Gold Shop',
          level: 3,
          img: 'img.png',
          page_contents: [
            'The Gold Shop sells a variety of items, including Resource Materials and Experience Relics in exchange for Gold currency. <br><br>Gold can be obtained by playing missions, selling items, or selling treasure chests.',
          ],
        },
      ],
    },
    {
      title: 'Cosmic Bank',
      datas: [
        { title: 'Cosmic Bank', level: 2 },
        {
          title: 'Overview',
          level: 3,
          img: 'img.png',
          page_contents: [
            'In the Cosmic Bank, you can Deposit or Withdraw $COSMIC into or out of the game respectively.',
          ],
        },
        {
          title: 'Deposit',
          level: 3,
          img: 'img.png',
          page_contents: [
            'On the Deposit screen, you can enter the amount of $COSMIC you would like to deposit from your connected crypto wallet to your in-game account.',
          ],
        },
        {
          title: 'Withdraw',
          level: 3,
          img: 'img.png',
          page_contents: [
            'On the Withdraw screen, you can enter the amount of $COSMIC you would like to withdraw from your in-game account to your connected crypto wallet.',
          ],
        },
      ],
    },
    {
      title: 'Marketplace',
      datas: [
        { title: 'Marketplace', level: 2 },
        {
          title: 'Overview',
          level: 3,
          img: 'img.png',
          page_contents: [
            'In the Marketplace, players can trade with other players peer-to-peer. Players can list, sell, and buy in-game items for $COSMIC or $SOL.',
          ],
        },
        {
          title: 'Buy',
          level: 3,
          img: 'img.png',
          page_contents: [
            'In the Marketplace buy tab you can view all of the currently listed items on the Marketplace. You can narrow down your search by searching for the specific item type collection you want, filtering the items by Tier, Rarity, or specific item stats, and organising items by price, recently listed, tier, rarity, etc. Once you have found the item you desire and you are happy with the price, you can purchase the item with $COSMIC on your in-game account or the $SOL in your wallet.',
          ],
        },
        {
          title: 'Sell',
          level: 3,
          img: 'img.png',
          page_contents: [
            'In the Marketplace sell tab you can list items you own for sale by setting the amount of $COSMIC or $SOL you would like to sell it for and then confirming. Items that you have listed on the Marketplace will become unusable in-game. You can unlist an item at any time if you decide you no longer want to sell it and the item will become usable again.',
          ],
        },
        {
          title: 'Listings',
          level: 3,
          img: 'img.png',
          page_contents: [
            'In the Marketplace listings tab, you can view all the items you currently have listed. You can unlist an item at any time if you decide you no longer want to sell it and the item will become usable again.',
          ],
        },
      ],
    },
  ]

  const handleSelectTitle = (index) => {
    setSelectedPage(0)
    setSelectedSubTitle(1)
    setSelectedTitle(index)
  }

  const handleSelectSubTitle = (index) => {
    if (guides[selectedTitle].datas[index].level == 2) return
    setSelectedPage(0)
    setSelectedSubTitle(index)
  }

  const previousPage = () => {
    if (selectedPage !== 0) {
      setSelectedPage(selectedPage - 1)
    }
  }

  const nextPage = () => {
    if (
      selectedPage <
      guides[selectedTitle].datas[selectedSubTitle].page_contents.length - 1
    ) {
      setSelectedPage(selectedPage + 1)
    }
  }

  useEffect(() => {
    if (location) {
      const path = location.pathname.split('/')
      const title = path[path.length - 1]
      if (title === 'list') {
        setSelectedTitle(0)
      } else if (title === 'region') {
        setSelectedTitle(1)
      } else if (title === 'inventory') {
        setSelectedTitle(2)
      } else if (title === 'shop') {
        setSelectedTitle(3)
      } else if (title === 'evolution') {
        setSelectedPage(0)
        setSelectedTitle(0)
        setSelectedSubTitle(6)
      } else if (title === 'marketplace') {
        setSelectedTitle(5)
      }
    }
  }, [location])

  return !!open ? (
    <div className="vw-100 vh-100 position-fixed">
      <div
        className="mission-list-rewards-dialog-container"
        style={{
          width: '900px',
          height: '650px',
          zIndex: 50,
          maxWidth: '1000px',
        }}
      >
        <div className="d-flex justify-content-center align-items-center mt-3">
          <h2>{guides[selectedTitle].title}</h2>
          <CloseButton onClick={onClose} />
        </div>
        <div
          className="custom-border-bottom type-long mb-3"
          style={{ marginLeft: '1rem', marginRight: '1rem' }}
        ></div>

        <div className="modalContainer d-flex align-items-center">
          <div className="titleContainer">
            {guides.map((data, index) => (
              <div
                className={
                  index === selectedTitle
                    ? 'title level1 title-active'
                    : 'title level1'
                }
                key={`guide-title-${index}`}
                onClick={() => handleSelectTitle(index)}
              >
                {data?.title}
              </div>
            ))}
          </div>

          <div className="titleContainer">
            {guides[selectedTitle].datas.map((data, index) => (
              <div
                className={
                  index === selectedSubTitle
                    ? 'title level' + data?.level + ' title-active'
                    : 'title level' + data?.level
                }
                key={`guide-subtitle-${index}`}
                onClick={() => handleSelectSubTitle(index)}
              >
                {data?.title}
              </div>
            ))}
          </div>

          <div className="contentContainer">
            <div className="imgContainer">
              <img
                src={
                  '/guide/' + guides[selectedTitle].datas[selectedSubTitle].img
                }
              />
            </div>

            <div className="detail-title">
              {guides[selectedTitle].datas[selectedSubTitle].page_contents[
                selectedPage
              ].title
                ? '▶ ' +
                  guides[selectedTitle].datas[selectedSubTitle].page_contents[
                    selectedPage
                  ].title
                : '▶ ' + guides[selectedTitle].datas[selectedSubTitle].title}
            </div>

            <div
              className="custom-scroll detail-text"
              dangerouslySetInnerHTML={{
                __html: guides[selectedTitle].datas[selectedSubTitle]
                  .page_contents[selectedPage].content
                  ? guides[selectedTitle].datas[selectedSubTitle].page_contents[
                      selectedPage
                    ].content
                  : guides[selectedTitle].datas[selectedSubTitle].page_contents[
                      selectedPage
                    ],
              }}
            />

            <div className="d-flex mt-4 justify-content-between">
              <div
                className={
                  selectedPage !== 0
                    ? 'page-btn btn-active'
                    : 'page-btn inactive'
                }
                onClick={() => previousPage()}
              >
                Previous
              </div>

              <div className="pages">
                {'Page ' +
                  (selectedPage + 1) +
                  '/' +
                  guides[selectedTitle].datas[selectedSubTitle].page_contents
                    .length}
              </div>

              <div
                className={
                  selectedPage <
                  guides[selectedTitle].datas[selectedSubTitle].page_contents
                    .length -
                    1
                    ? 'page-btn btn-active'
                    : 'page-btn inactive'
                }
                onClick={() => nextPage()}
              >
                Next
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default GuideModal
