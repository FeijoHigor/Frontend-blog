import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import './Categories.css'

import CategoryCard from '../../Cards/CategoryCard/Card'

const AdminCategories = () => {

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

    const [categories, setCategories] = useState()

    async function searchCategories() {
        const response = await fetch('http://localhost:5000/categories?_page=1&_limit=10', {
            method: 'GET',
            mode: 'cors'
        })

        const resCategories = await (await response).json()

        setCategories(resCategories.results)
    }

    useEffect(() => {
        searchCategories()
    }, [])

    return (
        <div className='admin-categories__container'>
        <h2>Categorias: </h2>
        <hr />
        <div className='admin-categories__container__navigation'>
            <Link to='/admin'>Administração</Link> / Categorias
        </div>
        <hr />
        <div className='admin-categories__container__new-post'>
            <Link to='/admin/add_category'>Nova Categoria</Link>
        </div>
        <hr />
        {
            !categories ? ( 
                <h2 className='admin-categories__container__title'>
                    Nenhuma categoria
                </h2>
            )
            :
            (
                <>
                <h2 className='admin-categories__container__title'>Categorias recentes: </h2>
                <div className='admin-categories__container__categories'>
                    {
                        categories.map((e, i) => (
                            <CategoryCard
                                key={i}
                                categorySlug={categories[i].slug}
                                admin
                            />
                        ))
                    }
                </div>
                </>
            )
        }
    </div>
    )
}

export default AdminCategories