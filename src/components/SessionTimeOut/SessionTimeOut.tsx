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
  handleSessionCancel: () => void;
  SubmitButtonName?:string
  buttonStyleProps?:any
}

const SessionTimeOut = ({
  sessionTime,
  handleSubmitSession,
  onSessionExpire,
  handleSessionCancel,
  SubmitButtonName='Submit',
  buttonStyleProps
}: SessionTimeOutProps) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const expiryDetails = sessionTime;
  const providedTimestamp = new Date(expiryDetails).getTime();
  const currentTimestamp = new Date().getTime();
  const remainingTime = providedTimestamp - currentTimestamp;
  const timeout = remainingTime;
  const promptBeforeIdle = Math.min(promptBeforeValue, timeout - 1000);
  const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState<number>(
    Math.ceil(timeout / 1000)
  );
  const [formattedRemainingTime, setFormattedRemainingTime] =
    useState<string>(secondsToMMSS(Math.ceil(timeout / 1000)));

  const onIdle = () => {
    if (sessionTime) {
      onSessionExpire();
    }
  };

  const handleSubmit = () => {
    handleSubmitSession();
    setOpenConfirmModal(false);
  };

  const handleCancel = () => {
    handleSessionCancel();
    setOpenConfirmModal(false);
  };

  const onPrompt = () => {
    setOpenConfirmModal(true);
  };

  const { getRemainingTime, activate } = useIdleTimer({
    onIdle,
    onPrompt,
    promptBeforeIdle,
    timeout,
    throttle: 1000, // Adjust throttle to reduce delays
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingSeconds = Math.ceil(getRemainingTime() / 1000);
      setRemainingTimeInSeconds(
        promptBeforeIdle !== promptBeforeValue ? remainingSeconds : 0
      );
      const formattedTime = secondsToMMSS(remainingSeconds);
      setFormattedRemainingTime(
        promptBeforeIdle !== promptBeforeValue ? formattedTime : "00:00"
      );
    }, 1000); // Adjust interval to 1000 ms

    return () => {
      clearInterval(interval);
    };
  }, [promptBeforeIdle, getRemainingTime]);

  const sessionMessage = `Your session will expire in ${formattedRemainingTime} seconds. Do you want to extend the session?`;
  console.log(promptBeforeIdle, 'promptBeforeIdle');

  return (
    <>
      <ConfirmationDialog
        openConfirmDialog={openConfirmModal}
        handleCancel={handleCancel}
        onClickSubmit={handleSubmit}
        text={sessionMessage}
        Submit={SubmitButtonName}
        buttonStyleProps={buttonStyleProps}
      />
    </>
  );
};

export default SessionTimeOut;
