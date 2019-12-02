import axios from 'axios'


export function loginUser(credentials,history) {
  return async (dispatch) => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/companies/logincompany',credentials);
      console.log(res);
      dispatch({ type: 'USER_LOGIN'});
      localStorage.setItem('accesstoken',res.data.accesstoken);
      localStorage.setItem('companyPhone',res.data.companyPhone);
      localStorage.setItem('companyName',res.data.companyName);
      localStorage.setItem('ownerName',res.data.ownerName);
      localStorage.setItem('ownerPhone',res.data.ownerPhone);
      localStorage.setItem('ownerEmail',res.data.ownerEmail);
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