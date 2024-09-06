import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3E3E3E',
  },
  context: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  headerText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  textSumary: {
    fontSize: 22,
    color: '#3E3E3E',
    fontWeight: 'bold',
    marginBottom: wp('2%'),
  },
  emptyView: {
    height: 5,
  },
  containerQrCode: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: '1%',
    borderRadius: 10,
    padding: '1%',
  },
  containerLottieView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: '1%',
    backgroundColor: '#3E3E3E',
    borderRadius: 10,
    padding: '1%',
  },
  containerValue: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: hp('2%'),
    top: hp('1%'),
    borderRadius: 5,
    backgroundColor: '#ddd',
    width: wp('40%'),
    height: hp('80%'), 
  },
  mainContent: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: wp('2%'),
    justifyContent: 'space-between',
  },
  actionCard: {
    flex: 3,
    borderRadius: 10,
    margin: wp('2%'),
    justifyContent: 'space-between',
    position: 'relative',
  },
  actionPrice: {
    flex: 1,
    backgroundColor: '#ddd',
    borderRadius: 10,
    padding: hp('2%'),
    margin: wp('2%'),
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: '#3E3E3E',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3E3E3E',
    textAlign: 'right',
  },
  actionCardInvoiceFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
  },
  actionCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  actionCardBack: {
    color: '#ffa500',
    fontWeight: 'bold',
    fontSize: 20,
  },
  actionCardHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A2A4A3',
  },
});
