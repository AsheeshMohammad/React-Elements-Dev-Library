import React, { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import ConfirmationDialog from "../ModalField/ConfirmationDialog";
const secondsToMMSS = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
};

const promptBeforeValue = 120000;
export interface SessionTimeOutProps {
  sessionTime: string;
  handleSubmitSession: () => void;
  onSessionExpire: () => void;
}
const SessionTimeOut = ({
  sessionTime,
  handleSubmitSession,
  onSessionExpire,
}: SessionTimeOutProps) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const expiryDetails = sessionTime;
  const providedTimestamp = new Date(expiryDetails).getTime();
  const currentTimestamp = new Date().getTime();
  const remainingTime = providedTimestamp - currentTimestamp;
  const timeout = remainingTime;
  const promptBeforeIdle = Math.min(promptBeforeValue, timeout - 1000);
  const [remainingTimeInSeconds, setRemainingTimeInSeconds] =
    useState<number>(0); // Initialize remaining time in seconds
  const [formattedRemainingTime, setFormattedRemainingTime] =
    useState<string>("");
  const onIdle = () => {
    if (sessionTime) {
      onSessionExpire();
    }
  };

  const onActive = () => {
    setOpenConfirmModal(false);
  };
  const handleSubmit = () => {
    handleSubmitSession();
  };
  const handleCancel = () => {
    setOpenConfirmModal(false);
  };

  const onPrompt = () => {
    setOpenConfirmModal(true);
  };
  const { getRemainingTime, activate } = useIdleTimer({
    onIdle,
    onPrompt,
    onActive,
    promptBeforeIdle,
    timeout,
    throttle: 400,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      const remainingSeconds = Math.ceil(getRemainingTime() / 1000);
      setRemainingTimeInSeconds(
        promptBeforeIdle !== promptBeforeValue ? remainingSeconds : 0
      );
      const formattedTime = secondsToMMSS(remainingSeconds);
      setFormattedRemainingTime(
        promptBeforeIdle !== promptBeforeValue ? formattedTime : "0"
      );
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [promptBeforeIdle]);
  const sessionMessage = `Your session will expire in ${formattedRemainingTime} seconds. Do you want to extend the session?`;

  return (
    <>
      {" "}
      <ConfirmationDialog
        openConfirmDialog={openConfirmModal}
        handleCancel={handleCancel}
        onClickSubmit={() => handleSubmit()}
        text={sessionMessage}      />
    </>
  );
};

export default SessionTimeOut;
