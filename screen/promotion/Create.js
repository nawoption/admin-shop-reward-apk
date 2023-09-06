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
import React, {useState, useEffect} from 'react';
import {globalStyle} from '../../components/globalStyle';
import {postData} from '../../components/api';
import {useSelector} from 'react-redux';
import LoadingCard from '../../components/loading';

export default function Create(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const userData = useSelector(state => state.auth);
  const createPost = async () => {
    if (title == '' || description == '' || image == '') {
      return true;
    }
    setLoading(true);
    let obj = {title, description, image};
    const resData = await postData('/promotion', obj, userData.token);
    ToastAndroid.show(resData.msg, ToastAndroid.SHORT);
    setLoading(false);
    setTitle('');
    setDescription('');
    setImage('');
  };
  if (loading) {
    return <LoadingCard />;
  }
  return (
    <View style={globalStyle.container}>
      <ScrollView>
        <Text style={globalStyle.editTitle}>Promotion Post Create</Text>
        <Text style={globalStyle.inputTitle}>Image Link</Text>
        <TextInput
          value={image}
          style={globalStyle.inputBox}
          onChangeText={image => setImage(image)}
        />
        <Text style={globalStyle.inputTitle}>Title</Text>
        <TextInput
          value={title}
          style={globalStyle.inputBox}
          onChangeText={title => setTitle(title)}
        />
        <Text style={globalStyle.inputTitle}>Description</Text>
        <TextInput
          value={description}
          style={{...globalStyle.inputBox, height: 300}}
          onChangeText={description => setDescription(description)}
          multiline={true}
        />
      </ScrollView>
      <View>
        <TouchableOpacity
          onPress={() => createPost()}
          style={{...globalStyle.btn, alignSelf: 'flex-end'}}>
          <Text style={{color: '#fff', fontSize: 18}}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
