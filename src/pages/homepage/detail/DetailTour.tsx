import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../../store/redux/store";
import { useDispatch } from "react-redux";
import { fetchTourDetail } from "../../../store/redux/silce/tourSlice";
import { useSelector } from "react-redux";
import LoadingFullScreen from "../../../styles/loading/LoadingFullScreen";

function DetailTour() {
  const { index } = useParams<{ index: any }>();
  const dispatch: AppDispatch = useDispatch();

  const { loadingDetail, tourGetDetail } = useSelector(
    (state: any) => state.tour
  );
  console.log(tourGetDetail);
  useEffect(() => {
    dispatch(fetchTourDetail(index));
  }, [dispatch, index]);
  return (
    <>
      {loadingDetail ? (
        <LoadingFullScreen loading={loadingDetail} />
      ) : (
        <div>DetailTour</div>
      )}
    </>
  );
}

DetailTour.propTypes = {};

export default DetailTour;
