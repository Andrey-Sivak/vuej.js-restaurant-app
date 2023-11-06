export const generalLocalStorageKey = "restaurant";

export const registerUser = (data) => {
  const { name, password } = data;
  const newUser = {
    id: 1,
    name,
    password,
    cart: [],
  };

  if (!window.localStorage.getItem(generalLocalStorageKey)) {
    window.localStorage.setItem(
      "restaurant",
      JSON.stringify({
        users: [newUser],
        activeUser: newUser,
      })
    );

    return {
      success: true,
      message: "Successfully sign up!",
    };
  }

  const restaurantData = JSON.parse(
    window.localStorage.getItem(generalLocalStorageKey)
  );
  const users = restaurantData.users;

  if (users.find((user) => user.name === name)) {
    return {
      success: false,
      message: "A user with the same name already exists.",
    };
  }

  newUser.id = users.length + 1;
  restaurantData.users.push(newUser);
  restaurantData.activeUser = newUser;
  window.localStorage.setItem(
    generalLocalStorageKey,
    JSON.stringify(restaurantData)
  );

  return {
    success: true,
    message: "Successfully sign up!",
  };
};

export const loginUser = (data) => {
  const { name, password } = data;

  if (!window.localStorage.getItem(generalLocalStorageKey)) {
    return {
      success: false,
      message: "User with this name not found.",
    };
  }

  const restaurantData = JSON.parse(
    window.localStorage.getItem(generalLocalStorageKey)
  );
  const users = restaurantData.users;
  const currentUser = users.find((user) => user.name === name);

  if (!currentUser) {
    return {
      success: false,
      message: "User with this name not found.",
    };
  }

  const isPasswordValid = currentUser.password === password;

  if (!isPasswordValid) {
    return {
      success: false,
      message: "Incorrect password.",
    };
  }

  restaurantData.activeUser = currentUser;
  window.localStorage.setItem(
    generalLocalStorageKey,
    JSON.stringify(restaurantData)
  );

  return {
    success: true,
    message: "You have successfully logged in!",
  };
};

export const userLogout = () => {
  const restaurantData = JSON.parse(
    window.localStorage.getItem(generalLocalStorageKey)
  );
  restaurantData.activeUser = {};

  window.localStorage.setItem(
    generalLocalStorageKey,
    JSON.stringify(restaurantData)
  );
};

export const updateCart = (updatedCart) => {
  const restaurantData = JSON.parse(
    window.localStorage.getItem(generalLocalStorageKey)
  );

  restaurantData.activeUser.cart = updatedCart;

  const currentUser = restaurantData.users.find(
    (user) => user.id === restaurantData.activeUser.id
  );
  currentUser.cart = updatedCart;

  window.localStorage.setItem(
    generalLocalStorageKey,
    JSON.stringify(restaurantData)
  );
};
