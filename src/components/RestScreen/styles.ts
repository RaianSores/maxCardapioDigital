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
  containerConta: {
    flex: 1,
    backgroundColor: '#740c0c',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  containerTouch: {
    justifyContent: 'space-between',
    alignContent: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  containerLogo: {
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    gap: 15,
  },
  containerTitle: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    top: -50,
  },
  titles: {
    fontSize: 25,
    marginTop: 5,
  },
  photoMaxData: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    overflow: 'hidden',
    height: hp('23%'),
    width: wp('21%'),
    maxWidth: wp('21%'),
    maxHeight: hp('23%'),
  },
  photoEmpresa: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    overflow: 'hidden',
    height: hp('23%'),
    width: wp('21%'),
    maxWidth: wp('21%'),
    maxHeight: hp('23%'),
  },
});
