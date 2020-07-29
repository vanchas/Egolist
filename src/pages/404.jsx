import s from '../components/helpers/error.module.scss'
import {useRouter} from "next/router";

export default function NotFoundPage() {
    const router = useRouter()

    return (
        <div className={s.not_found_page}>
            <h2>EGOLIST</h2>
            <p className={`h3`}>Упс... Страница <code>{router.asPath}</code> не найдена =(</p>
        </div>
    )
}