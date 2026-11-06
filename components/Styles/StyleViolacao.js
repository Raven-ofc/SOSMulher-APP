import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEF9FB'
    },

    scrollContent: {
        padding: 20,
        paddingBottom: 35
    },

    voltar: {
        marginTop: 15,
        marginBottom: 15
    },

    header: {
        marginBottom: 25
    },

    headerTitulo: {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#50333D'
    },

    headerDescricao: {
        fontSize: 15,
        color: '#915E70',
        marginTop: 8,
        lineHeight: 22
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 20,
        elevation: 3
    },

    alerta: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF0F5',
        padding: 14,
        borderRadius: 12,
        marginBottom: 25,
        gap: 10
    },

    alertaTexto: {
        flex: 1,
        color: '#50333D',
        fontSize: 14,
        fontWeight: '500'
    },

    tituloCampo: {
        color: '#50333D',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },

    subtituloCampo: {
        color: '#915E70',
        fontSize: 13,
        marginBottom: 12,
        lineHeight: 19
    },

    listaTipos: {
        gap: 10,
        marginBottom: 25
    },

    opcaoTipo: {
        borderWidth: 1,
        borderColor: '#D7A6BF',
        borderRadius: 12,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    opcaoSelecionada: {
        backgroundColor: '#D789B1',
        borderColor: '#D789B1'
    },

    opcaoConteudo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 10,
        paddingRight: 8
    },

    textoTipo: {
        color: '#50333D',
        fontSize: 14,
        fontWeight: '500',
        flex: 1
    },

    textoSelecionado: {
        color: '#FFFFFF'
    },

    textArea: {
        minHeight: 150,
        borderWidth: 1,
        borderColor: '#D7A6BF',
        borderRadius: 12,
        padding: 14,
        color: '#50333D',
        fontSize: 15
    },

    contador: {
        textAlign: 'right',
        color: '#915E70',
        fontSize: 12,
        marginTop: 6
    },

    buttonSection: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 25
    },

    buttonCancelar: {
        flex: 1,
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#D789B1',
        alignItems: 'center',
        justifyContent: 'center'
    },

    textCancelar: {
        color: '#915E70',
        fontWeight: 'bold'
    },

    buttonEnviar: {
        flex: 1,
        padding: 15,
        borderRadius: 12,
        backgroundColor: '#EC6E99',
        alignItems: 'center',
        justifyContent: 'center'
    },

    textEnviar: {
        color: '#FFFFFF',
        fontWeight: 'bold'
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },

    modal: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 25,
        alignItems: 'center'
    },

    modalTitulo: {
        color: '#50333D',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 10,
        textAlign: 'center'
    },

    modalTexto: {
        color: '#915E70',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 21,
        marginBottom: 10
    }
});