import {StyleSheet, Text, View, Button, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {globalStyle} from '../../components/globalStyle';
import {getAdminData} from '../../components/api';
import {useSelector} from 'react-redux';
import LoadingCard from '../../components/loading';
import DatePicker from 'react-native-date-picker';

export default function Record() {
  const [records, setRecords] = useState({});
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
      `/activity/records/${date}`,
      userData.token,
    );
    console.log(resData);
    setRecords(resData.result);
    setLoading(false);
  };
  const Card = ({item}) => {
    let sign = item.transactionType == 'Redemption' ? '-' : '+';
    return (
      <View style={styles.recordCard}>
        <View style={globalStyle.row}>
          <Text style={styles.date}>{item.transactionType}</Text>
          <Text style={styles.pointText}> {sign + item.points} Points</Text>
        </View>
        <Text style={styles.date}>{item.created.split('T')[0]}</Text>
      </View>
    );
  };
  const EmptyCard = () => {
    return (
      <View style={{marginTop: 50}}>
        <Text style={{fontSize: 22, color: '#000', textAlign: 'center'}}>
          No Record Found
        </Text>
      </View>
    );
  };
  if (loading) {
    return <LoadingCard />;
  }
  return (
    <View style={globalStyle.container}>
      <View style={{height: 25}}></View>
      <Button title="Choose Date" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false);
        }}
        mode="date"
      />
      <Text style={styles.dateText}>
        Selected Date : {date.toISOString().split('T')[0]}
      </Text>
      <FlatList
        data={records}
        keyExtractor={(k, v) => v.toString()}
        renderItem={({item}) => <Card item={item} />}
        refreshing={loading}
        onRefresh={() => fetchData()}
        ListEmptyComponent={() => <EmptyCard />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  recordCard: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 2,
  },
  pointText: {
    color: '#448AFF',
  },
  date: {
    color: '#000',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 18,
    color: '#000',
    marginTop: 30,
    marginBottom: 10,
  },
});
