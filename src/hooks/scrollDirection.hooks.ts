import { useCallback, useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { bind } from '@react-rxjs/core';
import { BehaviorSubject } from 'rxjs';

export const enum ScrollDirection {
  Up = 1,
  Down = -1,
  Initial = 0,
}
const scrollDirectionSubject = new BehaviorSubject<ScrollDirection>(ScrollDirection.Initial);
const scrollDirectionObservable = scrollDirectionSubject.asObservable();
const useScrollDirectionValue = bind(scrollDirectionObservable, scrollDirectionSubject.getValue())[0];

const setScrollDirection = (newScrollDirection: ScrollDirection): void => {
  scrollDirectionSubject.next(newScrollDirection);
};
export const useScrollDirectionState = () => [useScrollDirectionValue(), setScrollDirection] as const;

export const useScrollDirectionHandler = () => {
  const [direction, setDirection] = useScrollDirectionState();
  const prevScrollYRef = useRef(0);
  const isPullToRefresh = useRef(false);

  return useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const currentScrollY = event.nativeEvent.contentOffset.y;

      // Check if pull-to-refresh is happening
      if (currentScrollY < 0) {
        isPullToRefresh.current = true;
      } else if (prevScrollYRef.current < 0) {
        isPullToRefresh.current = false;
      }
      // Proceed only if not in pull-to-refresh state
      if (!isPullToRefresh.current) {
        const currentScrollDirection = currentScrollY > prevScrollYRef.current ? ScrollDirection.Down : ScrollDirection.Up;

        // Scroll threshold: only trigger when scrolled more than 5 pixels
        if (Math.abs(currentScrollY - prevScrollYRef.current) > 5 && direction !== currentScrollDirection) {
          setDirection(currentScrollDirection);
        }
      }
      prevScrollYRef.current = currentScrollY;
    },
    [direction, setDirection],
  );
};
