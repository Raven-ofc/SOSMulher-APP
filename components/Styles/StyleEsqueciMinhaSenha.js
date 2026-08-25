import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#FEF9FB',
    padding: 8,
  },
  box:{
    height: "30%",
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
  logo:{
    width: 200,
    height: 200,
    alignSelf: 'center',
  },

  title:{
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#50333D',
  },
  subtitle:{
    fontSize: 20,
    textAlign: 'center',
    color: '#D7A6BF',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#EC6E99',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 20,
  },

  button:{
    backgroundColor: '#EC6E99',
    borderRadius: 50,
    padding: 15,
  },
  textButton:{
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
  },
});