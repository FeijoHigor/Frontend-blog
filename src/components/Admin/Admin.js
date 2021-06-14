import React, { useState, useEffect } from 'react'

import { Link, useHistory } from 'react-router-dom'

import './Admin.css'

const Admin = () => {

    const history = useHistory()

    async function getUser(){
        const reqUser = await fetch('http://localhost:5000/user/me', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        
        const user = await reqUser.json()

        if(reqUser.ok) {
            if(user.isAdmin !== 1) {
                history.push('/')
            }
        }else{
            history.push('/')
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className='admin__container'>
            <h2>Página para administradores:</h2>
            
            <hr />

            <div className='admin__container__buttons'>
                <Link to='/admin/posts'>
                    Postagens
                </Link>
                <Link to='/admin/categories'>
                    Categorias
                </Link>
            </div>
        </div>
    )
}

export default Admin