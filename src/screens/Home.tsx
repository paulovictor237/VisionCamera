import { useRef, useState } from 'react';
import { View } from 'react-native';
import { Camera, CameraPosition } from 'react-native-vision-camera';
import { PermissionsRequest } from '../components/PermissionsRequest';
import { CameraVision } from '../components/CameraVision';
import { PhotoButton } from '../components/PhotoButton';

export const Home = () => {
  const [cameraType, setCameraType] = useState<CameraPosition>('front');
  const camera = useRef<Camera>(null);

  return (
    <View className="flex-1">
      <PermissionsRequest>
        <CameraVision ref={camera} cameraType={cameraType} />
        {/* <PlateMask /> */}
        <PhotoButton camera={camera} setCameraType={setCameraType} />
      </PermissionsRequest>
    </View>
  );
};
