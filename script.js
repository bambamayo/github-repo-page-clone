let user_fullname = document.querySelector(".user-details__name");
let user_username = document.querySelector(".user-details__username");
let user_bio = document.querySelector(".user-details__info");
let profile_image = document.querySelector(".profile_image");
let profile_picture = document.querySelector(".profile-picture");

async function getUserData() {
  const FETCH_USER = {
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

  let body = JSON.stringify(FETCH_USER);

  fetch("https://api.github.com/graphql", {
    method: "post",
    headers: {
      Authorization: `Bearer 070e99cb24711e634431c8d2c20443ba459730cb`,
    },
    body: body,
  })
    .then((res) => res.json())
    .then((data) => {
      user_fullname.textContent = data.data.user.name;
      user_username.textContent = data.data.user.login;
      user_bio.textContent = data.data.user.bio;
      profile_image.src = data.data.user.avatarUrl;
      profile_image.alt = `${data.data.user.name} avatar`;
      profile_picture.src = data.data.user.avatarUrl;
      profile_picture.alt = `${data.data.user.name} avatar`;
      profile_image.style.visibility = "visible";
      profile_picture.style.visibility = "visible";

      console.log(data);
    });
}

getUserData();
