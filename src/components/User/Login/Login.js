import React, { useState, useEffect } from 'react'

import { Link, useHistory } from 'react-router-dom'

import './Login.css'

const initialValues = {
    email: '',
    password: ''
}

const UserLogin = () => {

    const history = useHistory()

    async function getUser(){
        const reqUser = await fetch('http://localhost:5000/user/me', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        

        if(reqUser.ok) {
            history.push('/')
        }else {
            return
        }
    }

    useEffect(() => {
        getUser()
    }, [])



    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState()

    async function searchUser() {
        try {
            const response = await fetch('http://localhost:5000/user/login', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Authorization': 'Basic ' + btoa(`${values.email}:${values.password}`)
                }
            })

            return response
        }catch(err) {
            return err
        }
        
    }

    function onChange(ev) {
        const { name, value } = ev.target
        setValues({...values, [name]: value})
    }

    async function onSubmit(ev) {
        var errors = []
        if(values.email.indexOf('@') === -1){
            errors.push('Email inválido')   
        }

        if(values.password.length < 1) {
            errors.push('Senha inválida')
        }

        if(errors.length === 0) {
            const req = await searchUser()

            const res = await req.json()
            
            if(!req.ok){
                if(req.status === 401) {
                    errors.push('Usuário ou senha incorretas')
                }
                if(req.status === 404) {
                    errors.push('Usuário não existe')
                }
            }else {
                localStorage.setItem('token', res.token)
                history.push('/')
                return true
            }
        }

        setErrors(errors)
    }

    return (
        <div className='user-login__container'>
            <h2>
                Entre na sua conta:
            </h2>
            <hr />
            <div className='user-login__container__form'>
                <div className='user-login__container__form__errors'>
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
                    <div className='user-login__container__form__input'>
                        <input
                            type='email' 
                            id='email' 
                            name='email' 
                            placeholder='Seu email'
                            onChange={onChange}
                        />
                        <label htmlFor='email'>
                            Email
                        </label>
                    </div>
                    <div className='user-login__container__form__input'>
                        <input
                            type='password' 
                            id='password' 
                            name='password' 
                            placeholder='Sua senha'
                            onChange={onChange}
                        />
                        <label htmlFor='password'>
                            Senha
                        </label>
                    </div>
                    <div className='user-login__container__form__input'>
                        <button 
                            type='button'
                            onClick={onSubmit}
                        >
                            Entrar
                        </button>
                    </div>
                </form>
                <div className='user-login__container__form__input'>
                    <Link to='/user/register'>Registrar</Link>
                </div>
            </div>
        </div>
    )
}

export default UserLogin