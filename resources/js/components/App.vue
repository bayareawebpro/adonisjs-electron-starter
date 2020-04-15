<script>
  export default {
    name: "App",
  }
</script>
<template>
  <div id="wrapper">
    <header id="header">
      <a class="brand" href="/">
        <span>PHP</span><em>Provisioner</em>
      </a>
      <ul class="flex flex-grow justify-end pr-4">
        <li class="block relative self-center">
          <button class="btn btn-gray btn-sm">
            Save
          </button>
        </li>
      </ul>
    </header>
    <section id="content" class="bg-gray-900">
      <main id="main">
        <div class="layout-centered text-center py-12">
          <v-command/>
        </div>
      </main>
    </section>
    <footer id="footer">
      <p>© 2020 Dan Alvidrez - All Rights Reserved.</p>
    </footer>
  </div>
</template>
