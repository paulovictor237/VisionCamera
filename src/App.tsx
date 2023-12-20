import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  CameraPosition,
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';

export default function CameraPeve() {
  const [active, setActive] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState<CameraPosition>('back');
  const device = useCameraDevice(cameraType);
  const camera = useRef<Camera>(null);

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

  useEffect(() => {
    if (!hasPermission || !device) return;
    const timeout = setTimeout(() => setActive(true), 1e3);
    return () => clearTimeout(timeout);
  }, [device, hasPermission]);

  const toggleCamera = () =>
    setCameraType((type) => (type === 'front' ? 'back' : 'front'));

  const takePhoto = async () => {
    try {
      const photo = await camera.current?.takePhoto();
      console.log('🐞 ~ photo:', photo);
    } catch (error) {
      console.log('🐞 ~ error:', error);
    }
  };

  if (!device || !hasPermission) {
    return (
      <View style={styles.container}>
        <Button
          onPress={requestCameraPermission}
          title="Camera permission"
          disabled={hasCameraPermission}
        />

        <Button
          onPress={requestMicrophonePermission}
          title="Microphone permission"
          disabled={hasMicrophonePermission}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        onPress={() => setActive((p) => !p)}
        title={active ? 'Disable Camera' : 'Active Camera'}
      />
      <Button onPress={toggleCamera} title={'Toggle Camera'} />
      <Button onPress={takePhoto} title={'Take Photo'} />
      <Text className="font-bold text-red-500 text-2xl text-center bg-green-500">
        Nativewind
      </Text>
      {!active && <Text style={styles.warning}>Camera is not Active</Text>}
      <Camera
        ref={camera}
        isActive={active}
        device={device}
        photo={true}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  warning: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
    backgroundColor: 'yellow',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bold: {
    fontWeight: 'bold',
  },
});
