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