<template>
  <div class="sidebar-wrapper">
    <div class="sidebar-item">
      <img
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
        alt="profile pic"
        class="profile-pic"
      />
    </div>
    <div class="sidebar-item">
      <router-link :key="index" v-for="(item, index) in topItems" :to="item.to">
        <div uk-drop="pos: right">fdsfds</div>
        <i :class="item.icon"></i>
      </router-link>
    </div>

    <div class="sidebar-item">
      <router-link
        :key="index"
        v-for="(item, index) in bottomItems"
        :to="item.to"
        uk-tooltip="title: Hello World; pos: right"
      >
        <i :class="item.icon"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      topItems: [
        { to: "/home", icon: "fad fa-home" },
        { to: "/posts", icon: "fad fa-blog" },
        { to: "/1", icon: "fad fa-file" },
        { to: "/2", icon: "fad fa-table" },
        { to: "/3", icon: "fad fa-cubes" },
        { to: "/media", icon: "fad fa-photo-video" },
        { to: "/users", icon: "fad fa-users" },
      ],
      bottomItems: [
        { to: "/6", icon: "fa fa-question" },
        { to: "/7", icon: "fa fa-book-alt" },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.sidebar-wrapper {
  width: 52px;
  height: 100vh;
  background: #121a3e;
  top: 0;
  left: 0;
  position: sticky;
  z-index: 900;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 48px;
  padding-bottom: 48px;
  box-sizing: border-box;
}
.sidebar-item {
  display: flex;
  flex-direction: column;
  gap: 30px;
  color: #9ca0a8;
  i {
    font-size: 18px;
  }
  a:hover {
    color: gold;
  }
  a {
    transition: color 0.5s ease;
    color: inherit;
    text-align: center;
  }
}
.profile-pic {
  border-radius: 100%;
  object-fit: cover;
  width: 20px;
  height: 20px;
}

.router-link-active {
  color: gold !important;
}
</style>
