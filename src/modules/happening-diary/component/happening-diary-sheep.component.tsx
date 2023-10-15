import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '@shared/styles';
import {MoodIcon} from '@shared/components';
import {FeelingType} from '@shared/types';

const lineQuantity = Math.floor(theme.vp(300) / theme.vp(25));
const lines = Array(lineQuantity)
  .fill(0)
  .map((_, index) => index + 1);

const paperHoleQuantity = Math.floor(theme.vp(300) / theme.vp(30)) - 2;
const paperHoles = Array(paperHoleQuantity)
  .fill(0)
  .map((_, index) => index + 1);

type HappeningDiarySheepProp = {
  description: string;
  title: string;
  feelingType: FeelingType;
};

export const HappeningDiarySheep = ({
  description,
  feelingType,
  title,
}: HappeningDiarySheepProp) => {
  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <View style={styles.papeHoleContent}>
          {paperHoles.map(key => (
            <View key={key} style={styles.paperHole} />
          ))}
        </View>
        <View style={styles.lineContent}>
          {lines.map((key, index) => {
            const hideBorder =
              index === lines.length - 1 || index === 0 || index === 1;
            return (
              <View
                key={key}
                style={
                  hideBorder
                    ? {...styles.line, borderBottomWidth: undefined}
                    : styles.line
                }
              />
            );
          })}
        </View>
      </View>
      <View style={styles.textContainer}>
        <View style={styles.papeHoleContent} />
        <View style={styles.lineContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
          </View>
          <Text style={styles.description} numberOfLines={lineQuantity - 3}>
            {description}
          </Text>
        </View>
      </View>
      <View style={styles.figure}>
        <MoodIcon type={feelingType} size="medium" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.paperBackground,
    borderWidth: 1,
    height: theme.vp(300),
    width: theme.vp(250),
  },
  description: {
    color: theme.colors.darkGrey,
    fontSize: theme.typography.size.mini,
    fontWeight: theme.typography.weight.medium,
    lineHeight: theme.vp(25),
  },
  figure: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  line: {
    borderBottomWidth: 1,
    height: theme.vp(25),
    width: '100%',
  },
  lineContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  lineContent: {
    height: '100%',
    paddingHorizontal: theme.spaces.l,
    width: theme.vp(220),
  },
  papeHoleContent: {
    height: '100%',
    justifyContent: 'space-evenly',
    width: theme.vp(30),
  },
  paperHole: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.vp(30),
    borderRightWidth: 1,
    height: theme.vp(30),
    left: theme.vp(-15),
    width: theme.vp(30),
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    color: theme.colors.darkGrey,
    fontSize: theme.typography.size.small,
    fontWeight: theme.typography.weight.semiBold,
    textAlign: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    height: theme.vp(50),
    justifyContent: 'center',
    width: '100%',
  },
});
