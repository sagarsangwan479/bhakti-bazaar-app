

export const addAddressValidation = (houseNo: string, city: string, state: string, pincode: string) => {
    if (houseNo === '' || city === '' || state === '' || pincode === '') {
        return false;
    } else {
        return true;
    }
}