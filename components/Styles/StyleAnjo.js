import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF9FB'
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 15,
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitulo: {
    color: '#50333D',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerSubtitulo: {
    color: '#D789B1',
    textAlign: 'center',
    fontSize: 15,
  },
  icones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%'
  },
  item: {
    backgroundColor: '#FEF9FB',
    flexDirection: 'row',
    padding: 15,
    borderColor: '#D7A6BF',
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    margin: 10,
    elevation: 4
  },
  foto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15
  },
  textos: {
    flex: 1
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  fone: {
    color: '#777',
    marginTop: 2
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'column',
    borderColor: '#D7A6BF',
    borderWidth: 1,
    padding: 15,
    margin: 20,
    elevation: 2
  },
  principalCard: {
    alignItems: 'center',
  },
  fotoCard: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  nomeCard: {
    fontWeight: 'bold',
    color: '#50333D',
    fontSize: 20,
    marginVertical: 10,
  },
  foneCard: {
    color: '#777',
    fontSize: 16,
    textAlign: 'left',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#FEF9FB',
    borderRadius: 50,
    borderColor: '#EC6E99',
    borderWidth: 2,
    margin: 20,
    padding: 15,
    elevation: 2,
  },
  textButton: {
    fontSize: 20,
    textAlign: 'center',
    color: '#EC6E99',
    fontWeight: 'bold'
  },
  voltar: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,

    borderWidth: 1.5,
    borderColor: '#D789B1',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 10,
  },

  radioSelecionado: {
    borderColor: '#D789B1',
  },

  radioInterno: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D789B1',
  },
  buttonSection: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    marginVertical: 10,
    gap: 10,
  },
  buttonExcluir: {
    backgroundColor: '#FEF9FB',
    borderRadius: 50,
    borderColor: '#EC6E99',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 2,
  },
  buttonExcluirDetalhe: {
    backgroundColor: '#FEF9FB',
    borderRadius: 50,
    borderColor: '#EC6E99',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginVertical: 10,
    elevation: 2,
  },
  textButtonExcluir: {
    fontSize: 16,
    textAlign: 'center',
    color: '#EC6E99',
    fontWeight: 'bold'
  },
  buttonEditar: {
    backgroundColor: '#EC6E99',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 3,
  },
  textButtonEditar: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FEF9FB',
    fontWeight: 'bold'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#50333D",
    textAlign: 'center'
  },

  modalLabel: {
    fontSize: 13,
    color: "#777",
    marginTop: 10
  },

  modalText: {
    fontSize: 14,
    marginTop: 3,
    color: "#777",
  },
  deleteModal: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
  },
  containerFoto: {
    position: "relative",
  },
  mudarFoto: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FEF9FB",
    padding: 3,
    borderRadius: "50%",
    borderColor: "#EC6E99",
    borderWidth: 1
  },

  input: {
    backgroundColor: "#FEF9FB",
    borderWidth: 1,
    borderColor: "#EC6E99",
    borderRadius: 12,
    marginVertical: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#50333D",
  },
  form: {
    width: '100%',
    marginTop: 10,
  },
  scrollContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  }
});