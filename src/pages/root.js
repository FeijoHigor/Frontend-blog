import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import PagesAdmin from './Admin/Admin'

import PagesAdminCategories from './Admin/Categories/Categories'
import PagesAdminPosts from './Admin/Posts/Posts'

import PagesAdminPostForm from './Admin/Posts/form/PostForm'
import PagesAdminCategoryForm from './Admin/Categories/form/CategoryForm'

import PagesIndexPosts from './Index/Posts/Posts'
import PagesIndexCategories from './Index/Categories/Categories'

import PagesIndexPost from './Index/Posts/Post/Post'
import PagesIndexCategory from './Index/Categories/Category/Category'

import PagesUserRegister from './User/Register/Register'
import PagesUserLogin from './User/Login/Login'

const Root = () => {
    return (
        <Router>
            <Switch>
                <Route path={'/admin/posts'} component={PagesAdminPosts} />
                <Route path={'/admin/add_post'} component={PagesAdminPostForm} />
                <Route path={'/admin/edit_post/:post_slug'} component={PagesAdminPostForm} />
                <Route path={'/admin/add_category'} component={PagesAdminCategoryForm} />
                <Route path={'/admin/edit_category/:category_slug'} component={PagesAdminCategoryForm} />
                <Route path={'/admin/categories'} component={PagesAdminCategories} />
                <Route path={'/admin'} component={PagesAdmin} />
                <Route path={'/user/register'} component={PagesUserRegister} />
                <Route path={'/user/login'} component={PagesUserLogin} />
                <Route path={'/category/:category_slug/:post_slug'} component={PagesIndexPost} />
                <Route path={'/category/:category_slug'} component={PagesIndexCategory} />
                <Route path={'/categories'} component={PagesIndexCategories} />
                <Route path={'/post/:post_slug'} component={PagesIndexPost} />
                <Route path={'/'} component={PagesIndexPosts} />
            </Switch>    
        </Router>
    )
}

export default Root