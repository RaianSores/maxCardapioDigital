import {StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, themeColors} from '../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  touchable: {
    height: 30,
    width: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: themeColors.bgColor(3),
    borderWidth: 2,
  },
  opText: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_regular,
    color: '#363539',
    marginBottom: 5,
  },
});
