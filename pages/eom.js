import React from 'react'
import Toolbar from '../components/Toolbar';
import styles from '../styles/eom.module.css'

const EOM = ({ employee }) => {

    return (
        <div className='page-container'>
            <Toolbar/>
            <div className={styles.main}>
                <h1 className={styles.h1}>Employee of the Month</h1>
                <div className={styles.employeeOfMonth}>
                    <h3>{employee.name}</h3>
                    <h6>{employee.position}</h6>
                    <img src='https://avatars.githubusercontent.com/u/62650926?v=4' alt="" />
                    <p>{employee.description}</p>
                </div>

            </div>
        </div>
    )

}

export const getServerSideProps = async pageContext => {
    const apiResponse = await fetch('https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth')

    const employee = await apiResponse.json()
    return {
        props: {
            employee: employee
        }
    }
}

export default EOM
