import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {globalStyle} from '../../components/globalStyle';
import {useSelector} from 'react-redux';
import {deleteData, updateData} from '../../components/api';
import LoadingCard from '../../components/loading';

export default function Edit(props) {
  const item = props.route.params.post;
  const [post, setPost] = useState(item);
  const [loading, setLoading] = useState(false);
  const userData = useSelector(state => state.auth);

  const update = async () => {
    setLoading(true);
    const resData = await updateData(
      `/reward/${post._id}`,
      post,
      userData.token,
    );
    ToastAndroid.show(resData.msg, ToastAndroid.SHORT);
    setLoading(false);
  };
  const drop = async () => {
    setLoading(true);
    const resData = await deleteData(`/reward/${post._id}`, userData.token);
    if (resData.con) {
      props.navigation.goBack();
    } else console.log(resData);
    setLoading(false);
    ToastAndroid.show(resData.msg, ToastAndroid.SHORT);
  };
  if (loading) {
    return <LoadingCard />;
  }
  return (
    <View style={globalStyle.container}>
      <ScrollView>
        <Text style={globalStyle.inputTitle}>Image Link</Text>
        <TextInput
          value={post.image}
          style={globalStyle.inputBox}
          onChangeText={image => setPost({...post, image})}
        />
        <Text style={globalStyle.inputTitle}>Title</Text>
        <TextInput
          value={post.title}
          style={globalStyle.inputBox}
          onChangeText={title => setPost({...post, title})}
        />
        <Text style={globalStyle.inputTitle}>Define Points</Text>
        <TextInput
          value={post.points?post.points.toString():''}
          style={globalStyle.inputBox}
          onChangeText={points => {
            points = parseInt(points);
            setPost({...post, points});
          }}
        />
        
        <Text style={globalStyle.inputTitle}>Description</Text>
        <TextInput
          value={post.description}
          style={{...globalStyle.inputBox, height: 300}}
          onChangeText={description => setPost({...post, description})}
          multiline={true}
        />
      </ScrollView>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          onPress={() => drop()}
          style={{...globalStyle.btn, backgroundColor: 'red'}}>
          <Text style={{color: '#fff'}}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => update()} style={globalStyle.btn}>
          <Text style={{color: '#fff'}}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
