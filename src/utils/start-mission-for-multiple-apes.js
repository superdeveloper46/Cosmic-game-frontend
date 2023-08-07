import API from "../actions/api"

const startMissionForMultipleApes = async ({
  apes = [],
  inventoryEquips = {},
  mission,
  wallet,
  setMessage,
  setLoading,
  cb,
}) => {
  if (!wallet) return 'Wallet Address is required'
  if (!mission) return 'Mission is required'
  setLoading(true)

  API.post('/missions/go-mission-selected', {
    missionId: mission.id,
    wallet,
    apes: apes.map(ape => ({
      address: ape.mint,
      inventoryIds: (inventoryEquips[ape.mint] || []).filter(inv => !!inv.Item).map(inv => inv.id).filter(inv => !!inv),
      utilityInventoryIds: (inventoryEquips[ape.mint] || []).filter(inv => !!inv.Utility).map(inv => inv.id).filter(inv => !!inv)
    }))
  })
  .then(async res => {
    if (!res.data.allSent) {
      setMessage({
        type: 'error',
        text: 'Unable to start the mission for some apes due to not enough stamina'
      })
      if (!!res.data.missionHistories) {
        if (typeof cb === 'function') await cb()
      }
      setLoading(false)
      return
    }
    if (!!res.data.missionHistories) {
      if (typeof cb === 'function') await cb()
    }
    setMessage({
      type: 'confirm',
      text: 'Mission started successfully.'
    })
    setLoading(false)
  })
  .catch(err => {
    console.log('error', err)
    if (typeof err?.response?.data?.msg === 'string') {
      setMessage({
        type: 'error',
        text: err.response.data.msg
      })
    } else if (err?.response?.data?.msgs && typeof err?.response?.data?.msgs[0] === 'string') {
      setMessage({
        type: 'error',
        text: (
          err.response.data.msgs.map(msg => <p>{msg}</p>)
        )
      })
    } else {
      setMessage({
        type: 'error',
      })
    }
    setLoading(false)
  })
}

export default startMissionForMultipleApes