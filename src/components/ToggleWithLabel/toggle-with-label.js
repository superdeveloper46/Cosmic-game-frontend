import React from "react"
import Switch from "react-switch"

const ToggleWithLabel = ({
  id,
  label,
  checked,
  setChecked,
}) => {
  return (
    <div className="mb-2">
      <label htmlFor={ id } className="d-flex justify-content-between align-items-center cursor-pointer">
        <span className="text-nowrap pe-2">{ label }</span>

        <Switch
          checked={ checked }
          onChange={ setChecked }
          handleDiameter={24}
          offColor="#011326"
          onColor="#023361"
          offHandleColor="#004F9D"
          onHandleColor="#BFE1FE"
          borderRadius={1}
          activeBoxShadow="0px 0px 0px 2px #008AFF"
          uncheckedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "95%",
                fontSize: 15,
                color: "white",
                padding: '0.5rem 1rem'
              }}
            >
              OFF
            </div>
          }
          checkedIcon={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 15,
                color: "white",
                padding: '0.5rem 1rem'
              }}
            >
              ON
            </div>
          }
          className="react-switch"
          id={ id }
        />
      </label>
    </div>
  )
}

export default ToggleWithLabel