import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/Loader";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CartsItem } from "../types/types";
import { Carousel } from "react-bootstrap";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartsItem) => {
    if (cartItem.stock < 1) {
      toast.error("Out of Stock");
      return;
    }
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  if (isError) toast.error("Cannot Fetch the Products");

  return (
    <div className="home container-fluid">
      <section>
        <Carousel interval={2700} pause={false}>
          <Carousel.Item >
            <img
              className="d-block w-100"
              src="https://media.istockphoto.com/id/530494299/photo/brand-new-interior-of-cloth-store.jpg?s=2048x2048&w=is&k=20&c=YKEpflG2cUxWoOw1JNbyA1uPjnqIGBef512UOMDr8io="
              alt="First slide"
    style={{ height: "18.75rem", objectFit: "cover" }}

            />
          </Carousel.Item>
          <Carousel.Item >
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Second slide"
    style={{ height: "18.75rem", objectFit: "cover" }}

            />
          </Carousel.Item>
          <Carousel.Item >
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Third slide"
    style={{ height: "18.75rem", objectFit: "cover" }}

            />
          </Carousel.Item>
        </Carousel>
      </section>

      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>
      

      <main className="product-container">
        {isLoading ? (
          <Skeleton width="80vw" />
        ) : (
          data?.products.map((product) => (
            <ProductCard
              key={product._id}
              productId={product._id}
              name={product.name}
              price={product.price}
              stock={product.stock}
              handler={addToCartHandler}
              photo={product.photo}
            />
          ))
        )}
      </main>
      <section className="about-section">
        <h2>About Us</h2>
        <p>
          Insert your about content here. You can provide information about your store, your mission, your team, or anything relevant.
        </p>
      </section>

    </div>
  );
};

export default Home;
