import React, { useState, useEffect } from 'react'

import './Category.css'

import { Link } from 'react-router-dom'

import PostCard from '../../../Cards/PostCard/Card'

const IndexCategory = ({ categorySlug }) => {

    const [category, setCategory] = useState()

    async function searchCategory() {
        const response = await fetch(`http://localhost:5000/category/${categorySlug}`, {
            method: 'GET',
            mode: 'cors'
        })

        const resCategory = await (await response).json()

        setCategory(resCategory.category)
    }

    useEffect(() => {
        searchCategory()
    }, [])

    return (
        <div className='category-posts__container'>
            <div className='category-posts__container__navigation'>
                <Link to='/categories'>Categorias</Link> / {!category ? 'carregando' : category.name}
            </div>
            <hr />
            <h2>{!category ? 'carregando' : category.name}</h2>
            <div className='category-posts__container__posts'>
                {
                    category === undefined 
                    ? 'carregando' 
                    : category === null 
                    ? 'Nenhuma Postagem' 
                    : category.posts.map((e, i) => (
                        <PostCard
                            key={i}
                            postSlug={category.posts[i].slug}
                            categoryPage
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default IndexCategory