import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  button: {
    backgroundColor: '#EC6E99',
    height: 200,
    width: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#53997B',
    textAlign: 'center',
  },
  subTitulo: {
    fontSize: 18,
    marginTop: 5,
    color: '#5BB18C',
    textAlign: 'center',
  },
  alertaVerde: {
    backgroundColor: '#E8F7F0',
    padding: 10,
    borderRadius: 10,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 40,
  },
  centerAcesso: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  acesso: {
    position: 'relative',
    bottom: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    minHeight: 170,
    elevation: 2,
    marginVertical: 20,
    width: '90%',
    maxWidth: 700
  },
  textAcesso: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#50333D'
  },
  viewAcesso: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: 15,
  },

  chamar: {
    backgroundColor: '#EC6E99',
    elevation: 2,
    padding: 10,
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "black",
  },
  buttonSection: {
    width: 90,
    alignItems: 'center',
  },
  textBotao: {
    textAlign: 'center',
    color: "#EC6E99",
    marginTop:5,
    width:90
  },
  textMainHome: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '90%',
    color: '#C8AEBB'
  },
});
