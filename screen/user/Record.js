import {StyleSheet, Text, View, ToastAndroid, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {getAdminData} from '../../components/api';
import {globalStyle} from '../../components/globalStyle';

export default function Record(props) {
  const uid = props.route.params.uid;
  const [records, setRecord] = useState([]);
  const [loading, setLoading] = useState(false);

  const userData = useSelector(state => state.auth);
  useEffect(() => {
    getRecord();
  }, []);
  const getRecord = async () => {
    setLoading(true);
    const resData = await getAdminData(`/activity/user/${uid}`, userData.token);
    setRecord(resData.result);
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
  return (
    <View style={globalStyle.container}>
      <FlatList
        data={records}
        keyExtractor={(k, v) => v.toString()}
        renderItem={({item}) => <Card item={item} />}
        refreshing={loading}
        onRefresh={() => getRecord()}
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
});
