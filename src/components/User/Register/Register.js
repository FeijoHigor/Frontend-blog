import React, { useState, useEffect } from 'react'

import { Link, useHistory } from 'react-router-dom'

import './Register.css'

const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
}

const UserRegister = () => {

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

    const [errors, setErrors] = useState([])

    async function createUser() {
        try {
            const response = await fetch('http://localhost:5000/user/register', {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    password: values.password
                }),
                headers: {'Content-Type': 'application/json'}
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

        if(values.name.length < 1) {
            errors.push('Nome inválido')
        }

        if(values.email.indexOf('@') === -1){
            errors.push('Email inválido')   
        }

        if(values.password.length < 1) {
            errors.push('Senha inválida')
        }

        if(values.password !== values.passwordConfirm) {
            errors.push('Senhas diferentes')
        }

        if(errors.length === 0) {
            const req = await createUser()

            const res = await req.json()
            
            if(!req.ok){
                if(req.status === 409) {
                    errors.push('Usuário já existe')
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
        <div className='user-register__container'>
            <h2>
                Crie sua conta:
            </h2>
            <hr />
            <div className='user-register__container__form'>
                <div className='user-register__container__form__errors'>
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
                    <div className='user-register__container__form__input'>
                        <input
                            type='text' 
                            id='name' 
                            name='name' 
                            placeholder='Seu nome'
                            onChange={onChange}
                        />
                        <label htmlFor='name'>
                            Nome
                        </label>
                    </div>
                    <div className='user-register__container__form__input'>
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
                    <div className='user-register__container__form__input'>
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
                    <div className='user-register__container__form__input'>
                        <input
                            type='password' 
                            id='passwordConfirm' 
                            name='passwordConfirm' 
                            placeholder='Repita sua senha'
                            onChange={onChange}
                        />
                        <label htmlFor='passwordConfirm'>
                            Confirme sua senha 
                        </label>
                    </div>
                    <div className='user-register__container__form__input'>
                        <button 
                            type='button'
                            onClick={onSubmit}
                        >
                            Registrar
                        </button>
                    </div>
                </form>
                <div className='user-register__container__form__input'>
                    <Link to='/user/login'>Entrar</Link>
                </div>
            </div>
        </div>
    )
}

export default UserRegister