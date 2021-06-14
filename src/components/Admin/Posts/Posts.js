import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import './Posts.css'

import PostCard from '../../Cards/PostCard/Card'

const AdminPosts = () => {

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
        <div className='admin-posts__container'>
            <h2>Postagens: </h2>
            <hr />
            <div className='admin-posts__container__navigation'>
                <Link to='/admin'>Administração</Link> / Postagens
            </div>
            <hr />
            <div className='admin-posts__container__new-post'>
                <Link to='/admin/add_post'>Nova Postagem</Link>
            </div>
            <hr />
            {
                !posts.length ? (
                    <h2 className='admin-posts__container__title'>Nenhuma postagem </h2>
                )
                :
                (
                    <>
                    <h2 className='admin-posts__container__title'>Postagens recentes: </h2>
                    <div className='admin-posts__container__posts'>
                        {
                            posts.map((e, i) => (
                                <PostCard
                                    key={i}
                                    postSlug={posts[i].slug}
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

export default AdminPosts