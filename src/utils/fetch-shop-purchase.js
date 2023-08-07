import API from '../actions/api'

const shopPurchase = async ({
  product_id,
  quantity,
  wallet,
  setMessage,
  setLoading,
    reload
}) => {
  if (setLoading) setLoading(true)

  API.post('/purchase', { product_id, quantity, wallet })
    .then(async (res) => {
      if (!res.data.message) {
        setMessage({
          type: 'error',
          text: 'Something went wrong!',
        })

        setLoading(false)
        return
      }
      setMessage({
        type: 'confirm',
        text: res.data.message,
      })
      setLoading(false)
    })
      .then(res => {
        reload()
      })
    .catch((err) => {
      console.log('error', err)
      if (typeof err?.response?.data?.message === 'string') {
        setMessage({
          type: 'error',
          text: err.response.data.message,
        })
      } else {
        setMessage({
          type: 'error',
          text: 'Something went wrong!',
        })
      }
      setLoading(false)
    })
}

export default shopPurchase
