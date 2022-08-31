export function authHeader() {
    // return authorization header with oauth token
    let auth = JSON.parse(localStorage.getItem("auth"));
  
    // console.log("user", user);
    if (auth && auth.accessToken) {
      return {
        Authorization: "Bearer " + auth.accessToken,
        "Content-Type": "application/json",
      };
    } else {
      return { "Content-Type": "application/json" };
    }
  }
  