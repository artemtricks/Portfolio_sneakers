import React from "react";
import { UseSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { addNewFavoriteSneaker } from "../redux/sneaker/sneakerSlice";

import { ISneakers } from "../App";

export const useToggleSneakerOpt = (sneakers: ISneakers[], isCart = false) => {
  const dispatch = useDispatch();
  const handleNewSneaker = React.useCallback(
    (id: number) => {
      const sneakerItem = sneakers.find((sneaker) => sneaker.id === id);
      if (sneakerItem && isCart === false) {
        //@ts-ignore
        dispatch(addNewFavoriteSneaker(sneakerItem));
      }
    },
    [sneakers, dispatch]
  );

  return handleNewSneaker;
};
