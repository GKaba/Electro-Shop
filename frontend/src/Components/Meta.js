import React from 'react'
import {Helmet} from 'react-helmet'
const Meta = ({title,description,keywords}) => {
    return (
      <Helmet>
        <title>{title}</title>
        <meta
          name="description"
          content={description}
        ></meta>
        <meta
          name="keywords"
          content={keywords}
        ></meta>
      </Helmet>
    )
}

Meta.defaultProps={
    title:'Welcome to Electro-Shop',
    description:'We will sell best product for cheap',
    keywords:'electronics ,electronics cheap,buy electronics'
}

export default Meta


