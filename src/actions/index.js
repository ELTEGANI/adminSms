import axios from 'axios'


export function loginUser(credentials,history) {
  return async (dispatch) => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/auth',credentials);
      dispatch({ type: 'USER_LOGIN'});
      localStorage.setItem('access_token',res.data.access_token);
      localStorage.setItem('username',credentials.username);
      history.push('/DashBoard');
    } catch(error) {
      dispatch({
        type: 'USER_LOGIN_FAIL',
        payload: 'Invalid email or password'
      });   
    }   
  };
}


  export function getInboxList(companyphone){
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization':'JWT ' +localStorage.getItem('access_token')

        }
    };

  const request = axios.post(`http://127.0.0.1:5000/companyInbox`,companyphone,axiosConfig)
  .then(response => response.data);
  return {
  type:'INBOX',
  payload:request
}
}