import { RiDiscLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removeAccessToken } from "../../slices/authSlices";

const Header = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  return (
    <header>
      <div className="layout flex justify-between items-center h-full">
        <div>
          <p
            style={{ fontSize: "26pt", display: "flex", alignItems: "center" }}
          >
            m
            <RiDiscLine />
            sic
          </p>
        </div>
        <div>
          {accessToken ? (
            <button
              className="bg-gray-50 text-slate-800 px-4 py-2 rounded-full"
              onClick={() => {
                dispatch(removeAccessToken());
              }}
            >
              Logout
            </button>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
