import React from 'react'

import { useParams } from 'react-router-dom'

import UIContainer from '../../../../components/UI/Container/Container'
import AdminPostForm from '../../../../components/Admin/Posts/form/PostForm'

const PagesAdminPostForm= () => {

    const { post_slug } = useParams()

    return (
        <UIContainer headerSelected={3}>
            <AdminPostForm postSlug={post_slug} />       
        </UIContainer>
    )
}

export default PagesAdminPostForm