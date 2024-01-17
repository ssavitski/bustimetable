<template>
  <div class="py-4 container h-100 d-flex flex-column">
    <h1>Timetable</h1>
    <div class="card my-3">
      <ul class="nav nav-underline">
        <li class="nav-item">
          <RouterLink class="nav-link py-4" active-class="active" to="/">Bus Lines</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link py-4" active-class="active" to="/stops">Stops</RouterLink>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<style scoped lang="scss">
.nav-underline {
  .nav-link {
    color: #9A9DA4;

    &.active {
      color: inherit;
      border-bottom: 2px solid #1952E1;
      border-radius: 2px;
    }
  }
}
</style>
