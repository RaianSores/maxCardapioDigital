import {StyleSheet} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE} from '../../theme/theme';

export const styles = StyleSheet.create({
  additionalItem: {
    justifyContent: 'space-between',
    backgroundColor: "#E0DCD9",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bdbec2c0',
    marginVertical: 3,
    flexDirection: 'column',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingRight: 10,
  },
  additionalLabel: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_regular,
    color: '#363539',
    marginBottom: 1,
  },
  additionalPrice: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryOrangeHex,
  },
  count: {
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#3E3E3E',
    width: 44,
    height: 45,
    fontSize: FONTSIZE.size_24,
    fontWeight: 'bold',
  },

  iconContainer: {
    flexDirection: 'row', // Organiza os ícones horizontalmente
    alignItems: 'center',
  },
  buttonAdd: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDecrement: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
  },
});
