export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("comparison");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

export const saveState = (comparison) => {
  try {
    const serializedState = JSON.stringify(comparison);
    localStorage.setItem("comparison", serializedState);
  } catch {
    // ignore write errors
  }
};

// export const getStorage = () => {
//   return JSON.parse(localStorage.getItem('shoppingCard'))
// }
