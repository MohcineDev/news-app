import React from 'react'
import {useRouter} from 'next/router'
import styles from '../styles/toolbar.module.css'


const Toolbar = () => {
    const router = useRouter()

    return (
        <div className={styles.main}>
            <div onClick={()=> router.push('/')}>Home</div>
            <div onClick={()=> router.push('/feed/1')}>Feed</div>
            <div onClick={()=> router.push('/eom')}>EOM</div>
            <div onClick={()=> window.location.href = 'https://github.com/mohcinedev'}>Github</div>
        </div>
    )
}

export default Toolbar
