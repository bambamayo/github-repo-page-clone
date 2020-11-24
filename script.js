let user_fullname = document.querySelector(".user-details__name");
let user_username = document.querySelector(".user-details__username");
let user_bio = document.querySelector(".user-details__info");
let profile_image = document.querySelector(".profile_image");
let profile_picture = document.querySelector(".profile-picture");
let public_count = document.querySelector(".public-count");
let repo_count = document.querySelector(".tab-nav__count");
let repo_list = document.querySelector(".user-repos-list");
let tab_nav = document.querySelector(".tab-nav__container");
let tab_nav_user = document.querySelector(".tab-nav__user");
let tab_nav_image = document.querySelector(".tab-nav__user-image");
let tab_nav_username = document.querySelector(".tab-nav__user-uname");
let tab_user = document.querySelector(".tab-nav__user-image");
let tab_nav_offSet = tab_nav.offsetTop;

function setRepoUpdateTime(isostring) {
  let date = new Date(isostring);
  let dateToDateStringArr = date.toDateString().split(" ");

  return `${dateToDateStringArr[1]} ${dateToDateStringArr[2]}`;
}

function getUserData() {
  const FETCH_USER = {
    query: `{
      user(login: "bambamayo") {
        avatarUrl
        name
        bio
        login
        repositories(privacy: PUBLIC, first: 20, orderBy: {field: CREATED_AT, direction: DESC}) {
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
          totalCount
        }
      }
      viewer {
        repositories{
          totalCount
        }
      }
    }
    `,
  };

  let body = JSON.stringify(FETCH_USER);

  fetch("https://api.github.com/graphql", {
    method: "post",
    headers: {
      Authorization: `Bearer `,
    },
    body: body,
  })
    .then((res) => res.json())
    .then((data) => {
      repo_count.textContent = data.data.viewer.repositories.totalCount;
      user_fullname.textContent = data.data.user.name;
      user_username.textContent = data.data.user.login;
      tab_nav_username.textContent = data.data.user.login;
      user_bio.textContent = data.data.user.bio;
      public_count.textContent = data.data.user.repositories.totalCount;
      tab_nav_image.src = data.data.user.avatarUrl;
      tab_nav_image.alt = `${data.data.user.name} avatar`;
      profile_image.src = data.data.user.avatarUrl;
      profile_image.alt = `${data.data.user.name} avatar`;
      profile_picture.src = data.data.user.avatarUrl;
      profile_picture.alt = `${data.data.user.name} avatar`;
      profile_image.style.visibility = "visible";
      profile_picture.style.visibility = "visible";

      let repoItems = data.data.user.repositories.edges
        .map(
          (repo) =>
            ` <li class="user-repos-item">
          <div class="user-repos-item-l">
            <div class="user-repos-item-l-t">
              <h3 class="repo-name">
                <a class="repo-name-link" href="#">${repo.node.name}</a>
              </h3>
            </div>
            ${
              repo.node.description
                ? `<div class="user-repos-l-m">
                  <p class="repo-desc">${repo.node.description}</p>
                </div>`
                : ""
            }
            <div class="user-repos-item-l-b">
              <span class="lang">
                <span class="lang-color" style="background-color: ${
                  repo.node.languages.edges[0].node.color
                }"></span>
                <span class="lang-text">${
                  repo.node.languages.edges[0].node.name
                }</span>
              </span>
              ${
                repo.node.stargazerCount
                  ? `<span class="stars">
                    <a href="#" class="icon-link">
                      <svg
                        aria-label="star"
                        class="icon"
                        viewBox="0 0 16 16"
                        version="1.1"
                        width="16"
                        height="16"
                        role="img"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                        ></path>
                      </svg>
                      ${repo.node.stargazerCount}
                    </a>
                  </span>`
                  : ""
              }
              ${
                repo.node.forkCount
                  ? `<span class="forks">
                    <a href="#" class="icon-link">
                      <svg
                        aria-label="fork"
                        class="icon"
                        height="16"
                        viewBox="0 0 16 16"
                        version="1.1"
                        width="16"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        ></path>
                      </svg>
                      ${repo.node.forkCount}
                    </a>
                  </span>`
                  : ""
              }
              <span class="updated">
                <span>Updated on</span> <span>${setRepoUpdateTime(
                  repo.node.updatedAt
                )}</span>
              </span>
            </div>
          </div>
          <div class="user-repos-item-r">
            <button class="star-btn">
              <svg
                class="icon"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                ></path>
              </svg>
              Star
            </button>
          </div>
        </li> `
        )
        .join(" ");

      repo_list.innerHTML = repoItems;
    });
}

getUserData();

//Code for sticky Navigation
function stickyNavigation() {
  if (window.scrollY > tab_nav_offSet) {
    tab_nav.classList.add("fixed");

    if (window.scrollY > 361) {
      tab_nav_user.style.opacity = "1";
    } else {
      tab_nav_user.style.opacity = "0";
    }
  } else {
    tab_nav.classList.remove("fixed");
  }
}

window.addEventListener("scroll", stickyNavigation);
