<template>
  <div class="">
    <div class="">
      <div class="font-sans text-black min-h-screen bg-primary-600 px-10">
        <div class="flex justify-between py-8 items-center">
          <div class="flex items-center">
            <div class="text-primary-400 mr-4">Blog Posts</div>
            <div class="border rounded overflow-hidden flex">
              <input type="text" class="px-4 py-2" placeholder="Search..." />
              <button
                class="flex items-center justify-center px-4 border-l bg-primary-400"
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
          <router-link to="/posts/new">
            <button
              class="rounded px-4 py-2 bg-primary-400 text-gray-100 hover:bg-primary-500 duration-300 text-sm"
            >
              New Post
            </button>
          </router-link>
        </div>
        <!--  -->
        <div class="flex items-center">
          <UnderlineTabs
            v-if="!isDeletePost"
            :data="BlogTabs"
            v-model="currentBlogTab"
            @input="handleTabChange"
          />
          <UnderTabsActions
            v-else
            :isDeletePost="isDeletePost"
            :data="ActionPostTabs"
            v-model="currentActionTab"
            @input="handleTabActionChange"
            :postSelected="postSelected"
          />
          <DropDown title="Author" :options="authors" />
          <DropDown
            title="Categories"
            :options="categories"
          />
          <div class="flex-grow text-right flex justify-end tex-primary-500">
            Export All Posts
          </div>
        </div>

        <div class="mt-5">
          <ListItem
            @click="goToEvent"
            v-for="(post, index) in posts"
            :key="index"
            :title="post.title"
            :createdAt="post.created_at"
            :id="post.id"
            :item="post"
            :title-to="`/posts/edit/${post.id}`"
            postImg="https://source.unsplash.com/random/1280x720"
          />
        </div>
        <!--  -->
      </div>
    </div>
  </div>
</template>
<script>
import UnderlineTabs from "@/components/UnderlineTabs";
import UnderTabsActions from "@/components/UnderTabsActions";
import ListItem from "@/components/ListItem";
import { mapState } from "vuex";
import DropDown from "@/components/DropDown";
export default {
  components: { DropDown, ListItem, UnderlineTabs, UnderTabsActions },
  data() {
    return {
      BlogTabs: [
        {
          title: "All",
          id: "all",
          icon: "fas fa-user-circle",
        },
        {
          title: "Draft",
          id: "draft",
          icon: "fa-solid fa-pen",
        },
        {
          title: "Published",
          id: "published",
          icon: "fa-solid fa-check",
        },
        {
          title: "Scheduled",
          id: "scheduled",
          icon: "fa-solid fa-clock",
        },
      ],
      ActionPostTabs: [
        {
          title: "Publish",
          id: "publish",
          icon: "fa-solid fa-check",
        },
        {
          title: "Schedule",
          id: "schedule",
          icon: "fa-solid fa-clock",
        },
        {
          title: "Delete",
          id: "delete",
          icon: "fa-solid fa-trash",
        },
      ],
      isDeletePost: false,
      currentBlogTab: {},
      postSelected: {},
      currentActionTab: {
        title: "Delete",
        id: "delete",
        icon: "fa-solid fa-trash",
      },
      password: "",
    };
  },
  computed: {
    ...mapState({
      posts: (state) => state.posts.posts,
      loading: (state) => state.posts.loading,
      usersList: (state) => state.users.usersList,
      categories: (state) => state.categories.categoriesList,
    }),
    authors() {
      if (this.usersList.length > 0) {
        return this.usersList.map((el) => {
          return {
            name: `${el.first_name} ${el.last_name}`,
            img: "https://source.unsplash.com/random/1280x720",
          };
        });
      }
      return [{ name: "Empty" }];
    },
  },
  methods: {
    handleTabChange(selectedValue) {
      this.currentBlogTab = selectedValue;
    },
    handleTabActionChange(selectedValue) {
      this.currentActionTab = selectedValue;
    },
    goToEvent(value) {
      if (value) {
        this.isDeletePost = true;
        this.postSelected = value;
      } else {
        this.isDeletePost = false;
      }
      console.log("-----------------value", value);
    },
  },
  mounted() {
    this.$store.dispatch("users/fetchAndSetUsers");
    this.$store.dispatch("posts/fetchAllPosts");
    this.$store.dispatch("posts/fetchAndSetCategories");
  },
};
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
