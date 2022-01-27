export const isLoggedin = () => {
  let token = localStorage.getItem("token");
  return token !== null && token !== undefined;
}

export const isAdminUser = () => {
  let role = localStorage.getItem("role");
  return role === "admin";
}

export const requestToServer = async (url, reqObj, addToken = true)=> {
  let token = localStorage.getItem("token");
  if (addToken) {
    reqObj = reqObj ? reqObj : {}
    reqObj["headers"] = reqObj["headers"] ? {...reqObj["headers"], token} : { token };
  }
  return await fetch(url, reqObj)
    .then(res=> {
      if (!res.ok) {
        // Any possible failure is likely possible of authentication failure.
        localStorage.clear();
        if (res.status === 401) {
          alert("Invalid Credentials!")
        }
        window.location.href = "/";
        return null;
      }
      return res.json()
    }).catch(err=>console.error(err));
}
