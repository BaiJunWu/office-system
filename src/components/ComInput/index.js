import React, { Fragment } from 'react'
import { Input } from 'antd'

const ComMenuList = props => {
    return (
        <Fragment>
            <Input.Search type="text" placeholder="搜索" allowClear={true} />
        </Fragment>
    )
}

export default ComMenuList
