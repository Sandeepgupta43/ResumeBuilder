// hooks/useUserData.js
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { CustomUserContext } from '../context/CustomUserContext';

export const UseUserData = (isCustom = false) => {
    const defaultContext = useContext(UserContext);
    const customContext = useContext(CustomUserContext);
    
    if (isCustom) {
        return {
            userData: customContext.customUserData,
            setUserData: customContext.setCustomUserData
        };
    }
    return {
        userData: defaultContext.userData,
        setUserData: defaultContext.setUserData
    };
};