import React, { useState, useEffect } from 'react'

import { Link, useHistory } from 'react-router-dom'

import './PostForm.css'

const AdminPostForm = ({ postSlug }) => {
    
    const initialValues = {
        title: '',
        slug: '',
        description: '',
        content: '',
        category: ''
    }

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

    async function getCategories() {
        try {
            const categoriesReq = await fetch('http://localhost:5000/categories', {
                method: 'GET',
                mode: 'cors'
            })
    
            const categories = await categoriesReq.json()

            setCategories(categories.results)
        } catch(err) {
            return err
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    const [values, setValues] = useState(initialValues)

    async function getPost() {
        try {
            const reqPost = await fetch(`http://localhost:5000/post/${postSlug}`)

            const post = await reqPost.json()

            if(reqPost.ok){
                setValues({
                    ...values, 
                    title: post.post.title, 
                    slug: post.post.slug,
                    description: post.post.description,
                    category: post.post.category.name,
                    content: post.post.content,
                    _id: post.post._id
                })
            }else {
                return reqPost
            }

        } catch(err) {
            return err
        }
    }

    useEffect(() => {
        if(postSlug) {
            getPost()
        }
    }, [postSlug])

    async function postPost() {
        if(postSlug) {
            try {
                const response = await fetch(`http://localhost:5000/admin/posts/edit/${values._id}`, {
                    method: 'PATCH',
                    mode: 'cors',
                    body: JSON.stringify({
                        title: values.title,
                        slug: values.slug,
                        description: values.description,
                        content: values.content,
                        category: values.category
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                
                return response
            } catch(err) {
                return err
            }
        }else {
            try {
                const response = await fetch(`http://localhost:5000/admin/posts/add`, {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({
                        title: values.title,
                        slug: values.slug,
                        description: values.description,
                        content: values.content,
                        category: values.category
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                
                return response
            } catch(err) {
                return err
            }
        }
    }
    

    function onChange(ev) {
        const { name, value } = ev.target
        setValues({...values, [name]: value})
    }

    const [errors, setErrors] = useState([])

    async function onSubmit(ev) {
        var errors = []

        if(values.title.length < 1) {
            errors.push('Título inválido')
        }

        if(values.slug.length < 1){
            errors.push('Slug inválido')   
        }

        if(values.description.length < 1) {
            errors.push('Descrição inválida')
        }

        if(values.content.length < 1) {
            errors.push('Conteúdo inválido')
        }

        if(!values.category) {
            errors.push('Categoria inválida')
        }

        if(errors.length === 0) {
            const req = await postPost()

            const res = await req.json()
            
            if(!req.ok){
                if(req.status === 401) {
                    errors.push('Você não é um administrador')
                }

                if(req.status === 400) {
                    errors.push('Erro')
                }
            }else {
                history.push('/admin/posts')
            }
        }

        setErrors(errors)
    }

    return (
        <div className='post-form__container'>
            <h2>
                {postSlug ? 'Editar postagem:' : 'Criar nova postagem:'}
            </h2>
            <hr />
            <div className='post-form__container__navigation'>
                <Link to='/admin'>Administração</Link> / <Link to='/admin/posts'>Postagens</Link> / {postSlug ? 'Editar postagem' : 'Criar nova postagem'}
            </div>
            <hr />
            <div className='post-form__container__form'>
                <div className='post-form__container__form__errors'>
                    {
                        errors ?
                            errors.map(e => {
                                return (
                                    <p>{e}</p>
                                )
                            })
                        :
                        false
                    }
                </div>
                <form>
                    <div className='post-form__container__form__input'>
                        <label htmlFor='title'>
                            Titúlo
                        </label>
                        <input
                            type='text' 
                            id='title' 
                            name='title' 
                            placeholder='Titúlo da postagem'
                            onChange={onChange}
                            value={values.title}
                        />
                    </div>
                    <div className='post-form__container__form__input'>
                        <label htmlFor='slug'>
                            Slug
                        </label>
                        <input
                            type='text' 
                            id='slug' 
                            name='slug' 
                            placeholder='Slug da postagem'
                            onChange={onChange}
                            value={values.slug}
                        />
                    </div>
                    <div className='post-form__container__form__input'>
                        <label htmlFor='description'>
                            Descrição
                        </label>
                        <input
                            type='text' 
                            id='description' 
                            name='description' 
                            placeholder='Descrição da postagem'
                            onChange={onChange}
                            value={values.description}
                        />
                    </div>
                    <div className='post-form__container__form__input'>
                        <label htmlFor='category'>
                            Categoria
                        </label>
                        <select id='category' name='category' onChange={onChange}>
                            {
                                !categories ? <option>Carregando</option> :
                                categories.lenght < 1 ? 
                                (
                                    <option>Não há categorias registradas</option>
                                ) :
                                categories.map(e => (
                                    <option value={e.slug}>{e.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='post-form__container__form__input'>
                        <label htmlFor='content'>
                            Conteúdo
                        </label>
                        <textarea id='content' name='content' placeholder='Conteúdo da postagem' onChange={onChange} value={values.content} />
                    </div>
                    <div className='post-form__container__form__button'>
                        <button 
                            type='button'
                            onClick={onSubmit}
                        >
                            Postar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminPostForm