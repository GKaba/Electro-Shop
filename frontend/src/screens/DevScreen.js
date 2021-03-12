

import Message from '../Components/Message'
import { Link } from 'react-router-dom'
import  FormContainer from '../Components/FormContainer'
const DevScreen = ({location,history}) => {

    
    return (
        <FormContainer>
            <h1 variant="danger">Page Not Found</h1>

            <Message variant="danger">
            Page Under development <Link to="/">Go Back</Link>
          </Message>
        </FormContainer>
    )
}

export default DevScreen
