import React from 'react'

import { useParams } from 'react-router-dom'

import UIContainer from '../../../../components/UI/Container/Container'
import AdminCategoryForm from '../../../../components/Admin/Categories/form/CategoryForm'

const PagesAdminCategoryForm= () => {

    const { category_slug } = useParams()

    return (
        <UIContainer headerSelected={3}>
            <AdminCategoryForm categorySlug={category_slug} />       
        </UIContainer>
    )
}

export default PagesAdminCategoryForm