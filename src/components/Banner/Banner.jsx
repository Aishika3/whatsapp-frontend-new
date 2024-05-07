/*import React from "react";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useThemeContext } from "providers";
import AutomatiksLogo from "assets/automatiks.jpeg";

export const Banner = () => {
  const cookies = new Cookies();
  const token = cookies.get("userid");
  const { theme } = useThemeContext();
  return (
    <section
      className="flex flex-row p-lg shadow-xl rounded-full md:w-[70%] sm:w-[80%] m-auto backdrop-blur-xl opacity-90"
      style={{ backgroundColor: "#f6f7bc" }}
    >
      <div className="m-auto">
        <Link to="/">
          <img src={AutomatiksLogo} width="60" height="60" alt="automatiks" className="rounded-md"/>
        </Link>
      </div>
      <div className="m-auto">
        {token && (
          <Link
            to="/fillform"
            className="m-base text-lg hover:text-white hover:shadow-lg p-sm transition select-all border-b-0 px-4 hover:border-b-2"
            style={{ color: theme.color.light, borderColor: theme.color.light }}
          >
            My Form
          </Link>
        )}
        {token ? (
          <Link
          to="/signin"
          className="m-base text-lg hover:text-white hover:shadow-lg p-sm transition-all border-b-0 px-1 hover:border-b-2"
          style={{ color: theme.color.light, borderColor: theme.color.light }}
        >
          My Account
        </Link>
        ):
       (
          <Link
            to="/signin"
            className="m-base text-lg hover:text-white hover:shadow-lg p-sm transition-all border-b-0 px-1 hover:border-b-2"
            style={{ color: theme.color.light, borderColor: theme.color.light }}
          >
            Sign In
          </Link>
      )}
        <a
          href="https://automatiks.in/"
          target="_blank"
          rel="noreferrer"
          className="m-base text-lg hover:text-white hover:shadow-lg p-sm transition-all border-b-0 px-1 hover:border-b-2"
          style={{ color: theme.color.light, borderColor: theme.color.light }}
        >
          About Us
        </a>
      </div>
    </section>
  );
};

export default Banner;
*/
import React from "react";
import { Cookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useThemeContext } from "providers";
import AutomatiksLogo from "assets/automatiks.jpeg";

export const Banner = () => {
  const cookies = new Cookies();
  const token = cookies.get("userid");
  const { theme } = useThemeContext();
  return (
    <section
      className="flex flex-col md:flex-row p-lg shadow-xl rounded-full md:w-[70%] sm:w-[80%] m-auto backdrop-blur-xl opacity-90"
      style={{ backgroundColor: "#f6f7bc" }}
    >
      <div className="m-auto">
        <Link to="/">
          <img src={AutomatiksLogo} width="60" height="60" alt="automatiks" className="rounded-md" />
        </Link>
      </div>
      <div className="m-auto flex flex-col md:flex-row md:gap-4">
        {token && (
          <Link
            to="/fillform"
            className="m-base text-lg hover:text-white hover:shadow-lg p-sm transition select-all border-b-0 px-4 hover:border-b-2"
            style={{ color: theme.color.light, borderColor: theme.color.light }}
          >
            My Form
          </Link>
        )}
        {token ? (
          <Link
            to="/signin"
            className="m-base text-lg hover:text-white hover:shadow-lg p-sm transition-all border-b-0 px-1 hover:border-b-2"
            style={{ color: theme.color.light, borderColor: theme.color.light }}
          >
            My Account
          </Link>
        ) : (
          <Link
            to="/signin"
            className="m-base text-lg hover:text-white hover:shadow-lg p-sm transition-all border-b-0 px-1 hover:border-b-2"
            style={{ color: theme.color.light, borderColor: theme.color.light }}
          >
            Sign In
          </Link>
        )}
        <a
          href="https://automatiks.in/"
          target="_blank"
          rel="noreferrer"
          className="m-base text-lg hover:text-white hover:shadow-lg p-sm transition-all border-b-0 px-1 hover:border-b-2"
          style={{ color: theme.color.light, borderColor: theme.color.light }}
        >
          About Us
        </a>
      </div>
    </section>
  );
};

export default Banner;
