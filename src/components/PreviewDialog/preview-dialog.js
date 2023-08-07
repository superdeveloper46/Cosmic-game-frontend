import React from "react"
import PreviewItemPage from "../PreviewItemPage/preview-item-page"
import PreviewResourcePage from "../PreviewResourcePage/preview-resource-page"

const PreviewDialog = ({
  preview,
  setPreview,
  setInventoryMission,
}) => {
  return (
    !!preview
    ? <div className="preview-wrapper">
      {
        preview.type === 'item'
        ? <PreviewItemPage
          item={ preview.payload }
          setInventoryMission={ setInventoryMission }
          onClose={ () => setPreview(null) }
        />
        : preview.type === 'legendary'
        ? 'Legendary Preview'
        : preview.type === 'resource'
        ? <PreviewResourcePage
          resource={ preview.payload }
          setInventoryMission={ setInventoryMission }
          onClose={ () => setPreview(null) }
        />
        : null
      }
    </div>
    : null
  )
}

export default PreviewDialog