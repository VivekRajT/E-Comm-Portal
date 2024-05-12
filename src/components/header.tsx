import { Link } from "react-router-dom";
import logo from '../assets/images/logo.png';
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  return (
    // <nav classNameName="header">
    //   <Link onClick={() => setIsOpen(false)} to={"/"}>
    //     HOME
    //   </Link>
    //   <Link onClick={() => setIsOpen(false)} to={"/search"}>
    //     <FaSearch />
    //   </Link>
    //   <Link onClick={() => setIsOpen(false)} to={"/cart"}>
    //     <FaShoppingBag />
    //   </Link>

    //   {user?._id ? (
    //     <>
    //       <button onClick={() => setIsOpen((prev) => !prev)}>
    //         <FaUser />
    //       </button>
    //       <dialog open={isOpen}>
    //         <div>
    //           {user.role === "admin" && (
    //             <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
    //               Admin
    //             </Link>
    //           )}

    //           <Link onClick={() => setIsOpen(false)} to="/orders">
    //             Orders
    //           </Link>
    //           <button onClick={logoutHandler}>
    //             <FaSignOutAlt />
    //           </button>
    //         </div>
    //       </dialog>
    //     </>
    //   ) : (
    //     <Link to={"/login"}>
    //       <FaSignInAlt />
    //     </Link>
    //   )}
    // </nav>

    <nav className="navbar header navbar-expand-lg navbar-primary bg-light">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="navbar-brand">
            <Link to={"/"}>
              {" "}
              {/* Add Link component here */}
              <img src={logo} alt="Logo" style={{ height: "40px" }} />
            </Link>
          </div>

          <div className="d-flex justify-content-center flex-grow-1">
            <form className="form-inline">
              <div className="d-flex">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Enter your search query here..."
                  aria-label="Search"
                  style={{ width: "calc(1.5 * 100%)" }}
                />

                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  <Link
                    onClick={() => setIsOpen(false)}
                    to={"/search"}
                    className="nav-link"
                  >
                    <FaSearch />
                  </Link>
                </button>
              </div>
            </form>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="d-flex">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link
                  onClick={() => setIsOpen(false)}
                  to={"/"}
                  className="nav-link"
                >
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={() => setIsOpen(false)}
                  to={"/cart"}
                  className="nav-link"
                >
                  <FaShoppingBag />
                </Link>
              </li>
              <li className="nav-item">
                {user?._id ? (
                  <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="nav-link"
                  >
                    <FaUser />
                  </button>
                ) : (
                  <Link to={"/login"} className="nav-link">
                    <FaSignInAlt />
                  </Link>
                )}
              </li>
              <li className="nav-item">
                <Link
                  onClick={() => setIsOpen(false)}
                  to={"/orders"}
                  className="nav-link"
                >
                  Orders
                </Link>
              </li>
              {user?.role === "admin" && (
                <li className="nav-item">
                  <Link
                    onClick={() => setIsOpen(false)}
                    to="/admin/dashboard"
                    className="nav-link"
                  >
                    Admin
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <button onClick={logoutHandler} className="nav-link">
                  <FaSignOutAlt />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
