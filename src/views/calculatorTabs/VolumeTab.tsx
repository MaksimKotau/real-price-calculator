import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import AddButton from "../../components/AddButton";
import SwipableList, {
  SwipableListElement,
} from "../../components/SwipableList";
import VolumeType from "../../enums/volumeType";
import { convertVolume } from "../../service/index";
import {
  removeDataFromVolumeAndSaveToHistory,
  useStore,
  VolumeCompareData,
} from "../../state/state";
import VolumeForm from "./VolumeForm";
import { PIRE_PRICE_COLOR, BEST_PRICE_COLOR } from "../../service/constants";

const VolumeTab: React.FC<{}> = () => {
  const [isFormOpen, setFormOpen] = useState<boolean>(false);
  const { state, dispatch } = useStore();
  const maxId = getVolumeMaxId(state.calculation.volume);
  const minId = getVolumeMinId(state.calculation.volume);
  const elements: SwipableListElement[] = state.calculation.volume.map(
    (el) => ({
      id: el.id,
      swipeAction: () => removeDataFromVolumeAndSaveToHistory(dispatch, el.id),
      renderFunction: () => renderVolumeElement(el),
      border:
        el.id === maxId
          ? `2px solid ${PIRE_PRICE_COLOR}`
          : el.id === minId
          ? `2px solid ${BEST_PRICE_COLOR}`
          : undefined,
    })
  );
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <SwipableList elements={elements} />
      <AddButton onClick={() => setFormOpen(true)} />
      <VolumeForm isOpen={isFormOpen} handleClose={() => setFormOpen(false)} />
    </div>
  );
};

export default VolumeTab;

export const getPriceBy100ml = (
  unitType: VolumeType,
  count: number,
  price: number
): number => {
  const priceForOneUnit = price / count;
  const conversionCoefficient = convertVolume(
    VolumeType.milliliter,
    unitType,
    1
  );
  const priceFor_1ml = priceForOneUnit * conversionCoefficient;
  return priceFor_1ml * 100;
};

export const renderVolumeElement = (el: VolumeCompareData) => {
  return (
    <>
      <Typography variant='subtitle2'>{`Units: ${el.unitType}`}</Typography>
      <Typography variant='subtitle2'>{`Volume: ${el.count}`}</Typography>
      <Typography variant='subtitle2'>{`Price: ${el.price}`}</Typography>
      <Typography variant='subtitle2'>{`REAL PRICE FOR 100ml: ${getPriceBy100ml(
        el.unitType,
        el.count,
        el.price
      ).toFixed(2)}`}</Typography>
    </>
  );
};

export const getVolumeMinId = (data: VolumeCompareData[]) => {
  if (data.length < 2) return undefined;
  //check if all prices the same
  if (
    data.every(
      (el) =>
        Math.abs(
          getPriceBy100ml(el.unitType, el.count, el.price) -
            getPriceBy100ml(data[0].unitType, data[0].count, data[0].price)
        ) < 0.001
    )
  ) {
    return undefined;
  }
  let indexMin = 0;
  let minId = data[indexMin].id;
  for (let i = 1; i < data.length; i++) {
    if (
      getPriceBy100ml(data[i].unitType, data[i].count, data[i].price) <
      getPriceBy100ml(
        data[indexMin].unitType,
        data[indexMin].count,
        data[indexMin].price
      )
    ) {
      minId = data[i].id;
      indexMin = i;
    }
  }
  return minId;
};

export const getVolumeMaxId = (data: VolumeCompareData[]) => {
  if (data.length < 2) return undefined;

  //check if all prices the same
  if (
    data.every(
      (el) =>
        Math.abs(
          getPriceBy100ml(el.unitType, el.count, el.price) -
            getPriceBy100ml(data[0].unitType, data[0].count, data[0].price)
        ) < 0.001
    )
  ) {
    return undefined;
  }
  let indexMax = 0;
  let maxId = data[indexMax].id;
  for (let i = 1; i < data.length; i++) {
    if (
      getPriceBy100ml(data[i].unitType, data[i].count, data[i].price) >
      getPriceBy100ml(
        data[indexMax].unitType,
        data[indexMax].count,
        data[indexMax].price
      )
    ) {
      maxId = data[i].id;
      indexMax = i;
    }
  }
  return maxId;
};
