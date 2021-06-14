import React from 'react'

import './Container.css'
import UIHeader from '../Header/Header'

const UIContainer = ({ children, headerSelected }) => {
    return (
        <div className='ui-container'>
            <UIHeader selected={headerSelected} />
            <div className='ui-container__content'>
                {children}
            </div>
        </div>
    )
}

export default UIContainer