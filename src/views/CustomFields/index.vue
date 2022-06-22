<template>
  <div class="font-sans text-black min-h-screen bg-primary-600 px-32">
    <div class="flex justify-between py-8 items-center">
      <div class="flex items-center">
        <div class="text-primary-400 mr-4">Dynamic Groups</div>
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
      <router-link to="/custom-fields/new">
        <button
          class="rounded px-4 py-2 bg-primary-400 text-gray-100 hover:bg-primary-500 duration-300 text-sm"
        >
          Add New
        </button>
      </router-link>
    </div>
    <div class="mt-5 bg-white shadow rounded p-5">
      <table class="uk-table uk-table-divider">
        <thead>
          <tr>
            <th class="w-10"></th>
            <th class="w-72">Title</th>
            <th>Description</th>
            <th>Location</th>
            <th>Fields</th>
          </tr>
        </thead>
        <tbody class="text-sm">
          <tr
            class="table-row hover:bg-primary-300 cursor-pointer text-primary-500"
          >
            <td>
              <div class="flex items-center h-10">
                <input type="checkbox" />
              </div>
            </td>
            <td>
              <div class="font-bold">[LR] Event</div>
              <div class="hidden text-xs mt-1 group-actions gap-2 flex">
                <span>
                  <router-link
                    custom
                    to="/custom-fields/edit"
                    class="hover:text-primary-200"
                  >
                    Edit
                  </router-link>
                </span>
                <hr class="m-0 h-3 uk-divider-vertical" />
                <span class="hover:text-primary-200"> Duplicate </span>
                <hr class="m-0 h-3 uk-divider-vertical" />
                <span class="text-red-500 hover:text-red-300">Trash</span>
              </div>
            </td>
            <td>Table Data</td>
            <td>Table Data</td>
            <td>5</td>
          </tr>

          <tr
            class="table-row hover:bg-primary-300 cursor-pointer text-primary-500"
          >
            <td>
              <div class="flex items-center h-10">
                <input type="checkbox" />
              </div>
            </td>
            <td>
              <div class="font-bold">[HR] Heading Home Page</div>
              <div class="hidden text-xs mt-1 group-actions gap-2 flex">
                <span>
                  <router-link
                    custom
                    to="/custom-fields/edit"
                    class="hover:text-primary-200"
                  >
                    Edit
                  </router-link>
                </span>
                <hr class="m-0 h-3 uk-divider-vertical" />
                <span class="hover:text-primary-200"> Duplicate </span>
                <hr class="m-0 h-3 uk-divider-vertical" />
                <span class="text-red-500 hover:text-red-300">Trash</span>
              </div>
            </td>
            <td>Table Data</td>
            <td>Table Data</td>
            <td>5</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
};
</script>

<style scoped>
.table-row:hover .group-actions {
  display: flex;
}
a {
  text-decoration: none;
}
</style>
