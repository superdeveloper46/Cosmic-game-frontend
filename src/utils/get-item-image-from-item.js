const getItemImageFromItem = item => {
  return `${item?.category[0].toUpperCase() || '' + item.category.slice(1)} 1 (${item.star} star).png`
}

export default getItemImageFromItem
