import { useEffect, useState } from 'react';
import {
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';

export const usePermissions = () => {
  const [hasPermission, setHasPermission] = useState(false);

  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();

  const {
    hasPermission: hasMicrophonePermission,
    requestPermission: requestMicrophonePermission,
  } = useMicrophonePermission();

  useEffect(() => {
    if (hasCameraPermission && hasMicrophonePermission) setHasPermission(true);
  }, [hasCameraPermission, hasMicrophonePermission]);

  return {
    hasPermission,
    hasCameraPermission,
    hasMicrophonePermission,
    requestCameraPermission,
    requestMicrophonePermission,
  };
};
