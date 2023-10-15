import React, {useMemo} from 'react';
import {StyleSheet, Pressable, View, Animated} from 'react-native';
import {FeelingType} from '@shared/types';
import {MoodIcon} from '@shared/components';
import {theme} from '@shared/styles';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type FeelingJournalModalProp = {
  feelingType?: FeelingType;
  onSelect: (type: FeelingType, description?: string) => void;
  animatedValue: Animated.Value;
};

export const SelectFeelingType = ({
  feelingType,
  onSelect,
  animatedValue,
}: FeelingJournalModalProp) => {
  const feelingTypes: FeelingType[] = [
    'VERY_BAD',
    'BAD',
    'NORMAL',
    'GOOD',
    'VERY_GOOD',
  ];

  const animatedStyle: StyleProp<ViewStyle> = useMemo(() => {
    let backgroundColor;

    if (feelingType) {
      const splitted = feelingType.split('_');

      const head = splitted[0].toLowerCase();
      const body = splitted
        .slice(1)
        .map(v => `${v[0]}${v.slice(1).toLowerCase()}`)
        .join();

      const key = `${head}${body}Light`;
      backgroundColor = theme.colors[key];
    }

    return {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: animatedValue,
      borderWidth: 1,
      height: animatedValue,
      width: animatedValue,
      backgroundColor,
    };
  }, [animatedValue, feelingType]);

  const closeAnimation = () => {
    return Animated.timing(animatedValue, {
      toValue: theme.vp(35),
      duration: 400,
      useNativeDriver: false,
    });
  };

  const openAnimation = () => {
    return Animated.timing(animatedValue, {
      toValue: theme.vp(55),
      duration: 400,
      useNativeDriver: false,
    });
  };

  const handleSelectFeelingType = (type: FeelingType) => {
    if (type === feelingType) {
      closeAnimation().start(() => {
        onSelect(null as unknown as FeelingType);
      });
      return;
    }

    if (feelingType === null) {
      onSelect(type);
      openAnimation().start();
      return;
    }

    closeAnimation().start(() => {
      onSelect(type);
      openAnimation().start();
    });
  };

  return (
    <View style={styles.feelintTypeContent}>
      {feelingTypes.map(type => (
        <Pressable
          key={type}
          style={styles.selectMoodContainer}
          onPress={() => handleSelectFeelingType(type)}>
          <Animated.View
            style={
              feelingType === type ? animatedStyle : styles.selectMoodIcon
            }>
            <MoodIcon type={type} size="medium" />
          </Animated.View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  feelintTypeContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spaces.xll,
    paddingVertical: theme.spaces.xs,
    width: '100%',
  },
  selectMoodContainer: {
    alignItems: 'center',
    height: theme.vp(60),
    justifyContent: 'center',
  },
  selectMoodIcon: {
    alignItems: 'center',
    borderRadius: theme.vp(35),
    borderWidth: 1,
    height: theme.vp(35),
    justifyContent: 'center',
    width: theme.vp(35),
  },
});
