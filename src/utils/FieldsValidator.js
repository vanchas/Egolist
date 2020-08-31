import store from "../redux/store";
import { showAlert } from "../redux/actions/appActions";

export default function inputValidateHandler(e, setWarning) {
    const validateSchema =
        e.target.value.toLowerCase().includes('хуй') ||
        e.target.value.toLowerCase().includes('пизд') ||
        e.target.value.toLowerCase().includes('бляд');

    if (e.target.name === 'header') {
        if (e.target.value.length > 50 || validateSchema) {
            setWarning('Заголовок должен быть не длинее 50-ти символов и не содержать не цензурных слов')
            return false
        }
    } else if (e.target.name === 'description') {
        if (e.target.value.length > 1000 || validateSchema) {
            setWarning('Описание должено быть не длинее 1000-ти символов и не содержать не цензурных слов')
            return false
        }
    }
    return true
}

export function badWordsChecker(string) {
    const validateSchema =
      string.toLowerCase().includes(' хуй') ||
      string.toLowerCase() === 'хуй' ||
      string.toLowerCase() === 'нахуй' ||
      string.toLowerCase() === 'захуй' ||
      string.toLowerCase() === 'похуй' ||
      string.toLowerCase().includes('пизд') ||
      string.toLowerCase() === 'пизда' ||
      string.toLowerCase().includes('ебат') ||
      string.toLowerCase().includes('ебал') ||
      string.toLowerCase().includes('ебан') ||
      string.toLowerCase().includes('ебу') ||
      string.toLowerCase().includes('заеб') ||
      string.toLowerCase() === 'ебать' ||
      string.toLowerCase().includes('блят') ||
      string.toLowerCase().includes('бляд');
    // console.log(validateSchema);

    if (validateSchema) {
        store.dispatch(showAlert('Поля не должны содержать нецензурных слов'))
        return false
    }
    return true
}
