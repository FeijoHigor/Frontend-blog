import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import './Card.css'

const PostCard = ({ postSlug, categoryPage, admin}) => {

    const [post, setPost] = useState()

    async function searchPost() {
        const response = await fetch(`http://localhost:5000/post/${postSlug}`, {
            method: 'GET',
            mode: 'cors',
        })

        const resPost = await response.json()

        setPost(resPost.post)
    }

    useEffect(() => {
        searchPost()
    }, [])

    return (
        <div className='post-card__container'>
            <div className='post-card__container__main'>
                <h2>
                    {!post ? 'carregando' : post.title}
                </h2>
                <p>
                    {!post ? 'carregando' : post.description}
                </p>
                <div className='post-card__container__main__buttons'>
                    {
                        !admin ? (
                                <Link 
                                    to={!post ? '/' : categoryPage ? `/category/${post.category.slug}/${post.slug}` : `/post/${post.slug}`} 
                                    className='post-card__container__main__buttons-see'
                                >
                                    Ver postagem
                                </Link>
                        ) : (
                            <>
                                <Link to={`/admin/edit_post/${postSlug}`} className='post-card__container__main__buttons-see'>
                                    Editar post
                                </Link>
                                <Link to='/' className='post-card__container__main__buttons-destroy'>
                                    Excluir
                                </Link>
                            </>
                        )
                    }
                </div>
            </div>
            <div className='post-card__container__footer'>
                <small>Categoria: {!post ? 'carregando' : (<Link to={`/category/${post.category.slug}`}>{post.category.name}</Link>)} </small>
                <small>Data: {!post ? 'carregando' : post.createdAt}</small>
            </div>
        </div>
    )
}

export default PostCard