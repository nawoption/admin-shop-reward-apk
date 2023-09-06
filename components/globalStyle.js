import {StyleSheet} from 'react-native';
export const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#eee',
  },
  promoImage: {
    width: '100%',
    height: 250,
    borderRadius: 5,
  },
  cardContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 5,
    marginVertical: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    marginTop: 10,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingCard: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#00BCD4"
  },
  inputBox: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  editTitle: {
    fontSize: 22,
    color: '#0097A7',
    textAlign: 'center',
    marginVertical: 10,
  },
  inputTitle: {
    fontSize: 16,
    color: '#222',
    margin: 3,
  },
  btn: {
    width: 150,
    height: 40,
    backgroundColor: '#448AFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-between'
  }
});
