import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import {globalStyle} from '../../components/globalStyle';
import {getAdminData} from '../../components/api';
import {useSelector} from 'react-redux';
import LoadingCard from '../../components/loading';
import DatePicker from 'react-native-date-picker';

export default function Points() {
  const [points, setPoints] = useState({});
  const [loading, setLoading] = useState(false);
  const userData = useSelector(state => state.auth);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetchData();
  }, [date]);
  const fetchData = async () => {
    console.log(date);
    setLoading(true);
    const resData = await getAdminData(
      `/activity/points/${date}`,
      userData.token,
    );
    setPoints(resData.result);
    setLoading(false);
  };
  if (loading) {
    return <LoadingCard />;
  }
  return (
    <View style={globalStyle.container}>
      <View style={{height:25}}></View>
      <Button title="Choose Date" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        mode="date"
      />
      <Text style={styles.dateText}>
        Selected Date : {date.toISOString().split('T')[0]}
      </Text>
      <View style={styles.row}>
        <View style={styles.btn}>
          <Text style={styles.label}>Rewarded Points</Text>
          <Text style={styles.pointsText}>{points.earnedPoints}</Text>
        </View>
        <View style={styles.btn}>
          <Text style={styles.label}>Redeemed Points</Text>
          <Text style={styles.pointsText}>{points.redeemPoints}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  btn: {
    width: 150,
    height: 130,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  pointsText: {
    color: '#0097A7',
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 22,
  },
  label: {
    color: '#000',
    fontSize: 14,
    marginTop: 20,
  },
  dateText: {
    fontSize: 18,
    color: '#000',
    marginTop: 30,
    marginBottom:10
  },
});
