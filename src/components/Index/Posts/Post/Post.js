import React, { useState, useEffect } from 'react'

import './Post.css'

import { Link } from 'react-router-dom'

const IndexPost = ({ postSlug, categorySlug }) => {

    const [post, setPost] = useState()

    async function searchPost() {
        const response = await fetch(`http://localhost:5000/post/${postSlug}`, {
            method: 'GET',
            mode: 'cors'
        })

        const resPost = await response.json()

        setPost(resPost.post)
    }

    useEffect(() => {
        searchPost()
    }, [])

    return (
        <div className='index-post__container'>
            
                {
                    categorySlug ? (
                        <div className='index-post__container__navigation'>
                            <Link to='/categories'>Categorias</Link> / {!post ? 'carregando' : <Link to={`/category/${categorySlug}`}>{categorySlug}</Link>} / {!post ? 'carregando' : post.title}
                        </div>
                    )
                    :
                    (
                        <div className='index-post__container__navigation'>
                            <Link to='/'>Postagens</Link> / {!post ? 'carregando' : post.title}
                        </div>
                    )
                }
            
            <hr />
            <div className='index-post__container__post'>
                <header className='index-post__container__post__header'>
                    <h2>{!post ? 'carregando' : post.title}</h2>
                    <hr />
                </header>
                <main className='index-post__container__post__main'>
                    <p>{!post ? 'carregando' : post.content}</p>
                </main>
                <footer className='index-post__container__post__footer'>
                    <small>Categoria: {!post ? 'carregando' 
                        :
                        (<Link to='/category/${post.category.slug}'>
                            {post.category.name}</Link>)}
                    </small>
                    <small>Data da publicação: {!post ? 'carregando' : post.createdAt}</small>
                </footer>
            </div>
        </div>
    )
}

export default IndexPost