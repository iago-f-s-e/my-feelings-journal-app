import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Pressable,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {theme} from '@shared/styles';

type SelfCareModalProp = {
  visible: boolean;
  onClose: () => void;
  onSave: (description: string) => void;
};

export const SelfCareModal = ({
  visible,
  onClose,
  onSave,
}: SelfCareModalProp) => {
  const [description, setDescription] = useState<string | null>(null);

  const clearStates = () => {
    setDescription(null);
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
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>O que faremos hoje?</Text>
            <TextInput
              style={styles.descriptionInput}
              multiline
              placeholder="Descreva aqui..."
              value={description ?? ''}
              onChangeText={value => setDescription(value)}
            />
          </View>
          <TouchableOpacity
            disabled={!description?.trim().length}
            style={
              !description?.trim().length ? styles.saveDisabled : styles.save
            }
            onPress={() => {
              onSave(description as string);
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
});
