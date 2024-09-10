import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {FONTSIZE} from '../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E3E3E',
  },
  actionCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
    marginTop: wp('2%'),
  },
  actionCardHeaderTitle: {
    fontSize: FONTSIZE.size_20,
    fontWeight: 'bold',
    color: '#A2A4A3',
  },
  actionCardHeaderList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ddd',
    paddingVertical: 5,
    paddingHorizontal: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: hp('2%'),
    margin: wp('2%'),
  },
  regTable: {
    fontSize: FONTSIZE.size_18,
    fontWeight: 'bold',
    color: '#363539',
    marginLeft: hp('1%'),
  },
  emptyCartImage: {
    width: hp('40%'),
    height: wp('20%'),
  },
  actionCardBack: {
    color: '#ffa500',
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_20,
  },
  actionCardContent: {
    flex: 1,
  },
  actionCardInvoiceTableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#696969',
    marginBottom: 8,
  },
  tableCol: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: hp('1%'),
  },
  tableColLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  tableColRigth: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  actionCardInvoiceTableTitle: {
    flex: 2,
  },
  invoiceImage: {
    width: hp('8%'),
    height: wp('4%'),
    borderRadius: 5,
  },
  actionCardInvoiceFooter: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 10,
    flexDirection: 'row', // Altera o layout para linha
    alignItems: 'center', // Alinha os itens verticalmente
    justifyContent: 'space-between', // Distribui espaço uniformemente
  },
  title: {
    fontSize: FONTSIZE.size_16,
    color: '#46423F',
  },
  price: {
    fontSize: FONTSIZE.size_20,
    fontWeight: 'bold',
    color: '#46423F',
  },
  btnPrimary: {
    backgroundColor: '#F38321',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnDanger: {
    backgroundColor: '#3E3E3E',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnText: {
    color: '#fff',
    fontSize: FONTSIZE.size_20,
    fontWeight: 'bold',
  },
  actionCardInvoiceFooterSum: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionCardInvoiceFooterService: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionCardInvoiceFooterCouvert: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionCardInvoiceFooterTotal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
