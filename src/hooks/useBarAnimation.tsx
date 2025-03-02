import { useEffect } from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ScrollDirection, useScrollDirectionState } from './scrollDirection.hooks.ts';

export enum BarPosition {
  TOP,
  BOTTOM,
}

export const TAB_BAR_HEIGHT = 100;

export const useBarAnimation = (barPosition: BarPosition): { animatedStyle: { transform: { translateY: number }[] } } => {
  const [scrollDirection] = useScrollDirectionState();
  const translateY = useSharedValue(0);

  const scrollToPosition = (): number => {
    if (scrollDirection === ScrollDirection.Down) {
      return barPosition === BarPosition.TOP ? -TAB_BAR_HEIGHT : TAB_BAR_HEIGHT;
    }
    return 0;
  };

  useEffect(() => {
      translateY.value = withTiming(scrollToPosition(), {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
  }, [scrollDirection]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return { animatedStyle };
};
