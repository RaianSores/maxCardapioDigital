import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/theme';

export const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.secondaryDarkGreyHex,
    },
    screenContainer: {
        flex: 1,
        backgroundColor: COLORS.secondaryDarkGreyHex,
    },
    text: {
        color: 'white',
        fontSize: 18,
    },
});