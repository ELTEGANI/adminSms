import axios from 'axios'


export function loginUser(credentials,history) {
  return async (dispatch) => {
    try {
      const res = await axios.post('https://ssmss1.com/api/companies/logincompany',credentials);
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


  export function getInboxList(companyPhone){
    console.log(companyPhone);

  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization':'JWT ' +localStorage.getItem('accesstoken')

        }
    };
  const request = axios.post(`https://ssmss1.com/api/companies/getallmessages`,companyPhone,axiosConfig)
  .then(response => response.data);
  return {
  type:'INBOX',
  payload:request
}
}


export function getStatistics(companyPhone){
let axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization':'JWT ' +localStorage.getItem('accesstoken')
      }
  };
const request = axios.post(`https://ssmss1.com/api/companies/statistic`,companyPhone,axiosConfig)
.then(response => response.data);
return {
type:'STATISTIC',
payload:request
}
}


export function getMenu(companyPhone){
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization':'JWT ' +localStorage.getItem('accesstoken')
        }
    };
  const request = axios.post(`https://ssmss1.com/api/companies/getmenus`,companyPhone,axiosConfig)
  .then(response => response.data);
  return {
  type:'menu',
  payload:request
  }
  }