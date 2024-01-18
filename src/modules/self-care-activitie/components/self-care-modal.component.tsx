import React, {useMemo, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Pressable,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {theme} from '@shared/styles';
import {useUIStore} from '@core/store/use-ui-store';
import {Feather} from '@expo/vector-icons';
import {useSelfCareStore} from '@core/store/use-self-care-store';
import {todayKey} from '@core/time-handling';

type CreateSelfCareModalProp = {
  visible: boolean;
  onClose: () => void;
  onFinish: (title: string) => void;
};

export const SelfCareModal = ({
  visible,
  onClose,
  onFinish,
}: CreateSelfCareModalProp) => {
  const selfCare = useUIStore(state => state.selfCare);
  const updateSelfCare = useSelfCareStore(state => state.updateSelfCare);
  const deleteSelfCare = useSelfCareStore(state => state.deleteSelfCare);
  const finishSelfCare = useSelfCareStore(state => state.finishSelfCare);
  const [description, setDescription] = useState<string | null>(null);
  const [editableMode, setEditableMode] = useState<boolean>(false);

  const descriptionValue = useMemo(() => {
    if (description === null) return selfCare.description;

    return description;
  }, [description, selfCare.description]);

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
          }}
        />
        <View style={styles.content}>
          <Text style={styles.title}>Detalhes da atividade</Text>
          {!editableMode ? (
            <TouchableOpacity
              style={styles.descriptionContainer}
              onPress={() => setEditableMode(true)}>
              <View style={styles.descriptionEdit}>
                <Feather name="edit" size={theme.spaces.xl} color="black" />
                <Text style={styles.descriptionLabel}>Descrição: </Text>
              </View>
              <Text style={styles.descriptionText}>{descriptionValue}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.editableModeContainer}>
              <TextInput
                style={styles.descriptionInput}
                multiline
                placeholder="Descreva aqui..."
                value={descriptionValue ?? ''}
                onChangeText={value => setDescription(value)}
              />
              <View style={styles.actionsContainer}>
                <TouchableOpacity
                  disabled={!description?.trim().length}
                  style={
                    !descriptionValue?.trim().length ||
                    descriptionValue?.trim() === selfCare.description?.trim()
                      ? styles.saveDisabled
                      : styles.save
                  }
                  onPress={() => {
                    updateSelfCare(
                      todayKey,
                      selfCare.id.toString(),
                      descriptionValue,
                    );
                    setEditableMode(false);
                  }}>
                  <Text style={styles.saveLabel}>SALVAR</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancel}
                  onPress={() => {
                    if (!descriptionValue?.trim().length) {
                      setDescription(null);
                    }
                    setEditableMode(false);
                  }}>
                  <Text style={styles.cancelLabel}>CANCELAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {!editableMode && (
            <View style={styles.actionsContainer}>
              {!selfCare.finished && (
                <TouchableOpacity
                  style={styles.done}
                  onPress={() => {
                    finishSelfCare(todayKey, selfCare.id.toString());
                    onFinish(selfCare.description);
                  }}>
                  <Text style={styles.doneLabel}>FINALIZAR</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.delete}
                onPress={() => {
                  deleteSelfCare(todayKey, selfCare.id.toString());
                  onClose();
                }}>
                <Text style={styles.deleteLabel}>APAGAR</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  backgroundButton: {
    backgroundColor: theme.colors.lightDark,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: -100,
  },
  cancel: {
    alignItems: 'center',
    borderColor: theme.colors.grey,
    borderRadius: theme.spaces.xs,
    borderWidth: 1,
    justifyContent: 'center',
    padding: theme.spaces.l,
    width: '40%',
  },
  cancelLabel: {
    color: theme.colors.grey,
    fontSize: theme.typography.size.verySmall,
    fontWeight: theme.typography.weight.semiBold,
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
  delete: {
    alignItems: 'center',
    borderColor: theme.colors.grey,
    borderRadius: theme.spaces.xs,
    borderWidth: 1,
    justifyContent: 'center',
    padding: theme.spaces.l,
    width: '40%',
  },
  deleteLabel: {
    color: theme.colors.grey,
    fontSize: theme.typography.size.verySmall,
    fontWeight: theme.typography.weight.semiBold,
  },
  descriptionContainer: {
    flexDirection: 'row',
    gap: theme.spaces.x,
    width: '100%',
  },
  descriptionEdit: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spaces.x,
    height: theme.vp(20),
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
  descriptionText: {
    color: theme.colors.grey,
    flex: 1,
    flexWrap: 'wrap',
    fontSize: theme.typography.size.verySmall,
    fontWeight: theme.typography.weight.semiBold,
  },
  done: {
    alignItems: 'center',
    backgroundColor: theme.colors.grey,
    borderRadius: theme.spaces.xs,
    justifyContent: 'center',
    padding: theme.spaces.l,
    width: '40%',
  },
  doneLabel: {
    color: theme.colors.background,
    fontSize: theme.typography.size.verySmall,
    fontWeight: theme.typography.weight.semiBold,
  },
  editableModeContainer: {
    alignItems: 'center',
    gap: theme.spaces.l,
    width: '100%',
  },
  save: {
    alignItems: 'center',
    backgroundColor: theme.colors.grey,
    borderRadius: theme.spaces.xs,
    justifyContent: 'center',
    padding: theme.spaces.l,
    width: '40%',
  },
  saveDisabled: {
    alignItems: 'center',
    backgroundColor: theme.colors.grey,
    borderRadius: theme.spaces.xs,
    justifyContent: 'center',
    opacity: 0.5,
    padding: theme.spaces.l,
    width: '40%',
  },
  saveLabel: {
    color: theme.colors.background,
    fontSize: theme.typography.size.verySmall,
    fontWeight: theme.typography.weight.semiBold,
  },
  title: {
    color: theme.colors.darkGrey,
    fontSize: theme.typography.size.medium,
    fontWeight: theme.typography.weight.semiBold,
  },
});
