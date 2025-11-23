import { computed, type Ref } from 'vue';
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router';


export function useLink(propsData: Ref<any>) {
  const route = useRoute();

  const to = computed(() => propsData.value.to ?? null);
  const isForceActive = computed(() => propsData.value.isForceActive ?? false);
  const isExact = computed(() => propsData.value.isExact ?? false);

  const useTagPropsData = computed(() => ({
    to: to.value,
    target: propsData.value.target ?? '_blank',
    rel: propsData.value.rel ?? 'noopener nofollow',
    isDisabled: propsData.value.isDisabled ?? false,
    isLoading: propsData.value.isLoading ?? false,
    type: propsData.value.type ?? 'button',
  }));

  // const { tagProps, isExternalLink, tag } = useTag(useTagPropsData);

  const isActive = computed(() => {
    // if (isForceActive.value) return true;

    // if (isExternalLink.value) return false;

    // if (!to.value || typeof to.value === 'string') return false;

    // if (isExact.value) {
    //   const isRouteNameEqual = to.value.name === route.name;

    //   if (to.value.params) {
    //     const routeParams = route.params;
    //     const toParams = to.value.params;

    //     return (
    //       isRouteNameEqual &&
    //       Object.keys(toParams).every(
    //         (key) => routeParams[key] === toParams[key]
    //       )
    //     );
    //   }

    //   if (to.value.query) {
    //     const routeQuery = route.query;
    //     const toQuery = to.value.query;

    //     return (
    //       isRouteNameEqual &&
    //       Object.keys(toQuery).every((key) => routeQuery[key] === toQuery[key])
    //     );
    //   }

    //   return isRouteNameEqual;
    // }

    // return route.matched.some(
    //   ({ name }) => name === (to.value as RouteLocationNormalizedLoaded).name
    // );

    return false;
  });

  return {
    isActive,
    // tag,
    // tagProps,
  };
}
