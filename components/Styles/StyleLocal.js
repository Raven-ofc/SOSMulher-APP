import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEF9FB'
    },
    icones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '40%'
    },
    textos: {
        flex: 1
    },
    buttonEndereco: {
        backgroundColor: '#FEF9FB',
        flexDirection: 'row',
        padding: 15,
        borderColor: '#D7A6BF',
        borderRadius: 20,
        borderWidth: 1,
        alignItems: 'center',
        marginVertical: 10,
        elevation: 4
    },
    nome: {
        fontSize: 20,
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
    modalOverlaySlide: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    modalTitle: {
        fontSize: 25,
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
    modalGaveta: {
        width: "100%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 20,
        height: '50%'
    },
    barra: {
        width: 45,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 20,
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
    imageFundo: {
        flex: 1,
        position: 'relative',
        padding: 25,
    },
    buttonMapa: {
        backgroundColor: '#FEF9FB',
        borderRadius: 10,
        margin: 20,
        padding: 15,
        elevation: 2,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
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
    header: {
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 15,
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitulo: {
        color: '#50333D',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 10,
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
    deleteModal: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
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
    buttonSection: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        marginVertical: 10,
        gap: 10,
    },
    buttonSectionMapa: {
        position: 'absolute',
        top: 20,
        right: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonSectionFechar: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        marginVertical: 10,
        gap: 10,
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
    areaArrastar: {
        height: 80,
    },
    mapaLocal: {
        flex: 1,
        width: "100%"
    },
    erroLoc: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textErro: {
        fontSize: 20,
        color: '#EC6E99',
        fontWeight: 'bold'
    },
    alertaVerde: {
        backgroundColor: '#E8F7F0',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    tituloAviso: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#53997B',
        textAlign: 'center',
    },
    containerAlerta:{
        position: 'absolute',
        bottom: 30,
        right:0,
        left: 0,
        alignItems: 'center'
    }
});