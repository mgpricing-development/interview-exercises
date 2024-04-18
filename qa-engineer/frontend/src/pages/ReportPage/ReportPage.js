import { Page } from "../../components/layout";
import { useEffect } from "react";
import { getGuest } from "../../store/actions/guests";
import { selectGuest } from "../../store/reducers";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import NewGuestReportModal from "../../modals/NewGuestReportModal";

const ReportPage = ({ getGuest }) => {
  useEffect(() => {
    getGuest();
  }, []);

  return (
    <Page>
      Reports
      <NewGuestReportModal reportId={"xxxx-xxxx-xxxx"} />
    </Page>
  );
};

const mapStateToProps = (state) => ({
  guest: selectGuest(state)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getGuest
    },
    dispatch
  );

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  ReportPage
);
