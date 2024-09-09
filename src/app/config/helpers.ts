// import { formElem } from "../components/BAComponentSwitcher";
// import { displayError } from "./MasterContainer";
import moment from 'moment';
import { displayError } from './MasterContainer';
const encryptionKey = `${process.env.NEXT_APP_ENCRYPT_KEY}`;


export const checkRequired = (elements:any, model:any) => {
    let missing:any= []
    elements.forEach((x:any) => {
        if (x.required) {
            if (x.elementType == 'boolean') {
                if ((typeof model[x.key] !== 'boolean')) {
                    missing.push(` Required ${x.label}`)
                }
            } else {
                if (!model[x.key]) {
                    missing.push(` Required ${x.label}`)
                }
            }
        }
    })
    if (missing.length > 0) {
        displayError(missing, 'error')
        return false
    } else {
        return true
    }
}


export const formattedDate = (myDate:any) => {
    // Parse the date using the expected input format to ensure correct parsing
    const parsedDate = moment(myDate, 'DD-MMM-yyyy', true);
    
    // Check if the parsed date is valid
    if (!parsedDate.isValid()) {
        return '';
    }
    // Format the date if it's valid
    return parsedDate.format('DD-MMM-yyyy');
};

export const formattedDateTime = (myDate:any) => {
    // Parse the date using the expected input format to ensure correct parsing
    const parsedDate = moment(myDate, 'YYYY-MM-DD HH:mm:ss.SSS', true);
    
    // Check if the parsed date is valid
    if (!parsedDate.isValid()) {
        return '';
    }
    // Format the date if it's valid
    return parsedDate.format('DD-MMM-yyyy hh:mm A');
};


export const dateIsValid = (dateStr:any) => {
    return moment(dateStr, moment.ISO_8601, true).isValid()
}

export const formattedNumber = (numString:any) => {
    const number = Number(numString);
    if (isNaN(number)) {
        throw new Error("Input is not a valid number");
    }
    return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}



export const customEncrypt = (input:any) => {
    let result = '';
    let val = JSON.stringify(input)
    for (let i = 0; i < val.length; i++) {
        const charCode = (val.charCodeAt(i) + encryptionKey.charCodeAt(i % encryptionKey.length)) % 256;
        result += String.fromCharCode(charCode);
    }
    return result;
}

export const customDecrypt = (input:any) => {
    let result = '';
    for (let i = 0; i < input?.length; i++) {
        const charCode = (input.charCodeAt(i) - encryptionKey.charCodeAt(i % encryptionKey.length) + 256) % 256;
        result += String.fromCharCode(charCode);
    }
    if(result){
        return JSON.parse(result);
    }

}

export const goBack = () => {
    window.history.back()
}
