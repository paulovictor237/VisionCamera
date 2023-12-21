import type { FC } from 'react';
import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  cancelAnimation,
  WithSpringConfig,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { checkNumbre } from '../../assets/check-numbre';

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
};

const MASK_PADDING = 8;
const DEFAULT_WIDTH = 280;
const DEFAULT_HEIGHT = 300;

export const Line: FC<Props> = ({
  isActive = true,
  animatedLineColor,
  animatedLineOrientation = 'horizontal',
  lineAnimationDuration = 2000,
  animatedLineThickness = 3,
  // asdasd
  edgeBorderWidth = 4,
  width: defaultWidth = DEFAULT_WIDTH,
  height: defaultHeight = DEFAULT_HEIGHT,
}) => {
  const translationY = useSharedValue(0);
  const translationX = useSharedValue(0);
  const lineWidth = useSharedValue<any>(0);
  const lineHeight = useSharedValue<any>(0);
  const EDGE_BORDER_WIDTH = checkNumbre(edgeBorderWidth, 4);

  const springConfig: WithSpringConfig = {
    damping: 15,
    stiffness: 100,
    mass: 0.5,
  };

  const styleLine = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translationY.value },
        { translateX: translationX.value },
      ],
      width: lineWidth.value,
      height: lineHeight.value,
    } as ViewStyle;
  });

  const setAnimation = (
    value: any,
    config: WithSpringConfig = springConfig,
  ) => {
    'worklet';
    return withSpring(value, config);
  };

  const setAnimationTranslation = (value = 0) => {
    return withRepeat(
      withTiming(value, {
        duration: checkNumbre(lineAnimationDuration, 2000),
      }),
      -1,
      true,
    );
  };

  useEffect((): ReturnType<any> => {
    if (isActive) {
      const lineThickness = checkNumbre(animatedLineThickness, 2);
      const _maskHight = checkNumbre(defaultHeight, DEFAULT_HEIGHT);
      const _maskWidth = checkNumbre(defaultWidth, DEFAULT_WIDTH);
      if (animatedLineOrientation && animatedLineOrientation === 'vertical') {
        translationX.value = 0;
        translationY.value = 0;
        lineHeight.value = setAnimation(_maskHight);
        lineWidth.value = setAnimation(lineThickness);
        translationX.value = setAnimationTranslation(
          _maskWidth - MASK_PADDING * 2,
        );
      } else {
        translationX.value = 0;
        translationY.value = 0;
        lineHeight.value = setAnimation(lineThickness);
        lineWidth.value = setAnimation(_maskWidth);
        translationY.value = setAnimationTranslation(
          _maskHight - MASK_PADDING * 2,
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    lineAnimationDuration,
    defaultHeight,
    defaultWidth,
    animatedLineOrientation,
    animatedLineThickness,
    isActive,
  ]);

  useEffect(() => {
    if (isActive === false) {
      cancelAnimation(translationY);
      cancelAnimation(translationX);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <Reanimated.View
      className="max-h-full max-w-full bg-white"
      style={[
        { backgroundColor: animatedLineColor },
        { top: animatedLineOrientation === 'vertical' ? EDGE_BORDER_WIDTH : 0 },
        styleLine,
      ]}
    />
  );
};
