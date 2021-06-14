import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import PostCard from '../../Cards/PostCard/Card'

import './Posts.css'

const IndexPosts = () => {

    const [user, setUser] = useState(false)

    async function getUser(){
        const reqUser = await fetch('http://localhost:5000/user/me', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        

        if(reqUser.ok) {
            setUser(true)
        }else {
            setUser(false)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const [posts, setPosts] = useState([])

    async function searchPosts() {
        const response = await fetch('http://localhost:5000/posts?_page=1&limit=10', {
            method: 'GET',
            mode: 'cors',
        })

        const resPosts = await response.json()

        setPosts(resPosts.results)
    }

    useEffect(() => {
        searchPosts()
    }, [])

    return (
        <div className='index-posts__container'>


            {
                user ? 
                    false
                :
                (
                    <>
                    <div className='index-posts__container__information'>
                    <div className='index-posts__container__information__title'>
                        <h3>ReactBlog informa: </h3>
                    </div>
                    <div className='index-posts__container__information__inside-box'>
                        <h4>
                            Bem-vindo ao ReactBlog
                        </h4>
                        <p>
                            Seja muito bem-vindo ao ReactBlog, aqui você vai ver postagens sobre programação em geral. Fique a vontade para criar sua conta.
                        </p>
                        <Link to='/user/register'>Criar conta</Link>
                    </div>
                    </div>
    
                    <hr />
                    </>
                )
            }
           

            {
                !posts.length ? (
                    <h2>
                        Nenhuma postagem
                    </h2>
                )
                :
                (
                    <>
                        <h2>
                            Postagens recentes:
                        </h2>

                        <div className='index-posts__container__posts'>
                            {
                                posts.map((e, i) => (
                                    <PostCard
                                        key={i}
                                        postSlug={posts[i].slug}
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

export default IndexPosts