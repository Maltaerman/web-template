import { ref } from 'vue';

const isSideMenuOpen = ref(false);

export function useSideMenu() {
  function openSideMenu() {
    isSideMenuOpen.value = true;
  }

  function closeSideMenu() {
    isSideMenuOpen.value = false;
  }

  function toggleSideMenu() {
    if (isSideMenuOpen.value) closeSideMenu();
    else openSideMenu();
  }

  return {
    isSideMenuOpen,
    openSideMenu,
    closeSideMenu,
    toggleSideMenu,
  };
}
