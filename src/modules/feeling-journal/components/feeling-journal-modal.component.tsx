import React, {useMemo, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Pressable,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {FeelingType} from '@shared/types';
import {MoodIcon} from '@shared/components';
import {theme} from '@shared/styles';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type FeelingJournalModalProp = {
  visible: boolean;
  onClose: () => void;
  onSave: (type: FeelingType, description?: string) => void;
};

export const FeelingJournalModal = ({
  visible,
  onClose,
  onSave,
}: FeelingJournalModalProp) => {
  const [description, setDescription] = useState<string | null>(null);
  const [feelingType, setFeelingType] = useState<FeelingType | null>(null);

  const [animatedValue, setAnimatedValue] = useState<Animated.Value>(
    new Animated.Value(theme.vp(45)),
  );

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

  const clearStates = () => {
    setDescription(null);
    setFeelingType(null);
    setAnimatedValue(new Animated.Value(theme.vp(45)));
  };

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
        setFeelingType(null);
      });
      return;
    }

    if (feelingType === null) {
      setFeelingType(type);
      openAnimation().start();
      return;
    }

    closeAnimation().start(() => {
      setFeelingType(type);
      openAnimation().start();
    });
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <Pressable
          style={styles.backgroundButton}
          onPress={() => {
            onClose();
            clearStates();
          }}
        />
        <View style={styles.content}>
          <View style={styles.feelingTypeContainer}>
            <Text style={styles.feelingTypeLabel}>
              Como você se sentiu hoje?
            </Text>
            <View style={styles.feelintTypeContent}>
              {feelingTypes.map(type => (
                <Pressable
                  key={type}
                  style={styles.selectMoodContainer}
                  onPress={() => handleSelectFeelingType(type)}>
                  <Animated.View
                    style={
                      feelingType === type
                        ? animatedStyle
                        : styles.selectMoodIcon
                    }>
                    <MoodIcon type={type} size="medium" />
                  </Animated.View>
                </Pressable>
              ))}
            </View>
          </View>
          <View style={styles.finish}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionLabel}>
                Pode nos contar como foi o seu dia?
              </Text>
              <TextInput
                style={styles.descriptionInput}
                multiline
                placeholder="Descreva aqui..."
                value={description ?? ''}
                onChangeText={value => setDescription(value)}
              />
            </View>

            <TouchableOpacity
              disabled={!feelingType}
              style={!feelingType ? styles.saveDisabled : styles.save}
              onPress={() => {
                onSave(feelingType as FeelingType, description as string);
                clearStates();
              }}>
              <Text style={styles.saveLabel}>SALVAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backgroundButton: {
    backgroundColor: theme.colors.lightDark,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: -100,
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  content: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.spaces.l,
    borderWidth: 1,
    gap: theme.spaces.xll,
    marginTop: theme.realHeight * 0.3,
    padding: theme.spaces.l,
    width: '90%',
  },
  descriptionContainer: {
    alignItems: 'center',
    gap: theme.spaces.xl,
    width: '100%',
  },
  descriptionInput: {
    backgroundColor: theme.colors.lightWhite,
    borderColor: theme.colors.lightDark,
    borderWidth: 1,
    height: theme.vp(150),
    padding: theme.spaces.l,
    textAlignVertical: 'top',
    width: '100%',
  },
  descriptionLabel: {
    color: theme.colors.darkGrey,
    fontSize: theme.typography.size.small,
    fontWeight: theme.typography.weight.semiBold,
  },
  feelingTypeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  feelingTypeLabel: {
    color: theme.colors.darkGrey,
    fontSize: theme.typography.size.medium,
    fontWeight: theme.typography.weight.semiBold,
  },
  feelintTypeContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spaces.xll,
    paddingVertical: theme.spaces.xs,
    width: '100%',
  },
  finish: {
    alignItems: 'center',
    gap: theme.spaces.xl,
  },
  save: {
    alignItems: 'center',
    backgroundColor: theme.colors.grey,
    borderRadius: theme.spaces.xs,
    justifyContent: 'center',
    padding: theme.spaces.l,
    width: '50%',
  },
  saveDisabled: {
    alignItems: 'center',
    backgroundColor: theme.colors.grey,
    borderRadius: theme.spaces.xs,
    justifyContent: 'center',
    opacity: 0.5,
    padding: theme.spaces.l,
    width: '50%',
  },
  saveLabel: {
    color: theme.colors.background,
    fontSize: theme.typography.size.verySmall,
    fontWeight: theme.typography.weight.semiBold,
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
