import React from 'react'

import { useParams } from 'react-router-dom'

import UIContainer from '../../../../components/UI/Container/Container'
import IndexCategory from '../../../../components/Index/Categories/Category/Category'

const PagesIndexCategory = () => {

    const { category_slug } = useParams()

    return (
        <UIContainer headerSelected={2}>
            <IndexCategory categorySlug={category_slug} />
        </UIContainer>
    )
}

export default PagesIndexCategory