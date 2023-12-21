import React, { FC, useEffect } from 'react';
import {
  TouchableOpacity,
  StatusBar,
  GestureResponderEvent,
} from 'react-native';
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  WithSpringConfig,
} from 'react-native-reanimated';
import { checkNumbre } from '../../assets/check-numbre';
import { useLayout } from '../../hooks/layout';
import { FourEdge } from '../four-edge';
import { Line } from '../line';

const MASK_PADDING = 8;
const DEFAULT_WIDTH = 280;
const DEFAULT_HEIGHT = 300;

export type Props = {
  lineAnimationDuration?: number;
  showAnimatedLine?: boolean;
  animatedLineOrientation?: 'vertical' | 'horizontal';
  animatedLineThickness?: number;
  width?: number;
  height?: number;
  outerMaskOpacity?: number;
  backgroundColor?: string;
  edgeColor?: string;
  edgeWidth?: number;
  edgeHeight?: number;
  edgeBorderWidth?: number;
  edgeRadius?: number;
  animatedLineColor?: string;
  isActive?: boolean;
  onPress?: (event?: GestureResponderEvent) => void;
};

export const AnimationFrame: FC<Props> = ({
  width: defaultWidth = DEFAULT_WIDTH,
  height: defaultHeight = DEFAULT_HEIGHT,
  backgroundColor = '#000',
  outerMaskOpacity = 1,
  showAnimatedLine = true,
  onPress = undefined,
  edgeBorderWidth = 4,
  ...rest
}) => {
  const maskHight = useSharedValue<any>(defaultHeight);
  const maskWidth = useSharedValue<any>(defaultWidth);
  const outMaskWidthHight = useSharedValue<any>(0);
  const outMaskWidthWidth = useSharedValue<any>(0);
  const outMaskHightHight = useSharedValue<any>(0);
  const { width, height, portrait } = useLayout();

  const springConfig: WithSpringConfig = {
    damping: 15,
    stiffness: 100,
    mass: 0.5,
  };

  const TouchableOpacityAnimated =
    Reanimated.createAnimatedComponent(TouchableOpacity);

  const statusBarHeight = checkNumbre(StatusBar.currentHeight, 35);

  const maskStyle = useAnimatedStyle(() => {
    return { width: maskWidth.value, height: maskHight.value };
  });

  const setAnimation = (
    value: any,
    config: WithSpringConfig = springConfig,
  ) => {
    'worklet';
    return withSpring(value, config);
  };

  useEffect(() => {
    maskHight.value = setAnimation(checkNumbre(defaultHeight, DEFAULT_HEIGHT));
    maskWidth.value = setAnimation(checkNumbre(defaultWidth, DEFAULT_WIDTH));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultHeight, defaultWidth]);

  useEffect(() => {
    const _maskHight = checkNumbre(defaultHeight, DEFAULT_HEIGHT);
    const _maskWidth = checkNumbre(defaultWidth, DEFAULT_WIDTH);
    outMaskHightHight.value =
      (height - (!portrait ? _maskHight + statusBarHeight : _maskHight)) / 2;
    outMaskWidthWidth.value = _maskHight;
    outMaskWidthHight.value = (width - _maskWidth) / 2;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, width, defaultHeight, defaultWidth, portrait]);

  return (
    <TouchableOpacityAnimated
      onPress={onPress}
      activeOpacity={1}
      style={[
        { paddingHorizontal: MASK_PADDING, paddingVertical: MASK_PADDING },
        maskStyle,
      ]}
      className="max-h-full"
    >
      <FourEdge
        edgeBorderWidth={edgeBorderWidth}
        maskWidth={maskWidth}
        {...rest}
      />
      {showAnimatedLine && (
        <Line
          {...rest}
          width={defaultWidth}
          height={defaultHeight}
          edgeBorderWidth={edgeBorderWidth}
        />
      )}
    </TouchableOpacityAnimated>
  );
};
