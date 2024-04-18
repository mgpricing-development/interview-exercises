import React, { useState, useEffect } from "react";
import { validate } from "email-validator";
import PropTypes from "prop-types";
import styled from "styled-components";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Button, Form, Input, Modal, Typography } from "antd";
import { getGuest, registerGuest } from "../store/actions/guests";
import { selectGuest, selectRequestState } from "../store/reducers";
import actionTypes from "../store/actionTypes";
const { Paragraph, Title: Heading } = Typography;

const NewGuestReportModal = ({
  reportId,
  guest,
  getGuest,
  registerGuest,
  guestCreationLoaded
}) => {
  const privacyPolicyUrl = "https://cuvama.com/privacy-policy/";
  const headerText = "Discovery Report for ACME Inc";
  const subHeaderText = "Please introduce yourself to see the report.";
  const buttonText = "View report";
  const emailPlaceholderText = "Enter your email";
  const emailValidation = "Please input a valid email";
  const privacyPolicyText = "Privacy Policy";
  const privacyPolicyStatement = "By clicking View report, you consent to our";
  const notificationStatement =
    "Your email will be used to notify the Discovery Owner.";

  const shouldNotShowModal = !!guest;

  //usePreventScroll(!shouldNotShowModal);
  const [form] = Form.useForm();

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");

  const validateEmail = () => ({
    validator(_, value) {
      if (!validate(value)) {
        setIsEmailValid(false);
        return Promise.reject(new Error(emailValidation));
      } else {
        setIsEmailValid(true);
        setGuestEmail(value);
        return Promise.resolve();
      }
    }
  });

  useEffect(() => {
    getGuest();
  }, [guestCreationLoaded]);

  const onCreateReport = () => {
    if (isEmailValid && guestEmail && reportId) {
      registerGuest({ email: guestEmail, reportId });
    }
  };

  if (shouldNotShowModal) {
    return null;
  }

  return (
    <StyledModal
      width={480}
      open={true}
      data-cy={"new-guest-report-modal"}
      closeIcon={false}
      footer={null}
    >
      <ModalTitle>
        <Heading level={3} align={"center"}>
          {headerText}
        </Heading>
        <Paragraph variant={"body"}>{subHeaderText}</Paragraph>
      </ModalTitle>
      <ModalEmailForm form={form} layout="vertical">
        <ModalEmailFormItem name="email" rules={[validateEmail()]}>
          <Input placeholder={emailPlaceholderText} />
        </ModalEmailFormItem>
        <Paragraph variant={"smallBody"}>
          {privacyPolicyStatement}
          <br />
          {notificationStatement}
        </Paragraph>
        <Button
          type={"primary"}
          disabled={!isEmailValid}
          onClick={onCreateReport}
          className={"new-guest-view-report-button"}
        >
          {buttonText}
        </Button>
      </ModalEmailForm>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  & .ant-modal-content {
    padding: 32px;
  }

  button {
    width: 100%;
    margin-top: 8px;
  }
`;

const ModalIcon = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ModalTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 24px 0px;

  h3 {
    max-width: 320px;
  }
`;

const ModalEmailForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ModalEmailFormItem = styled(Form.Item)`
  margin: 0;
`;

NewGuestReportModal.propTypes = {
  reportId: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  guest: selectGuest(state),
  guestCreationLoaded: selectRequestState(
    state,
    actionTypes.REGISTER_GUEST_SUCCESS
  )
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getGuest, registerGuest }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  NewGuestReportModal
);
