import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FeelingJournalModal} from '@modules/feeling-journal/components';
import {theme} from '@shared/styles';
import {todayISO, todayKey} from '@core/time-handling';
import {useWeekStore} from '@core/store/use-week-store';
import {createFeelingJournalMutation} from '@core/http';

export const CheckInContainer = () => {
  const updateTodayStore = useWeekStore(state => state.updateToday);

  const [visible, setVisible] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <FeelingJournalModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSave={(feelingType, description) => {
          createFeelingJournalMutation({
            date: todayISO,
            howWasToday: feelingType,
            description,
          })
            .then(() => {
              updateTodayStore(todayKey, feelingType);
            })
            .finally(() => {
              setVisible(false);
            });
        }}
      />
      <View style={styles.checkIn}>
        <Text style={styles.checkInText}>Como foi seu dia?</Text>
        <TouchableOpacity
          style={styles.checkInButton}
          onPress={() => setVisible(true)}>
          <Text style={styles.checkInLabel}>check in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkIn: {
    alignItems: 'center',
    height: theme.vp(150),
    justifyContent: 'space-around',
  },
  checkInButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.grey,
    borderRadius: theme.spaces.l,
    height: 60,
    justifyContent: 'center',
    width: '90%',
  },
  checkInLabel: {
    color: theme.colors.background,
    fontSize: theme.typography.size.medium,
    fontWeight: theme.typography.weight.bold,
  },
  checkInText: {
    color: theme.colors.darkGrey,
    fontSize: theme.typography.size.large,
    fontWeight: theme.typography.weight.bold,
  },
  container: {
    height: theme.vp(150),
    justifyContent: 'center',
    width: '100%',
  },
});
