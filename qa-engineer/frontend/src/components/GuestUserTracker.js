import { useEffect } from "react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import CookieNames from "../utils/cookie-names";
import { selectCookie } from "../store/reducers";
import { setCookie } from "../store/actions/cookies";

const COOKIE_EXPIRATION_IN_DAYS = 365;

const GuestUserTracker = ({ guestId, setCookie }) => {
  useEffect(() => {
    if (!guestId) {
      setCookie({
        name: CookieNames.GUEST_ID,
        value: "guest-" + uuidv4(),
        expires: COOKIE_EXPIRATION_IN_DAYS
      });
    }
  }, [guestId]);

  return null;
};

const mapStateToProps = (state) => ({
  guestId: selectCookie(state, CookieNames.GUEST_ID)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setCookie
    },
    dispatch
  );

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  GuestUserTracker
);
