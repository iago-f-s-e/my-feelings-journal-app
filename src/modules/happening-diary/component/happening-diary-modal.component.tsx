import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Pressable,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {theme} from '@shared/styles';
import {FeelingType} from '@shared/types';
import {SelectFeelingType} from '@shared/components';

type SelfCareModalProp = {
  visible: boolean;
  onClose: () => void;
  onSave: (
    title: string,
    description: string,
    fellingType: FeelingType,
  ) => void;
};

export const HappeningDiaryModal = ({
  visible,
  onClose,
  onSave,
}: SelfCareModalProp) => {
  const [feelingType, setFeelingType] = useState<FeelingType | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [animatedValue, setAnimatedValue] = useState<Animated.Value>(
    new Animated.Value(theme.vp(45)),
  );

  const clearStates = () => {
    setDescription(null);
    setTitle(null);
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
          <Text style={styles.headerTitle}>Registro de Acontecimentos</Text>
          <SelectFeelingType
            onSelect={type => setFeelingType(type)}
            feelingType={feelingType as FeelingType}
            animatedValue={animatedValue}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.titleLabel}>Qual o titulo?</Text>
            <TextInput
              style={styles.titleInput}
              multiline
              placeholder="Ex: Caminhada matinal"
              value={title ?? ''}
              numberOfLines={1}
              onChangeText={value => setTitle(value)}
            />
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>
              Vamos descrever um pouco melhor?
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
            disabled={!title?.trim().length}
            style={!title?.trim().length ? styles.saveDisabled : styles.save}
            onPress={() => {
              onSave(
                title as string,
                description as string,
                feelingType as FeelingType,
              );
              clearStates();
            }}>
            <Text style={styles.saveLabel}>SALVAR</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.spaces.l,
    borderWidth: 1,
    gap: theme.spaces.xll,
    padding: theme.spaces.l,
    width: '90%',
  },
  descriptionContainer: {
    alignItems: 'flex-start',
    gap: theme.spaces.x,
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
    fontSize: theme.typography.size.verySmall,
    fontWeight: theme.typography.weight.semiBold,
  },
  headerTitle: {
    color: theme.colors.darkGrey,
    fontSize: theme.typography.size.medium,
    fontWeight: theme.typography.weight.semiBold,
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
  titleContainer: {
    alignItems: 'flex-start',
    gap: theme.spaces.x,
    width: '100%',
  },
  titleInput: {
    backgroundColor: theme.colors.lightWhite,
    borderColor: theme.colors.lightDark,
    borderWidth: 1,
    padding: theme.spaces.x,
    paddingHorizontal: theme.spaces.l,
    width: '100%',
  },
  titleLabel: {
    color: theme.colors.darkGrey,
    fontSize: theme.typography.size.verySmall,
    fontWeight: theme.typography.weight.semiBold,
  },
});
