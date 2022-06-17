<template>
  <div class="flex">
    <div class="w-1/2 pt-5 pb-16 pl-8 pr-32 flex flex-col gap-5">
      <div>
        <div class="text-primary-200 mb-2">
          <div class="text-sm font-semibold mb-1">SEO Title</div>
          <div class="text-xs">
            We suggest a
            <span class="text-blue-300">max of 55 chars</span>
          </div>
        </div>
        <div class="flex gap-7">
          <input
            placeholder="Title that will appear in search engines"
            class="flex-grow border-solid border-2 rounded h-10 px-4 focus:outline-none focus:border-primary-100 focus:shadow"
          />
        </div>
      </div>
      <div>
        <div class="text-primary-200 mb-2">
          <div class="text-sm font-semibold mb-1">Meta Description</div>
          <div class="text-xs">
            We suggest a
            <span class="text-blue-300">max of 140 chars</span>
          </div>
        </div>
        <div class="flex gap-7">
          <textarea
            placeholder="Meta Description that will appear in search engines"
            rows="4"
            class="flex-grow border-solid border-2 rounded p-3 focus:outline-none focus:border-primary-100 focus:shadow"
          />
        </div>
      </div>
    </div>
    <div class="w-1/2 pt-5 pb-16 pl-8 pr-32 flex flex-col gap-5">
      <div>
        <div class="text-primary-200 mb-2">
          <div class="text-sm font-semibold">Search Engine Preview:</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SEO",
};
</script>

<style scoped></style>
