import { useRouter } from 'next/router';
import Toolbar from '../../components/Toolbar';
import styles from '../../styles/article.module.css'

function Feed({ pageNumber, articles }) {
    const router = useRouter()

    return (
        <div className='page-container'>
            <Toolbar />
            <div className={styles.main}>
                {
                    articles.map((item, index) => (
                        <div key={index} className={styles.post}>
                            <h1 onClick={() => window.location.href = item.url}>{item.title}</h1>
                            <p>{item.description}</p>
                            {!!item.urlToImage && <img src={item.urlToImage} />}
                        </div>
                    ))
                }
            </div>
            <div className={styles.paginator}>
                <div onClick={
                    () => {
                        if (pageNumber > 1) {
                            router.push(`/feed/${pageNumber - 1}`)
                        }
                    }
                }
                    className={
                        pageNumber === 1 ? styles.disabled : styles.active
                    }>
                    Previous Page
                </div>
                <div>#{pageNumber}</div>
                <div onClick={
                    () => {
                        if (pageNumber < 5) {
                            router.push(`/feed/${pageNumber + 1}`)
                        }
                    }
                }
                    className={
                        pageNumber === 5 ? styles.disabled : styles.active
                    }>
                    Next Page
                </div>
            </div>

        </div>
    )
}

export const getServerSideProps = async pageContext => {
    const pageNumber = pageContext.query.id

    if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
        return {
            props: {
                articles: [],
                pageNumber: 1
            }
        }
    }

    const apiResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&category=sports&pageSize=4&page=${pageNumber}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`
            }
        }
    )
    const apiJson = await apiResponse.json()

    const { articles } = apiJson

    return {
        props: {
            articles,
            pageNumber: Number.parseInt(pageNumber)
        }
    }
}

export default Feed