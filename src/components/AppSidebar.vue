<template>
  <div style="height: 100%">
    <div class="sidebar">
      <div class="list">
        <router-link
          :to="item.path"
          tag="div"
          class="list__item"
          v-for="item in pages"
          :key="item.path"
        >
          <component class="list__item__icon" :is="`icon-${item.icon}`" />
          <div class="list__item__title">
            {{ item.title }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  background: #f5f6f7;
}
.list {
  margin: 4rem 1.5rem;
}
.list__item {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  user-select: none;
  cursor: pointer;
  display: flex;
}
.list__item__title {
  margin: 0 0.5rem;
  font-weight: 400;
  font-size: 0.9rem;
  letter-spacing: 0.01em;
  color: rgba(0, 0, 0, 0.7);
}
.list__item__icon {
  width: 1rem;
  height: 1rem;
  opacity: 0.65;
}
.router-link-exact-active {
  color: rgba(0, 0, 0, 0.9);
  background: rgba(0, 0, 0, 0.03);
  cursor: auto;
}
@media screen and (max-width: 600px) {
  .sidebar {
    height: 100%;
  }
  .list {
    margin: initial;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-around;
    align-items: stretch;
  }
  .list__item {
    border-radius: initial;
    margin: initial;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .list__item__title {
    font-size: 0.5rem;
  }
  .list__item__icon {
    width: 1.25rem;
    height: 1.25rem;
    padding: 0.25rem;
  }
}
</style>

<script>
import IconPortfolio from "@/components/IconPortfolio.vue";
import IconValidators from "@/components/IconValidators.vue";
import IconTransactions from "@/components/IconTransactions.vue";

export default {
  components: {
    IconPortfolio,
    IconValidators,
    IconTransactions,
  },
  data() {
    return {
      pages: [
        {
          title: "Portfolio",
          path: "/portfolio",
          icon: "portfolio",
        },
        {
          title: "Validators",
          path: "/validators",
          icon: "validators",
        },
        {
          title: "Transactions",
          path: "/transactions",
          icon: "transactions",
        },
      ],
    };
  },
};
</script>
