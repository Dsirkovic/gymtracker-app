import { Input } from "../components/Input";
import { useState } from "react";
import { InputPull } from "../components/Input1"
import { InputLegs } from "../components/InputLegs"
import { InputAbs } from "../components/InputAbs"

export const Main = () => {
  const [pushListVisible, setPushListVisible] = useState(false);
  const [pullListVisible, setPullListVisible] = useState(false);
  const [legsListVisible, setLegsListVisible] = useState(false);
  const [absListVisible, setAbsListVisible] = useState(false);

  const togglePushList = () => {
    setPushListVisible((prevState) => !prevState);
    setPullListVisible(false);
    setLegsListVisible(false);
    setAbsListVisible(false);
  };

  const togglePullList = () => {
    setPullListVisible((prevState) => !prevState);
    setPushListVisible(false);
    setLegsListVisible(false);
    setAbsListVisible(false);
  };

  const toggleLegsList = () => {
    setLegsListVisible((prevState) => !prevState);
    setPushListVisible(false);
    setPullListVisible(false);
    setAbsListVisible(false);
  };

  const toggleAbsList = () => {
    setAbsListVisible((prevState) => !prevState);
    setPushListVisible(false);
    setLegsListVisible(false);
    setPullListVisible(false);
  };

  return (
    <>
    <hr></hr>
      <div className="heading">Which workout are you doing today?</div>
      <button onClick={togglePushList} className="btn">PUSH</button>
      <button onClick={togglePullList} className="btn">PULL</button>
      <button onClick={toggleLegsList} className="btn">LEGS + CARDIO</button>
      <button onClick={toggleAbsList} className="btn">ABS + CARDIO</button>
      {pushListVisible && <Input category="push"/>}
      {pullListVisible && <InputPull category="pull"/>}
      {legsListVisible && <InputLegs category="legs"/>}
      {absListVisible && <InputAbs category="abs"/>}
      <hr></hr>
    </>
  );
};