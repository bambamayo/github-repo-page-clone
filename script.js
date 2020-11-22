const user = {
  query: `{
    user(login: "bambamayo") {
      avatarUrl
      name
      bio
      login
      repositories(first: 20) {
        edges {
          node {
            description
            forkCount
            name
            stargazerCount
            updatedAt
            languages(first: 1) {
              edges {
                node {
                  color
                  name
                }
              }
            }
          }
        }
      }
    }
  }
  `,
};

let body = JSON.stringify(user);
fetch("https://developer.github.com/v4/explorer/", {
  method: "post",
  mode: "no-cors",
  headers: {
    "Content-Type": "application/json",
  },
  body: body,
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
