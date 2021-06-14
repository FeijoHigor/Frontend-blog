import React, { useState, useEffect } from 'react'

import { Link, useHistory } from 'react-router-dom'

import './CategoryForm.css'


const AdminCategoryForm = ({ categorySlug }) => {
    
    const history = useHistory()
    
    const initialValues = {
        name: '',
        slug: '',
        description: ''
    }

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

    
    const [values, setValues] = useState(initialValues)

    async function getCategory() {
        try {
            const reqCategory = await fetch(`http://localhost:5000/category/${categorySlug}`)

            const category = await reqCategory.json()

            if(reqCategory.ok){
                setValues({
                    ...values, 
                    name: category.category.name, 
                    slug: category.category.slug,
                    description: category.category.description,
                    _id: category.category._id
                })
            }else {
                return reqCategory
            }

        } catch(err) {
            return err
        }
    }

    useEffect(() => {
        if(categorySlug) {
            getCategory()
        }
    }, [categorySlug])

    async function postCategory() {
        if(categorySlug) {
            try {
                const response = await fetch(`http://localhost:5000/admin/categories/edit/${values._id}`, {
                    method: 'PATCH',
                    mode: 'cors',
                    body: JSON.stringify({
                        name: values.name,
                        slug: values.slug,
                        description: values.description
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
                const response = await fetch(`http://localhost:5000/admin/categories/add`, {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({
                        name: values.name,
                        slug: values.slug,
                        description: values.description
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

        if(values.name.length < 1) {
            errors.push('Título inválido')
        }

        if(values.slug.length < 1){
            errors.push('Slug inválido')   
        }

        if(values.description.length < 1) {
            errors.push('Descrição inválida')
        }

        if(errors.length === 0) {
            const req = await postCategory()

            const res = await req.json()
            
            if(!req.ok){
                if(req.status === 401) {
                    errors.push('Você não é um administrador')
                }

                if(req.status === 400) {
                    errors.push('Erro')
                    console.log(req)
                }
            }else {
                history.push('/admin/categories')
            }
        }

        setErrors(errors)
    }
    

    return (
        <div className='category-form__container'>
            <h2>
                {
                    categorySlug ? 'Editar categoria:' : 'Criar nova categoria:'
                }
            </h2>
            <hr />
            <div className='category-form__container__navigation'>
                <Link to='/admin'>Administração</Link> / <Link to='/admin/categories'>Categorias</Link> / {categorySlug ? 'Editar categoria' : 'Criar nova categoria'}
            </div>
            <hr />
            <div className='category-form__container__form'>
                <div className='category-form__container__form__errors'>
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
                    <div className='category-form__container__form__input'>
                        <label htmlFor='name'>
                            Nome
                        </label>
                        <input
                            type='text' 
                            id='name' 
                            name='name' 
                            placeholder='Nome da categoria'
                            onChange={onChange}
                            value={values.name}
                        />
                    </div>
                    <div className='category-form__container__form__input'>
                        <label htmlFor='slug'>
                            Slug
                        </label>
                        <input
                            type='text' 
                            id='slug' 
                            name='slug' 
                            placeholder='Slug da categoria'
                            onChange={onChange}
                            value={values.slug}
                        />
                    </div>
                    <div className='category-form__container__form__input'>
                        <label htmlFor='description'>
                            Descrição
                        </label>
                        <input
                            type='text' 
                            id='description' 
                            name='description' 
                            placeholder='Descrição da categoria'
                            onChange={onChange}
                            value={values.description}
                        />
                    </div>
                    <div className='category-form__container__form__button'>
                        <button 
                            type='button'
                            onClick={onSubmit}
                        >
                            {
                                categorySlug ? 'Editar categoria' : 'Criar categoria'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminCategoryForm