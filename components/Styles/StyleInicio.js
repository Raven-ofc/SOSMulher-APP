import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
  },
  button:{
    backgroundColor: '#EC6E99',
    borderRadius: 50,
    padding: 15,
  },
  title:{
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#EC6E99',
  },
  subtitle:{
    fontSize: 20,
    textAlign: 'center',
    color: '#CFAEBF',
    fontWeight: 'bold',
    },
  textButton:{
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
  },
  logo:{
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  icon:{
    alignSelf: 'center',
    marginTop: 20,
  }
});