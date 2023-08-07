import React from "react";
import RepairItemRow from "../RepairItemRow/repair-item-row";
import { useSelector } from "react-redux";

import "./character-profile-repair-selected-item-info.scss"

const CharacterProfileRepairSelectedItemInfo = ({
  ape,
  selectedRepairMaterials,
  setSelectedRepairMaterials,
}) => {
  const resources = useSelector((state) => state.resources.resources);
  const accountInventories = useSelector((state) => state.resources.accountResources);
  const isHammersClickable = useSelector((state) => state.repair.isHammersClickable);

  const handleClickMaterial = (resource) => {
    if (!isHammersClickable) {
      return false
    }
    const inventory = (accountInventories|| []).find(
      (inv) => inv.id === resource.id
    );
    const material = (selectedRepairMaterials || []).find(
      (material) => material.id === resource.id
    );
    if ((inventory?.quantity || 0) > (material?.count || 0)) {
      if (!!material) {
        setSelectedRepairMaterials(
          [
            ...selectedRepairMaterials.filter((m) => m.id !== material.id),
            {
              id: resource.id,
              resource,
              count: (material.count || 0) + 1,
            },
          ].sort((m1, m2) => m1.id - m2.id)
        );
      } else {
        setSelectedRepairMaterials(
          [
            ...selectedRepairMaterials,
            {
              id: resource.id,
              resource,
              count: 1,
            },
          ].sort((m1, m2) => m1.id - m2.id)
        );
      }
    }
  };

  return (
    <div className="repair-materials-container d-flex justify-content-start align-items-center flex-column flex-grow-1">
      <div className="panel-header w-100 d-flex justify-content-start align-items-start flex-column custom-border-bottom mb-3">
        <div className="mt-4 mb-3">REPAIR MATERIALS</div>
      </div>
      <div
        className="custom-border-bottom d-flex flex-column justify-content-between px-2 py-2 w-100"
      >
        <div className="repair-materials d-flex flex-column custom-scroll overflow-auto justify-content-start w-100">
          {resources
            .filter((resource) => resource.type === "Resource: Repair Item")
            .map((resource) => (
              <RepairItemRow
                resource={resource}
                inventory={(accountInventories || []).find(
                  (inv) => inv.id === resource.id
                )}
                key={`repair-item-repair-${resource.id}`}
                onClick={() => handleClickMaterial(resource)}
                selectedCount={
                  (selectedRepairMaterials || []).find(
                    (material) => material.id === resource.id
                  )?.count || 0
                }
                clickable
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterProfileRepairSelectedItemInfo;
