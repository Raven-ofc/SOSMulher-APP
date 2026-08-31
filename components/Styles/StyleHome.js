import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FEF9FB',
    padding: 8,
  },

  animeContainer: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },

  onda: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E91E63',
  },

  button:{
    backgroundColor: '#EC6E99',
    height:200,
    width: 200,
    borderRadius: "50%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo:{
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#53997B',
    textAlign: 'center',
  },
  subTitulo:{
    fontSize: 18,
    marginTop: 5,
    color: '#5BB18C',
    textAlign: 'center',
  },
  alertaVerde:{
    backgroundColor: '#E8F7F0',
    padding: 10,
    borderRadius: 10,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },

  acesso:{
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 30,
    height: 170,
    elevation: 2,
    marginVertical:20,
    marginHorizontal: 10
  },
  textAcesso:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#50333D'
  },
  viewAcesso:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chamar:{
    backgroundColor: '#EC6E99',
    margin: 2,
    elevation:2,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    fontSize: 24,
    fontWeight: 'bold',
    color: "black",
  },
  buttonSection:{
    flexDirection:'column',
    width: 75,
    height:75,
  },
  textBotao:{
    textAlign: 'center',
    color: "#EC6E99"
  },
  textMainHome:{
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 250,
    color: '#C8AEBB'
  }
});
