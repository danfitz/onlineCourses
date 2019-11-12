import React, { useState, useEffect } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorModal = (WrappedComponent, axios) => {
  return props => {
    const [ errorState, setErrorState ] = useState({ error: null });

    useEffect(() => {
      axios.interceptors.request.use(request => {
        setErrorState({ error: null });
        return request;
      });
      axios.interceptors.response.use(res => res, error => {
        setErrorState({ error: error })
        return Promise.reject(error);
      })
    }, []);

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
        <WrappedComponent />
      </Auxiliary>
    );
  };
};

export default withErrorModal;