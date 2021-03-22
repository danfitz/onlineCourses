import React, { useState, useEffect } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorModal = (WrappedComponent, axios) => {
  return props => {
    const [ errorState, setErrorState ] = useState({ error: null });

    
    const reqInterceptor = axios.interceptors.request.use(request => {
      setErrorState({ error: null });
      return request;
    });
    const resInterceptor = axios.interceptors.response.use(res => res, error => {
      setErrorState({ error: error })
      return Promise.reject(error);
    })

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor)
        axios.interceptors.response.eject(resInterceptor)
      }
    }, [reqInterceptor, resInterceptor]);


    const exitErrorModal = () => {
      setErrorState({ error: null });
    };


    return (
      <Auxiliary>
        <Modal
          show={errorState.error}
          exit={exitErrorModal}
        >
          { errorState.error ? errorState.error.message : null }
        </Modal>
        <WrappedComponent {...props} />
      </Auxiliary>
    );
  };
};

export default withErrorModal;