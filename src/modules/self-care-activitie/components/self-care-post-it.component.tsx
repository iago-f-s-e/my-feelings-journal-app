import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {theme} from '@shared/styles';
import {SelfCareActivitie} from '@core/store/use-self-care-store/use-self-care-store';
import {PostIt} from './post-it';

type SelfCarePostItProp = {
  selfCare: SelfCareActivitie;
  onClick: (selfCare: SelfCareActivitie) => void;
};

export const SelfCarePostIt = ({selfCare, onClick}: SelfCarePostItProp) => {
  return (
    <PostIt
      normalColor={selfCare.normalColor}
      darkColor={selfCare.darkColor}
      onClick={() => onClick(selfCare)}
      size="normal">
      <View style={styles.content}>
        <Text style={styles.description} numberOfLines={6}>
          {selfCare.description}
        </Text>
      </View>
    </PostIt>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.vp(5),
  },
  description: {
    color: theme.colors.darkGrey,
    fontSize: theme.typography.size.mini,
    fontWeight: theme.typography.weight.semiBold,
    textAlign: 'justify',
  },
});
