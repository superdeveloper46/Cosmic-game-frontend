import React, { useEffect, useState } from "react"
import fetchMissionsByReward from "../../utils/fetch-missions-by-reward"
import PreviewRewardingMissionRow from "../PreviewRewardingMissionRow/preview-rewarding-mission-row"

const PreviewRewardingMissions = ({
  type = 'item',
  id,
  goMission,
}) => {
  const [ missions, setMissions ] = useState([])
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    if (!!id) {
      setLoading(true)

      fetchMissionsByReward({ type, id })
      .then(fetchedMissions => {
        setMissions(fetchedMissions)
        setLoading(false)
      })
    }
  }, [ id, type ])

  return (
    <div className="preview-rewarding-missions">
      {
        !!loading
        ? 'Loading ...'
        : missions.length > 0
        ? missions.map(
          mission => (
            <PreviewRewardingMissionRow key={`preview-rewarding-mission-${mission.id}`} mission={ mission } goMission={ goMission } />
          )
        )
        : `No missions rewarding this ${type}`
      }
    </div>
  )
}

export default PreviewRewardingMissions