import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { Text, Dimensions, SafeAreaView } from 'react-native';
import { BottomSheetView, BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { COLORS } from '../../theme/theme';
import { styles } from './styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface SheetProps {
    visible: boolean;
    onClose: () => void;
};

const SheetDetails: React.FC<SheetProps> = ({ visible, onClose }) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['90%', '90%', '100%'], []);
    const translateY = useSharedValue(SCREEN_HEIGHT);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        if (index === 0) {
            onClose();
        };
    }, [onClose]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    useEffect(() => {
        handlePresentModalPress();
    }, []);

    return (
        <BottomSheetModalProvider>
            <Animated.View style={[styles.overlay, animatedStyle]}>
                {visible && (
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                        enablePanDownToClose={true}
                        style={{ backgroundColor: COLORS.secondaryDarkGreyHex }}
                        backgroundStyle={{ backgroundColor: COLORS.secondaryDarkGreyHex }}
                        handleIndicatorStyle={{ backgroundColor: COLORS.primaryWhiteHex, width: 50 }}
                    >
                        <BottomSheetView style={styles.contentContainer}>
                            <SafeAreaView style={styles.screenContainer}>
                                <Text style={styles.text}>Detalhes do Produto</Text>
                            </SafeAreaView>
                        </BottomSheetView>
                    </BottomSheetModal>
                )}
            </Animated.View>
        </BottomSheetModalProvider>
    );
};

export default SheetDetails;
