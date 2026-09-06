
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const {
    backendUrl,
    token,
    currency,
    navigate,
    products,
  } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);



  const loadOrderData = async () => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        {
          headers: {
            token,
          },
        }
      );

      console.log("USER ORDERS RESPONSE:", response.data);

      if (response.data.success) {
        let allOrdersItem = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {            
            const productInfo = products?.find(
              (product) => product._id === item.productId
            );

            allOrdersItem.push({
              ...item,              
              image: productInfo?.image || [],              
              orderId: order._id,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              amount: order.amount,
            });
          });
        });
        
        setOrderData(allOrdersItem.reverse());
      } else {
        console.log(
          "Orders error:",
          response.data.message
        );
      }
    } catch (error) {
      console.log("LOAD ORDERS ERROR:", error);

      console.log(
        "SERVER MESSAGE:",
        error.response?.data?.message
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (products && products.length > 0) {
      loadOrderData();
    }
  }, [token, products]);



  if (!token) {
    return (
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>

        <div className="py-20 text-center">
          <p className="text-gray-500 mb-5">
            Please login to see your orders.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="bg-black text-white px-8 py-3 text-sm"
          >
            LOGIN
          </button>
        </div>
      </div>
    );
  }



  if (loading) {
    return (
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1={"MY"} text2={"ORDERS"} />
        </div>

        <div className="py-20 text-center">
          <p className="text-gray-500">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-16">

 

      <div className="text-2xl">
        <Title
          text1={"MY"}
          text2={"ORDERS"}
        />
      </div>

    

      {orderData.length === 0 ? (

        <div className="py-20 text-center">

          <p className="text-gray-500 mb-5">
            No orders found.
          </p>

          <button
            onClick={() => navigate("/collection")}
            className="bg-black text-white px-8 py-3 text-sm"
          >
            START SHOPPING
          </button>

        </div>

      ) : (

        <div className="mt-8">

          {orderData.map((item, index) => (

            <div
              key={`${item.orderId}-${item.productId}-${index}`}
              className="py-6 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >

          
             

              <div className="flex items-start gap-6 text-sm">

              

                <div className="w-16 h-20 sm:w-20 sm:h-24 flex-shrink-0 overflow-hidden">

                  {item.image?.length > 0 ? (

                    <img
                      src={item.image[0]}
                      className="w-full h-full object-cover"
                      alt={item.name}
                    />

                  ) : (

                    <div className="w-full h-full border flex items-center justify-center bg-gray-50">
                      <span className="text-xs text-gray-400">
                        No Image
                      </span>
                    </div>

                  )}

                </div>


                <div>

                  <p className="sm:text-base font-medium text-gray-800">
                    {item.name}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-base text-gray-700">

                    <p>
                      {currency}
                      {item.price}
                    </p>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                    {item.size && (
                      <p>
                        Size: {item.size}
                      </p>
                    )}

                  </div>


                  <p className="mt-2">
                    Date:{" "}
                    <span className="text-gray-400">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>

                

                  <p className="mt-1">
                    Payment:{" "}
                    <span className="text-gray-400">
                      {item.paymentMethod}
                    </span>
                  </p>

                

                  <p className="mt-1">
                    Payment Status:{" "}
                    <span
                      className={
                        item.payment
                          ? "text-green-500"
                          : "text-orange-500"
                      }
                    >
                      {item.payment
                        ? "Paid"
                        : "Pending"}
                    </span>
                  </p>

                </div>
              </div>

          

              <div className="md:w-1/2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            

                <div className="flex items-center gap-2">

                  <p
                    className={`min-w-2 h-2 rounded-full ${
                      item.status === "Delivered"
                        ? "bg-green-500"
                        : item.status === "Cancelled"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  ></p>

                  <p className="text-sm md:text-base">
                    {item.status}
                  </p>

                </div>

            

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default Orders;
