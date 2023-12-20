import { SwitchCamera } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Button, TouchableOpacity, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  CameraPosition,
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';

export const Home = () => {
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
      <View className="flex-1">
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
    <View className="flex-1">
      <Camera
        ref={camera}
        isActive={active}
        device={device}
        photo={true}
        className="flex-1"
        onInitialized={() => setTimeout(() => setActive(true), 150)}
      />
      <View className="absolute top-10 right-4">
        <TouchableOpacity
          onPress={toggleCamera}
          className="rounded-full bg-gray-500/50 p-2"
        >
          <SwitchCamera className="text-white" size={24} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={takePhoto}
        className="absolute h-20 w-20 rounded-full border-4 border-white bottom-12 self-center"
      />
    </View>
  );
};
