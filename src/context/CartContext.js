import React, { useState } from "react";
const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ cartItems: [] });

  const addItem = (item, quantity) => {
    const index = cart.cartItems.findIndex((i) => i.id === item.id); 
    if (index !== -1) {

      const newCartItems = [...cart.cartItems];
      newCartItems[index].quantity += quantity;
      setCart({ ...cart, cartItems: newCartItems });
    } else {
      const newCartItems = [
  
        ...cart.cartItems,
        {
          id: item.id,
          title: item.title,
          price: item.price,
          thumbnail: item.thumbnail,
          quantity: quantity,
        },
      ];
      setCart({ ...cart, cartItems: newCartItems });
    }
  };

  const removeItem = (itemID) => { 
    const newCartItems = cart.cartItems.filter((item) => item.id !== itemID);
    setCart({ ...cart, cartItems: newCartItems });
  };

  const clear = () => { 
    setCart({ cartItems: [] });
  };

  const getTotalQuantity = () => { 
    let total = 0;
    cart.cartItems.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  const getTotalPrice = () => {
    const totalPrice = cart.cartItems.reduce((total, item) => { 
      return total + (item.price * item.quantity);
    }, 0);
    return totalPrice;
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clear, getTotalQuantity, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
