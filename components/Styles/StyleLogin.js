import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FEF9FB',
    padding: 10,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#EC6E99',
    borderRadius: 50,
    padding: 15,
  },
  textButton: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#50333D',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#D7A6BF',
  },
  link1: {
    fontSize: 20,
    textAlign: 'center',
    color: '#50333D',
  },
  link2: {
    fontSize: 20,
    textAlign: 'center',
    color: '#EC6E99',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#EC6E99',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 8,
    elevation: 3,
    backgroundColor: '#fff',  
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 20,
  },
  links: {
    height: "25%",
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  form: {
    height: "25%",
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  voltar: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 15,
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

  buttonCancelar: {
    backgroundColor: '#EC6E99',
    borderRadius: 20,
    marginVertical: 10,
    padding: 15,
    elevation: 2,
    alignItems: 'center'
  },
  textButtonCancelar: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FEF9FB',
    fontWeight: 'bold'
  },
});