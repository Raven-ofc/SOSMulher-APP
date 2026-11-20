
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FEF9FB',
    },

    scrollContent: {
        width: '100%',
        paddingBottom: 30,
    },

    // Header
    voltar: {
        paddingTop: 40,
        paddingBottom: 10,
        paddingHorizontal: 15,
    },

    header: {
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerTitulo: {
        color: '#50333D',
        fontSize: 20,
        fontWeight: 'bold',
    },

    // Navegação das abas
    abasContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginHorizontal: 20,
        padding: 5,
        elevation: 2,
        justifyContent: 'space-between',
    },

    aba: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },

    abaAtiva: {
        backgroundColor: '#EC6E99',
    },

    textoAba: {
        fontSize: 16,
        color: '#50333D',
        textAlign: 'center',
    },

    textoAbaAtiva: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },

    // Container principal
    cont: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        flexDirection: 'column',
        padding: 15,
        margin: 20,
        elevation: 2,
    },

    sectionTextos: {
        flexDirection: 'column',
        width: '100%',
    },

    // Títulos e textos
    titulo: {
        fontWeight: '700',
        fontSize: 20,
        color: '#50333D',
        marginVertical: 10,
    },
    subtitulo: {
        fontWeight: '600',
        fontSize: 18,
        color: '#50333D',
        marginBottom: 10,
    },

    animeContainer: {
        width: 220,
        height: 220,
        justifyContent: 'center',
        margin: 'auto',
        alignItems: 'center',
    },

    box: {
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

    SobreApp: {
        textAlign: 'justify',
        color: '#50333D',
        fontSize: 15,
        lineHeight: 23,
        marginBottom: 15,
    },

    divisor: {
        backgroundColor: '#D789B1',
        width: '100%',
        height: 1,
        marginVertical: 15,
    },

    // Indicadores de segurança
    cardSeguro: {
        backgroundColor: '#E5F6EF',
        borderRadius: 12,
        padding: 15,
        marginVertical: 10,
        alignItems: 'center',
        elevation: 1,
    },

    cardAlerta: {
        backgroundColor: '#FFF1C9',
        borderRadius: 12,
        padding: 15,
        marginVertical: 10,
        alignItems: 'center',
        elevation: 1,
    },

    cardPerigo: {
        backgroundColor: '#FADDDD',
        borderRadius: 12,
        padding: 15,
        marginVertical: 10,
        alignItems: 'center',
        elevation: 1,
    },

    cardConfirmacao: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
        marginVertical: 15,
        alignItems: 'center',
        elevation: 5,
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
    buttonSectionMapa:{
        justifyContent:'center',
        alignItems:'center',
    },
    cardTitulo: {
        color: '#50333D',
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'center',
        marginVertical: 8,
    },

    alerta: {
        padding: 10,
        borderRadius: 10,
        minHeight: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 15,
        elevation: 2,
    },

    tituloAlerta: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 8,
    },

    mensagemAlerta: {
        color: '#FFFFFF',
        marginTop: 4,
        textAlign: 'center',
    },
    expAlerta: {
        textAlign: 'center',
        color: '#50333D',
        fontSize: 15,
        lineHeight: 23,
        marginBottom: 15,
    },
    // Imagens e ilustrações
    containerFoto: {
        width: '100%',
        height: 180,
        backgroundColor: '#FCE5EC',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },
    subTituloAlerta: {
        color: '#D94D7D',
        fontSize: 16,
        textAlign: 'center',

    },

});
