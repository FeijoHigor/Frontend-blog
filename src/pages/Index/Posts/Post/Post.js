import React from 'react'

import { useParams } from 'react-router-dom'

import UIContainer from '../../../../components/UI/Container/Container'
import IndexPost from '../../../../components/Index/Posts/Post/Post'

const PagesIndexPost = () => {

    const { post_slug, category_slug } = useParams()

    return (
        <UIContainer headerSelected={category_slug ? 2 : 1}>
            <IndexPost postSlug={post_slug} categorySlug={category_slug} />
        </UIContainer>
    )
}

export default PagesIndexPost