import s from '../components/helpers/errors.module.scss'

export default function ErrorPage() {

    return (
        <div className={s.error_page}>
            <h2>EGOLIST</h2>
            <p className={`h3`}>Упс... Что-то пошло не так =(</p>
        </div>
    )
}
