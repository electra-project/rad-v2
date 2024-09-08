import { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import "../styles/CartStyles.css"; // Assuming you have custom styles here

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price; // Assuming each item has a price
      });
      return total.toLocaleString("en-LK", {
        style: "currency",
        currency: "LKR",
      });
    } catch (error) {
      console.log(error);
      return "LKR 0.00";
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      // Find index of the item to be removed
      const itemIndex = cart.findIndex((item) => item._id === pid);
      if (itemIndex !== -1) {
        let updatedCart = [...cart];
        updatedCart.splice(itemIndex, 1);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get Braintree payment token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-[#1A1A1A] text-white min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-bold text-center mb-4">Cart Page</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Section */}
            <div className="lg:w-2/3">
              <div className="bg-[#161616] rounded-lg p-6">
                {cart?.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center py-4 border-t border-gray-700"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p>{item.description.substring(0, 30)}</p>
                      <p className="text-[electra-red]">
                        Price:{" "}
                        {item.price.toLocaleString("en-LK", {
                          style: "currency",
                          currency: "LKR",
                        })}
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => removeCartItem(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary Section */}
            <div className="lg:w-1/3">
              <div className="bg-[#161616] rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">CART SUMMARY</h2>
                <div className="flex justify-between mb-2">
                  <span>Total</span>
                  <span className="text-[electra-red]">{totalPrice()}</span>
                </div>
                {auth?.user?.address ? (
                  <div className="mb-3">
                    <h4 className="font-semibold">Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="bg-yellow-500 text-white py-2 px-4 rounded mt-2"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                ) : (
                  <div className="mb-3">
                    {auth?.token ? (
                      <button
                        className="bg-yellow-500 text-white py-2 px-4 rounded"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        className="bg-yellow-500 text-white py-2 px-4 rounded"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                      >
                        Please Login to Checkout
                      </button>
                    )}
                  </div>
                )}
                <div className="mt-2">
                  {!clientToken || !auth?.token || !cart?.length ? (
                    ""
                  ) : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                      <button
                        className="bg-blue-600 text-white py-2 px-4 rounded mt-4"
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing..." : "PROCEED TO CHECKOUT"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
