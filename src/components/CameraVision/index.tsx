import { forwardRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  Camera,
  CameraPosition,
  CameraProps,
  CameraRuntimeError,
  useCameraDevice,
} from 'react-native-vision-camera';
import { useActiveApp } from '../../hooks/active';
import { StyleSheet } from 'react-native';

export type Props = Omit<
  CameraProps,
  'ref' | 'device' | 'isActive' | 'photo' | 'video' | 'onError'
> & {
  cameraType: CameraPosition;
};

export const CameraVision = forwardRef<Camera, Props>((props, ref) => {
  const [initialized, setInitialized] = useState(false);
  const isFocused = useIsFocused();
  const activeApp = useActiveApp();
  const device = useCameraDevice(props.cameraType);
  const dependencies = !!device && isFocused && activeApp && initialized;

  const onError = (error: CameraRuntimeError) => {
    const message = error.toString();
    const knownCodes = ['deleteStream:862'];
    const knownError = knownCodes.some((error) => message.includes(error));
    if (knownError) return console.warn('🐞 ~ known error');
    console.error('🐞 ~ error:', error.code);
    console.error('🐞 ~ error:', message);
  };

  if (!device) return null;
  return (
    <Camera
      ref={ref}
      device={device}
      isActive={dependencies}
      photo={true}
      video={true}
      audio={false}
      onError={onError}
      style={StyleSheet.absoluteFill}
      onInitialized={() => setInitialized(true)}
      // onLayout={() => setInitialized(false)}
      // resizeMode="contain"
      // pixelFormat="yuv"
      {...props}
    />
  );
});
