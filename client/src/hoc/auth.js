/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { auth } from '../../src/redux/_actions/index';
import { useSelector, useDispatch } from "react-redux";

export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            //현재 상태를 알기 위해 Auth Request를 보낸다.
            dispatch(auth()).then(response => {
                //Login한 상태가 아니라면
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/')
                    }
                    //Login한 상태라면
                } else {
                    //Admin 권한이 없는 사람이 Admin Page에 들어가고자 한다면
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    }
                    //Logged in Status, but Try to go into log in page 
                    else {
                        if (option === false) {
                            props.history.push('/')
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


