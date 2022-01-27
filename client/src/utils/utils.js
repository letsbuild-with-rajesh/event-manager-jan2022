export const getAuthDetails = async () => {
  let authDetails = {}
  authDetails = await requestToServer("/apis/getAuthDetails")
    .then(res => res ? res : {})
    .catch(err => console.log(err))
  return authDetails;
}

export const getUserDetails = async () => {
  let userDetails = {};
  userDetails = await requestToServer("/apis/getUserDetails")
    .then(res => res ? res : {})
    .catch(err => console.log(err))
  return userDetails;
}

export const requestToServer = async (url, reqObj, addToken = true)=> {
  let token = localStorage.getItem("token");
  if (addToken && token) {
    reqObj = reqObj ? reqObj : {}
    reqObj["headers"] = reqObj["headers"] ? {...reqObj["headers"], token} : { token };
  }
  return await fetch(url, reqObj)
    .then(res=> {
      if (!res.ok) {
        return null;
      }
      return res.json()
    }).catch(err=>console.error(err));
}
