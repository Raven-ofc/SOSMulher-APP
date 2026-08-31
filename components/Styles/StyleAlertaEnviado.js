import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FEF9FB',
        padding: 10,
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxCentral: {
        justifyContent: 'space-between',
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#FFF",
        margin: 20,
        elevation: 2
    },
    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#50333D',
    },
    button: {
        backgroundColor: '#EC6E99',
        borderRadius: 10,
        margin: 20,
        padding: 15,
        elevation: 2,
    },
    textButton: {
        fontSize: 20,
        textAlign: 'center',
        color: '#FEF9FB',
        fontWeight: 'bold'
    },
    view: {
        flexDirection: 'row',
        gap: 10,
        width: '90%',
        margin: 10,
    },
    subtitulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#50333D"
    },
    subTituloAlerta: {
        color: '#D94D7D',
        fontSize: 16,
        textAlign: 'center',

    },
    textLista: {
        color: '#826473'
    }

});