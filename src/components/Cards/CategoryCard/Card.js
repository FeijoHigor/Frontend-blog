import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import './Card.css'

const CategoryCard = ({ categorySlug, admin}) => {

    const [category, setCategory] = useState()

    async function searchCategory() {
        const response = await fetch(`http://localhost:5000/category/${categorySlug}`, {
            method: 'GET',
            mode: 'cors'
        })

        const resCategory = await response.json()

        setCategory(resCategory.category)
    }

    useEffect(() => {
        searchCategory()
    }, [])

    return (
        <div className='category-card__container'>
            <div className='category-card__container__main'>
                <h2>
                    {!category ? 'carregando' : category.name}
                </h2>
                <p>
                    {!category ? 'carregando' : category.description}
                </p>
                <div className='category-card__container__main__buttons'>
                    {
                        !admin ? (
                            <Link to={!category ? '/categories' : `/category/${category.slug}`} className='category-card__container__main__buttons-see'>
                                Ver categoria
                            </Link>
                        ) : (
                            <>
                                <Link to={!category ? '/categories' : `/admin/edit_category/${category.slug}`} className='category-card__container__main__buttons-see'>
                                    Editar categoria
                                </Link>
                                <Link to='/' className='category-card__container__main__buttons-destroy'>
                                    Excluir
                                </Link>
                            </>
                        )
                    }
                </div>
                
            </div>
            <div className='category-card__container__footer'>
                <small>Postagens: {!category ? 'carregando' : category.posts.length}</small>
                <small>Data: {!category ? 'carregando' : category.createdAt}</small>
            </div>
        </div>
    )
} 

export default CategoryCard