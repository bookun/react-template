import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import { useRecoilState, useRecoilValue } from "recoil";
import { eventContentState, focusEventFlagState } from "../stores/event-store";
import {
  selectedEndState,
  selectedStartState,
} from "../stores/select-range-store";
import { contents } from "../stores/event-store";
import mockDB from "../db";

const useStyles = makeStyles({
  card: {
    margin: "10px",
  },
});

const Detail: FunctionComponent = () => {
  const focusEventContent = useRecoilValue(eventContentState);
  const focusFlag = useRecoilValue(focusEventFlagState);
  const [start] = useRecoilState(selectedStartState);
  const [end] = useRecoilState(selectedEndState);
  const [planA, setPlanA] = useState(0);
  const [planB, setPlanB] = useState(0);
  const [flowerA, setFlowerA] = useState(0);
  const [flowerB, setFlowerB] = useState(0);

  const classes = useStyles();

  const displaySelectDateRange = () => {
    const startDate = start.toLocaleString("ja-JP");
    const endDate = end.toLocaleString("ja-JP");
    return `${startDate} - ${endDate}`;
  };
  useEffect(() => {
    const startStr = start.toISOString();
    const endStr = end.toISOString();
    console.log(startStr, endStr);
    const results = contents.filter((content) => {
      return content.start >= startStr && content.end <= endStr;
    });
    let tmp0 = 0;
    let tmp1 = 0;
    let tmpA = 0;
    let tmpB = 0;
    results.map((r): void => {
      r.plan ? tmp1++ : tmp0++;
      tmpA += mockDB.plan[r.plan].花A;
      tmpB += mockDB.plan[r.plan].花B;
    });
    setPlanA(tmp0);
    setPlanB(tmp1);
    setFlowerA(tmpA);
    setFlowerB(tmpB);
    console.log(results);
  }, [start, end]);
  return (
    <Fragment>
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <Typography>{displaySelectDateRange()}</Typography>
          <Typography>Aコース: {planA}</Typography>
          <Typography>Bコース: {planB}</Typography>
          <Typography>花A: {flowerA}</Typography>
          <Typography>花B: {flowerB}</Typography>
        </CardContent>
      </Card>
      {focusFlag ? (
        <Card variant="outlined" className={classes.card}>
          <CardContent>
            <Typography>お客様情報</Typography>
            <Typography>氏名:{focusEventContent.name}</Typography>
            <Typography>電話番号:{focusEventContent.phone}</Typography>
            <Typography>
              コース: {mockDB.plan[focusEventContent.plan].name}
            </Typography>
            <Typography>Zoom: {focusEventContent.zoomUrl}</Typography>
          </CardContent>
        </Card>
      ) : null}
    </Fragment>
  );
};

export default Detail;
