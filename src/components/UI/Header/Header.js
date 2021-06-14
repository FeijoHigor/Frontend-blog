import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import './Header.css'

const UIHeader = ({ selected }) => {

    const history = useHistory()

    const [user, setUser] = useState()

    async function getUser(){
        const reqUser = await fetch('http://localhost:5000/user/me', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        if(reqUser.ok) {
            setUser(await reqUser.json())
        }else {
            setUser(false)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    Number.parseInt(selected)
    if(!selected) selected = 1


    function userLogOf() {
        localStorage.removeItem('token')
        history.push('/')
        window.location.reload()
    }

    return (
        <header className='ui-header'>
                <div className='ui-header__content'>
                    <div className='ui-header__content__title'>
                        <h1><Link to='/'>ReactBlog</Link></h1>
                    </div>
                    <div className='ui-header__content__menu'>
                        <nav>
                            <ul>
                                <li className={`ui-header__content__menu__${selected === 1 ? 'selected' : 'not-selected'}`}>
                                    <Link to='/'>
                                        Postagens
                                    </Link>
                                </li>
                                <li className={`ui-header__content__menu__${selected === 2 ? 'selected' : 'not-selected'}`}>
                                        <Link to='/categories'>
                                            Categorias
                                        </Link>
                                </li>
                                {
                                    user === undefined ?
                                        (
                                        <>
                                            <li className={`ui-header__content__menu__${selected === 3 ? 'selected' : 'not-selected'}`}>
                                                <Link to='/'>
                                                    
                                                </Link>
                                            </li>
                                            <li className={`ui-header__content__menu__${selected === 4 ? 'selected' : 'not-selected'}`}>
                                                <Link to='/'>
                                                    
                                                </Link>
                                            </li>
                                        </>
                                        )
                                    :
                                    user === false ? (
                                        <>
                                        <li className={`ui-header__content__menu__${selected === 3 ? 'selected' : 'not-selected'}`}>
                                            <Link to='/user/login'>
                                                Entrar
                                            </Link>
                                        </li>
                                        <li className={`ui-header__content__menu__${selected === 4 ? 'selected' : 'not-selected'}`}>
                                            <Link to='/user/register'>
                                                Registrar
                                            </Link>
                                        </li>
                                        </>
                                    )
                                    :
                                    <>
                                    {
                                        user.isAdmin === 1 ?
                                        (
                                            <li className={`ui-header__content__menu__${selected === 3 ? 'selected' : 'not-selected'}`}>
                                                <Link to='/admin'>
                                                    Administrar
                                                </Link>
                                            </li>
                                        )
                                        :
                                        false
                                    }
                                        <li className={`ui-header__content__menu__not-selected`}>
                                            <a onClick={userLogOf}>                                           
                                                Sair                                           
                                            </a>
                                        </li>
                                        {
                                            user.isAdmin === 0 ?
                                            (
                                                <li className={`ui-header__content__menu`}>

                                                </li>
                                            )
                                            :false
                                        }
                                    </>
                                }
                            </ul>
                        </nav>
                    </div>
                    <div className='ui-header__content__space'>

                    </div>
                </div>

        </header>
    )
}

export default UIHeader