import { createContext, useContext, useReducer, useEffect } from 'react';


const CartContext = createContext(undefined);


const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
};


function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { id, title, price, thumbnail } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(item => item.id === id);

      if (existingItemIndex > -1) {

        const updatedItems = state.cartItems.map((item, idx) => 
          idx === existingItemIndex 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, cartItems: updatedItems };
      } else {
        // Add new item with quantity 1
        const newItem = { id, title, price, thumbnail, quantity: 1 };
        return { ...state, cartItems: [...state.cartItems, newItem] };
      }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const id = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== id)
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {

        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.id !== id)
        };
      }
      
      const updatedItems = state.cartItems.map(item => 
        item.id === id ? { ...item, quantity: quantity } : item
      );
      return { ...state, cartItems: updatedItems };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return { ...state, cartItems: [] };
    }

    default:
      return state;
  }
}


const initCartState = () => {
  try {
    const localData = localStorage.getItem('shopzone_cart');
    return localData ? { cartItems: JSON.parse(localData) } : { cartItems: [] };
  } catch (error) {
    console.error('Failed to parse cart items from localStorage:', error);
    return { cartItems: [] };
  }
};


export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { cartItems: [] }, initCartState);


  useEffect(() => {
    localStorage.setItem('shopzone_cart', JSON.stringify(state.cartItems));
  }, [state.cartItems]);


  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };


  const totalItems = state.cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const value = {
    cartItems: state.cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}


export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
