export const isAuthenticatedUser = async () => {
  let isAuthenticated = false;
  isAuthenticated = await requestToServer("/auth/isAuthenticated", { method: 'POST'})
    .then(res => res ? true : false)
    .catch(err => console.log(err))
  return isAuthenticated;
}

export const isAdminUser = async () => {
  let isAdmin = false;
  isAdmin = await requestToServer("/auth/isAdminUser", { method: 'POST' })
    .then(res => res ? true : false)
    .catch(err => console.log(err))
  return isAdmin;
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
