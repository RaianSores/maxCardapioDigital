import Toast from 'react-native-toast-message';
import CustomToast from '../components/CustomToast';

const showToast = (message, type) => {
  Toast.show({
    type,
    position: 'bottom',
    text1: message,
    visibilityTime: 2000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 60,   
    render: () => <CustomToast message={message} type={type} />,
  });
};

export default showToast;
