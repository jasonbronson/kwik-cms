<template>
  <div class="">
    <div class="">
      <div class="font-sans text-black min-h-screen bg-primary-600">
        <div class="flex justify-between py-8 items-center px-4">
          <div class="flex items-center">
            <div class="text-primary-300 mr-4">Blog Posts</div>
            <div class="border rounded overflow-hidden flex">
              <input type="text" class="px-4 py-2" placeholder="Search..." />
              <button
                class="flex items-center justify-center px-4 border-l bg-gray-600"
              >
                <svg
                  class="h-4 w-4 text-white"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <button
            class="rounded px-4 py-2 bg-gray-600 text-gray-100 hover:bg-gray-700 duration-300 text-sm"
          >
            New Post
          </button>
        </div>
        <div class="items-center justify-between flex text-sm px-4">
          <div class="flex items-center">
            <div class="bg-white px-4 border-solid border-2 rounded mr-2">
              <ul
                class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400"
              >
                <li class="mr-2">
                  <a
                    href="#"
                    class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                  >
                    <svg
                      class="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    All
                  </a>
                </li>
                <li class="mr-2">
                  <a
                    href="#"
                    class="inline-flex p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500 group"
                    aria-current="page"
                  >
                    <svg
                      class="mr-2 w-5 h-5 text-blue-600 dark:text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      ></path>
                    </svg>
                    Draft
                  </a>
                </li>
                <li class="mr-2">
                  <a
                    href="#"
                    class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                  >
                    <svg
                      class="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
                      ></path>
                    </svg>
                    Published
                  </a>
                </li>
                <li class="mr-2">
                  <a
                    href="#"
                    class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
                  >
                    <svg
                      class="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                      <path
                        fill-rule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Scheduled
                  </a>
                </li>
              </ul>
            </div>
            <div class="mr-2">
              <div class="dropdown inline-block relative">
                <button
                  class="bg-white text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
                >
                  <span class="mr-1">Author</span>
                  <svg
                    class="fill-current h-4 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </button>
                <ul class="dropdown-menu absolute hidden text-gray-700 pt-2">
                  <li class="">
                    <a
                      class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      href="#"
                      >One</a
                    >
                  </li>
                  <li class="">
                    <a
                      class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      href="#"
                      >Two</a
                    >
                  </li>
                  <li class="">
                    <a
                      class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      href="#"
                      >Three is the magic number</a
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div class="dropdown inline-block relative">
                <button
                  class="bg-white text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
                >
                  <span class="mr-1">Categories</span>
                  <svg
                    class="fill-current h-4 w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </button>
                <ul class="dropdown-menu absolute hidden text-gray-700 pt-2">
                  <li class="">
                    <a
                      class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      href="#"
                      >One</a
                    >
                  </li>
                  <li class="">
                    <a
                      class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      href="#"
                      >Two</a
                    >
                  </li>
                  <li class="">
                    <a
                      class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      href="#"
                      >Three is the magic number</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="w-1/6 flex justify-end tex-primary-500">
            Export All Posts
          </div>
        </div>
        <!-- options selected -->
        <div class="px-4">
          <div
            class="w-full flex bg-white mt-8 items-center justify-between py-4 px-4"
          >
            <div class="flex justify-start items-center">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-6 cursor-pointer"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <div class="w-32 mr-6">
                <img
                  class="rounded shadow-md"
                  src="https://source.unsplash.com/random/1280x720"
                  alt=""
                />
              </div>
              <div class="w-12">
                <div
                  class="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-gray-500 text-xl text-white"
                >
                  <img
                    src="http://source.unsplash.com/100x100/?girl"
                    class="rounded-full"
                  />
                </div>
              </div>
              <div class="text-sm ml-6">Example post</div>
            </div>
            <div class="flex justify-end">
              <button
                type="button"
                class="text-emerald-400 bg-green-100 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Jun 15, 2022
              </button>
            </div>
          </div>
        </div>
        <!-- options selected -->
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300&display=swap");

/* Styles */
body {
  background: "#efefed";
  font-family: "Roboto", sans-serif;
  letter-spacing: 1px;
}

.text-red {
  color: "#61b4c6" !important;
}
.text-green {
  color: "#52b173" !important;
}
.text-orange {
  color: "#d0a03b" !important;
}
.text-blue {
  color: "#647373" !important;
}

/* buttons */
.btn-red {
  background: "#61b4c6";
  color: "#efefed";
  font-size: xx-small;
  &:hover,
  &:focus {
    background: darken(#61b4c6, 8%);
    color: white;
  }
}
.btn-grayblue {
  background: lighten(#7f8fa4, 15%);
  color: "#efefed";
  font-size: xx-small;
  &:hover,
  &:focus {
    background: lighten(#7f8fa4, 8%);
    color: white;
  }
}

/* Custom scrollbar */
.main {
  top: 40px;
  height: 40px;
  // width
  ::-webkit-scrollbar {
    width: 5px;
  }
  // Track
  ::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }
  // Handle
  ::-webkit-scrollbar-thumb {
    background: lighten(#354052, 20%);
    border-radius: 10px;
  }
  // Handle on hover
  ::-webkit-scrollbar-thumb:hover {
    background: lighten(#354052, 10%);
  }
}
/* Left Menu */
.left {
  width: 57px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  // background: lighten($black, 35%);
  background: #354052;
  position: fixed;
  transition: all 0.5s;
  &:hover {
    width: 200px;
    ul li.menu-heading {
      opacity: 1;
    }
  }
  ul {
    padding-left: 0;
    li {
      list-style-type: none;
      &.active a {
        background: lighten(#52b173, 10%);
        color: "#efefed";
        &:hover {
          background: lighten(#52b173, 5%);
        }
      }
      a {
        display: flex;
        align-items: center;
        // background: lighten($black, 35%);
        background: "#354052";
        color: "#efefed";
        padding: 15px 10px;
        font-size: 13px;
        width: 200px;
        border-bottom: 1px solid darken(#354052, 5%);
        &:hover {
          // background: $black;
          background: darken(#354052, 5%);
          text-decoration: none;
          i.fa {
            color: lighten(#52b173, 10%);
          }
        }
        &:focus {
          text-decoration: none;
        }
        i.fa {
          width: 50px;
          text-align: center;
          padding-right: 15px;
          transition: all 1s;
        }
      }
    }
    .menu-heading {
      opacity: 0;
      padding: 10px 5px 10px 10px;
      color: darken(yellow, 15%);
      font-size: smaller;
      border-bottom: 1px solid darken(#354052, 5%);
      transition: all 0.5s;
    }
  }
}
/* Right Content */
.right {
  transition: all 0.5s;
  margin-left: 72px;
  /* Overview */
  #overview {
    .header {
      background: "#efefed";
      display: block;
      border: 1px solid lighten(#efefed, 90%);
      padding: 15px 30px;
      margin-left: -15px;
      h4 {
        display: inline-block;
        color: "#354052";
      }
      ul {
        right: 0;
        left: inherit;
        max-width: 350px;
        li {
          display: inline-block;
          padding-left: 20px;
          .btn-group {
            i.fa-user-o,
            i.fa-bell-o {
              color: lighten(#efefed, 70%);
              font-size: 24px;
              cursor: pointer;
              &:nth-child(1):after {
                content: "3";
                background: "#d0a03b";
                color: "#efefed";
                font-size: small;
                padding: 4px 7px;
                border-radius: 50%;
                position: absolute;
                top: -8px;
                left: 10px;
              }
            }
            i.fa-angle-down {
              cursor: pointer;
            }
            .dropdown-menu {
              padding: 0;
              li {
                padding-left: 0;
                display: block;
                border-bottom: 1px solid lighten(black, 90%);
                &:nth-child(1) .alert-card i.fa {
                  color: lighten(#52b173, 10%);
                }
                &:nth-child(2) .alert-card i.fa {
                  color: lighten(purple, 10%);
                }
                &:nth-child(3) .alert-card i.fa {
                  color: "#354052";
                }
                &:last-child {
                  border-bottom: none;
                }
                a {
                  padding-top: 10px;
                  padding-bottom: 10px;
                  &:hover {
                    background: lighten(#354052, 65%);
                  }
                  .alert-card {
                    display: flex;
                    img,
                    i.fa {
                      height: 40px;
                      margin-right: 15px;
                    }
                    p {
                      color: "#354052";
                      margin-bottom: 0;
                      small {
                        color: "#7f8fa4";
                        width: 100%;
                        white-space: pre-line;
                      }
                    }
                  }
                }
              }
            }
          }
          .dropdown-avatar {
            img {
              height: 35px;
            }
            i.fa {
              padding-left: 8px;
            }
          }
        }
      }
    }
    .content {
      padding: 0 30px 15px 15px;
      .row.graph-cards {
        margin-top: 20px;
        .col-sm-4 {
          // &:first-child div{margin-left: -15px;}
          // &:last-child div{margin-right: -15px;}
          div {
            background: "#efefed";
            padding: 15px;
            h4,
            h2 {
              color: "#354052" small {
                color: "#7f8fa4";
                font-size: small;
              }
            }
            h2 {
              line-height: 85%;
            }
            img {
              width: 100%;
              height: 150px;
              object-fit: contain;
            }
          }
          &:last-child {
            img {
              height: 220px;
            }
          }
        }
      }
      .row.project-cards {
        margin-top: 20px;
        .col-sm-3 {
          .card {
            background: "#efefed";
            padding: 0;
            img {
              width: 100%;
            }
            h5 {
              padding: 15px 30px;
              border-bottom: 1px solid lighten(black, 90%);
            }
            .row {
              padding: 0 15px;
              margin-left: 0;
              margin-right: 0;
              .col-sm-6 {
                // margin: 0;
                padding: 15px;
              }
            }
          }
        }
      }
      .row.invoice-task {
        margin-top: 20px;
        .col-sm-6 {
          .invoice,
          .tasks {
            background: "#efefed";
            h5 {
              color: black;
              padding: 15px;
              small {
                a {
                  color: "#7f8fa4";
                  font-size: xs-small;
                  margin-top: 5px;
                  display: block;
                }
              }
            }
            .table {
              tbody {
                tr {
                  td {
                    font-size: small;
                    border-top-color: lighten(black, 90%);
                    padding: 15px;
                  }
                }
              }
            }
          }
          .invoice {
            .table {
              tbody {
                tr {
                  td {
                    &:nth-child(1),
                    &:nth-child(3) {
                      color: "#7f8fa4";
                    }
                    &:nth-child(4) {
                      .btn {
                        font-size: xx-small;
                      }
                    }
                    &:nth-child(1),
                    &:nth-child(2),
                    &:nth-child(3),
                    &:nth-child(5) {
                      padding-top: 20px;
                    }
                    .checkbox {
                      margin: 5px 0 0;
                    }
                  }
                }
              }
            }
          }
          .tasks {
            .table {
              tbody {
                tr {
                  td {
                    .checkbox {
                      margin: 5px 0 0 0;
                      &:hover {
                        label {
                          text-decoration: line-through;
                          color: lighten(black, 60%);
                          input {
                            opacity: 0.5;
                          }
                        }
                      }
                      label {
                        input {
                          margin-top: 2px;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

.left:hover + .right {
  margin-left: 215px;
}
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
