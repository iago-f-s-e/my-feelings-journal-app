import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Pressable,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {FeelingType} from '@shared/types';
import {theme} from '@shared/styles';
import {SelectFeelingType} from '@shared/components';

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
    new Animated.Value(theme.vp(35)),
  );

  const clearStates = () => {
    setDescription(null);
    setFeelingType(null);
    setAnimatedValue(new Animated.Value(theme.vp(35)));
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 30}>
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
            <SelectFeelingType
              onSelect={type => setFeelingType(type)}
              feelingType={feelingType as FeelingType}
              animatedValue={animatedValue}
            />
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
      </KeyboardAvoidingView>
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
    justifyContent: 'center',
  },
  content: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.spaces.l,
    borderWidth: 1,
    gap: theme.spaces.xll,
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
});
