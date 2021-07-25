/* auth 기능 */
import React, { useEffect } from 'react';
import { auth } from '../../src/redux/_actions/index';
import { useSelector, useDispatch } from "react-redux";

export default function (SpecificComponent, option, adminRoute = null) {
    //option - null(아무나 출입이 가능) true(로그인한 user만 출입 가능) false(로그인한 user는 출입 불가능)
    //adminRoute - admin user만 들어가기 원하는 페이지 

    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log('client/src/hoc/auth.js',response)
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/')
                    }
                } else {
                    if (adminRoute && !response.payload.isAdmin) {
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


