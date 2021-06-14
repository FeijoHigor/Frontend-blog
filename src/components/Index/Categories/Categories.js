import React, { useState, useEffect } from 'react'

import './Categories.css'

import CategoryCard from '../../Cards/CategoryCard/Card'

const IndexCategories = () => {
    
    const [categories, setCategories] = useState()

    async function searchCategories() {
        const response = await fetch('http://localhost:5000/categories?_page=1&_limit=10', {
            method: 'GET',
            mode: 'cors'
        })

        const resCategories = await (await response).json()

        setCategories(resCategories.results)
    }

    useEffect(() => {
        searchCategories()
    }, [])

    return (
        <div className='index-categories__container'>
            {
                !categories ? (
                    <h2>Nenhuma categoria: </h2>
                )
                :
                (
                    <>
                    <h2>
                        Categorias recentes: 
                    </h2>
                    <hr />
                    <div className='index-categories__container__categories'>
                        {
                            categories.map((e, i) => (
                                <CategoryCard
                                    key={i}
                                    categorySlug={categories[i].slug}
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

export default IndexCategories