import React from 'react'
import Toolbar from '../../components/toolbar';
import styles from '../../styles/EOM.module.css'

function EOM({employee}) {
    console.log(employee);
  return (
    <div className='page-container'>
        <Toolbar/>
        <div className={styles.main}>
            <h1>Employee Of The Month</h1>

            <div className={styles.employee__of__the__month}>
                <h3>{employee.name}</h3>
                <h6>{employee.position}</h6>
                <img src={employee.image} alt={employee.name} />
                <p>{employee.description}</p>
            </div>
        </div>
    </div>
  )
}

export async function getServerSideProps(context){
    const res = await fetch(
        'https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth',
    )

    const employee = await res.json();

    return{
        props:{
            employee: employee
        }
    }
}

export default EOM