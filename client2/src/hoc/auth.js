/*client-Auth*/
import React, { useEffect } from 'react';
import { auth } from '../../src/redux/_actions/index';
import { useSelector, useDispatch } from "react-redux";

export default function (SpecificComponent, option, adminRoute = null) {
    /*  SpecificComponent : Auth check하는 Component 
        option : 
            [AnyBody] null
            [Login User] true
            [Not Logined] false
        adminRoute : 
            only Admin User(Teacher)
    */
    function AuthenticationCheck(props) {
        
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/')
                    }
                } else {
                    if (adminRoute && !response.payload.isAdmin) {/*0이면 isAdmin:True*/
                        props.history.push('/classes')
                    }
                    else {
                        if (option === false) {
                            props.history.push('/classes')
                        }
                    }
                }
            })

        }, [])

        return (
            <SpecificComponent {...props} user={user} />
        )
    }
    return AuthenticationCheck
}


