import { StyleSheet } from 'react-native';
import { theme } from '../theme'

export const styles = StyleSheet.create({
    container: {
		flex: 1,
		backgroundColor: theme.colors.base.gray600,
    },
    tasksContainer: {
		flex: 1,
		marginTop: 55,
		marginHorizontal: 24,
    },
    info: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
    },
    row: {
		flexDirection: 'row',
		alignItems: 'center',
    },
    tasksCreated: {
		color: theme.colors.brand.blue,
		fontSize: theme.font_size.md,
		fontFamily: theme.font_family.bold,
    },
    tasksDone: {
		color: theme.colors.brand.purple,
		fontSize: theme.font_size.md,
		fontFamily: theme.font_family.bold,
    },
    counterContainer: {
		backgroundColor: theme.colors.base.gray400,
		width: 25,
		height: 19,
		borderRadius: 999,
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 8,
    },
    counterText: {
		color: theme.colors.base.gray200,
		fontSize: theme.font_size.sm,
		fontFamily: theme.font_family.bold,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        padding: 10,
        backgroundColor: '#5E60CE',
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#6C757D',
    },
    modalButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});
