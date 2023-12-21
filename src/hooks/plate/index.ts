import { OCRFrame, scanOCR } from '@ismaelmoreiraa/vision-camera-ocr';
import { useState } from 'react';
import { useFrameProcessor } from 'react-native-vision-camera';
import { Worklets } from 'react-native-worklets-core';

export const usePlateDetect = () => {
  const [plate, setPlate] = useState<string | null>(null);

  const plateValidation = (plate: string) => {
    const regex = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}';
    return plate.trim().match(regex);
  };

  const onFaceDetected = Worklets.createRunInJsFn((face: OCRFrame) => {
    const words = face.result.blocks
      .map((block) => block.text.split(/\s+/))
      .flat();
    const result = [...new Set(words)];
    const plate = result.find(plateValidation);
    setPlate(plate ? plate : null);
    console.log('🐞 ~ words:', result);
  });

  const frameProcessorPlate = useFrameProcessor((frame) => {
    'worklet';
    const data = scanOCR(frame);
    onFaceDetected(data);
  }, []);

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`);
  }, []);

  return { frameProcessorPlate, frameProcessor, plate };
};
