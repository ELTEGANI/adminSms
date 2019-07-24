import axios from 'axios'

  export function getInboxList(companyphone){
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json'
        }
    };

  const request = axios.post(`http://127.0.0.1:5000/companyInbox`,companyphone,axiosConfig)
  .then(response => response.data);
  return {
  type:'INBOX',
  payload:request
}
}